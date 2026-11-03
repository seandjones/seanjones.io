# Progress

## 2026-05-19 — Impeccable bolder pass (hero)

### Completed
- Ran required startup validation before editing:
  - `npm install`
  - `npm run check` (tests + type-check + build all passing)
- Loaded impeccable context via loader script and confirmed register as `brand`.
- Applied a bolder hero treatment in `src/components/HeroSection.vue`:
  - Increased hierarchy contrast with stronger display scale and split-line name treatment.
  - Introduced a more committed accent background field and asymmetrical atmospheric shapes.
  - Expanded visual rhythm and scan flow with a new high-signal stamp line.
  - Added concise proof-point rows to improve evidence density without card-grid repetition.
  - Preserved existing image optimization attributes and CTA anchor behavior.

### Verification
- `npm run check` ✓
  - `vitest run`: 44/44 tests passing
  - `vue-tsc --build`: passing
  - `vite build`: passing

## 2026-05-19 — Impeccable bolder pass (projects)

### Completed
- Applied a second bolder pass to `src/components/ProjectsSection.vue` as the next most visible surface.
- Increased section-level visual commitment:
  - stronger atmospheric background layers
  - larger heading hierarchy and tighter typographic contrast
  - asymmetrical tile rhythm on desktop to avoid uniform card cadence
  - sharper borders and CTA treatment for clearer action affordance
- Kept existing structure and behavior intact, including modal accessibility and keyboard interaction.

### Verification
- `npm run check` ✓
  - `vitest run`: 44/44 tests passing
  - `vue-tsc --build`: passing
  - `vite build`: passing

## 2026-05-19 — Impeccable bolder pass (skills + app shell)

### Completed
- Applied bolder visual treatment to `src/components/SkillsSection.vue`:
  - stronger section atmosphere and larger type hierarchy
  - higher contrast card/pill styling
  - asymmetrical desktop rhythm to reduce uniform card-grid feel
- Applied bolder app-shell framing in `src/App.vue`:
  - more intentional navbar weight and contrast
  - ambient global background fields for stronger page identity
  - section reveal choreography with reduced-motion fallback

### Verification
- `npm run check` ✓
  - `vitest run`: 44/44 tests passing
  - `vue-tsc --build`: passing
  - `vite build`: passing

## 2026-05-19 — Impeccable polish pass (hero + skills + projects)

### Completed
- Applied final consistency refinements across `HeroSection`, `SkillsSection`, and `ProjectsSection`:
  - improved heading/body wrap behavior to reduce awkward line breaks
  - refined asymmetrical offsets at desktop breakpoints to reduce collision risk
  - added reduced-motion safeguards for hover and transition-heavy interactions
- Preserved all existing structure, content, and interaction behavior.

### Verification
- `npm run check` ✓
  - `vitest run`: 44/44 tests passing
  - `vue-tsc --build`: passing
  - `vite build`: passing

## 2026-05-19 — QA sweep (micro-copy + consistency)

### Completed
- Performed a targeted QA sweep across hero/skills/projects for terminology, hyphenation, and naming consistency.
- Applied low-risk copy fixes:
  - `ASP.net` → `ASP.NET`
  - `SQLServer` → `SQL Server`
  - `consumer facing` → `consumer-facing`
  - `ecommerce` → `e-commerce` in image alt text
- Kept all layout, structure, and interaction behavior unchanged.

### Verification
- `npm run check` ✓
  - `vitest run`: 44/44 tests passing
  - `vue-tsc --build`: passing
  - `vite build`: passing

## 2026-05-19 — QA sweep (cross-section copy voice)

### Completed
- Harmonized cross-section language and naming consistency:
  - `price.com` → `Price.com` in hero/project narrative copy
  - keyboard shortcut label aligned with nav language (`Go to Experience`)
  - work section heading updated from `Work History` to `Experience` for consistent section voice
- Kept all behavior, structure, and styling unchanged.

### Verification
- `npm run check` ✓
  - `vitest run`: 44/44 tests passing
  - `vue-tsc --build`: passing
  - `vite build`: passing

## 2026-05-19 — QA sweep (subtitle grammar consistency)

### Completed
- Applied one ultra-light subtitle edit so section subheadings read in a consistent declarative voice.
- Updated contact subtitle from a question+imperative structure to declarative copy.

### Verification
- `npm run check` ✓
  - `vitest run`: 44/44 tests passing
  - `vue-tsc --build`: passing
  - `vite build`: passing

## 2026-05-19 — Mobile nav visibility fix

