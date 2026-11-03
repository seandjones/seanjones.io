<!--
Fix prompt. Sent when a review fails. In per-task mode it resumes the original
generator session; in per-plan mode it starts a fresh one, so it carries enough
context to stand alone. Comments are stripped.
-->
The review of {{scope}} ({{plan_title}}, `{{slug}}`) failed. Fix every item below.

{{feedback}}

## Scope

{{tasks}}

Plan: `{{plan_path}}`

## Steps

1. {{project_rules}}
2. Fix each item. If a test fails, fix the implementation unless the test itself is wrong.
3. Run `{{verify_cmd}}` and make it pass.

Stay within the tasks above. Don't commit, and don't edit the plan file or `.harness/progress.md`.

End with a short summary of what you changed for each item.
