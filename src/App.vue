<template>
  <div :data-theme="theme" class="app">
    <a href="#main-content" class="skip-link" aria-label="Skip to main content. Press ? for keyboard shortcuts">Skip to main content</a>

    <!-- ─── Keyboard Help Modal ─────────────────────────────────────── -->
    <Teleport to="body">
      <transition name="help-modal">
        <div
          v-if="showKeyboardHelp"
          class="keyboard-help-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="keyboard-help-title"
          @click.self="closeKeyboardHelp"
        >
          <div class="keyboard-help-panel">
            <button
              ref="keyboardHelpCloseBtn"
              type="button"
              class="keyboard-help__close"
              aria-label="Close keyboard help"
              @click="closeKeyboardHelp"
            >
              ✕
            </button>
            <h2 id="keyboard-help-title" class="keyboard-help__title">Keyboard Shortcuts</h2>
            <div class="keyboard-help__content">
              <div class="keyboard-help__group">
                <h3 class="keyboard-help__group-title">Navigation</h3>
                <ul class="keyboard-help__list" aria-label="Navigation shortcuts">
                  <li><kbd>g</kbd><span>Go to Case Studies</span></li>
                  <li><kbd>s</kbd><span>Go to Skills</span></li>
                  <li><kbd>w</kbd><span>Go to Experience</span></li>
                  <li><kbd>c</kbd><span>Go to Contact</span></li>
                  <li><kbd>h</kbd><span>Go to Home (Hero)</span></li>
                </ul>
              </div>
              <div class="keyboard-help__group">
                <h3 class="keyboard-help__group-title">Other</h3>
                <ul class="keyboard-help__list" aria-label="Other shortcuts">
                  <li><kbd>?</kbd><span>Show this help</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- ─── Navigation ─────────────────────────────────────────────────── -->
    <header class="navbar" :class="{ 'navbar--scrolled': scrolled, 'navbar--nav-open': mobileNavOpen }" role="banner">
      <div class="navbar__inner">
        <a href="#" class="navbar__brand" aria-label="Sean Jones, home">
          <img class="navbar__brand-mark" src="/favicon.png" alt="" aria-hidden="true" />
          <span class="navbar__brand-name">Sean Jones</span>
        </a>

        <button
          type="button"
          class="navbar__hamburger"
          :aria-expanded="mobileNavOpen"
          aria-controls="site-nav"
          :aria-label="mobileNavOpen ? 'Close navigation' : 'Open navigation'"
          @click="mobileNavOpen = !mobileNavOpen"
        >
          <span class="navbar__hamburger-bar"></span>
          <span class="navbar__hamburger-bar"></span>
          <span class="navbar__hamburger-bar"></span>
        </button>

        <nav id="site-nav" class="navbar__nav" :class="{ 'navbar__nav--open': mobileNavOpen }" aria-label="Site navigation">
          <a href="#skills" class="navbar__link" @click="handleNavLinkClick($event, '#skills')">Skills</a>
          <a href="#projects" class="navbar__link" @click="handleNavLinkClick($event, '#projects')">Case Studies</a>
          <a href="#work" class="navbar__link" @click="handleNavLinkClick($event, '#work')">Experience</a>
          <a href="#contact" class="navbar__link" @click="handleNavLinkClick($event, '#contact')">Contact</a>
        </nav>

        <ThemeToggle :is-dark="theme === 'dark'" @toggle="toggleTheme" />
      </div>
    </header>

    <!-- ─── Main ─────────────────────────────────────────────────────── -->
    <main id="main-content">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <WorkHistory />
      <ContactForm />
    </main>

    <!-- ─── Footer ───────────────────────────────────────────────────── -->
    <footer class="footer" role="contentinfo">
      <div class="footer__inner">
        <p class="footer__copy">
          &copy; {{ currentYear }} Sean Jones. All rights reserved.
        </p>
        <div class="footer__links">
          <a
            href="https://github.com/seandjones"
            class="footer__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
          <a
            href="https://www.linkedin.com/in/sean-jones-301439b0/"
            class="footer__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import HeroSection from "./components/HeroSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import WorkHistory from "./components/WorkHistory.vue";
import ContactForm from "./components/ContactForm.vue";

// ─── Theme ───────────────────────────────────────────────────────────────────

type Theme = "light" | "dark";
const STORAGE_KEY = "sj-theme";

function getPreferredTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const theme = ref<Theme>("dark");

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  localStorage.setItem(STORAGE_KEY, theme.value);
}

onMounted(() => {
  theme.value = getPreferredTheme();
});

// ─── Scroll-aware navbar ─────────────────────────────────────────────────────

const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

// ─── Keyboard Shortcuts ──────────────────────────────────────────────────────

const showKeyboardHelp = ref(false);
const mobileNavOpen = ref(false);
const keyboardHelpCloseBtn = ref<HTMLButtonElement | null>(null);
let keyboardHelpTriggerEl: HTMLElement | null = null;

function closeKeyboardHelp() {
  showKeyboardHelp.value = false;
  keyboardHelpTriggerEl?.focus();
}

