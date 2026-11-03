#!/usr/bin/env python3
"""
Evaluator for the harness.

Runs the mechanical checks (verify command, placeholder scan, test-file
detection) in Python, then hands the diff to a *separate*, read-only Claude
session that judges each acceptance criterion and returns a JSON verdict.
If the mechanical checks fail, no LLM session is started.

Usage:
    python3 .harness/evaluator.py --plan .harness/plans/fix-csv.json --task 1
    python3 .harness/evaluator.py --plan .harness/plans/fix-csv.json --all
    python3 .harness/evaluator.py --plan .harness/plans/fix-csv.json --task 1 --base HEAD~1

Exit codes: 0 PASS, 1 FAIL, 2 harness error (no verdict was reached).
"""

import argparse
import json
import sys

from common import (
    EMPTY_TREE,
    FEEDBACK_DIR,
    HarnessError,
    bullets,
    diff,
    find_task,
    git,
    head_commit,
    load_config,
    load_plan,
    mechanical_checks,
    render,
    resolve_plan_path,
    run_claude,
    run_verify,
    snapshot,
    tasks_block,
    verdict_path,
    verify_cmd_str,
)

VERDICT_SCHEMA = {
    "type": "object",
    "properties": {
        "acceptance_criteria": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "task": {"type": "string"},
                    "criterion": {"type": "string"},
                    "status": {"type": "string", "enum": ["PASS", "FAIL"]},
                    "evidence": {"type": "string"},
                },
                "required": ["task", "criterion", "status", "evidence"],
            },
        },
        "test_quality": {"type": "string", "enum": ["PASS", "FAIL", "N/A"]},
        "issues": {"type": "array", "items": {"type": "string"}},
        "overall": {"type": "string", "enum": ["PASS", "FAIL"]},
    },
    "required": ["acceptance_criteria", "test_quality", "issues", "overall"],
}


# ---------------------------------------------------------------------------
# Review
# ---------------------------------------------------------------------------


def review(
    config: dict,
    plan: dict,
    tasks: list[dict],
    base: str,
    *,
    scope: str,
    attempt: int = 1,
    use_llm: bool = True,
) -> dict:
    """Check the change from `base` to the current working tree. Saves and returns the verdict."""
    verify_passed, verify_output = run_verify(config)
    head = snapshot()
    checks = mechanical_checks(config, base, head, verify_passed, verify_output)

    verdict = {
        "plan": plan["slug"],
        "scope": scope,
        "tasks": [t["id"] for t in tasks],
        "attempt": attempt,
        "base": base,
        "head": head,
        "checks": checks,
        "acceptance_criteria": [],
        "test_quality": "N/A",
        "issues": [],
        "overall": "FAIL",
    }

    if checks["verify"] == "FAIL":
        verdict["issues"].append(f"`{verify_cmd_str(config)}` fails (output below).")
    for hit in checks["placeholders"]:
        verdict["issues"].append(f"Placeholder in new code: {hit}")

    if verdict["issues"]:
        verdict["llm_skipped"] = True
    elif not use_llm:
        verdict["llm_skipped"] = True
        verdict["overall"] = "PASS"
    else:
        judged, cost = judge(config, plan, tasks, base, head, checks)
        verdict.update(judged)
        verdict["cost_usd"] = cost

    FEEDBACK_DIR.mkdir(exist_ok=True)
    verdict_path(plan, scope).write_text(json.dumps(verdict, indent=2) + "\n")
    print_verdict(verdict)
    return verdict


def judge(
    config: dict, plan: dict, tasks: list[dict], base: str, head: str, checks: dict
) -> tuple[dict, float]:
    """Ask a fresh, read-only Claude session for a verdict on the diff."""
    full_diff = diff(base, head)
    limit = config["max_diff_chars"]
    diff_note = ""
    if len(full_diff) > limit:
        full_diff = full_diff[:limit]
        diff_note = (
            f"The diff was cut off at {limit} characters. Read the changed files "
            "directly for anything not shown."
        )

    prompt = render(
        "evaluator.md",
        plan_title=plan["title"],
        slug=plan["slug"],
        context=plan.get("context", ""),
        tasks=tasks_block(tasks),
        verify_cmd=verify_cmd_str(config),
        changed_files=bullets(checks["changed_files"]),
        test_files_changed=bullets(checks["test_files_changed"]),
        possible_stubs=bullets(checks["possible_stubs"]),
        diff_stat=diff(base, head, "--stat").strip() or "(empty diff)",
        diff=full_diff.strip() or "(empty diff)",
        diff_note=diff_note,
    )

    commit_before = head_commit()
    result = run_claude(
        prompt,
        config["evaluator"],
        label="evaluator",
        schema=VERDICT_SCHEMA,
        disallowed_tools="Edit,Write,NotebookEdit",
    )
    guard_read_only(head, commit_before)

    raw = result.get("structured_output")
    if not isinstance(raw, dict):
        raise HarnessError("Evaluator returned no structured verdict")

    failed_acs = [ac for ac in raw["acceptance_criteria"] if ac["status"] != "PASS"]
    needs_tests = any(t.get("verify", "tests") == "tests" for t in tasks)
    tests_failed = needs_tests and raw["test_quality"] == "FAIL"
    # The final call is mechanical so a PASS can't coexist with a failed criterion.
    overall = "FAIL" if raw["overall"] != "PASS" or failed_acs or tests_failed else "PASS"
    if overall == "FAIL" and not raw["issues"] and not failed_acs:
        raise HarnessError("Evaluator returned FAIL without any actionable issues")

    return {**raw, "overall": overall}, result.get("total_cost_usd") or 0.0


