<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="#work" class="skip-link">Skip to the work</a>

  <header class="masthead" :class="{ 'masthead--open': mobileNavOpen }">
    <div class="masthead__inner">
      <a href="#" class="masthead__brand" aria-label="Sean Jones, back to top" @click="goTop">
        <img class="masthead__mark" src="/favicon.png" alt="" aria-hidden="true" width="28" height="28" />
        <span class="masthead__name">Sean Jones</span>
      </a>

      <button
        type="button"
        class="masthead__menu"
        :aria-expanded="mobileNavOpen"
        aria-controls="site-nav"
        @click="mobileNavOpen = !mobileNavOpen"
      >
        {{ mobileNavOpen ? 'Close' : 'Menu' }}
      </button>

      <nav id="site-nav" class="masthead__nav" :class="{ 'masthead__nav--open': mobileNavOpen }" aria-label="Site">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="masthead__link"
          :aria-current="activeSection === item.href ? 'location' : undefined"
          @click="onNav($event, item.href)"
        >
          {{ item.label }}
        </a>
      </nav>

      <ThemeToggle :is-dark="theme === 'dark'" @toggle="toggleTheme" />
    </div>
  </header>

  <main id="main-content" tabindex="-1">
    <SystemMap />
    <WorkSection />
    <ExperienceLine />
    <ProjectsBranch />
    <ContactForm />
  </main>

  <footer class="footer">
    <div class="footer__inner">
      <p>&copy; {{ currentYear }} Sean Jones</p>
      <div class="footer__links">
        <button type="button" class="footer__shortcuts" @click="openHelp">Keyboard shortcuts</button>
        <a :href="profile.github" target="_blank" rel="noopener noreferrer" aria-label="Sean Jones on GitHub (opens in a new tab)">GitHub</a>
        <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="Sean Jones on LinkedIn (opens in a new tab)">LinkedIn</a>
      </div>
    </div>
  </footer>

  <dialog ref="helpDialog" class="help" aria-labelledby="help-title" @close="onHelpClosed" @click="onDialogClick">
    <div class="help__panel">
      <h2 id="help-title" class="t-title">Keyboard shortcuts</h2>
      <label class="help__toggle">
        <input v-model="shortcutsOn" type="checkbox" class="help__check" />
        <span>
          <span class="help__toggle-label">Use single-key shortcuts</span>
          <span class="help__hint">Turn these off if you use speech input or the keys get in the way.</span>
        </span>
      </label>
      <dl class="help__list" :class="{ 'help__list--off': !shortcutsOn }">
        <div v-for="s in shortcuts" :key="s.key"><dt><kbd>{{ s.key }}</kbd></dt><dd>{{ s.label }}</dd></div>
      </dl>
      <form method="dialog"><button class="btn btn--outline help__close">Close</button></form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import ThemeToggle from './components/ThemeToggle.vue'
import SystemMap from './components/SystemMap.vue'
import WorkSection from './components/WorkSection.vue'
import ExperienceLine from './components/ExperienceLine.vue'
import ProjectsBranch from './components/ProjectsBranch.vue'
import ContactForm from './components/ContactForm.vue'
import { profile } from './content/site'

const nav = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

// ─── Theme (set on <html> so teleported and top-layer UI follow it) ─────────

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'sj-theme'

function readTheme(): Theme {
  const attr = document.documentElement.dataset.theme
  if (attr === 'dark' || attr === 'light') return attr
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref<Theme>(readTheme())

function applyTheme(value: Theme) {
  document.documentElement.dataset.theme = value
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'dark' ? '#0f1114' : '#ffffff')
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
  try {
    localStorage.setItem(STORAGE_KEY, theme.value)
  } catch {
    /* storage unavailable */
  }
}

// ─── Navigation ──────────────────────────────────────────────────────────────

const mobileNavOpen = ref(false)

// "You are here": mark the nav link for the section crossing the upper third of the viewport.
const activeSection = ref<string | null>(null)
let sectionObserver: IntersectionObserver | null = null

