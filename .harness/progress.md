# Progress

## 2026-04-10 — Initial application scaffold

### Completed
- Scaffolded Vue 3 + TypeScript project via `create-vue`
- Added `sass` for SCSS support
- Built full single-page portfolio layout:
  - Fixed navbar with scroll-aware frosted-glass effect and `SJ` brand mark
  - Dark / light mode toggle (persists preference via `localStorage`, respects `prefers-color-scheme`)
  - **HeroSection** — above-the-fold with placeholder avatar, name, Director of Engineering title, bio, and CTA buttons
  - **SkillsSection** — 4 skill cards: Application Management, Frontend Engineering, Extension Development, Backend & APIs — each with skill pills
  - Contact CTA placeholder section
  - Footer with social links
- CSS custom properties for full theme switching with smooth transitions
- Responsive layout (mobile → tablet → desktop)
- SEO meta tags in `index.html`
- Production build passes cleanly (`npm run build` ✓, `vue-tsc` type check ✓)

### Pending / Next Steps
- Replace placeholder avatar with real photo
- Fill in real GitHub / LinkedIn URLs in `App.vue`
- Projects section
- Contact form (real implementation)
- Lighthouse audit & performance tuning

---

## 2026-04-10 — Work history + social links

### Completed
- **WorkHistory component** (`src/components/WorkHistory.vue`) — vertical timeline with 5 job entries (Price.com through Alchemedia internship)
  - Accent-dot + vertical line track; last item's line hidden
  - Cards match existing design tokens (radius, shadow, border, hover lift)
  - `company_link` optional field renders company name as anchor when present
  - Full dark/light theme support via CSS custom properties
  - Responsive (mobile-first, wider padding at 640px+)
  - Semantic HTML (`role="list"`, `aria-label` on contribution lists)
- **Wired into `App.vue`** — inserted between SkillsSection and contact CTA; "Experience" nav link added pointing to `#work`
- **Social link URLs filled in** — GitHub → `github.com/seandjones`, LinkedIn → `linkedin.com/in/sean-jones-301439b0/`
- **TypeScript fix** — added `company_link?: string` to `Job` interface after post-edit type errors
- Build passes: type-check ✓, `vite build` ✓ (238ms)

### Pending / Next Steps
- Replace placeholder avatar with real photo
- Projects section
- Contact form (real implementation)
- Lighthouse audit & performance tuning

---

## 2026-04-11 — Contact form (feat-contact-form)

### Completed — Evaluator: PASS
- **ContactForm component** (`src/components/ContactForm.vue`) — replaces placeholder contact CTA
  - Fields: Name, Email, Message with visible labels and `for`/`id` associations
  - Client-side validation: required checks + RFC-simplified email regex; errors shown on blur and on submit
  - Validation runs first — real users always get feedback; spam gates fire after
  - **Honeypot**: `_gotcha` field hidden off-screen with `aria-hidden`, `tabindex="-1"`; silently rejects if filled
  - **Time gate**: `mountedAt` timestamp set in `onMounted`; submissions < 2s after mount are silently dropped
  - Formspree delivery: POSTs JSON to `import.meta.env.VITE_FORMSPREE_ENDPOINT`; shows config error if unset
  - Success / non-200 error / network error / loading states all handled
  - Submit button disabled while in-flight (prevents double-submit)
  - All error colors use `var(--color-error)` token (added to both light and dark themes in `main.scss`)
  - Spinner uses `color-mix(in srgb, currentColor 35%, transparent)` — no hardcoded hex
  - Full dark/light theme, responsive, keyboard accessible, ARIA: `role=alert`, `aria-invalid`, `aria-live`
- **Orphaned `.contact-cta` CSS** removed from `App.vue`
- **Vitest added** (`vitest`, `@vue/test-utils`, `jsdom`); `vitest.config.ts` added
- **15 unit tests** in `src/components/__tests__/ContactForm.spec.ts`:
  - Validation (8): per-field required, email format, accept valid, all-errors-on-submit, aria-invalid, no-fetch-on-error
  - Spam prevention (2): honeypot rejection, time gate rejection
  - Submission (5): 200 success + fetch call assertion, non-200 error, network error, in-flight disable, missing endpoint
