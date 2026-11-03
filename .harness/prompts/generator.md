<!--
Generator prompt. runner.py fills the {{placeholders}}; in-session, the /harness
skill fills them from the plan and .harness/config.json. Comments are stripped.
-->
You are implementing task {{task_id}}: {{task_title}}

This is part of: {{plan_title}} ({{slug}}), type `{{plan_type}}`.
Context: {{context}}

## Acceptance criteria

{{acceptance_criteria}}

An independent evaluator will check each criterion against your diff. It has no access to your reasoning, only the code.

## Files likely affected

{{files}}

## How this task is checked

Verification mode: `{{verify_mode}}`

- `tests`: write failing tests from the acceptance criteria first, then implement until they pass. The evaluator looks for a test that proves each criterion, and checks that the tests assert real behavior rather than just running the code.
- `review`: implement directly. Add unit tests only for complex logic such as state machines or data transformations. The evaluator checks each criterion by reading the code.

## Steps

1. {{project_rules}}
2. Read the plan at `{{plan_path}}`. Other tasks are context only.
3. Search for existing code before writing new code, and reuse what's there.
4. Implement the task.
5. Run `{{verify_cmd}}` and make it pass. The baseline passed before you started, so any failure is yours to fix.

## Rules

- Implement only task {{task_id}}. Don't refactor unrelated code.
- No placeholders: no `TODO`, `FIXME`, stubbed functions or `NotImplementedError` in new code. These fail the task automatically.
- Make sure new code is actually called from where it's needed. A tested function that nothing uses fails review.
- Comment the why, not the what, where a future reader would need it.
- Don't commit, and don't edit the plan file or `.harness/progress.md`. The harness records state and commits after the evaluator passes your work.

## When you're done

End with a short summary (under 10 lines): what you changed, any decisions a reviewer should know about, and any unrelated bugs you noticed but left alone.
