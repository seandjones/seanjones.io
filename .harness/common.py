"""
Shared plumbing for the harness runner and evaluator: config, plan state,
git snapshots, mechanical checks, prompt rendering, and headless Claude calls.

Everything here is deterministic. The LLM sessions only do the work that needs
judgment (writing code, deciding whether it meets the acceptance criteria).
"""

import fnmatch
import json
import os
import re
import shutil
import subprocess
import tempfile
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HARNESS_DIR = ROOT / ".harness"
CONFIG_PATH = HARNESS_DIR / "config.json"
PROMPTS_DIR = HARNESS_DIR / "prompts"
FEEDBACK_DIR = HARNESS_DIR / "eval_feedback"
PROGRESS_PATH = HARNESS_DIR / "progress.md"

# Harness bookkeeping is never part of the change under review.
BOOKKEEPING_PATHS = [".harness/plans", ".harness/eval_feedback", ".harness/progress.md"]
DIFF_EXCLUDES = [f":(exclude){p}" for p in BOOKKEEPING_PATHS]

# git's well-known empty tree, used as the base in a repo with no commits yet.
EMPTY_TREE = "4b825dc642cb6eb9a060e54bf8d69288fbee4904"

# Statuses that satisfy a depends_on. "built" only appears in eval_mode "plan",
# where tasks are implemented first and evaluated together at the end.
DONE_STATUSES = ("built", "complete")

# Placeholder markers that fail a task outright when they appear in added lines.
# TODO/FIXME are case-sensitive so ordinary words like "todo-list" don't trip it.
MARKER_RE = re.compile(
    r"\b(?:TODO|FIXME)\b|\bNotImplementedError\b|(?i:\bnot (?:yet )?implemented\b)"
)
# Prose files legitimately mention TODOs; only code is scanned.
PROSE_SUFFIXES = {".md", ".mdx", ".txt", ".rst"}


class HarnessError(Exception):
    """Infrastructure failure (claude/git/config), as opposed to a FAIL verdict."""


# ---------------------------------------------------------------------------
# Config and plan state
# ---------------------------------------------------------------------------


def load_config() -> dict:
    if not CONFIG_PATH.exists():
        raise HarnessError(f"Missing {CONFIG_PATH.relative_to(ROOT)}")
    return json.loads(CONFIG_PATH.read_text())


def verify_cmd_str(config: dict) -> str:
    cmd = config["verify_cmd"]
    return cmd if isinstance(cmd, str) else " ".join(cmd)


def resolve_plan_path(arg: str) -> Path:
    path = Path(arg)
    if not path.is_absolute():
        path = ROOT / path
    if not path.exists():
        raise HarnessError(f"Plan file not found: {path}")
    return path


def load_plan(plan_path: Path) -> dict:
    return json.loads(plan_path.read_text())


def save_plan(plan: dict, plan_path: Path) -> None:
    plan_path.write_text(json.dumps(plan, indent=2) + "\n")


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT))


def find_task(plan: dict, task_id: str) -> dict:
    for task in plan["tasks"]:
        if task["id"] == task_id:
            return task
    raise HarnessError(f"Task {task_id} not found in plan {plan['slug']}")


def deps_done(plan: dict, task: dict) -> bool:
    status = {t["id"]: t["status"] for t in plan["tasks"]}
    return all(status.get(dep) in DONE_STATUSES for dep in task.get("depends_on", []))


def next_task(plan: dict, task_id: str | None = None) -> dict | None:
    for task in plan["tasks"]:
        if task_id and task["id"] != task_id:
            continue
        if task["status"] == "pending" and deps_done(plan, task):
            return task
    return None


def update_plan_status(plan: dict) -> None:
    statuses = {t["status"] for t in plan["tasks"]}
    if statuses == {"complete"}:
        plan["status"] = "complete"
    elif statuses - {"pending"}:
        plan["status"] = "in_progress"
    else:
        plan["status"] = "planned"


def task_label(tasks: list[dict]) -> str:
    if len(tasks) == 1:
        return f"Task {tasks[0]['id']} - {tasks[0]['title']}"
    return "Tasks " + ", ".join(t["id"] for t in tasks)


def verdict_path(plan: dict, scope: str) -> Path:
    return FEEDBACK_DIR / f"{plan['slug']}_{scope}.json"


# ---------------------------------------------------------------------------
# Git snapshots
#
# A snapshot writes the working tree (tracked + untracked, minus ignored files)
# into a git tree object using a throwaway index. HEAD, the real staging area
# and the working tree are never touched, so per-task diffs work the same
# whether or not anything gets committed.
# ---------------------------------------------------------------------------