function handleNavLinkClick(event: MouseEvent, targetSelector: string) {
  event.preventDefault();
  mobileNavOpen.value = false;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const target = document.querySelector(targetSelector);
  target?.scrollIntoView({ behavior: prefersReducedMotion ? 'instant' : 'smooth', block: 'start' });

  // Keep URL hash in sync for deep-link semantics.
  if (window.location.hash !== targetSelector) {
    history.replaceState(null, "", targetSelector);
  }
}

function isShortcutSuppressedTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  const blockedInteractive = target.closest(
    'input, textarea, select, button, a, [contenteditable="true"], [role="textbox"], [role="combobox"], [role="listbox"], [role="menuitem"], [data-shortcuts="off"]'
  );

  return blockedInteractive !== null;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return;
  }

  // Escape closes modal or mobile nav
  if (event.key === "Escape") {
    if (showKeyboardHelp.value) {
      event.preventDefault();
      closeKeyboardHelp();
      return;
    }
    if (mobileNavOpen.value) {
      mobileNavOpen.value = false;
      return;
    }
  }

  // Focus trap inside keyboard help modal
  if (showKeyboardHelp.value && event.key === "Tab") {
    const panel = document.querySelector(".keyboard-help-panel");
    if (!panel) return;
    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled"));
    if (focusable.length === 0) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    return;
  }

  // Ignore shortcuts while focus is in interactive/editable contexts.
  if (isShortcutSuppressedTarget(event.target)) {
    return;
  }

  const key = event.key.toLowerCase();
  const routes: Record<string, string> = {
    g: "#projects",
    s: "#skills",
    w: "#work",
    c: "#contact",
    h: "#",
  };

  if (key === "?") {
    event.preventDefault();
    if (!showKeyboardHelp.value) {
      keyboardHelpTriggerEl = document.activeElement as HTMLElement | null;
      showKeyboardHelp.value = true;
      // focus close button on next tick
      setTimeout(() => keyboardHelpCloseBtn.value?.focus(), 0);
    } else {
      closeKeyboardHelp();
    }
    return;
  }

  if (key in routes) {
    event.preventDefault();
    const target = routes[key] as string;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (target === "#") {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    } else {
      const element = document.querySelector(target);
      element?.scrollIntoView({ behavior: prefersReducedMotion ? 'instant' : 'smooth', block: 'start' });
    }
    showKeyboardHelp.value = false;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

// ─── Static data ─────────────────────────────────────────────────────────────

const currentYear = new Date().getFullYear();
</script>

<style lang="scss">
@use './assets/main.scss';

html {
  scroll-padding-top: 80px;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  position: relative;
  isolation: isolate;
  // Decorative fields must remain behind all content. Avoid global child z-index overrides.

  &::before {
    content: '';
    position: fixed;
    inset: -16rem -22vw auto auto;
    width: min(66vw, 920px);
    height: clamp(220px, 30vw, 420px);
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 14%, transparent);
    transform: rotate(-8deg);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    inset: auto auto -14rem -20vw;
    width: min(60vw, 760px);
    height: clamp(180px, 24vw, 300px);
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-text-primary) 5%, transparent);
    transform: rotate(10deg);
    pointer-events: none;
    z-index: -1;
  }
}

