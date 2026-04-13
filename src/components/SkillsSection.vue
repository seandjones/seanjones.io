<template>
  <section id="skills" class="skills" aria-labelledby="skills-heading">
    <div class="skills__container">
      <div class="skills__header">
        <p class="skills__eyebrow">What I bring</p>
        <h2 id="skills-heading" class="skills__heading">Skills &amp; Expertise</h2>
        <p class="skills__subheading">
          From front-end pixel perfection to back-end architecture, I cover the
          full engineering spectrum.
        </p>
      </div>

      <div class="skills__grid">
        <article
          v-for="group in skillGroups"
          :key="group.title"
          class="skill-card"
        >
          <div class="skill-card__icon" aria-hidden="true" v-html="group.icon"></div>
          <h3 class="skill-card__title">{{ group.title }}</h3>
          <ul class="skill-card__list" :aria-label="`${group.title} skills`">
            <li
              v-for="skill in group.skills"
              :key="skill"
              class="skill-pill"
            >
              {{ skill }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface SkillGroup {
  title: string
  icon: string
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Application Management',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>`,
    skills: [
      'System Architecture',
      'Team Leadership',
      'Agile / Scrum',
      'Deployment Pipelines',
      'Performance Optimization',
      'Code Review',
    ],
  },
  {
    title: 'Frontend Engineering',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>`,
    skills: [
      'TypeScript',
      'JavaScript (ES2024+)',
      'Angular',
      'Vue',
      'SCSS / CSS',
      'HTML5',
    ],
  },
  {
    title: 'Extension Development',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>`,
    skills: [
      'Chrome Extension',
      'Firefox Extension',
      'Safari Extension',
      'Microsoft Edge Extension',
      'Extension APIs',
      'Packaging & Publishing',
      'Deployment Pipelines',
    ],
  },
  {
    title: 'Backend & APIs',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>`,
    skills: [
      'Python',
      'Django',
      'FastAPI',
      'C#',
      '.NET Core',
      'REST APIs',
      'PostgreSQL',
      'MySQL',
      'SQLServer'
        ],
  },
  {
    title: 'AI Engineering',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3"/>
      <path d="M9 9h6v6H9z"/>
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>
    </svg>`,
    skills: [
      'Prompt Engineering',
      'Harness Engineering',
      'AI Product Strategy',
      'Agentic Workflows',
    ],
  },
]
</script>

<style lang="scss" scoped>
.skills {
  padding: 5rem 1.5rem;
  background: var(--color-bg-secondary);
  transition: background var(--transition-theme);

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }

  &__container {
    max-width: 1100px;
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 3.5rem;
  }

  &__eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: 0.5rem;
  }

  &__heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    color: var(--color-text-primary);
    margin-bottom: 0.75rem;
  }

  &__subheading {
    font-size: 1rem;
    color: var(--color-text-secondary);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.65;
  }

  &__grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;

    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
          grid-template-columns: repeat(3, 1fr);
        }
    @media (min-width: 1100px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}

// ─── Skill Card ───────────────────────────────────────────────────────────────

.skill-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: 1.75rem 1.5rem;
  transition:
    background var(--transition-theme),
    border-color var(--transition-theme),
    box-shadow var(--transition-base),
    transform var(--transition-base);
  box-shadow: var(--shadow-card);

  &:hover {
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }

  [data-theme='dark'] &:hover {
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--color-pill-bg);
    color: var(--color-accent);
    margin-bottom: 1rem;
    transition: background var(--transition-theme), color var(--transition-theme);
  }

  &__title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
    transition: color var(--transition-theme);
  }

  &__list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
}

// ─── Skill Pill ───────────────────────────────────────────────────────────────

.skill-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.65rem;
  background: var(--color-pill-bg);
  color: var(--color-pill-text);
  border: 1px solid var(--color-pill-border);
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 500;
  transition:
    background var(--transition-theme),
    color var(--transition-theme),
    border-color var(--transition-theme);
  white-space: nowrap;
}
</style>
