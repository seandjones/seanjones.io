---
name: harness
description: |
  Plan and execute feature requests, bug fixes, and improvements using the agent harness.
  Auto-detect when the user shares feedback, bug reports, or feature requests and enter
  triage mode automatically. Create per-ticket plans with acceptance criteria, get the
  user's approval, then implement with an independent evaluator gating every task.
  TRIGGER when: user shares feedback, bug reports, feature requests, improvement ideas,
  or says /harness.
---

# Agent Harness

Turn feedback, bugs, and feature requests into verified implementations.

```
Intake --> Triage --> Clarify --> Plan --> Approve --> Execute (runner or in-session)
```

The first four steps need the user. Execution doesn't, and the scripts in `.harness/` own all bookkeeping: diff bases, verdicts, task status, progress notes and commits. Never edit task status in the plan JSON by hand.

## 1. Intake & Triage

Read all feedback items before acting. For each item:

1. Categorize: `bug` | `feature` | `improvement` | `chore`
2. Identify dependencies between items
3. Propose priority order: bugs first, then blocking items, then small wins, then large efforts
4. Present the triage as a numbered list with category, priority, and rationale

## 2. Clarify

Use `AskUserQuestion` to turn vague feedback into testable requirements.

- Batch related questions (max 4 per call) and offer concrete options
- Use previews for UI questions (ASCII mockups)
- One round is usually enough, two at most
- Skip it when the requirement is already specific or the codebase answers it

## 3. Plan

Write `.harness/plans/{slug}.json` following [references/plan-format.md](references/plan-format.md).

- Every task needs specific, testable `acceptance_criteria`; the evaluator checks each one against the diff
- Set `verify` per task: `tests` when the criteria can be proven by automated tests, `review` when they can only be checked by reading the code (most UI work)
- Each task should be completable in one focused session

## 4. Approve

Show each task with its criteria and `verify` mode, then ask with `AskUserQuestion`:

- **Run with the runner (Recommended)**: headless, one fresh generator session per task
- **Work through it in this session**: you implement, the scripts evaluate and record
- **Change the plan**

Don't start implementing until the user picks one.

## 5a. Execute with the runner

Run it in the background:

```bash
python3 .harness/runner.py --plan .harness/plans/{slug}.json --loop
```

When it exits, report the result from the exit code and the verdicts in `.harness/eval_feedback/`:

- `0`: all tasks passed. Summarize each task from `.harness/progress.md`.
- `1`: a task failed review after all retries. Show its unmet criteria and issues. The changes are still in the working tree.
- `2`: harness error (session failed, budget hit, evaluator touched files). Show the message; don't retry blindly.

## 5b. Execute in this session

For each task, in `depends_on` order:

1. `python3 .harness/runner.py --plan {plan} --task {id} --begin` records the diff base.
2. Read `.harness/prompts/generator.md` and follow it for this task. Fill its placeholders from the plan and `.harness/config.json`.
3. `python3 .harness/evaluator.py --plan {plan} --task {id}` runs verification and a separate, read-only evaluator session. Don't evaluate your own work.
4. Exit `1` (FAIL): fix every item it printed, then run step 3 again. After `max_retries` failed fixes (from config), stop and ask the user. Exit `2`: report the harness error.
5. Exit `0` (PASS): `python3 .harness/runner.py --plan {plan} --task {id} --complete --notes "<what changed, decisions, bugs noticed>"`. It refuses if the code changed after the evaluator passed it.

Commits happen only if `auto_commit` is true in `.harness/config.json`. Otherwise leave the changes for the user to review.

## Files

| Path                         | Purpose                                         |
| ---------------------------- | ----------------------------------------------- |
| `.harness/config.json`       | Verify command, eval mode, retries, budgets     |
| `.harness/prompts/`          | Generator, fix and evaluator prompts            |
| `.harness/plans/{slug}.json` | Per-ticket plan                                 |
| `.harness/eval_feedback/`    | Latest verdict per task (or per plan)           |
| `.harness/progress.md`       | Notes appended when a task completes            |

See `.harness/README.md` for runner options and config fields.
