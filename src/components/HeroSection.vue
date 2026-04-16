<template>
  <section class="hero" aria-label="Introduction">
    <!-- Profile image -->
    <div class="hero__image-wrap">
      <img
        class="hero__avatar"
        src="/profile-440.webp"
        srcset="/profile-220.webp 220w, /profile-440.webp 440w"
        sizes="(min-width: 768px) 220px, 160px"
        width="220"
        height="220"
        alt="Portrait of Sean Jones"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
    </div>

    <!-- Identity -->
    <div class="hero__content">
      <h1 class="hero__name">Sean Jones</h1>
      <p class="hero__title">
        Director of Engineering
        <span class="hero__company">@ price.com</span>
      </p>
      <p class="hero__bio">
        Engineering leader with a passion for building high-performance, scalable
        products. I bridge technical depth with strategic vision — mentoring teams, driving
        architecture decisions, and shipping experiences users love.
      </p>

      <div class="hero__cta">
        <a href="#skills" class="btn btn--primary">View Skills</a>
        <a href="#work" class="btn btn--primary">Work</a>
        <a href="#contact" class="btn btn--ghost">Get in Touch</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props needed — static hero section
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding: 7rem 1.5rem 4rem;
  text-align: center;
  position: relative;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    gap: 4rem;
    padding: 6rem 4rem 4rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  @media (min-width: 1100px) {
    gap: 6rem;
  }

  &__image-wrap {
    flex-shrink: 0;
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
    transition: box-shadow var(--transition-theme), border-color var(--transition-theme), opacity var(--transition-theme);
    opacity: 0.75;
    @media (min-width: 768px) {
      width: 220px;
      height: 220px;
    }
  }

  &__content {
    max-width: 560px;
  }

  &__eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: 0.5rem;
  }

  &__name {
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
  }

  &__title {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    font-weight: 500;
    color: var(--color-text-secondary);
    margin-bottom: 1.25rem;
  }

  &__company {
    color: var(--color-accent);
    font-weight: 600;
  }

  &__bio {
    font-size: 1rem;
    line-height: 1.75;
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
    max-width: 480px;
  }

  &__cta {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }
}

// ─── Buttons ──────────────────────────────────────────────────────────────────

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

  &--primary {
    background: var(--color-accent);
    color: var(--color-on-accent);
    border: 1.5px solid transparent;

    &:hover {
      background: var(--color-accent-hover);
      color: var(--color-on-accent);
      box-shadow: 0 4px 16px rgba(0, 113, 227, 0.35);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-accent);
    border: 1.5px solid var(--color-accent);

    &:hover {
      background: var(--color-pill-bg);
    }
  }
}
</style>
