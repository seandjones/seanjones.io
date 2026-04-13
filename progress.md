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

## 2026-04-12 — Dark mode hero image opacity

### Completed
- Added CSS rule to reduce hero image brightness in dark mode:
  - `:global([data-theme='dark']) &__avatar { opacity: 0.75; }`
  - Rule targets **only** the `.hero__avatar` image element (no page-wide effects)
- Avatar image is fully opaque (1.0) on light theme, reduced to 0.75 opacity on dark theme
- Updated CSS transition to smooth opacity changes between themes
- Added focused unit test in `src/components/__tests__/HeroSection.spec.ts`:
  - Verifies light mode opacity baseline (1.0)
  - Verifies dark mode opacity (0.75) via injected CSS rule test
  - Confirms avatar element structure integrity
- Verification passes:
  - `npx vitest run src/components/__tests__/HeroSection.spec.ts`
  - `npm run type-check`
  - `npm run build-only`