def git(*args: str, env: dict | None = None) -> str:
    result = subprocess.run(
        ["git", *args], cwd=ROOT, capture_output=True, text=True, env=env
    )
    if result.returncode != 0:
        raise HarnessError(f"git {' '.join(args)} failed: {result.stderr.strip()}")
    return result.stdout


def snapshot() -> str:
    real_index = Path(git("rev-parse", "--git-path", "index").strip())
    if not real_index.is_absolute():
        real_index = ROOT / real_index
    with tempfile.TemporaryDirectory() as tmp:
        tmp_index = Path(tmp) / "index"
        if real_index.exists():
            # Reusing the stat cache means only changed files get rehashed.
            shutil.copy(real_index, tmp_index)
        env = {**os.environ, "GIT_INDEX_FILE": str(tmp_index)}
        git("add", "-A", "--", ".", env=env)
        return git("write-tree", env=env).strip()


def diff(base: str, head: str, *args: str) -> str:
    return git(
        "diff", "--no-color", "--no-ext-diff", "--src-prefix=a/", "--dst-prefix=b/",
        *args, base, head, "--", ".", *DIFF_EXCLUDES,
    )


def changed_files(base: str, head: str) -> list[str]:
    return [line for line in diff(base, head, "--name-only").splitlines() if line]


def added_lines(base: str, head: str) -> list[tuple[str, int, str]]:
    """(path, line number, text) for every line added between two trees."""
    out: list[tuple[str, int, str]] = []
    path, lineno = None, 0
    for line in diff(base, head, "-U0").splitlines():
        if line.startswith("+++ "):
            path = line[6:] if line.startswith("+++ b/") else None
        elif line.startswith("@@"):
            match = re.search(r"\+(\d+)", line)
            lineno = int(match.group(1)) if match else 0
        elif line.startswith("+") and path:
            out.append((path, lineno, line[1:]))
            lineno += 1
    return out


def head_commit() -> str | None:
    try:
        return git("rev-parse", "--verify", "-q", "HEAD").strip()
    except HarnessError:
        return None


def commit_all(message: str) -> None:
    git("add", "-A")
    git("commit", "-m", message)
    print(f"Committed: {message}")


# ---------------------------------------------------------------------------
# Mechanical checks
# ---------------------------------------------------------------------------


def tail(text: str, max_chars: int) -> str:
    if len(text) <= max_chars:
        return text
    return "...(truncated)...\n" + text[-max_chars:]


def run_verify(config: dict) -> tuple[bool, str]:
    cmd = config["verify_cmd"]
    print(f"\n── Verify: {verify_cmd_str(config)} ──")
    try:
        result = subprocess.run(
            cmd, cwd=ROOT, capture_output=True, text=True, shell=isinstance(cmd, str)
        )
    except FileNotFoundError as exc:
        raise HarnessError(f"Verify command not found: {exc}") from exc
    output = (result.stdout or "") + (result.stderr or "")
    passed = result.returncode == 0
    print(tail(output, 3000).rstrip() or "(no output)")
    print("PASS" if passed else f"FAIL (exit {result.returncode})")
    return passed, output


def is_test_file(path: str, patterns: list[str]) -> bool:
    name = Path(path).name
    return any(fnmatch.fnmatch(path, p) or fnmatch.fnmatch(name, p) for p in patterns)


def mechanical_checks(
    config: dict, base: str, head: str, verify_passed: bool, verify_output: str
) -> dict:
    placeholders, possible_stubs = [], []
    for path, lineno, text in added_lines(base, head):
        if Path(path).suffix in PROSE_SUFFIXES:
            continue
        if MARKER_RE.search(text):
            placeholders.append(f"{path}:{lineno}: {text.strip()}")
        elif path.endswith(".py") and text.strip() in ("pass", "..."):
            # Often legitimate (except: pass, protocol bodies), so the
            # evaluator judges these instead of failing them outright.
            possible_stubs.append(f"{path}:{lineno}: {text.strip()}")

    files = changed_files(base, head)
    return {
        "verify": "PASS" if verify_passed else "FAIL",
        "verify_output": "" if verify_passed else tail(verify_output, 4000),
        "changed_files": files,
        "test_files_changed": [f for f in files if is_test_file(f, config["test_patterns"])],
        "placeholders": placeholders,
        "possible_stubs": possible_stubs,
    }


# ---------------------------------------------------------------------------
# Prompts
# ---------------------------------------------------------------------------