### Completed
- Fixed a regression where tapping the mobile hamburger could leave `#site-nav` invisible.
- Reworked mobile nav open/closed CSS from `display: none/flex` switching to a more reliable state model using:
  - `max-height`
  - `opacity`
  - `visibility`
  - `transform`
- Added a focused regression test in `src/__tests__/App.spec.ts` to verify:
  - hamburger `aria-expanded` toggles correctly
  - `navbar__nav--open` class toggles correctly

### Verification
- `npm run check` ✓
  - `vitest run`: 45/45 tests passing
  - `vue-tsc --build`: passing
  - `vite build`: passing

## 2026-05-19 — Mobile nav layering regression hardening

### Completed
- Addressed resurfaced mobile nav visibility issue caused by global child stacking rule:
  - removed `.app > :not(.skip-link) { position: relative; z-index: 1; }`
- Updated decorative background pseudo-elements on `.app` to stay behind content without global stacking overrides:
  - `.app::before` / `.app::after` now use `z-index: -1`
- Added regression guard in `src/__tests__/App.spec.ts` to prevent reintroduction of the removed selector.

### Verification
- `npm run check` ✓
  - `vitest run`: 46/46 tests passing
  - `vue-tsc --build`: passing
  - `vite build`: passing

### Follow-up
- Added inline code comment in `src/App.vue` near `.app` pseudo-elements documenting the layering rule:
  - decorative fields stay behind content
  - do not reintroduce global child z-index overrides

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

## 2026-05-26 — Experience two-block refactor

### Completed
- Updated `src/components/WorkHistory.vue` to split Experience into two blocks:
  - a featured current-role card for `Director of Engineering` at `Price.com`
  - a separate timeline containing only earlier roles
- Preserved existing role descriptions, links, and contribution bullets.
- Removed timeline current-role labeling to keep the split narrative clean.
- Added `src/components/__tests__/WorkHistory.spec.ts` to cover:
  - featured current-role rendering
  - timeline previous-role composition (no current role in timeline)
  - timeline links and contribution-item rendering

### Verification
- `npm run check` ✓
  - tests: 48/48 passing
  - type-check: passing
  - production build: passing

### Notes
- Finalized as approved-as-is per user decision after implementation and green verification.

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

---

## 2026-07-30 — TaskRiver ventures added to Experience and Case Studies (feat-taskriver-case-studies)

### Completed
- Added TaskRiver.ai and its three product sites to the portfolio as both experience and case study content.
- `src/components/WorkHistory.vue`:
  - Generalized the featured-role block from a single hardcoded `jobs[0]` to a `current` flag, so multiple concurrent present-day roles render as featured cards above the timeline.
  - Added `Founder / TaskRiver.ai` (2026 – Present) as a second current role alongside Director of Engineering at Price.com.
  - New `.work__current` wrapper owns spacing between featured cards; removed the now-conflicting `margin-bottom` from `.featured-role`.
  - Updated the section subheading to cover both the startup and independent product tracks.
- `src/components/ProjectsSection.vue`:
  - Added four case studies: TaskRiver.ai (parent automation platform), WhatContractorsPay.com, The Family Shortlist, and FSMA Radar.
  - Grid grew from 4 to 8 tiles; desktop row rhythm retuned to 12 / 5+7 / 4+4+4 / 7+5 so the three TaskRiver products read as a set and no row is left with an orphan tile.
  - Broadened the section subheading to include independently built automation and data products.
- New case study artwork, each in its own hue family to stay distinguishable from the existing four:
  - `public/project-taskriver.svg` (teal, workflow node graph)
  - `public/project-whatcontractorspay.svg` (steel/amber, pricing table with verified badges)
  - `public/project-family-shortlist.svg` (rose, directory + map + health scores)
  - `public/project-fsma-radar.svg` (olive, weekly digest layout)
- Added `.claude/launch.json` so the dev server can be driven for visual verification.

### Bug fixed along the way
- `.featured-role__badge` ("Current Role") had no CSS rule at all, so it inherited near-black body text and was invisible against the dark-theme card. Measured at 2.3:1. Now a filled pill using the site's existing `--color-accent` / `--color-on-accent` pair, matching primary button treatment.

### Test updates
- `SkillsSection.spec.ts`: card-order assertion updated to match the committed reorder (Backend & APIs first, Application Management fourth). This test was already failing on `main` before this branch.
- `WorkHistory.spec.ts`: added coverage for multiple concurrent current roles and for the TaskRiver card's link, period, and venture list.
- `ProjectsSection.spec.ts`: tile count 4 → 8, added full tile-title ordering assertion and a TaskRiver modal detail test.

