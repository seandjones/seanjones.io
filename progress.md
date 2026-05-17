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

### Completed
- **ContactForm component** (`src/components/ContactForm.vue`) — replaces placeholder contact CTA
  - Fields: Name, Email, Message with visible labels and `for`/`id` associations
  - Client-side validation: required checks + RFC-simplified email regex; errors shown on blur and on submit
  - Validation runs first — real users always get feedback; spam gates fire after
  - **Honeypot**: `_gotcha` field hidden off-screen with `aria-hidden`, `tabindex="-1"`; silently rejects if filled
  - **Time gate**: `mountedAt` timestamp set in `onMounted`; submissions < 2s after mount are silently dropped
  - Formspree delivery: POSTs JSON to `import.meta.env.VITE_FORMSPREE_ENDPOINT`; shows config error if unset
  - Success / non-200 error / network error / loading states all handled
  - Submit button disabled while in-flight (prevents double-submit)
  - All error colors use `var(--color-error)` token (added to both light and dark themes)
  - Spinner uses `currentColor` — no hardcoded hex
  - Full dark/light theme, responsive, keyboard accessible, ARIA: `role=alert`, `aria-invalid`, `aria-live`
- **Orphaned `.contact-cta` CSS** removed from `App.vue`
- **Vitest added** with `@vue/test-utils` and jsdom
- **15 unit tests** covering all critical logic paths
- Build: type-check ✓, `vite build` ✓, 15/15 tests ✓
- `.env.example` created with Formspree setup instructions

### Pending / Next Steps
- Set `VITE_FORMSPREE_ENDPOINT` in `.env.local` with real Formspree form URL
- Projects section
- Lighthouse audit & performance tuning

---

## 2026-04-12 — AI Engineering skill tile

### Completed
- Added a new **AI Engineering** tile in `src/components/SkillsSection.vue`.
- Preserved the current AI skills list as requested:
  - Prompt Engineering
  - Harness Engineering
  - AI Product Strategy
  - Agentic Workflows
- Added `src/components/__tests__/SkillsSection.spec.ts` with coverage for:
  - AI Engineering tile presence
  - Exact AI skills content and icon rendering
  - Expected set of all skill card titles
  - Existing card/grid structure and accessibility labels
- Verification passes for this change:
  - `npx vitest run src/components/__tests__/SkillsSection.spec.ts`
  - `npm run type-check`
  - `npm run build-only`

### Notes
- A separate pre-existing failure remains in `ContactForm.spec.ts` when running the full test suite under some local env states; this task was validated with scoped tests plus type/build checks.

---

## 2026-04-12 — Profile photo + navbar brand logo

### Completed
- Replaced the hero placeholder avatar with the real profile image from `/public/profile.webp`.
- Updated navbar brand mark to use `/favicon.png` instead of text initials.
- Added focused unit tests:
  - `src/components/__tests__/HeroSection.spec.ts`
  - `src/__tests__/App.spec.ts`
- Verified the task with:
  - `npx vitest run src/components/__tests__/HeroSection.spec.ts src/__tests__/App.spec.ts`
  - `npm run type-check`
  - `npm run build-only`

---

## 2026-04-13 — Cursor follow animation

### Completed
- Added a new cursor follower component at `src/components/CursorFollower.vue`.
- Integrated it into the app shell in `src/App.vue` so the effect is available across sections.
- Implemented pointer tracking with `requestAnimationFrame` and `translate3d(...)` updates for smooth movement.
- Added accessibility and device guards:
  - Disabled for `prefers-reduced-motion: reduce`
  - Disabled for `pointer: coarse`
- Ensured interaction safety with `pointer-events: none` and decorative rendering.
- Added focused tests:
  - `src/components/__tests__/CursorFollower.spec.ts`
  - `src/__tests__/App.spec.ts`
- Verified with:
  - `npx vitest run src/components/__tests__/CursorFollower.spec.ts src/__tests__/App.spec.ts`
  - `npm run type-check`
  - `npm run build-only`

---

## 2026-04-13 — Cursor follower visual tuning

### Completed
- Tuned cursor-follow trail feel by slowing transform transition for a softer follow.
- Increased follower size and glow footprint for slightly larger visual presence.
- Added explicit theme-specific visibility tuning:
  - Light mode is more visible (`background 68%`, `blur 1.5px`, larger glow).
  - Dark mode remains balanced (`background 50%`, `blur 1.3px`, controlled glow).