def render(name: str, **values) -> str:
    """Fill {{placeholders}} in a prompt file. HTML comments are stripped."""
    text = (PROMPTS_DIR / name).read_text()
    text = re.sub(r"<!--.*?-->\n?", "", text, flags=re.DOTALL)

    def sub(match: re.Match) -> str:
        key = match.group(1)
        if key not in values:
            raise HarnessError(f"{name} uses unknown placeholder {{{{{key}}}}}")
        return str(values[key])

    return re.sub(r"\{\{(\w+)\}\}", sub, text).strip() + "\n"


def bullets(items: list[str], empty: str = "(none)") -> str:
    return "\n".join(f"- {item}" for item in items) if items else empty


def tasks_block(tasks: list[dict]) -> str:
    sections = []
    for task in tasks:
        sections.append(
            f"### Task {task['id']}: {task['title']}\n\n"
            f"Verification mode: `{task.get('verify', 'tests')}`\n\n"
            f"Acceptance criteria:\n{bullets(task.get('acceptance_criteria', []))}"
        )
    return "\n\n".join(sections)


def project_rules_line(config: dict) -> str:
    if config.get("claude_md"):
        return f"Read `{config['claude_md']}` first for project context and rules."
    return "Skim the repository layout first so you follow existing conventions."


# ---------------------------------------------------------------------------
# Headless Claude sessions
# ---------------------------------------------------------------------------


def _describe_tool_call(block: dict) -> str:
    args = block.get("input") or {}
    for key in ("command", "file_path", "pattern", "path"):
        if key in args:
            return f"{block['name']} {str(args[key]).splitlines()[0][:100]}"
    return block["name"]


def run_claude(
    prompt: str,
    role: dict,
    *,
    label: str,
    schema: dict | None = None,
    resume: str | None = None,
    disallowed_tools: str | None = None,
) -> dict:
    """Run `claude -p` and return its final result message.

    Streams tool calls to the terminal so long sessions aren't silent. Raises
    HarnessError if the session errors or hits its budget.
    """
    cmd = [
        "claude", "-p",
        "--output-format", "stream-json", "--verbose",
        "--allowedTools", role["allowed_tools"],
    ]
    if disallowed_tools:
        cmd += ["--disallowedTools", disallowed_tools]
    if role.get("model"):
        cmd += ["--model", role["model"]]
    if role.get("max_budget_usd"):
        cmd += ["--max-budget-usd", str(role["max_budget_usd"])]
    if schema:
        cmd += ["--json-schema", json.dumps(schema)]
    if resume:
        cmd += ["--resume", resume]

    print(f"\n── Claude session: {label}{' (resumed)' if resume else ''} ──")
    try:
        proc = subprocess.Popen(
            cmd, cwd=ROOT, stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True
        )
    except FileNotFoundError as exc:
        raise HarnessError("`claude` CLI not found on PATH") from exc

    # The prompt goes over stdin: diffs can exceed the per-argument size limit.
    assert proc.stdin and proc.stdout
    proc.stdin.write(prompt)
    proc.stdin.close()

    final = None
    for line in proc.stdout:
        try:
            message = json.loads(line)
        except json.JSONDecodeError:
            continue
        if message.get("type") == "assistant":
            for block in message.get("message", {}).get("content", []):
                if block.get("type") == "tool_use":
                    print(f"  [{label}] {_describe_tool_call(block)}")
        elif message.get("type") == "result":
            final = message
    proc.wait()

    if final is None:
        raise HarnessError(f"{label} session exited {proc.returncode} without a result")
    if final.get("is_error") or final.get("subtype") != "success":
        detail = final.get("result") or "; ".join(final.get("errors") or [])
        if final.get("subtype") != "success":
            detail = f"{final.get('subtype')}: {detail}"
        raise HarnessError(f"{label} session failed: {detail}")
    cost = final.get("total_cost_usd") or 0
    print(f"  [{label}] done in {final.get('num_turns', '?')} turns, ${cost:.2f}")
    return final


# ---------------------------------------------------------------------------
# Progress notes
# ---------------------------------------------------------------------------


def append_progress(
    plan: dict, tasks: list[dict], verdict: dict, notes: str, cost: float | None
) -> None:
    attempt = verdict.get("attempt", 1)
    lines = [
        f"\n## {date.today().isoformat()} - {plan['slug']}: {task_label(tasks)}",
        "",
        f"- Evaluator: {verdict['overall']} on attempt {attempt}"
        + (" (mechanical checks only)" if verdict.get("llm_skipped") else ""),
        f"- Files: {', '.join(verdict.get('checks', {}).get('changed_files', [])) or '(none)'}",
    ]
    if cost is not None:
        lines.append(f"- Cost: ${cost:.2f}")
    if notes.strip():
        lines += ["", tail(notes.strip(), 2000)]
    with PROGRESS_PATH.open("a") as fh:
        fh.write("\n".join(lines) + "\n")
