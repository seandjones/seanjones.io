<template>
  <div :data-theme="theme" class="app">
    <a href="#main-content" class="skip-link" aria-label="Skip to main content. Press ? for keyboard shortcuts">Skip to main content</a>

    <!-- ─── Keyboard Help Modal ─────────────────────────────────────── -->
    <transition name="help-modal">
      <div
        v-if="showKeyboardHelp"
        class="keyboard-help-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="keyboard-help-title"
        @click.self="showKeyboardHelp = false"
      >
        <div class="keyboard-help-panel">
          <button
            type="button"
            class="keyboard-help__close"
            aria-label="Close keyboard help"
            @click="showKeyboardHelp = false"
          >
            ✕
          </button>
          <h2 id="keyboard-help-title" class="keyboard-help__title">Keyboard Shortcuts</h2>
          <div class="keyboard-help__content">
            <div class="keyboard-help__group">
              <p class="keyboard-help__group-title">Navigation</p>
              <ul class="keyboard-help__list" aria-label="Navigation shortcuts">
                <li><kbd>g</kbd><span>Go to Case Studies</span></li>
                <li><kbd>s</kbd><span>Go to Skills</span></li>
                <li><kbd>w</kbd><span>Go to Work History</span></li>
                <li><kbd>c</kbd><span>Go to Contact</span></li>
                <li><kbd>h</kbd><span>Go to Home (Hero)</span></li>
              </ul>
            </div>
            <div class="keyboard-help__group">
              <p class="keyboard-help__group-title">Other</p>
              <ul class="keyboard-help__list" aria-label="Other shortcuts">
                <li><kbd>?</kbd><span>Show this help</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ─── Navigation ─────────────────────────────────────────────────── -->
    <header class="navbar" :class="{ 'navbar--scrolled': scrolled }" role="banner">
      <div class="navbar__inner">
        <a href="#" class="navbar__brand" aria-label="Sean Jones, home">
          <img class="navbar__brand-mark" src="/favicon.png" alt="" aria-hidden="true" />
          <span class="navbar__brand-name">Sean Jones</span>
        </a>

        <nav class="navbar__nav" aria-label="Site navigation">
          <a href="#skills" class="navbar__link">Skills</a>
          <a href="#projects" class="navbar__link">Case Studies</a>
          <a href="#work" class="navbar__link">Experience</a>
          <a href="#contact" class="navbar__link">Contact</a>
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
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            class="footer__link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="link.label"
            v-html="link.icon"
          ></a>
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

function handleKeydown(event: KeyboardEvent) {
  // Ignore if user is typing in an input or textarea
  if (
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement
  ) {
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
    showKeyboardHelp.value = !showKeyboardHelp.value;
    return;
  }

  if (key in routes) {
    event.preventDefault();
    const target = routes[key] as string;
    if (target === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(target);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
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

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/seandjones",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sean-jones-301439b0/",
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
];
</script>

<style lang="scss">
@use './assets/main.scss';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  position: relative;
  isolation: isolate;
}

.app > :not(.skip-link) {
  position: relative;
  z-index: 1;
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
  z-index: 100;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  transition: background var(--transition-theme), backdrop-filter var(--transition-theme),
    border-color var(--transition-base), box-shadow var(--transition-base);
  border-bottom: 1px solid transparent;

  @media (min-width: 768px) {
    padding: 0 2rem;
    height: 64px;
  }

  &--scrolled {
    background: color-mix(in srgb, var(--color-bg) 85%, transparent);
    backdrop-filter: saturate(125%) blur(8px);
    -webkit-backdrop-filter: saturate(125%) blur(8px);
    border-bottom-color: var(--color-border);
    box-shadow: 0 1px 0 var(--color-border);
  }

  @media (prefers-reduced-motion: reduce) {
    &--scrolled {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }

  &__inner {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  &__brand {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.35rem 0.5rem;
    border-radius: 999px;
    text-decoration: none;
    color: var(--color-text-primary);
    transition: color var(--transition-theme);

    &:hover {
      color: var(--color-text-primary);
    }
    @media (max-width: 600px) {
      border-radius: 20px;
      background: var(--color-accent);
    }
  }

  &__brand-mark {
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 20px;
    display: block;
    object-fit: cover;
    border: 1px solid var(--color-border);
    flex-shrink: 0;

    :global([data-theme='light']) & {
      mix-blend-mode: multiply;
    }
  }

  &__brand-name {
    font-size: 0.9375rem;
    font-weight: 600;
    letter-spacing: -0.01em;

    @media (max-width: 600px) {
      display: none;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-left: auto;
  }

  &__link {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.9rem;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 500;
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
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
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