### Verification
- `npm run check` ✓
  - tests: 52/52 passing
  - type-check: passing
  - production build: passing
- Desktop grid geometry verified in-browser at 1440px: measured tile widths confirm the 12 / 5+7 / 4+4+4 / 7+5 rhythm across four clean rows.
- Both current-role badges verified rendering as 116×24 accent pills with dark on-accent text.

### Known follow-up (not addressed here)
- The site-wide `--color-accent` / `--color-on-accent` pair measures ~4.15:1 in light theme, below WCAG AA 4.5:1 for small text. This affects primary buttons site-wide, not just the new badge, so it is a global token decision rather than a component fix.

---

## 2026-09-27: Experience copy synced to the engineer résumé (feat-taskriver-case-studies)

### Completed
- `src/components/WorkHistory.vue`:
  - Director of Engineering: description and all four bullets replaced with the résumé versions (ai.price.com frontend, Lighthouse score, 20% load time cut with 10,000+ extension users, CI/CD). Removes "Architected and delivered an LLM-powered platform."
  - TaskRiver.ai: removed "client engagements" from the description.
  - Lead Software Engineer: bullets replaced with the résumé versions.
  - Senior Web Developer: company is now "Marlinco and The Alchemedia Project (now part of Marlin Connections)", with per-company dates (Marlinco Aug 2012 – Feb 2015; The Alchemedia Project Feb 2015 – Nov 2016) in the description slot. Bullets replaced with the four résumé bullets, adding Starbucks Branded Solutions and P&G.
  - IT Programmer and Web Developer Intern: company names match the résumé; each cut to its single résumé bullet, dropping the "hundreds of manual hours weekly", "100% adoption rate" and "100% on-time delivery" claims.
- `src/components/SkillsSection.vue`: extension summary says 10,000+ users instead of millions; Application Management summary and "Team Leadership" tag reworded to sole technical lead / Technical Leadership.
- `src/components/HeroSection.vue`: stamp and "Scaled teams" proof item reworded to sole technical lead.

### Test updates
- `WorkHistory.spec.ts`: added coverage for the résumé Director bullets (and absence of "LLM-powered") and for the Marlin company name, period, and per-company dates.

### Verification
- `npm run check` ✓
  - tests: 54/54 passing
  - type-check: passing
  - production build: passing
- Checked in-browser at desktop and 375px: new copy renders, no horizontal overflow, no console errors.

### Known follow-up (not addressed here)
- Case studies in `ProjectsSection.vue` still cite figures that are not on the résumé (3× deployment frequency, ~40% time-to-feature, 35% session duration, 28% conversion, 45% order volume, P&G 5× / 100% adoption).

---

## 2026-09-27: Case study figures synced to the résumé (feat-taskriver-case-studies)

### Completed
- `src/components/ProjectsSection.vue`:
  - Price.com platform: "thousands of users" is now 590,000 monthly active users. Impact line now cites the résumé figures (Lighthouse score quadrupled, load times cut 20%, deployment time cut 25%) in place of 3× deployment frequency, ~40% time-to-feature, and the "18 months later" claim.
  - ai.price.com: Impact line is now the résumé's 15% click-through lift on AI-driven recommendations. Dropped the 35% session duration and 28% conversion figures and the "agentic UI pattern" claim.
  - Starbucks: Impact line removed; the résumé has no Starbucks figures.
  - P&G: "4+ hours per rep" is now "a multi-hour manual process"; Impact is now "hours to minutes". Dropped 5×, under 20 minutes, 100% adoption within two months, and "capacity increased materially".
- Resolves the case-study follow-up from the previous entry.

### Test updates
- `ProjectsSection.spec.ts`: opens every case study modal and asserts the only figures in the copy are 590,000, 20%, 25% and 15%.

### Verification
- `npm run check` ✓
  - tests: 55/55 passing
  - type-check: passing
  - production build: passing
- Starbucks modal checked in-browser with two details; no console errors.

---

## 2026-09-27: TaskRiver moved from Experience to Case Studies (feat-taskriver-to-projects)

### Completed
- `src/components/WorkHistory.vue`: removed the "Founder, TaskRiver.ai" current-role card, so Price.com is the only current role, matching the résumé, which lists TaskRiver as a personal project. Restored the pre-TaskRiver Experience subheading. The multi-current-role rendering stays in place and works with one role.
- `src/components/ProjectsSection.vue`: the TaskRiver case study now describes a product, not client work. The new description lists what it covers; the Solution line uses the résumé's wording (AI handling routine replies inside owner-approved rules); new Stack and Status lines. Removed "deployed as custom systems per client", the engagement-based Approach line, and the unbacked revenue/hours Impact claim.
- WhatContractorsPay.com, The Family Shortlist and FSMA Radar keep their existing case study tiles; they are no longer listed as TaskRiver ventures in Experience.

