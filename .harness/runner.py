#!/usr/bin/env python3
"""
Headless runner for the harness.

Per task: record a diff base, run a generator session, then review the change
(verify command, placeholder scan, independent evaluator). On FAIL the same
generator session is resumed with the feedback, up to max_retries. The runner
is the only thing that marks tasks complete, writes progress notes and commits.

Usage:
    python3 .harness/runner.py --plan .harness/plans/fix-csv-naming.json   # next pending task
    python3 .harness/runner.py --plan ... --loop        # every pending task
    python3 .harness/runner.py --plan ... --task 2      # one specific task
    python3 .harness/runner.py --plan ... --dry-run     # print generator prompts only
    python3 .harness/runner.py --plan ... --skip-eval   # mechanical checks only, no evaluator

In-session mode (the /harness skill implements, the scripts keep the books):
    python3 .harness/runner.py --plan ... --task 2 --begin
    python3 .harness/runner.py --plan ... --task 2 --complete --notes "what changed"

Exit codes: 0 success, 1 a task failed review after retries, 2 harness error.
"""

import argparse
import copy
import json
import sys
from pathlib import Path

from common import (
    HarnessError,
    append_progress,
    bullets,
    changed_files,
    commit_all,
    deps_done,
    find_task,
    load_config,
    load_plan,
    next_task,
    project_rules_line,
    rel,
    render,
    resolve_plan_path,
    run_claude,
    run_verify,
    save_plan,
    snapshot,
    task_label,
    tasks_block,
    update_plan_status,
    verdict_path,
    verify_cmd_str,
)
from evaluator import format_feedback, review

# ---------------------------------------------------------------------------
# Task state
# ---------------------------------------------------------------------------


def recover_interrupted(plan: dict, plan_path: Path) -> None:
    stuck = [t for t in plan["tasks"] if t["status"] == "in_progress"]
    for task in stuck:
        print(
            f"Task {task['id']} was left in_progress by an interrupted run. Resetting it "
            "to pending; anything it changed is still in the working tree."
        )
        task["status"] = "pending"
    if stuck:
        update_plan_status(plan)
        save_plan(plan, plan_path)


def begin_task(plan: dict, plan_path: Path, task: dict) -> None:
    base = snapshot()
    task["status"] = "in_progress"
    task["base"] = base
    plan.setdefault("base", base)
    update_plan_status(plan)
    save_plan(plan, plan_path)


def finish(
    config: dict,
    plan: dict,
    plan_path: Path,
    tasks: list[dict],
    verdict: dict,
    notes: str,
    cost: float | None,
) -> None:
    for task in tasks:
        task["status"] = "complete"
    update_plan_status(plan)
    save_plan(plan, plan_path)
    append_progress(plan, tasks, verdict, notes, cost)
    print(f"\n{task_label(tasks)}: complete.")
    if config["auto_commit"]:
        title = tasks[0]["title"] if len(tasks) == 1 else plan["title"]
        commit_all(f"{plan['slug']}: {title}")


def report_failure(plan: dict, tasks: list[dict], verdict: dict, scope: str) -> None:
    print(
        f"\n{task_label(tasks)} did not pass after {verdict['attempt']} attempt(s). "
        f"Verdict: {rel(verdict_path(plan, scope))}\n"
        "The changes are still in the working tree for you to review."
    )


# ---------------------------------------------------------------------------
# Generate -> review -> fix
# ---------------------------------------------------------------------------


def generator_prompt(config: dict, plan: dict, plan_path: Path, task: dict) -> str:
    return render(
        "generator.md",
        task_id=task["id"],
        task_title=task["title"],
        plan_title=plan["title"],
        slug=plan["slug"],
        plan_type=plan["type"],
        context=plan.get("context", ""),
        plan_path=rel(plan_path),
        acceptance_criteria=bullets(task.get("acceptance_criteria", [])),
        files=bullets(task.get("files", []), "(not specified)"),
        verify_mode=task.get("verify", "tests"),
        verify_cmd=verify_cmd_str(config),
        project_rules=project_rules_line(config),
    )


def fix_prompt(config: dict, plan: dict, plan_path: Path, tasks: list[dict], verdict: dict) -> str:
    return render(
        "fix.md",
        scope=task_label(tasks),
        plan_title=plan["title"],
        slug=plan["slug"],
        plan_path=rel(plan_path),
        tasks=tasks_block(tasks),
        feedback=format_feedback(verdict),
        verify_cmd=verify_cmd_str(config),
        project_rules=project_rules_line(config),
    )