def guard_read_only(head: str, commit_before: str | None) -> None:
    """The evaluator has Bash, so confirm it didn't change the code it was grading."""
    if head_commit() != commit_before:
        raise HarnessError("Evaluator created a commit. Review `git log` before continuing.")
    after = snapshot()
    if after == head:
        return
    modified = diff(head, after, "--name-only", "--diff-filter=MDR").splitlines()
    if modified:
        raise HarnessError(f"Evaluator modified files it was reviewing: {', '.join(modified)}")
    added = diff(head, after, "--name-only", "--diff-filter=A").splitlines()
    if added:
        print(
            "  Note: evaluator left new untracked files (add them to .gitignore if "
            f"they are build output): {', '.join(added)}"
        )


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------


def format_feedback(verdict: dict) -> str:
    """Turn a FAIL verdict into instructions for the generator."""
    parts = []
    failed = [ac for ac in verdict.get("acceptance_criteria", []) if ac["status"] != "PASS"]
    if failed:
        parts.append(
            "Acceptance criteria not met:\n"
            + bullets([f"Task {ac['task']}: {ac['criterion']} ({ac['evidence']})" for ac in failed])
        )
    if verdict["issues"]:
        parts.append("Issues:\n" + bullets(verdict["issues"]))
    output = verdict["checks"].get("verify_output")
    if output:
        parts.append(f"Verification output:\n```\n{output}\n```")
    return "\n\n".join(parts)


def print_verdict(verdict: dict) -> None:
    checks = verdict["checks"]
    print(f"\n{'=' * 56}")
    print(f"  Verdict: {verdict['overall']}  ({verdict['scope']}, attempt {verdict['attempt']})")
    print(f"{'=' * 56}")
    print(f"  verify:          {checks['verify']}")
    print(f"  placeholders:    {len(checks['placeholders']) or 'none'}")
    print(f"  test files:      {len(checks['test_files_changed']) or 'none'} changed")
    if verdict.get("llm_skipped"):
        print("  evaluator:       skipped")
    else:
        print(f"  test quality:    {verdict['test_quality']}")
        for ac in verdict["acceptance_criteria"]:
            mark = "x" if ac["status"] == "PASS" else " "
            print(f"  [{mark}] Task {ac['task']}: {ac['criterion']}")
            if ac["status"] != "PASS":
                print(f"        {ac['evidence']}")
    if verdict["issues"]:
        print(f"\n  Issues ({len(verdict['issues'])}):")
        for issue in verdict["issues"]:
            print(f"    - {issue}")
    print()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    parser = argparse.ArgumentParser(description="Agent harness evaluator")
    parser.add_argument("--plan", required=True, help="Path to plan file")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--task", help="Task ID to evaluate (e.g., 1)")
    group.add_argument("--all", action="store_true", help="Evaluate every task together")
    parser.add_argument(
        "--base",
        help="Git revision to diff from (defaults to the base recorded by --begin, else HEAD)",
    )
    args = parser.parse_args()

    try:
        config = load_config()
        plan = load_plan(resolve_plan_path(args.plan))
        if args.all:
            tasks, scope, recorded = plan["tasks"], "plan", plan.get("base")
        else:
            task = find_task(plan, args.task)
            tasks, scope, recorded = [task], f"task{task['id']}", task.get("base")
        base = args.base or recorded or "HEAD"
        if base == "HEAD" and head_commit() is None:
            base = EMPTY_TREE
        base = git("rev-parse", f"{base}^{{tree}}").strip()
        verdict = review(config, plan, tasks, base, scope=scope)
    except HarnessError as exc:
        print(f"\nHarness error: {exc}")
        sys.exit(2)

    if verdict["overall"] != "PASS":
        print(format_feedback(verdict))
    sys.exit(0 if verdict["overall"] == "PASS" else 1)


if __name__ == "__main__":
    main()