### Test updates
- `WorkHistory.spec.ts`: two TaskRiver-role tests replaced with one asserting Price.com is the only current role and TaskRiver/Founder do not appear in Experience.
- `ProjectsSection.spec.ts`: TaskRiver modal test now checks the product framing and fails on "client" or "engagement".

### Verification
- `npm run check` ✓
  - tests: 54/54 passing
  - type-check: passing
  - production build: passing
- Checked in-browser: Experience shows one current role with the restored subheading; TaskRiver tile and modal show the new copy.

---

## 2026-10-08: Résumé download at /resume.pdf (feat-resume-pdf)

### Completed
- `public/resume.pdf`: the current engineer résumé, served at https://seanjones.io/resume.pdf for sending to recruiters and hiring managers.
- Nothing on the site links to it; it is shared by direct link only.
- `public/robots.txt`: `Disallow: /resume.pdf` so search engines don't index it, since it carries the phone number and email that the site otherwise keeps behind the contact form. It is not added to the sitemap.
- To update it later, replace `public/resume.pdf` and redeploy.

### Test updates
- `site-metadata.spec.ts`: checks that `public/resume.pdf` is a PDF, robots.txt disallows it, and the sitemap doesn't list it.

### Verification
- `npm run check` ✓
  - tests: 55/55 passing
  - type-check: passing
  - production build: passing
- `dist/resume.pdf` is byte-identical to the source file.

---

## 2026-10-19: Price.com copy and résumé download updated to the new résumé (feat-price-redesign-copy)

### Completed
- `public/resume.pdf`: replaced with the current engineer résumé.
- `src/components/WorkHistory.vue`:
  - Director of Engineering: new description (adds 10,000+ extension users and "write code throughout") and five résumé bullets covering ai.price.com streaming, the redesign (about 90 Cotton components, about 70 Stimulus controllers), the Django rebuild (about 1,540 pytest tests), the Lighthouse/load-time work, and the CI/CD replacement for manual deploys.
  - Lead Software Engineer: extension rewrite bullet now describes the before state and the component-based Angular app; dropped the "Led frontend architecture... small, distributed remote team" bullet, which is no longer on the résumé.
- `src/components/ProjectsSection.vue`:
  - Price.com platform case study rewritten from the résumé: Problem, Frontend, Backend, Extensions, Delivery and Impact lines. Removes the unsupported "shared component library" and "GitHub Flow" claims. Load time cut is now sitewide, not "across the web app and browser extensions".
  - ai.price.com case study: description and Solution now use the résumé wording (Gemini-powered; streamed model responses over WebSockets). Removes "FastAPI" from the frontend stack and the "decision paralysis" line. Challenge line left as it was.
- `src/components/SkillsSection.vue`: added pytest (Backend & APIs) and Stimulus, Lightning CSS, stylelint (Frontend Engineering).

### Test updates
- `WorkHistory.spec.ts`: Director bullet count 4 → 5; timeline bullet count 9 → 8.
- `ProjectsSection.spec.ts`: ai.price.com modal now expects "Gemini-powered"; résumé-backed figure list now includes 10,000+, 90, 70 and 1,540.

### Verification
- `npm run check` ✓
  - tests: 55/55 passing
  - type-check: passing
  - production build: passing
- Checked in-browser: /resume.pdf serves the new file as application/pdf; Director card, platform case study modal, and Skills render correctly; no em dashes on the page; no console errors.

---

## 2026-10-20: Résumé refresh, Skills synced to the résumé (feat-resume-ai-skills)

### Completed
- `public/resume.pdf`: replaced with the latest engineer résumé. The only text change from the previous version is the AI skills line, which adds "AI-assisted development (Claude Code)".
- `src/components/SkillsSection.vue`:
  - AI Engineering card now matches the résumé's AI line: LLM Integration (Gemini, Claude), RAG, Real-Time LLM Output (WebSockets), Prompt Engineering, AI-Assisted Development (Claude Code). Removed Harness Engineering, AI Product Strategy and Agentic Workflows, and replaced the "since before it was a job title" summary with "From streaming Gemini responses on ai.price.com to a RAG application on Claude."
  - Added the remaining résumé skills to existing cards: ASP.NET (Backend & APIs); Next.js, Astro, Vitest (Frontend Engineering); AWS (EC2, S3, CloudFront), GitHub Actions, Docker, Vercel (Application Management, next to Deployment Pipelines).