- Kept interaction safety intact (`pointer-events: none`) and preserved accessibility gating.
- Strengthened style tests to assert concrete declarations and theme-scoped CSS blocks.
- Verified with:
  - `npx vitest run src/components/__tests__/CursorFollower.spec.ts src/__tests__/App.spec.ts`
  - `npm run type-check`
  - `npm run build-only`

---

## 2026-04-13 — Git initialization

### Completed
- Initialized git for the site workspace.
- Confirmed the active/default branch is main.
- Verified repository status is working normally from the workspace root.

---

## 2026-04-13 — GitHub Pages config fix

### Completed
- Fixed the Vite configuration for GitHub Pages deployment.
- Root cause: `base` was incorrectly placed under `resolve.alias`, so assets were built with root paths like `/assets/...`.
- Updated [vite.config.ts](vite.config.ts) to use a top-level `base` setting:
  - production: `/seanjones.io.ai/`
  - development: `/`
- Preserved the `@` alias for source imports.
- Added focused config coverage in [src/__tests__/vite.config.spec.ts](src/__tests__/vite.config.spec.ts).
- Verified the built output now points to:
  - `/seanjones.io.ai/assets/...`
  - `/seanjones.io.ai/favicon.png`
- Verification passed with `npm run build`.

---

## 2026-04-15 — Lighthouse optimization pass

### Completed
- Performed a real production-style Lighthouse audit and optimized the site for viewing quality and load performance.
- Reduced hero image payload dramatically with responsive WebP variants:
  - `public/profile-220.webp`
  - `public/profile-440.webp`
- Updated the hero image to use responsive delivery, explicit dimensions, and high fetch priority for better LCP.
- Limited Vue devtools injection to development only in `vite.config.ts` to keep the production bundle lean.
- Fixed accessibility/SEO issues:
  - removed invalid timeline ARIA role usage
  - improved dark-theme contrast tokens and button readability
  - added canonical, robots, Open Graph, and Twitter metadata
  - added `public/robots.txt` and `public/sitemap.xml`
- Full verification passed:
  - `npm test` → 33/33 passing
  - `npm run build` → passing
- Lighthouse audit result:
  - Performance: 100
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100

---

## 2026-04-15 — Production domain correction

### Completed
- Replaced public-facing references to the workspace folder name with the real production domain `https://seanjones.io`.
- Updated canonical, Open Graph, and Twitter metadata in [index.html](index.html).
- Updated crawler discovery files:
  - [public/robots.txt](public/robots.txt)
  - [public/sitemap.xml](public/sitemap.xml)
- Strengthened metadata tests to ensure stale `seanjones.io.ai` references do not regress.
- Verification passed with the relevant test suite and production build.

---

## 2026-04-12 — Dark mode hero image opacity

## 2026-05-13 — Case studies/projects section (feat-case-studies-section)

### Completed
- Added new `ProjectsSection` component at `src/components/ProjectsSection.vue` with data-driven case study tiles.
- Each tile now includes:
  - image (placeholder asset)
  - title
  - description
  - detail list rendered from array data
- Added placeholder visual asset at `public/project-placeholder.svg`.
- Wired section into the single-page app in `src/App.vue`:
  - new nav anchor: `#projects` (Case Studies)
  - section inserted between Skills and Work History
- Added focused test coverage:
  - `src/components/__tests__/ProjectsSection.spec.ts`
  - updated `src/__tests__/App.spec.ts` to assert `section#projects` is mounted
- Stabilized baseline before feature work by fixing a pre-existing Hero section opacity regression in `src/components/HeroSection.vue`.

### Verification
- `npm run test` ✓ (41/41 passing)
- `npm run build` ✓
- Harness evaluator verdict: PASS

### Notes
- Projects section accepts optional injected `items` data and falls back to default placeholders, which keeps the section route-ready for future extraction.

### Completed
- Added CSS rule to reduce hero image brightness in dark mode:
  - Explicit selector now targets only the hero avatar image in dark theme
  - No page-wide dark-theme opacity effect is applied
- Avatar image is fully opaque (1.0) on light theme, reduced to 0.75 opacity on dark theme
- Updated CSS transition to smooth opacity changes between themes
- Added focused unit test coverage in HeroSection to prevent regressions:
  - Verifies light mode opacity baseline (1.0)
  - Confirms the dark-theme selector targets only the avatar image
  - Guards against a page-wide dark opacity rule being reintroduced
- Verification passes:
  - HeroSection test suite ✓
  - Type-check ✓
  - Build-only ✓