- `npm run type-check` ✓, `npm run build-only` ✓, `npm test` 15/15 ✓
- `.env.example` created with Formspree setup instructions

### Pending / Next Steps
- Set `VITE_FORMSPREE_ENDPOINT` in `.env.local` with real Formspree form URL
- Replace placeholder avatar with real photo
- Projects section
- Lighthouse audit & performance tuning

## 2026-04-12 - feat-ai-engineering-skill-tile: Task 1 - Add AI Engineering card to SkillsSection

- Added an `AI Engineering` tile in `SkillsSection` and kept the current four skills exactly as requested: Prompt Engineering, Harness Engineering, AI Product Strategy, Agentic Workflows.
- Added focused unit coverage in `src/components/__tests__/SkillsSection.spec.ts` for tile presence, exact AI skills content, expected card titles, and card/grid structure checks.
- Verification passed: `npx vitest run src/components/__tests__/SkillsSection.spec.ts`, `npm run type-check`, and `npm run build-only`.
- Evaluator verdict: PASS after strengthening tests to explicitly guard structure/regression expectations.
- Next: continue with portfolio roadmap items (avatar update, projects section, lighthouse tuning).

## 2026-04-12 - feat-profile-photo-and-brand-logo: Task 1 - Wire profile image and navbar favicon logo

- Replaced the hero placeholder avatar artwork with the real profile image from `/profile.webp` and preserved avatar styling hooks.
- Updated the navbar brand mark to render `/favicon.png` as a decorative image instead of text initials.
- Added focused tests in `src/components/__tests__/HeroSection.spec.ts` and `src/__tests__/App.spec.ts` to verify hero image rendering, placeholder removal, and navbar logo attributes.
- Verification passed: `npx vitest run src/components/__tests__/HeroSection.spec.ts src/__tests__/App.spec.ts`, `npm run type-check`, and `npm run build-only`.
- Evaluator verdict: PASS on retry after adding explicit regression assertions for placeholder removal/styling hooks.

## 2026-04-12 - improve-hero-dark-mode-opacity: Task 1 - Add 0.75 opacity to .hero__avatar in dark theme

- Added CSS rule `:global([data-theme='dark']) &__avatar { opacity: 0.75; }` to reduce hero image brightness in dark mode.
- Rule targets **only** the `.hero__avatar` element — no other page elements affected by the opacity reduction.
- Updated transition to include opacity for smooth theme switching: `opacity var(--transition-theme)`
- Added focused test in `src/components/__tests__/HeroSection.spec.ts` that verifies:
  - Light mode avatar opacity = 1 (default)
  - Dark mode avatar opacity = 0.75 via injected CSS rule test
  - Avatar class and structure integrity
- Verification passed: `npx vitest run src/components/__tests__/HeroSection.spec.ts`, `npm run type-check`, and `npm run build-only`.
- Evaluator verdict: PASS with all acceptance criteria met and no issues identified.

## 2026-04-13 - feat-cursor-follow-animation: Task 1 - Implement and mount cursor follower component

- Added `src/components/CursorFollower.vue` with transform-based pointer tracking via `requestAnimationFrame`.
- Gated the feature for accessibility and device fit: disabled when `prefers-reduced-motion` or `pointer: coarse` matches.
- Mounted `CursorFollower` in `src/App.vue` at app-shell level so effect is site-wide while preserving existing sections.
- Added tests in `src/components/__tests__/CursorFollower.spec.ts` for rendering, movement updates, reduced-motion + coarse-pointer disabling, and non-interactive overlay style declarations.
- Strengthened `src/__tests__/App.spec.ts` to assert cursor follower integration with real page sections still rendering.
- Verification passed: `npx vitest run src/components/__tests__/CursorFollower.spec.ts src/__tests__/App.spec.ts`, `npm run type-check`, and `npm run build-only`.
- Evaluator verdict: PASS.

## 2026-04-13 - improve-cursor-visual-tuning: Task 1 - Tune cursor follower size, blur, and theme contrast

