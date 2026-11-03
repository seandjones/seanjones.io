<template>
  <section id="experience" class="section experience" aria-labelledby="experience-heading">
    <div class="section__inner">
      <header class="section__head">
        <h2 id="experience-heading" class="t-display">Experience</h2>
      </header>

      <ol class="career">
        <li
          v-for="(role, i) in roles"
          :id="role.id"
          :key="role.id"
          class="career__stop"
          :class="{
            'career__stop--now': role.current,
            'career__stop--joined': i > 0 && roles[i - 1]?.company === role.company,
          }"
        >
          <span class="career__mark" aria-hidden="true"></span>
          <span v-if="i > 0 && roles[i - 1]?.company === role.company" class="visually-hidden">
            Same company as the role above.
          </span>
          <div class="career__meta">
            <p class="career__period">
              <span v-if="role.current" class="bullet bullet--leadership career__now">Now</span>
              {{ role.period }}
            </p>
          </div>
          <div class="career__body">
            <h3 class="t-title">{{ role.role }}</h3>
            <p class="career__company">
              <a v-if="role.companyUrl" :href="role.companyUrl" target="_blank" rel="noopener noreferrer">
                {{ role.company }}<span class="visually-hidden"> (opens in a new tab)</span>
              </a>
              <template v-else>{{ role.company }}</template>
            </p>
            <p v-if="role.subline" class="career__subline">{{ role.subline }}</p>
            <p v-if="role.description" class="career__description">{{ role.description }}</p>
            <ul class="career__list">
              <li v-for="(point, j) in role.contributions" :key="j">{{ point }}</li>
            </ul>
            <p v-if="role.seeAlso?.length" class="career__see">
              Case studies:
              <template v-for="(link, k) in role.seeAlso" :key="link.href">
                <span class="career__seeitem"><a :href="link.href">{{ link.label }}</a><template v-if="k < role.seeAlso.length - 1">,</template></span>
                {{ ' ' }}
              </template>
            </p>
          </div>
        </li>
      </ol>

      <div class="stack">
        <h3 class="t-label stack__label">Stack</h3>
        <p class="stack__line">{{ stack }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { roles, stack } from '../content/site'
</script>

<style lang="scss" scoped>
// The career drawn as a line diagram: one ink line, a station per role,
// ringed where consecutive roles share a company.
.career {
  list-style: none;
  position: relative;
}

.career__stop {
  position: relative;
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  gap: 0 clamp(1.5rem, 4vw, 3.5rem);
  padding: 0 0 clamp(2rem, 4vw, 3rem) 2.75rem;
  scroll-margin-top: 6rem;

  &::before {
    content: '';
    position: absolute;
    left: 0.55rem;
    top: 0.7rem;
    bottom: -0.7rem;
    width: 8px;
    background: var(--ink);
  }

  &:last-child::before {
    display: none;
  }

  @media (max-width: 759px) {
    grid-template-columns: 1fr;
  }
}

.career__mark {
  position: absolute;
  left: 0;
  top: 0.25rem;
  width: 1.6rem;
  height: 1.6rem;
  border: 4px solid var(--ink);
  background: var(--ground);
  border-radius: 50%;
}

.career__stop--joined .career__mark {
  // Interchange: same company as the role above. The ring doubles.
  outline: 4px solid var(--ink);
  outline-offset: 4px;
}

.career__period {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.2rem;
  font-weight: 700;
}

.career__company {
  margin-top: 0.25rem;
  font-weight: 600;

  a {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
  }
}

.career__subline,
.career__description {
  color: var(--ink-2);
  max-width: var(--measure);
}

.career__subline {
  font-size: var(--fs-label);
  font-weight: 700;
  letter-spacing: 0.04em;
}

.career__description {
  margin-top: 0.5rem;
}

.career__list {
  margin-top: 1rem;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.6rem;
  max-width: var(--measure);

  li::marker {
    color: var(--ink-2);
  }
}

.career__see {
  margin-top: 0.9rem;
  font-weight: 700;
  line-height: 2;
}

// Inline text links (exempt from the target-size rule); the comma travels with
// its link so a line can never start with one.
.career__seeitem {
  white-space: nowrap;
}

.stack {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  gap: 0 clamp(1.5rem, 4vw, 3.5rem);
  padding: 1.5rem 0 0 2.75rem;
  border-top: 2px solid var(--rule-strong);

  @media (max-width: 759px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

.stack__label {
  padding-top: 0.2rem;
}

.stack__line {
  max-width: var(--measure);
  font-weight: 600;
}
</style>