.app > main > * {
  scroll-margin-top: 80px;
  animation: section-reveal 620ms cubic-bezier(0.16, 1, 0.3, 1) both;

  &:nth-child(1) {
    animation-delay: 70ms;
  }

  &:nth-child(2) {
    animation-delay: 120ms;
  }

  &:nth-child(3) {
    animation-delay: 170ms;
  }

  &:nth-child(4) {
    animation-delay: 220ms;
  }

  &:nth-child(5) {
    animation-delay: 270ms;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app > main > * {
    animation: none;
  }
}

.skip-link {
  position: fixed;
  left: 0.75rem;
  top: 0.5rem;
  z-index: 200;
  display: inline-flex;
  width: max-content;
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0.55rem 0.8rem;
  transform: translateY(-140%);
  transition: transform var(--transition-base);

  &:focus-visible {
    transform: translateY(0);
    box-shadow: var(--focus-ring);
  }
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

.navbar {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 220;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  transition: background var(--transition-theme), border-color var(--transition-base),
    box-shadow var(--transition-base), transform var(--transition-base);
  border-bottom: 1px solid transparent;

  @media (min-width: 768px) {
    padding: 0 2rem;
    height: 64px;
  }

  @media (max-width: 600px) {
    height: 60px;
    padding: 0 0.85rem;
  }

  &--scrolled {
    background: color-mix(in srgb, var(--color-bg) 82%, transparent);
    border-bottom-color: color-mix(in srgb, var(--color-border) 76%, var(--color-accent) 24%);
    box-shadow: 0 1px 0 color-mix(in srgb, var(--color-border) 80%, var(--color-accent) 20%),
      0 10px 28px color-mix(in srgb, var(--color-text-primary) 6%, transparent);

    @media (max-width: 768px) {
      background: var(--color-bg);
    }
  }

  &__inner {
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 600px) {
      flex-wrap: nowrap;
      gap: 0.5rem;
      align-items: center;
    }
  }

  &__brand {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.35rem 0.62rem;
    border-radius: 999px;
    text-decoration: none;
    color: var(--color-text-primary);
    transition: color var(--transition-theme);

    &:hover {
      color: var(--color-text-primary);
      background: color-mix(in srgb, var(--color-toggle-bg) 76%, transparent);
    }
    @media (max-width: 600px) {
      padding: 0.25rem 0.15rem;
      border-radius: 12px;
    }
  }

  &__brand-mark {
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 20px;
    display: block;
    object-fit: cover;
    border: 1.2px solid color-mix(in srgb, var(--color-border) 78%, var(--color-accent) 22%);
    flex-shrink: 0;

    [data-theme='light'] & {
      mix-blend-mode: multiply;
    }
  }

  &__brand-name {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: -0.015em;

    @media (max-width: 600px) {
      display: none;
    }
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-secondary);
    flex-shrink: 0;
    border-radius: 8px;
    transition: background var(--transition-base);

    &:hover {
      background: var(--color-toggle-bg);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    @media (max-width: 600px) {
      display: flex;
      order: 2;
      margin-left: auto;
    }
  }

  &__hamburger-bar {
    display: block;
    width: 20px;
    height: 1.5px;
    background: currentColor;
    border-radius: 2px;
    transition: transform var(--transition-base), opacity var(--transition-base);

    .navbar--nav-open &:nth-child(1) {
      transform: translateY(6.5px) rotate(45deg);
    }
    .navbar--nav-open &:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    .navbar--nav-open &:nth-child(3) {
      transform: translateY(-6.5px) rotate(-45deg);
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-left: auto;

    @media (max-width: 600px) {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      margin-left: 0;
      background: var(--color-bg);
      border-bottom: 1px solid var(--color-border);
      box-shadow: 0 4px 12px color-mix(in srgb, var(--color-text-primary) 8%, transparent);
      z-index: 260;
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-4px);
      transition: max-height var(--transition-base), opacity var(--transition-base),
        transform var(--transition-base), visibility var(--transition-base);
      pointer-events: none;

      &--open {
        max-height: 320px;
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        pointer-events: auto;
      }
    }
  }

  &__link {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.9rem;
    border-radius: 100px;
    font-size: 0.82rem;
    font-weight: 680;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--transition-base), background var(--transition-base);

    &:hover {
      color: var(--color-text-primary);
      background: var(--color-toggle-bg);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    @media (max-width: 600px) {
      width: 100%;
      justify-content: flex-start;
      padding: 0.85rem 1.25rem;
      font-size: 0.82rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 0;

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-border);
      }

      &:hover {
        background: var(--color-toggle-bg);
        color: var(--color-text-primary);
      }
    }
  }
}

@keyframes section-reveal {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ─── Buttons ─────────────────────────────────────────────────────────────────

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.5rem;
  border-radius: var(--radius-pill);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-base), color var(--transition-base),
    box-shadow var(--transition-base), border-color var(--transition-base);
  white-space: nowrap;
  text-decoration: none;
  border: 1.5px solid transparent;

  &--primary {
    background: var(--color-accent);
    color: var(--color-on-accent);

    &:hover {
      background: var(--color-accent-hover);
      color: var(--color-on-accent);
      box-shadow: var(--shadow-accent-hover);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring), var(--shadow-accent-hover);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-accent);
    border-color: var(--color-accent);

    &:hover {
      background: var(--color-pill-bg);
      color: var(--color-accent);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }
}

// ─── Footer ───────────────────────────────────────────────────────────────────

.footer {
  margin-top: auto;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  transition: background var(--transition-theme), border-color var(--transition-theme);

  &__inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__copy {
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
  }

  &__links {
    display: flex;
    gap: 0.5rem;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    color: var(--color-text-secondary);
    transition: color var(--transition-base), background var(--transition-base);
    text-decoration: none;

    &:hover {
      color: var(--color-text-primary);
      background: var(--color-toggle-bg);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }
}

// ─── Keyboard Help Modal ──────────────────────────────────────────────────────

.keyboard-help-modal {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: color-mix(in srgb, var(--color-bg) 90%, transparent);
}

.keyboard-help-panel {
  position: relative;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: 2rem;
  max-width: 380px;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: var(--shadow-modal);
}

.keyboard-help__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-base);

  &:hover {
    color: var(--color-text-primary);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

.keyboard-help__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
}

.keyboard-help__group {
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.keyboard-help__group-title {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
}

.keyboard-help__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9375rem;
    color: var(--color-text-primary);

    kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 28px;
      padding: 0 0.5rem;
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--color-text-secondary);
      flex-shrink: 0;
    }

    span {
      flex: 1;
    }
  }
}

// ─── Transitions ──────────────────────────────────────────────────────────────

.help-modal-enter-active,
.help-modal-leave-active {
  transition: opacity var(--transition-base);

  .keyboard-help-panel {
    transition: transform var(--transition-base), opacity var(--transition-base);
  }
}

.help-modal-enter-from,
.help-modal-leave-to {
  opacity: 0;

  .keyboard-help-panel {
    transform: scale(0.95);
    opacity: 0;
  }
}
</style>
