<template>
  <section class="hero" aria-label="Introduction. Sean Jones, Director of Engineering at Price.com">
    <!-- Profile image -->
    <div class="hero__image-wrap">
      <img
        class="hero__avatar"
        src="/profile-440.webp"
        srcset="/profile-220.webp 220w, /profile-440.webp 440w"
        sizes="(min-width: 768px) 220px, 160px"
        width="220"
        height="220"
        alt="Sean Jones, Director of Engineering"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <p class="hero__stamp">Leading engineering teams that ship measurable outcomes</p>
    </div>

    <!-- Identity -->
    <div class="hero__content">
      <p class="hero__eyebrow">Director of Engineering</p>
      <h1 class="hero__name">
        <span class="hero__name-line">Sean</span>
        <span class="hero__name-line">Jones</span>
      </h1>
      <p class="hero__title">
        Building at Price.com
        <span class="hero__company">since 2016</span>
      </p>
      <p class="hero__bio">
       Engineering leader and full-stack architect with 15+ years of experience building scalable consumer platforms, browser extensions, and AI-powered web applications.
      </p>

      <div class="hero__cta">
        <a href="#projects" class="btn btn--primary">Case Studies</a>
        <a href="#contact" class="btn btn--ghost">Get in Touch</a>
      </div>

      <ul class="hero__proof" aria-label="Career highlights">
        <li class="hero__proof-item">15+ years building consumer platforms and APIs</li>
        <li class="hero__proof-item">Scaled teams across product, platform, and AI delivery</li>
        <li class="hero__proof-item">Execution-first leadership from architecture to launch</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props needed; static hero section
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2.75rem;
  padding: clamp(6rem, 10vw, 8.5rem) 1.25rem 4.25rem;
  text-align: left;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    radial-gradient(circle at 88% 14%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 42%),
    linear-gradient(140deg, color-mix(in srgb, var(--color-accent) 10%, var(--color-bg-secondary)) 0%, var(--color-bg) 58%);

  &::before {
    content: '';
    position: absolute;
    inset: -12rem -30vw auto auto;
    width: min(74vw, 840px);
    height: clamp(220px, 38vw, 440px);
    background: color-mix(in srgb, var(--color-accent) 20%, transparent);
    border-radius: 999px;
    transform: rotate(-9deg);
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto auto -11rem -20vw;
    width: min(68vw, 680px);
    height: clamp(180px, 28vw, 320px);
    background: color-mix(in srgb, var(--color-text-primary) 8%, transparent);
    border-radius: 999px;
    transform: rotate(12deg);
    z-index: -1;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: clamp(3.5rem, 8vw, 9rem);
    padding: clamp(5.5rem, 11vw, 8rem) clamp(2rem, 8vw, 8.5rem) 4.5rem;
    width: 100%;
  }

  @media (min-width: 1100px) {
    &::before {
      inset: -8rem -16vw auto auto;
    }

    &::after {
      inset: auto auto -8rem -12vw;
    }
  }

  &__image-wrap {
    flex-shrink: 0;
    display: grid;
    gap: 1.15rem;
    width: min(100%, 300px);
  }

  &__avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
    object-position: center;
    border: 2px solid var(--color-border);
    box-shadow: var(--shadow-hero);
    transition: box-shadow var(--transition-theme), border-color var(--transition-theme),
      opacity var(--transition-theme);
    opacity: 1;

    @media (min-width: 768px) {
      width: 260px;
      height: 260px;
    }
  }

  &__stamp {
    max-width: 22ch;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-text-primary) 82%, var(--color-bg));
    line-height: 1.5;
  }

  &__content {
    max-width: 700px;
  }

  &__eyebrow {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: 0.8rem;
  }

  &__name {
    font-size: clamp(3.1rem, 13vw, 8rem);
    font-weight: 780;
    letter-spacing: -0.052em;
    line-height: 0.86;
    color: var(--color-text-primary);
    margin-bottom: 0.75rem;
    text-wrap: balance;
  }

  &__name-line {
    display: block;

    &:last-child {
      color: color-mix(in srgb, var(--color-accent) 70%, var(--color-text-primary));
    }
  }

  &__title {
    font-size: clamp(1.05rem, 2.8vw, 1.58rem);
    font-weight: 670;
    color: var(--color-text-secondary);
    margin-bottom: 1.45rem;
    text-wrap: balance;
  }

  &__company {
    color: var(--color-accent);
    font-weight: 600;
  }

  &__bio {
    font-size: clamp(1rem, 1.6vw, 1.13rem);
    line-height: 1.78;
    color: var(--color-text-secondary);
    margin-bottom: 2.2rem;
    max-width: 58ch;
    text-wrap: pretty;
  }

  &__cta {
    display: flex;
    gap: 0.85rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2rem;
  }

  &__proof {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.55rem;
    max-width: 62ch;
    padding: 0;
    margin: 0;

    @media (min-width: 980px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      max-width: none;
      gap: 1rem;
    }
  }

  &__proof-item {
    font-size: 0.82rem;
    font-weight: 600;
    line-height: 1.55;
    letter-spacing: 0.01em;
    color: color-mix(in srgb, var(--color-text-secondary) 88%, var(--color-text-primary));
    padding-top: 0.78rem;
    border-top: 1px solid color-mix(in srgb, var(--color-border) 92%, transparent);
  }
}
//Critical to prevent entire page having opacity
:global([data-theme="dark"]) .hero__avatar {
  opacity: 1;
}

// ─── Buttons ──────────────────────────────────────────────────────────────────

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.55rem;
  border-radius: var(--radius-pill);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-base), color var(--transition-base),
    box-shadow var(--transition-base), border-color var(--transition-base);
  white-space: nowrap;
  text-decoration: none;

  &--primary {
    background: var(--color-accent);
    color: var(--color-on-accent);
    border: 1.5px solid transparent;
    box-shadow: 0 6px 20px color-mix(in srgb, var(--color-accent) 22%, transparent);

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
    border: 1.5px solid var(--color-accent);

    &:hover {
      background: var(--color-pill-bg);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero,
  .hero__avatar,
  .btn {
    transition: none;
  }
}
</style>
