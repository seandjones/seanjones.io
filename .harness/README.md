# Harness Reference

Scripts, prompts and state for executing plans. The `/harness` skill covers triage and planning; this is the reference for everything after the plan is approved.

## Files

| Path                | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `config.json`       | All project settings (see below)                               |
| `prompts/`          | `generator.md`, `fix.md`, `evaluator.md`: the only copy of each |
| `runner.py`         | Runs tasks: generate, review, fix, record                      |
| `evaluator.py`      | Reviews a task or the whole plan; usable on its own            |
| `common.py`         | Shared helpers: git snapshots, checks, Claude sessions         |
| `plans/{slug}.json` | Per-ticket plans                                               |
| `eval_feedback/`    | Latest verdict per task (`{slug}_task{id}.json`) or plan (`{slug}_plan.json`) |
| `progress.md`       | Appended by the runner when a task completes                   |

## Setup

Edit `config.json`:

| Field             | Meaning                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `verify_cmd`      | Lint + typecheck + test. A list runs directly; a string runs through the shell                 |
| `claude_md`       | Project instructions file the generator reads first, or `null`                                 |
| `eval_mode`       | `"task"`: evaluate after every task. `"plan"`: build all tasks, then evaluate the whole diff once |
| `max_retries`     | Fix attempts after the first failed review                                                    |
| `auto_commit`     | `true` commits after each passing task. `false` leaves changes in the working tree for review  |
| `max_diff_chars`  | Diff size sent to the evaluator before it's told to read the files directly                   |
| `test_patterns`   | Globs (matched on path and filename) that count as test files                                 |
| `generator`, `evaluator` | `model` (null = CLI default), `max_budget_usd` per session, `allowed_tools`            |

The budget defaults (10 and 3 USD per session) are starting guesses. Check the costs in `progress.md` after a few runs and adjust.

## Runner

```bash
python3 .harness/runner.py --plan .harness/plans/{slug}.json            # next pending task
python3 .harness/runner.py --plan .harness/plans/{slug}.json --loop     # every pending task
python3 .harness/runner.py --plan .harness/plans/{slug}.json --task 2   # one task
python3 .harness/runner.py --plan .harness/plans/{slug}.json --dry-run  # print prompts only
python3 .harness/runner.py --plan .harness/plans/{slug}.json --skip-eval  # mechanical checks only
```

What happens per run:

```
reset any task left in_progress by an interrupted run
verify once (baseline); stop if it already fails
for each pending task:
  snapshot the working tree as the task's diff base
  generator session (claude -p, budget-capped)
  review:  verify + placeholder scan          (Python, no LLM)
           evaluator session on the diff      (only if the above pass)
  FAIL  -> resume the generator session with the feedback, review again
  PASS  -> mark complete, append progress.md, commit if auto_commit
```

With `eval_mode: "plan"`, each task is built against the mechanical checks only and marked `built`; one evaluator session then reviews the whole plan's diff against every task's criteria.

Exit codes: `0` success, `1` a task failed review after all retries (its changes stay in the working tree), `2` harness error such as a failed session, a hit budget, or an evaluator that edited files.

## Evaluator

```bash
python3 .harness/evaluator.py --plan .harness/plans/{slug}.json --task 1
python3 .harness/evaluator.py --plan .harness/plans/{slug}.json --all
python3 .harness/evaluator.py --plan .harness/plans/{slug}.json --task 1 --base main
```

It diffs from the task's recorded base (or `--base`, or `HEAD`) to the current working tree, so uncommitted work is included. Python handles the mechanical checks:

- **Verify command.** If it fails, the review stops there and no LLM session runs.
- **Placeholders.** `TODO`, `FIXME`, `NotImplementedError` or "not implemented" in added lines of code files fail the task. Bare `pass` / `...` lines in Python are passed to the evaluator to judge, since they're often legitimate.
- **Test files changed**, matched against `test_patterns`.

The evaluator session then gets the diff and these results, runs with edit tools disabled, and returns a JSON verdict (`--json-schema`): a PASS/FAIL per acceptance criterion with evidence, test quality, and issues. The final PASS/FAIL is computed from those fields, so a passing verdict can't contain a failed criterion. If the evaluator changes any file it was reviewing, or commits, the run stops with a harness error.

## Snapshots

The harness never needs commits to diff a task. A snapshot writes the working tree (tracked and untracked files, minus ignored ones) to a git tree object through a temporary index file. Your staging area, HEAD and files are untouched. The tree IDs are stored as `base` in the plan and as `base`/`head` in each verdict, so you can inspect any task's change with:

```bash
git diff <base> <head>
```

Plans, verdicts and `progress.md` are excluded from every diff.

## In-session mode

When the skill implements a task itself, it uses the same scripts so the gate and records are identical:

```bash
python3 .harness/runner.py --plan {plan} --task 1 --begin
# ... implement following prompts/generator.md ...
python3 .harness/evaluator.py --plan {plan} --task 1
python3 .harness/runner.py --plan {plan} --task 1 --complete --notes "what changed"
```

`--complete` refuses unless the latest verdict passed and the code hasn't changed since.