---

## 2026-04-15 — Dark theme opacity regression safeguard

### Completed
- Tightened the dark-mode selector so opacity explicitly applies only to the hero avatar image.
- Added a regression assertion to prevent a page-wide dark-theme opacity rule from returning.
- Verified with the HeroSection test suite and a clean type-check.

---

## 2026-05-13 — Hero case studies link

### Completed
- Added a new hero CTA link to the case studies section (`#projects`) in `src/components/HeroSection.vue`.
- Preserved existing hero links for Skills, Work, and Contact.
- Updated hero CTA test coverage in `src/components/__tests__/HeroSection.spec.ts` to assert the new expected link sequence.
- Stabilized the dark-theme selector regression test to tolerate quote-style differences while preserving rule-scope guarantees.

### Verification
- `npm run test` ✓ (41/41 passing)
- `npm run build` ✓
- Harness evaluator verdict: PASS

---

## 2026-05-14 — Projects modal details interaction

### Completed
- Updated `src/components/ProjectsSection.vue` so project tiles now show only image, title, and description by default.
- Added a `View Case Study` button on each tile that opens a modal with full details for the selected project.
- Removed inline detail lists from the initial grid and moved them into the modal dialog.
- Implemented modal close interactions:
  - close button,
  - overlay click,
  - Escape key.
- Added a minimal grow-in animation for modal open/close.
- Added body scroll lock while modal is active.
- Added a new `check` script in `package.json`:
  - `npm run check` → `npm run test && npm run build`

### Verification
- `npm run check` ✓ (43/43 passing)
- Harness evaluator verdict: PASS

## 2026-05-17 — Impeccable audit remediation pass (all recommended actions)

### Completed
- Implemented modal accessibility hardening in `ProjectsSection`:
  - focus enters modal on open
  - keyboard focus is trapped in the dialog while open
  - focus returns to the trigger when closed
  - Escape and overlay click dismissal preserved
- Added app-level skip navigation for keyboard users:
  - new skip link targeting `#main-content`
- Improved interactive touch targets and keyboard states:
  - nav links increased to 44px minimum touch height
  - theme toggle touch area increased to 44x44 minimum
  - footer social links increased to 44x44
  - consistent `:focus-visible` ring added across nav, modal actions, toggle, footer links, and form inputs
- Tightened token-first theming and removed component-level hardcoded shadow literals:
  - introduced shared tokens in `src/assets/main.scss` for hover/accent/modal/toggle shadows and focus ring
  - switched component hover/modals/button shadows to shared tokens
  - replaced pure black/white accent-on colors with themed values
- Reduced persistent visual effect cost:
  - navbar blur/saturation reduced when scrolled
  - cursor follower glow intensity reduced in both themes
- Clarified Projects section copy to production-ready language (removed placeholder messaging).
- Reduced repetitive grid rhythm in Skills:
  - introduced featured card spans at larger breakpoints for a less uniform layout cadence.
- Updated and expanded tests:
  - added app skip-link assertion
  - added projects modal focus lifecycle regression test
  - updated cursor follower style expectations for tuned glow

### Verification
- `npm run check` ✓
  - tests: 44/44 passing
  - type-check: passing
  - production build: passing

---

## 2026-05-17 — Impeccable bolder pass (brand register)

### Completed
- Executed an explicit `bolder` amplification pass aligned to `PRODUCT.md` (register: brand) and the impeccable brand+bolder references.
- Increased visual commitment and hierarchy contrast in `HeroSection`:
  - added atmospheric accent field behind hero for stronger first-fold identity
  - increased name scale and typographic contrast
  - strengthened primary CTA weight and shadow presence
- Amplified `ProjectsSection` composition and emphasis:
  - stronger desktop heading scale and left-aligned header treatment
  - deeper featured project typography and spacing
  - stronger hover lift for project tiles
- Amplified `SkillsSection` rhythm and surface energy:
  - introduced subtle accent-backed section atmosphere
  - increased heading and skill-card title/summary hierarchy contrast
  - stronger card hover translation for clearer interaction signal
- Removed banned copy/style patterns introduced in earlier iterations:
  - replaced visible em dashes in section copy with compliant punctuation
  - removed side-stripe accent border treatment from current Work History card and replaced with full-border + gradient-surface emphasis
- Updated affected test expectation for renamed project title punctuation.

### Verification
- `npm run check` ✓
  - tests: 44/44 passing
  - type-check: passing
  - production build: passing
