# seanjones.io

My portfolio site, live at [seanjones.io](https://seanjones.io): experience, projects, and skills. Most of my professional work is in private repositories, so this repo is also a small public example of how I build.

## Stack

- Vue 3 and TypeScript, built with Vite
- Sass, with shared design tokens for the light and dark themes
- Vitest and Vue Test Utils for component tests
- vue-tsc for type checking, oxlint and ESLint for linting
- Formspree for the contact form
- GitHub Pages for hosting

## Running it

```sh
npm install
cp .env.example .env.local   # add a Formspree endpoint to use the contact form
npm run dev
```

- `npm run check` runs the tests and a production build, including the type check.
- `npm run lint` runs oxlint and ESLint.

## Deploying

`npm run deploy` builds the site and publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves at seanjones.io. The résumé is served at `/resume.pdf`, and `robots.txt` keeps it out of search results.

## Performance

The site is static and built for speed first. The April 2026 Lighthouse run on the production build (`lighthouse-report-final.json`) scored 100 for performance, accessibility, best practices, and SEO.

## How it's built

I build this site with Claude Code, using the agent harness in this repo:

- `CLAUDE.md` and `docs/ARCHITECTURE.md` set the rules and structure every session starts from.
- Each feature or fix gets a plan in `.harness/plans/`, broken into tasks with acceptance criteria.
- Each task is implemented test first, then verified.
- A separate evaluator, with no write access, reviews the work against the acceptance criteria. It checks that verification passes, that the tests are meaningful, and that nothing is left as a placeholder.
- The workflow runs interactively through the `/harness` skill in `.claude/skills/harness/`, or headless through `.harness/runner.py` and `.harness/evaluator.py`.

I review every change myself before it's committed.