- `src/components/ProjectsSection.vue`: The Family Shortlist is live, so its description, Solution and Status lines no longer say it's in progress.

### Test updates
- `SkillsSection.spec.ts`: AI Engineering pill list updated to the résumé set.

### Verification
- `npm run check` ✓
  - tests: 55/55 passing
  - type-check: passing
  - production build: passing
- Checked in-browser at 375px: no skill pill overflows its card, no horizontal page scroll; /resume.pdf serves the new 45,357-byte file.

### Known follow-up (not addressed here)
- The résumé's RAG Application on Claude, VetSalary (vetsalary.org) and recipesfortheweek.com have no case studies on the site.

---

## 2026-11-02: Lead résumé replaces the Engineer version (feat-lead-resume)

### Completed
- `public/resume.pdf`: now the Lead version of the résumé (`Resume - CURRENT/Lead`). The Engineer version is no longer on the site.
- `src/components/WorkHistory.vue`: Director of Engineering matches the Lead résumé. The description drops the extension user count; bullets are in the résumé's new order and add the EC2 to ECS move with smoke tests, the FastAPI routing work on ai.price.com, and a new bullet on overseeing the outside firm that now builds the extensions.
- `src/components/HeroSection.vue`: bio now uses the Lead résumé's summary framing (engineering lead, works directly with the CEO and executive team, hands-on in the code).
- `src/components/HeroSection.vue`: "sole technical lead" removed from the photo stamp (now "Shipping measurable outcomes") and the second highlight (now "Hands-on across product, platform, and AI delivery"), so the bio is the only place in the hero that says it.
- `src/components/ProjectsSection.vue`:
  - Price.com platform: description no longer calls him sole technical lead for the extensions; Extensions line now says he oversees the outside firm that builds them; Delivery line adds the ECS move and smoke tests.
  - ai.price.com: Solution line adds the FastAPI routing and smaller backend changes.
- `src/components/SkillsSection.vue`: AWS tag now includes ECS.

### Test updates
- `WorkHistory.spec.ts`: Director bullet count 5 → 6, first bullet is the Django rebuild, and the outside-firm bullet is present.
- `ProjectsSection.spec.ts`: 10,000+ dropped from the figure list, since the platform case study description no longer cites it.

### Verification
- `npm run check` ✓
  - tests: 55/55 passing
  - type-check: passing
  - production build: passing
- Checked in-browser at desktop and 375px: hero bio fits, no horizontal scroll, Director card shows six bullets, /resume.pdf serves the new 45,525-byte file, no console errors.

### Notes
- The four tracked `dist/` files (index.html, favicon.ico, favicon.png, profile.webp) were already staged for removal from the repo before this work started; they carried over onto this branch untouched.

## 2026-11-03: System Map redesign (full site)

### Context
- Impeccable audit scored the site 12/20 and the critique 23/36: proof buried behind claims, generic dark dev-portfolio visuals, no email on the contact ending, modals ignored dark mode.
- Sean chose a full redesign in the "System Map" direction (the Price.com platform drawn as a transit map), positioning as a hands-on lead, open to conversations. Copy deck `docs/redesign-copy.md` approved by Sean before the build.

### Completed
- New single-page structure: system map (first viewport), Work, Experience, Independent projects, Contact.
- `src/content/site.ts`: all copy in one module. Every map station links to a real anchor (case study part or role).
- `src/components/SystemMap.vue`: SVG map with five lines, stations and interchanges as links, hover/focus line highlighting, one-time line draw-in (skipped under reduced motion); strip maps below 960px; signage panel with Get in touch and See the work; results legend.
- `WorkSection.vue`: case studies as page sections with their own anchors and a copy-link control (no modal). Problem / What I did / Result.
- `ExperienceLine.vue`: career as a line diagram, Price.com roles joined as an interchange; Stack as one line.
- `ProjectsBranch.vue`: independent projects on a dashed branch line with live links and "How it works" disclosure.
- `ContactForm.vue`: hello@seanjones.io and LinkedIn beside the form, approved copy for every state, failures name the email, focus moves to the first error.
- `App.vue`: theme set on `<html>` (inline script in `index.html` prevents a flash), native `<dialog>` for keyboard help, shortcuts remapped to w/e/p/c/t/?.
- Self-hosted Overpass via `@fontsource-variable/overpass`.
- Fresh screenshots captured 2026-11-03 and approved by Sean in `public/work/` (720w and 1200w WebP, origin embedded).
- Removed: HeroSection, SkillsSection, ProjectsSection, WorkHistory, CursorFollower and their tests.