function watchSections() {
  if (typeof IntersectionObserver === 'undefined') return
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = `#${entry.target.id}`
        if (entry.isIntersecting) activeSection.value = id
        else if (activeSection.value === id) activeSection.value = null
      }
    },
    { rootMargin: '-30% 0px -65% 0px' },
  )
  for (const item of nav) {
    const el = document.querySelector(item.href)
    if (el) sectionObserver.observe(el)
  }
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/** A link may point inside a closed disclosure (a station into "Full case study"); open it first. */
function revealTarget(target: Element) {
  let details = target.closest('details')
  while (details) {
    details.open = true
    details = details.parentElement?.closest('details') ?? null
  }
}

function onHashChange() {
  const hash = window.location.hash
  if (!hash || hash.length < 2) return
  let target: Element | null = null
  try {
    target = document.querySelector(hash)
  } catch {
    return
  }
  if (!target || !target.closest('details:not([open])')) return
  revealTarget(target)
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start' })
}

function scrollToTarget(selector: string) {
  const target = document.querySelector<HTMLElement>(selector)
  if (!target) return
  revealTarget(target)
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start' })
  history.replaceState(null, '', selector)
}

function onNav(event: MouseEvent, href: string) {
  event.preventDefault()
  mobileNavOpen.value = false
  scrollToTarget(href)
}

function goTop(event: MouseEvent) {
  event.preventDefault()
  mobileNavOpen.value = false
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' })
  history.replaceState(null, '', window.location.pathname)
}

// ─── Keyboard shortcuts ──────────────────────────────────────────────────────

const shortcuts = [
  { key: 'w', label: 'Work', target: '#work' },
  { key: 'e', label: 'Experience', target: '#experience' },
  { key: 'p', label: 'Projects', target: '#projects' },
  { key: 'c', label: 'Contact', target: '#contact' },
  { key: 't', label: 'Back to top', target: 'top' },
  { key: '?', label: 'Show this help', target: 'help' },
]

const SHORTCUTS_KEY = 'sj-shortcuts'

function readShortcutsOn(): boolean {
  try {
    return localStorage.getItem(SHORTCUTS_KEY) !== 'off'
  } catch {
    return true
  }
}

const shortcutsOn = ref(readShortcutsOn())

watch(shortcutsOn, (on) => {
  try {
    localStorage.setItem(SHORTCUTS_KEY, on ? 'on' : 'off')
  } catch {
    /* storage unavailable */
  }
})

const helpDialog = ref<HTMLDialogElement | null>(null)
let helpTrigger: HTMLElement | null = null

function openHelp() {
  helpTrigger = document.activeElement as HTMLElement | null
  helpDialog.value?.showModal?.()
}

function onHelpClosed() {
  helpTrigger?.focus()
}

function onDialogClick(event: MouseEvent) {
  if (event.target === helpDialog.value) helpDialog.value?.close()
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  // Letters still work while a link or button has focus; only text entry and the dialog opt out.
  return target.closest('input, textarea, select, dialog, [contenteditable="true"]') !== null
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && mobileNavOpen.value) {
    mobileNavOpen.value = false
    return
  }
  if (!shortcutsOn.value) return
  if (event.metaKey || event.ctrlKey || event.altKey) return
  if (isTypingTarget(event.target)) return

  const shortcut = shortcuts.find((s) => s.key === event.key.toLowerCase() || s.key === event.key)
  if (!shortcut) return
  event.preventDefault()

  if (shortcut.target === 'help') openHelp()
  else if (shortcut.target === 'top') window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' })
  else scrollToTarget(shortcut.target)
}

// Shared links (for example /#work-ai-price) arrive before the app renders,
// so the browser's own jump finds nothing. Scroll once the target exists.
async function scrollToInitialHash() {
  const hash = window.location.hash
  if (!hash || hash.length < 2) return
  await nextTick()
  let target: Element | null = null
  try {
    target = document.querySelector(hash)
  } catch {
    return // not a valid selector
  }
  if (!target) return
  revealTarget(target)
  target.scrollIntoView({ block: 'start' })
}

onMounted(() => {
  applyTheme(theme.value)
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('hashchange', onHashChange)
  scrollToInitialHash()
  watchSections()
})