def iterate(
    config: dict,
    plan: dict,
    plan_path: Path,
    tasks: list[dict],
    base: str,
    *,
    scope: str,
    prompt: str | None,
    use_llm: bool,
) -> tuple[dict, str, float]:
    """Generate (when given a prompt), then review and fix until PASS or retries run out.

    Fix attempts resume the generator's session so it keeps what it already built.
    Returns (final verdict, the generator's summaries, total cost).
    """
    session, notes, cost = None, [], 0.0
    if prompt:
        result = run_claude(prompt, config["generator"], label="generator")
        session = result["session_id"]
        notes.append(result.get("result", "").strip())
        cost += result.get("total_cost_usd") or 0

    max_attempts = config["max_retries"] + 1
    for attempt in range(1, max_attempts + 1):
        verdict = review(
            config, plan, tasks, base, scope=scope, attempt=attempt, use_llm=use_llm
        )
        cost += verdict.get("cost_usd", 0)
        if verdict["overall"] == "PASS" or attempt == max_attempts:
            return verdict, "\n\n".join(n for n in notes if n), cost

        print(f"\n── Retry {attempt}/{config['max_retries']}: sending feedback to the generator ──")
        result = run_claude(
            fix_prompt(config, plan, plan_path, tasks, verdict),
            config["generator"],
            label="generator",
            resume=session,
        )
        session = result["session_id"]
        notes.append(f"Fix {attempt}: {result.get('result', '').strip()}")
        cost += result.get("total_cost_usd") or 0

    raise AssertionError("unreachable")


def run_per_task(config: dict, plan: dict, plan_path: Path, args) -> bool:
    while task := next_task(plan, args.task):
        print_header(f"Task {task['id']}: {task['title']}  ({plan['slug']})")
        begin_task(plan, plan_path, task)
        scope = f"task{task['id']}"
        verdict, notes, cost = iterate(
            config, plan, plan_path, [task], task["base"],
            scope=scope,
            prompt=generator_prompt(config, plan, plan_path, task),
            use_llm=not args.skip_eval,
        )
        if verdict["overall"] != "PASS":
            task["status"] = "pending"
            update_plan_status(plan)
            save_plan(plan, plan_path)
            report_failure(plan, [task], verdict, scope)
            return False
        finish(config, plan, plan_path, [task], verdict, notes, cost)
        if args.task or not args.loop:
            break
    return True


def run_per_plan(config: dict, plan: dict, plan_path: Path, args) -> bool:
    """Build every task against mechanical checks, then evaluate the whole change once."""
    notes, cost = [], 0.0
    while task := next_task(plan):
        print_header(f"Build task {task['id']}: {task['title']}  ({plan['slug']})")
        begin_task(plan, plan_path, task)
        scope = f"task{task['id']}"
        verdict, task_notes, task_cost = iterate(
            config, plan, plan_path, [task], task["base"],
            scope=scope,
            prompt=generator_prompt(config, plan, plan_path, task),
            use_llm=False,
        )
        cost += task_cost
        if verdict["overall"] != "PASS":
            task["status"] = "pending"
            update_plan_status(plan)
            save_plan(plan, plan_path)
            report_failure(plan, [task], verdict, scope)
            return False
        task["status"] = "built"
        save_plan(plan, plan_path)
        notes.append(f"Task {task['id']}: {task_notes}")

    built = [t for t in plan["tasks"] if t["status"] == "built"]
    if not built:
        return True

    print_header(f"Evaluate {plan['slug']}: {task_label(built)}")
    verdict, fix_notes, eval_cost = iterate(
        config, plan, plan_path, built, plan["base"],
        scope="plan",
        prompt=None,
        use_llm=not args.skip_eval,
    )
    cost += eval_cost
    if fix_notes:
        notes.append(f"After evaluation:\n{fix_notes}")
    if verdict["overall"] != "PASS":
        # Tasks stay "built" so the next run goes straight back to evaluation.
        report_failure(plan, built, verdict, "plan")
        return False
    finish(config, plan, plan_path, built, verdict, "\n\n".join(notes), cost)
    return True