### Tests
- New: `SystemMap.spec.ts` (station anchors resolve, legend figures, single h1), `Sections.spec.ts`, rewritten `App.spec.ts`; `ContactForm.spec.ts` updated to approved copy.
- `npm run check`: 39/39 tests, type-check and build passing.

### Still open
- Harden step: keyboard shortcuts need a modifier or off switch (WCAG 2.1.4); stale `.impeccable/critique/ignore.md` entry; unused old assets in `public/`.
- DESIGN.md to be rewritten from the built system.

## 2026-11-03: Harden pass (after the System Map build)

### Completed
- Keyboard shortcuts (WCAG 2.1.4): the help dialog has a "Use single-key shortcuts" switch, on by default and remembered in localStorage (`sj-shortcuts`). A footer "Keyboard shortcuts" button opens the dialog without a key press.
- Deep links: shared links such as `/#work-ai-price` now scroll to their target after the app renders (the browser's own jump fires before the content exists).
- Contact form: maxlength 100 / 254 / 5000 with a visible message hint; requests abort after 15 seconds and show the network message with the email; an in-flight request is aborted on unmount; focus moves to the success heading.
- Timers cleared on unmount in SystemMap and WorkSection.
- `index.html`: `<noscript>` fallback with name, role, email and LinkedIn; the inline theme script also sets `theme-color` before first paint.
- Focus ring and text selection moved from the Frontend line blue to ink, so line colours only mean lines. DESIGN.md and `.impeccable/design.json` updated to match.
- Removed unused assets: two old screenshots, `starbucksbrandedsolutions.jpg`, `profile.webp`, nine `project-*.svg`, `src/assets/logo.svg`. Cleared the stale entry in `.impeccable/critique/ignore.md`.
- Brand name in the header no longer wraps at 200% zoom.
- Copy deck updated with every new string.

### Tests
- `npm run check`: 44/44 tests, type-check and build passing. New tests cover the shortcut off switch, footer entry, deep-link scroll, field limits and the request timeout.

### Not covered (out of scope for this site)
- RTL and translation: the site is English only (`lang="en"`).
- Server-side validation and rate limiting belong to Formspree.

## 2026-11-03: Polish pass

### Checked
- Desktop 1440, 1024, 768 and mobile 390, light and night map; keyboard help dialog; 200% zoom (720px).
- Console: no errors or warnings. Broken images: none. Horizontal overflow: 0px. Layout shift: 0.001.
- `oxlint` and `eslint`: clean.

### Fixed
- Nav now marks the section you are in (`aria-current="location"`, underlined), and clears it when you scroll back above the sections.
- Map station labels render larger below 1200px so they stay readable (about 13px or more on screen) when the map scales down.
- The 590k legend entry uses a hollow station-tick key, since "whole system" is not a line and should not borrow the Leadership ink.
- Senior Web Developer sub-line: proper spacing around the middle dot.
- Removed the unused `.bullet--system` style.

### Tests
- `npm run check`: 44/44 tests, type-check and build passing.

## 2026-11-03: Starbucks image and map hit areas

### Completed
- Starbucks Branded Solutions case study now has a screenshot supplied by Sean (`public/work/starbucks-720.webp`, `starbucks-1200.webp`), cropped to 16:10 from the top, origin recorded.
- Map station click areas: fixed-width hit boxes overlapped their neighbours (the "Deploy time −25%" terminus covered half of "EC2 to ECS", so hovering "to ECS" highlighted the wrong station). Hit areas are now built from each label's measured box plus its tick, re-measured after the font loads and at the 1200px label-size breakpoint.

### Verification
- In Chrome at 1440, 1200, 1024 and 960px: 19 stations, zero overlapping hit areas; both halves of the "EC2 to ECS" label hit that station.
- `npm run check`: 44/44 tests, type-check and build passing.

## 2026-11-03: Distill pass (final critique P1)

### Completed
- Experience no longer repeats the case studies. Director of Engineering keeps its scope line and one bullet with the facts found only here (roadmap work with the CEO and executive team; oversight of the extension firm, 10,000+ users, store releases), then links to the Price.com platform and ai.price.com case studies.
- Senior Web Developer drops the two bullets that repeated the Starbucks and P&G case studies, keeps the client-revenue and deployment-rate bullets, and links to both case studies.
- New `seeAlso` field on roles; copy deck updated.

### Effect
- Page height: about 8,410 to 8,000px at 1440, and about 14,640 to 13,450px at 390.

### Tests
- `npm run check`: 45/45 tests (new: Experience links to the case studies and no longer contains the repeated deploy story), type-check and build passing.

## 2026-11-03: Clarify pass (final critique P2: contact and the Lighthouse figure)

### Completed
- Hero results legend leads with "−20% sitewide load time" instead of "4× Lighthouse performance score" (a bare 64 sits in Lighthouse's "needs improvement" band; Sean preferred leading with load time if so).
- The verified scores Sean supplied (16 to 64 on PageSpeed Insights) now appear where there is context: the Frontend terminus station ("Lighthouse 16 → 64, load time −20%") and the Price.com case study result.
- Contact: "Remote, or hybrid in the Denver area." and "I usually reply within a day." under the opening line.
- Copy deck updated.

### Verification
- Map hit areas re-checked in Chrome at 1440 and 1024: 19 stations, no overlaps.
- `npm run check`: 46/46 tests, type-check and build passing.

## 2026-11-03: Keyboard path (final critique P2)

### Completed
- Map: one tab stop per line (roving tabindex). Arrow left/right move along a line, up/down jump to the nearest other station on the next line, Home/End go to a line's ends. Interchanges belong to both of their lines. The focused line is highlighted and the others dim, as on hover.
- Phone strip maps: one tab stop per strip, up/down arrows inside it.
- Hint "Tab moves between lines. Arrow keys move between stations." appears while the map has focus and is the map's accessible description.
- Second skip link: "Skip to the work".
- Shortcuts now run while a link or button has focus; they stay off in form fields and the dialog.
- Focus listeners moved from the SVG to the surrounding figure: Chromium makes any SVG element with a focus listener tabbable, which had added the svg and each line group to the tab order.

### Verification
- Real key presses in Chrome at 1440: 5 Tabs cross the map (one per line), the sixth reaches Work (was 20+). At 720px: 5 Tabs across the strips.
- `npm run check`: 53/53 tests, type-check and build passing; oxlint clean.

## 2026-11-03: Layout pass (final critique P3: first viewport on short laptops)

### Problem
- The hero needed about 820 to 870px of height whatever the screen, because the map's height came only from its width. "Get in touch" fell below the fold on 1366x768 and 1280x720.

### Completed
- Map max-height is now `max(16rem, calc(100svh - 25rem))`, so it gives up height on short screens; `preserveAspectRatio="xMinYMid meet"` keeps it left-aligned with the panel.
- Map labels use the larger label size below 820px tall as well as below 1200px wide, and hit areas re-measure on either change.
- Name panel padding tightens slightly on desktop screens under 820px tall.
- DESIGN.md and the sidecar updated with the new map height rule.

### Verification (Chrome, measured)
- CTA bottom inside the viewport at 1280x720 (704), 1366x768 (754), 1024x768 (710), 1280x800, 1440x900, 1536x864, 1920x1080.
- No overlapping station hit areas at 1366x768 and 1280x720.
- Layout-scoped detector: 0 findings on source and at 1366x768, 1280x720, 390x844.
- `npm run check`: 53/53 tests, type-check and build passing.

## 2026-11-03: Final polish (critique minor items)

### Completed
- Projects section heading is now "Projects" to match the nav; the intro reads "Independent products I've built and run on my own time."
- Starbucks case study has a Result, taken from Sean's existing copy: "Launched and used by businesses across the US to order custom coffee and products."
- Price.com and ai.price.com case studies link to the live products ("Visit price.com", "Visit ai.price.com"), ahead of Copy link.
- Theme switch keeps a visible label on phones ("Night"), with a stable accessible name of "Night map".
- Copy deck updated.

### Verification
- Phone headers fit at 390 and 360px. Console: no errors; no horizontal overflow.
- `npm run check`: 56/56 tests, type-check and build passing; oxlint clean.

## 2026-11-03: Distill Work (re-critique P1)

### Completed
- Each case study now leads with its Result (always visible, set at title size) and keeps Problem and What I did behind a "Full case study" disclosure.
- Starbucks and P&G moved to an "Earlier work, 2012–2016" group with a compact row layout.
- The four "Copy link to this case study" text buttons became one drawn link icon beside each title (accessible name "Copy link to {title}"); "Link copied" is shown and announced without reflowing the title row.
- Map stations that point into Problem or What I did open the disclosure first and then scroll (hashchange handler in App.vue, plus the existing nav and initial-hash paths).
- Shared `.disclosure` style with a drawn chevron in main.scss; the Projects "How it works" disclosure uses it too, which restores its marker.
- Copy deck Work section rewritten to match the build (the old card and modal strings are gone).

### Effect
- Page height: about 8,000 to 7,344px at 1440, and about 13,450 to 11,821px at 390.

### Verification
- A real mouse click on the "About 90 Cotton components" station in Chrome opened the Price.com disclosure and scrolled to the Frontend paragraph.
- `npm run check`: 60/60 tests, type-check and build passing; oxlint clean.

## 2026-11-03: Positioning on the first screen (re-critique P1)

### Completed
- Name panel: "Open to Staff, Principal and engineering-lead roles. Remote, or hybrid in the Denver area." (bold, above the actions; wording chosen by Sean).
- Contact: the opening line now reads "Open to conversations about Staff, Principal and engineering-lead roles." and is bold, matching the facts below it.
- Map caption: "Each line is a workstream I own; each station links to the result behind it."
- No-JS fallback mentions the same roles and location.
- To keep the actions in the first viewport with the taller panel: map height reserve 25rem to 28.5rem, panel padding tightens below 920px tall, slightly tighter spacing above the actions. A trial 18px label size on short screens caused a label overlap and was reverted.
- Copy deck, DESIGN.md and sidecar updated.

### Verification (Chrome, measured)
- CTA bottom inside the viewport at 1280x720 (696), 1366x768 (745), 1024x768, 1280x800, 1440x900 (877), 1536x864, 1920x1080, 390x844 (481), 360x740.
- No overlapping station hit areas at 1280x720, 1366x768, 1024x768, 1440x900.
- `npm run check`: 63/63 tests, type-check and build passing; oxlint clean.

## 2026-11-03: Map interaction fixes (re-critique P2)

### Completed
- Interchanges stay lit when either of their lines is highlighted (hover or keyboard); before, every interchange dimmed.
- The keyboard hint no longer shifts the page. On desktop it takes the caption's line while the map has focus; on strip maps it has a reserved line. A first attempt placed it in the map's top-left corner, but it covered AI station labels on short screens, so it moved to the caption line.
- On an interchange, Up/Down switch to its other line without moving focus (the line highlight follows), and Left/Right then travel that line. Before, ArrowDown on Extension releases jumped to the far Leadership terminus.

### Verification (Chrome)
- Hovering Platform: Redesign interchange opacity 1, Extension releases interchange and other lines 0.16.
- Sign panel top identical before and after keyboard focus at 1440x900 (575) and 1280x720 (395); hint box equals the caption box and sits below the map.
- Keys: Extensions → interchange → Down (stays, Leadership active) → Right lands on "Sole technical lead since 2022".
- `npm run check`: 64/64 tests, type-check and build passing; oxlint clean.

## 2026-11-03: Results legend (re-critique P2)

### Completed
- Legend trimmed to three results, each labelled with its line by name using the shared line bullets: Frontend −20% sitewide load time, Platform −25% deployment time, AI +15% click-through on AI recommendations.
- Removed the 590k row: it repeated the one line directly above it, and its hollow key read as an empty checkbox. The `legend__key` styles and the `'system'` result type are gone.
- Phones: the legend is three compact rows instead of a 2×2 grid (fixes the misaligned stat labels); the reserved hint line under the caption is tighter.
- Copy deck, DESIGN.md and sidecar updated.

### Verification
- CTA bottom inside the first viewport at 1280x720, 1366x768, 1440x900, 390x844, 360x740.
- `npm run check`: 64/64 tests, type-check and build passing; oxlint clean.

## 2026-11-03: Final polish (re-critique P3 and minor items)

### Completed
- Experience "Case studies:" links are inline text links with the comma kept with its link, so a line can no longer start with ", ai.price.com" on phones.
- Strip-map interchange stops get extra vertical space so they no longer crowd the station above.
- Signage panel colours moved to `--sign-bg`, `--sign-fg` and `--sign-border`: solid ink by day (unchanged); on the night map a dark panel with a light 2px outline instead of a bright slab.
- Career stops at the same company as the role above carry a screen-reader note ("Same company as the role above.").
- DESIGN.md and sidecar: Projects heading name, night signage panel.

### Verification
- CTA bottom inside the first viewport at 1280x720 (698), 1366x768, 1440x900, 390x844, 360x740.
- Console: no errors; no horizontal overflow; CLS effectively zero.
- `npm run check`: 65/65 tests, type-check and build passing; oxlint and eslint clean.