- Tuned cursor follower visuals in `src/components/CursorFollower.vue`:
  - Increased size from 18px to 24px.
  - Increased glow/blur footprint and added stronger theme-specific visibility tuning.
  - Slowed transform transition to `0.16s` with easing for a softer trailing feel.
- Added explicit theme blocks for visibility balance:
  - Light mode: stronger visibility (`background 68%`, `blur 1.5px`, larger glow).
  - Dark mode: balanced visibility (`background 50%`, `blur 1.3px`, controlled glow).
- Strengthened tests in `src/components/__tests__/CursorFollower.spec.ts` to assert concrete style declarations and theme-scoped block values.
- Verification passed: `npx vitest run src/components/__tests__/CursorFollower.spec.ts src/__tests__/App.spec.ts`, `npm run type-check`, and `npm run build-only`.
- Evaluator verdict: PASS.

## 2026-04-13 - chore-init-git-main: Task 1 - Initialize repository and set branch to main

- Initialized git in the workspace root and verified the repository is now active.
- Confirmed the current branch name is `main`.
- Verified git status executes successfully in the workspace root.
- Evaluator verdict: PASS.

## 2026-04-13 - fix-github-pages-vite-base: Task 1 - Move Vite base to proper top-level config for GitHub Pages

- Identified the root cause in `vite.config.ts`: `base` was incorrectly placed inside `resolve.alias`, so production builds emitted root-relative asset URLs.
- Fixed the config by moving `base` to the top level and using `/seanjones.io.ai/` for production builds while keeping `/` for local development.
- Preserved the `@` src alias.
- Added `src/__tests__/vite.config.spec.ts` to assert the production base path and ensure `base` is no longer misused as an alias.
- Verified with `npx vitest run src/__tests__/vite.config.spec.ts` and `npm run build`; built output now references `/seanjones.io.ai/assets/...` correctly.
- Evaluator verdict: PASS.

## 2026-04-15 - improve-lighthouse-optimization: Task 1 - Audit and optimize Lighthouse-related quality

- Ran a real local Lighthouse audit against the production preview and established the baseline: Performance 84, Accessibility 96, Best Practices 100, SEO 92.
- Fixed the high-impact issues identified by the audit:
  - optimized the hero image with properly sized 220px and 440px WebP variants and added `srcset`, `sizes`, dimensions, and high fetch priority;
  - limited `vite-plugin-vue-devtools` to development only to avoid unnecessary production overhead;
  - corrected invalid ARIA usage in the work history timeline;
  - improved contrast tokens for dark theme readability and refined button/on-accent colors;
  - added canonical, robots, Open Graph, Twitter metadata, plus `robots.txt` and `sitemap.xml`.
- Added focused verification coverage in `src/__tests__/site-metadata.spec.ts` and tightened config/image assertions in existing tests.
- Verification evidence:
  - `npm test` → 33/33 tests passed
  - `npm run build` → passed
  - Lighthouse final scores → Performance 100, Accessibility 100, Best Practices 100, SEO 100
- Evaluator verdict: PASS.

## 2026-04-15 - fix-production-domain-references: Task 1 - Update public domain references to seanjones.io

- Corrected all public-facing metadata and crawler references to use the real production domain `https://seanjones.io` instead of the workspace folder name.
- Updated `index.html`, `public/robots.txt`, and `public/sitemap.xml`.
- Strengthened `src/__tests__/site-metadata.spec.ts` to validate the correct domain and explicitly reject stale `seanjones.io.ai` references.
- Verification passed: relevant metadata tests succeeded and the production build completed successfully.
- Evaluator verdict: PASS.

## 2026-04-24 - feat-cursor-meteor-trail: Task 1 (revision) - SVG connected stroke meteor trail

