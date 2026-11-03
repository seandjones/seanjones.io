# Plan File Format

Per-ticket plans live at `.harness/plans/{slug}.json`. Plans are kept forever as historical record.

## Schema

```json
{
  "slug": "fix-csv-naming",
  "title": "Fix CSV download naming convention",
  "type": "bug|feature|improvement|chore",
  "created": "2026-03-26",
  "status": "planned",
  "context": "Brief description of why this work is needed and any relevant background",
  "tasks": [
    {
      "id": "1",
      "title": "Update CSV filename to use DDMMYY HH:MM format",
      "status": "pending",
      "verify": "tests",
      "acceptance_criteria": [
        "CSV download filename follows DDMMYY HH:MM {Name} format",
        "Filename is generated using sanitized user input"
      ],
      "files": ["src/components/TableViewer.tsx"],
      "depends_on": []
    }
  ]
}
```

## Field Reference

| Field                         | Required | Description                                                           |
| ----------------------------- | -------- | --------------------------------------------------------------------- |
| `slug`                        | Yes      | Auto-generated: lowercase, hyphenated, max 40 chars                   |
| `title`                       | Yes      | Human-readable title for the ticket                                   |
| `type`                        | Yes      | One of: `bug`, `feature`, `improvement`, `chore`                      |
| `created`                     | Yes      | ISO date (YYYY-MM-DD)                                                 |
| `status`                      | Yes      | Write `planned`. The runner keeps it updated after that               |
| `context`                     | Yes      | Why this work is needed: motivation, user feedback, etc.              |
| `tasks[].id`                  | Yes      | Sequential string ID ("1", "2", ...)                                  |
| `tasks[].title`               | Yes      | Short, imperative description of the task                             |
| `tasks[].status`              | Yes      | Write `pending`. The scripts manage it after that                     |
| `tasks[].verify`              | No       | `tests` (default) or `review`. See below                              |
| `tasks[].acceptance_criteria` | Yes      | Testable criteria; the evaluator checks each one                      |
| `tasks[].files`               | No       | Hint for which files will be touched                                  |
| `tasks[].depends_on`          | No       | Task IDs that must finish first                                       |

The scripts also add `base` to the plan and to each task they start. These are git tree IDs used to diff each task. Don't edit them.

## Verify Mode

- `tests`: the generator writes failing tests first, and the evaluator expects a test proving each criterion. Use this for logic, APIs, data handling, anything a test can pin down.
- `review`: the generator implements directly, and the evaluator checks each criterion by reading the code. Use this for UI layout and styling, where a unit test would only restate the markup.

## Statuses

| Status        | Meaning                                                                  |
| ------------- | ------------------------------------------------------------------------ |
| `pending`     | Not started, or reset after a failed or interrupted run                  |
| `in_progress` | Started; a diff base is recorded                                         |
| `built`       | `eval_mode: "plan"` only: implemented, waiting for the whole-plan review |
| `complete`    | Passed review                                                            |

## Slug Generation

Generate from the title/description:

- Lowercase, replace spaces with hyphens
- Remove special characters
- Prefix with type: `fix-`, `feat-`, `improve-`, `chore-`
- Max 40 chars, truncate at word boundary

Examples:

- "CSV download naming" -> `fix-csv-naming`
- "Sticky status bar" -> `feat-sticky-statusbar`
- "Login form broken" -> `fix-login-form`

## Planning Rules

1. Each task should be completable in one focused session (1-2 hours)
2. Every task MUST have `acceptance_criteria`
3. Acceptance criteria must be specific and testable, not vague
4. Group related changes into a single task (component + test + wiring)
5. Use `depends_on` to express ordering between tasks
6. Include `files` as hints to help the generator focus

## Bad vs Good Acceptance Criteria

| Bad                   | Good                                                               |
| --------------------- | ------------------------------------------------------------------ |
| "CSV works correctly" | "CSV filename follows DDMMYY HH:MM {Name} format"                  |
| "UI looks better"     | "Status bar is sticky at bottom with cost, tokens, and time"       |
| "Fix the bug"         | "Login form renders email field and submit button on /login route" |
| "Add tests"           | "Unit test verifies filename generation with mock input"           |