# ---------------------------------------------------------------------------
# In-session mode
# ---------------------------------------------------------------------------


def cmd_begin(plan: dict, plan_path: Path, task_id: str) -> None:
    task = find_task(plan, task_id)
    if task["status"] == "in_progress":
        print(f"Task {task_id} is already in progress; keeping its recorded diff base.")
        return
    if task["status"] != "pending":
        raise HarnessError(f"Task {task_id} is {task['status']}, not pending")
    if not deps_done(plan, task):
        raise HarnessError(f"Task {task_id} depends on unfinished tasks: {task['depends_on']}")
    begin_task(plan, plan_path, task)
    print(f"Task {task_id} started (diff base {task['base'][:12]}).")


def cmd_complete(config: dict, plan: dict, plan_path: Path, task_id: str, notes: str) -> None:
    task = find_task(plan, task_id)
    path = verdict_path(plan, f"task{task_id}")
    if not path.exists():
        raise HarnessError(f"No verdict for task {task_id}. Run evaluator.py first.")
    verdict = json.loads(path.read_text())
    if verdict["overall"] != "PASS":
        raise HarnessError(f"The latest verdict for task {task_id} is {verdict['overall']}")
    if changed_files(verdict["head"], snapshot()):
        raise HarnessError("Code changed after the evaluator passed it. Run evaluator.py again.")
    finish(config, plan, plan_path, [task], verdict, notes, verdict.get("cost_usd"))


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def print_header(text: str) -> None:
    print(f"\n{'=' * 60}\n{text}\n{'=' * 60}")


def dry_run(config: dict, plan: dict, plan_path: Path, args) -> None:
    simulated = copy.deepcopy(plan)
    run_all = args.loop or config["eval_mode"] == "plan"
    while task := next_task(simulated, args.task):
        print_header(f"[dry-run] Task {task['id']}: {task['title']}")
        print(generator_prompt(config, simulated, plan_path, task))
        task["status"] = "complete"
        if args.task or not run_all:
            break


def main():
    parser = argparse.ArgumentParser(description="Agent harness runner")
    parser.add_argument("--plan", required=True, help="Path to plan file")
    parser.add_argument("--task", help="Run a specific task by ID (e.g., 2)")
    parser.add_argument("--loop", action="store_true", help="Keep running tasks until done")
    parser.add_argument("--dry-run", action="store_true", help="Print prompts, change nothing")
    parser.add_argument("--skip-eval", action="store_true", help="Mechanical checks only")
    parser.add_argument("--begin", action="store_true", help="In-session: start --task")
    parser.add_argument("--complete", action="store_true", help="In-session: finish --task")
    parser.add_argument("--notes", default="", help="Progress notes for --complete")
    args = parser.parse_args()

    if (args.begin or args.complete) and not args.task:
        parser.error("--begin and --complete need --task")

    try:
        config = load_config()
        if config["eval_mode"] not in ("task", "plan"):
            raise HarnessError('eval_mode must be "task" or "plan"')
        plan_path = resolve_plan_path(args.plan)
        plan = load_plan(plan_path)

        if args.begin:
            return cmd_begin(plan, plan_path, args.task)
        if args.complete:
            return cmd_complete(config, plan, plan_path, args.task, args.notes)
        if args.dry_run:
            return dry_run(config, plan, plan_path, args)

        recover_interrupted(plan, plan_path)
        has_work = next_task(plan, args.task) or any(t["status"] == "built" for t in plan["tasks"])
        if not has_work:
            print("No pending tasks found.")
            return
        if config["eval_mode"] == "plan" and args.task:
            raise HarnessError('--task is not supported with eval_mode "plan"')

        # One baseline check for the whole run instead of one per session.
        baseline_ok, _ = run_verify(config)
        if not baseline_ok:
            print("\nBaseline verification fails before any changes. Fix that first.")
            sys.exit(1)

        runner = run_per_plan if config["eval_mode"] == "plan" else run_per_task
        passed = runner(config, plan, plan_path, args)
    except HarnessError as exc:
        print(f"\nHarness error: {exc}")
        sys.exit(2)

    done = sum(1 for t in plan["tasks"] if t["status"] == "complete")
    print(f"\n{plan['slug']}: {done}/{len(plan['tasks'])} tasks complete")
    sys.exit(0 if passed else 1)


if __name__ == "__main__":
    main()