onUnmounted(() => {
  sectionObserver?.disconnect()
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('hashchange', onHashChange)
})

const currentYear = new Date().getFullYear()
</script>

<style lang="scss">
@use './assets/main.scss';

.skip-link {
  position: fixed;
  left: 0.75rem;
  top: 0.5rem;
  z-index: 200;
  padding: 0.6rem 0.9rem 0.45rem;
  background: var(--ink);
  color: var(--on-ink);
  font-weight: 700;
  transform: translateY(-160%);

  &:focus-visible {
    transform: none;
  }
}

main:focus {
  outline: none;
}

// ─── Masthead ─────────────────────────────────────────────────────────────────

.masthead {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--ground);
  border-bottom: 2px solid var(--rule-strong);
  padding: 0 var(--gutter);
}

.masthead__inner {
  max-width: var(--max);
  margin: 0 auto;
  min-height: 60px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.masthead__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 44px;
  text-decoration: none;
  font-weight: 800;
  font-size: var(--fs-body);
  letter-spacing: -0.01em;

  :root[data-theme='light'] & img {
    mix-blend-mode: multiply;
  }

  :root[data-theme='dark'] & img {
    filter: invert(1);
  }
}

.masthead__mark {
  width: 28px;
  height: 28px;
}

.masthead__name {
  white-space: nowrap;
}

.masthead__nav {
  display: flex;
  gap: 0.25rem;
  margin-left: auto;
}

.masthead__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.1rem 0.85rem 0;
  font-size: var(--fs-label);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    background: var(--ground-2);
  }

  &[aria-current] {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 0.45em;
  }
}

.masthead__menu {
  display: none;
  min-height: 44px;
  margin-left: auto;
  padding: 0.1rem 1rem 0;
  border: 2px solid var(--ink);
  background: none;
  font-size: var(--fs-label);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}

@media (max-width: 719px) {
  .masthead__inner {
    gap: 0.75rem;
  }

  .masthead__menu {
    display: inline-flex;
    align-items: center;
  }

  .masthead__nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    padding: 0.5rem var(--gutter) 1rem;
    background: var(--ground);
    border-bottom: 2px solid var(--rule-strong);

    &--open {
      display: flex;
    }
  }

  .masthead__link {
    padding: 0.1rem 0 0;
    border-bottom: 1px solid var(--rule);
  }
}

// ─── Footer ───────────────────────────────────────────────────────────────────

.footer {
  padding: 1.5rem var(--gutter);
  border-top: 2px solid var(--rule-strong);
  font-size: var(--fs-label);
  color: var(--ink-2);
}

.footer__inner {
  max-width: var(--max);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.footer__shortcuts {
  min-height: 44px;
  padding: 0;
  border: none;
  background: none;
  font-weight: 700;
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 0.22em;
  cursor: pointer;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-weight: 700;
    color: var(--ink);
  }
}

// ─── Keyboard help (native dialog: top layer, inert background, Esc) ─────────

.help {
  margin: auto;
  border: 2px solid var(--rule-strong);
  background: var(--ground);
  color: var(--ink);
  padding: 0;
  max-width: min(26rem, calc(100vw - 2rem));

  &::backdrop {
    background: var(--scrim);
  }
}

.help__panel {
  padding: 1.75rem;
  display: grid;
  gap: 1.25rem;
}

.help__toggle {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--rule);
  cursor: pointer;
}

.help__check {
  width: 1.4rem;
  height: 1.4rem;
  margin-top: 0.1rem;
  accent-color: var(--ink);
  flex-shrink: 0;
}

.help__toggle-label {
  display: block;
  font-weight: 700;
}

.help__hint {
  display: block;
  font-size: var(--fs-label);
  color: var(--ink-2);
}

.help__list--off {
  opacity: 0.5;
}

.help__list {
  display: grid;
  gap: 0.6rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.9rem;
  }

  kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    padding: 0.15rem 0.5rem 0;
    border: 2px solid var(--ink);
    font-family: var(--font);
    font-weight: 800;
  }
}

.help__close {
  justify-self: start;
}
</style>