- Replaced individual `.cursor-trail` dot divs with a full-screen `<svg>` overlay containing 12 `<line>` segments (`.cursor-trail-segment`).
- Each segment connects consecutive entries in `posHistory` — `x1/y1 = posHistory[i]`, `x2/y2 = posHistory[i+1]` — so the trail is a single connected polyline.
- Opacity tapers from `0.70` (head) to `0.00` (tail); `stroke-width` tapers from `12px` to `0.5px`; `stroke-linecap: round` softens joins.
- Fixed `width: 100%` (not `100vw`) on the SVG overlay to avoid horizontal overflow on scrollbar platforms.
- Added 2 new tests: segment-connectivity (adjacent segments share endpoints) and updated all trail tests to the SVG API.
- Verification: 10/10 tests passed, `npm run type-check` ✓, `npm run build-only` ✓.
- Evaluator verdict: PASS.

## 2026-05-13 - feat-case-studies-section: Task 1 - Build reusable projects section and wire into app

- Implemented `src/components/ProjectsSection.vue` as a data-driven case studies section with project tiles that include image, title, description, and bullet-list details.
- Added placeholder image asset `public/project-placeholder.svg` and placeholder content for all project entries.
- Wired section into `src/App.vue` with a new `#projects` nav anchor and inserted the section into the single-page flow between skills and work history.
- Added and strengthened tests in `src/components/__tests__/ProjectsSection.spec.ts` (structure, accessibility attributes, exact counts, placeholder content, empty-data behavior) and updated `src/__tests__/App.spec.ts` to assert section mount.
- Fixed a pre-existing baseline regression in `src/components/HeroSection.vue` (avatar opacity scoped to dark theme), then re-ran full verification.
- Verification: `npm run test` ✓ (41/41), `npm run build` ✓.
- Evaluator verdict: PASS after one retry cycle (initial FAIL due test quality; resolved by strengthening assertions and adding edge-case coverage).
- What to work on next: decide whether to extract projects data into a standalone content file/API and prepare route split for `/projects`.

## 2026-05-13 - feat-hero-case-studies-link: Task 1 - Add hero link to case studies section

- Updated hero CTA links in `src/components/HeroSection.vue` to include a new primary link to `#projects` labeled "Case Studies".
- Preserved all existing hero CTA anchors (`#skills`, `#work`, `#contact`) and ordering with the new case studies link inserted after skills.
- Updated `src/components/__tests__/HeroSection.spec.ts` CTA assertion to require `['#skills', '#projects', '#work', '#contact']`.
- Hardened dark-theme opacity selector test in `HeroSection.spec.ts` to accept either single-quote or double-quote CSS selector formatting and keep the targeted-selector regression guard stable.
- Verification: `npm run test` ✓ (41/41), `npm run build` ✓.
- Evaluator verdict: PASS.

## 2026-05-14 - feat-project-modal-details: Task 1 - Implement modal-based case study details

- Refactored `src/components/ProjectsSection.vue` so project tiles now render only image, title, and short description on initial load.
- Removed inline detail lists from the grid and added per-tile `View Case Study` buttons to open a details modal.
- Implemented a modal dialog with full case-study details for the selected project, including close button, overlay-dismiss, and Escape-key handling.
- Added minimal grow animation for modal open/close using transition classes and scale transform.
- Added body scroll locking while modal is open and restored scroll on close/unmount.
- Updated `src/components/__tests__/ProjectsSection.spec.ts` with modal-centric behavior checks:
  - tile summary + trigger rendering,
  - selected-project modal content assertions,
  - close interactions (button, overlay, Escape),
  - grow animation style guard.
- Added `check` script to `package.json` (`npm run test && npm run build`) to standardize harness verification.
- Verification: `npm run check` ✓ (43/43 tests, build/type-check passing).
- Evaluator verdict: PASS (after one retry that tightened test specificity and verification command consistency).

## 2026-05-26 - improve-experience-two-block-layout: Task 1 - Split experience into featured and timeline blocks

- Refactored `src/components/WorkHistory.vue` into a dedicated featured current-role block plus a separate earlier-experience timeline.
- Kept all existing role copy, links, and contribution bullets while removing current-role labeling from the timeline.
- Added focused regression coverage in `src/components/__tests__/WorkHistory.spec.ts` for featured-role rendering and timeline-only previous roles.
- Verification: `npm run check` ✓ (48/48 tests, type-check passing, production build passing).
- User decision: approved as-is after implementation and full verification passed.
