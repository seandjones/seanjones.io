<template>
  <section id="skills" class="skills" aria-labelledby="skills-heading" role="region" aria-describedby="skills-description">
    <div class="skills__container">
      <div class="skills__header">
        <h2 id="skills-heading" class="skills__heading">Skills &amp; Expertise</h2>
        <p id="skills-description" class="skills__subheading">
         Proven track record leading architecture, performance optimization, and platform delivery across TypeScript, Angular, Python, ASP.NET, C#, SQL Server, IIS, and AWS ecosystems serving large-scale user bases.
        </p>
      </div>

      <div class="skills__grid">
        <article
          v-for="(group, index) in skillGroups"
          :key="group.title"
          class="skill-card"
          :class="{ 'skill-card--featured': index === 0 || index === 3 }"
        >
          <div class="skill-card__icon" aria-hidden="true" v-html="group.icon"></div>
          <h3 class="skill-card__title">{{ group.title }}</h3>
          <p class="skill-card__summary">{{ group.summary }}</p>
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
  summary: string
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Application Management',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>`,
    summary: 'Leading teams, setting architecture, and owning outcomes across the full product lifecycle.',
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
    summary: 'TypeScript-first, framework-agnostic, precision UI from component architecture to pixel.',
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
    summary: 'Shipped cross-browser extensions to millions of users across all major platforms.',
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
    summary: 'API design, data modeling, and systems built to handle real load at production scale.',
    skills: [
      'Python',
      'Django',
      'FastAPI',
      'C#',
      '.NET Core',
      'REST APIs',
      'PostgreSQL',
      'MySQL',
      'SQL Server'
        ],
  },
  {
    title: 'AI Engineering',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3"/>
      <path d="M9 9h6v6H9z"/>
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>
    </svg>`,
    summary: 'Integrating LLMs into product surfaces since before it was a job title, from prompts to agentic workflows.',
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
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(5.5rem, 9vw, 8.2rem) 1.2rem;
  background:
    radial-gradient(circle at 84% 10%, color-mix(in srgb, var(--color-accent) 26%, transparent), transparent 42%),
    radial-gradient(circle at 18% 88%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 46%),
    linear-gradient(170deg, color-mix(in srgb, var(--color-accent) 8%, var(--color-bg-secondary)) 0%, var(--color-bg-secondary) 62%);
  transition: background var(--transition-theme);

  &::before {
    content: '';
    position: absolute;
    inset: -9rem -26vw auto auto;
    width: min(70vw, 900px);
    height: clamp(170px, 24vw, 340px);
    border-radius: 999px;
    transform: rotate(-8deg);
    background: color-mix(in srgb, var(--color-accent) 16%, transparent);
    z-index: -1;
  }

  @media (min-width: 768px) {
    padding: clamp(6rem, 9vw, 8.8rem) clamp(1.6rem, 5vw, 3rem);
  }

  &__container {
    max-width: 1220px;
    margin: 0 auto;
  }

  &__header {
    text-align: left;
    margin-bottom: clamp(2.4rem, 4.6vw, 4.6rem);
  }

  &__heading {
    font-size: clamp(2.3rem, 8.4vw, 4.7rem);
    font-weight: 780;
    letter-spacing: -0.04em;
    line-height: 0.96;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
    text-wrap: balance;
  }

  &__subheading {
    font-size: clamp(1rem, 1.8vw, 1.12rem);
    color: color-mix(in srgb, var(--color-text-secondary) 93%, var(--color-text-primary));
    max-width: 66ch;
    margin: 0;
    line-height: 1.74;
  }

  &__grid {
    display: grid;
    gap: clamp(1rem, 2.3vw, 1.7rem);
    grid-template-columns: 1fr;

    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    @media (min-width: 1100px) {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
}

// ─── Skill Card ───────────────────────────────────────────────────────────────

.skill-card {
  background: var(--color-bg-card);
  border: 1.4px solid color-mix(in srgb, var(--color-border) 76%, var(--color-accent) 24%);
  border-radius: var(--radius-card);
  padding: 1.75rem 1.4rem;
  transition:
    background var(--transition-theme),
    border-color var(--transition-theme),
    box-shadow 0.34s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: var(--shadow-card);

  @media (min-width: 900px) {
    grid-column: span 3;
  }

  &:hover {
    box-shadow: var(--shadow-card-hover);
    transform: translateY(-6px);
    border-color: color-mix(in srgb, var(--color-accent) 44%, var(--color-border));
  }

  &--featured {
    @media (min-width: 900px) {
      grid-column: span 6;
    }

    @media (min-width: 1100px) {
      grid-column: span 5;
    }
  }

  @media (min-width: 1100px) {
    &:nth-child(2) {
      grid-column: span 3;
      margin-top: 1.4rem;
    }

    &:nth-child(3) {
      grid-column: span 4;
    }

    &:nth-child(5) {
      grid-column: span 5;
      margin-top: -1.6rem;
    }
  }

  @media (min-width: 1100px) and (max-width: 1279px) {
    &:nth-child(2),
    &:nth-child(5) {
      margin-top: 0;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: color-mix(in srgb, var(--color-pill-bg) 75%, var(--color-bg-card));
    color: var(--color-accent);
    margin-bottom: 1.1rem;
    transition: background var(--transition-theme), color var(--transition-theme);
  }

  &__title {
    font-size: 1.12rem;
    font-weight: 760;
    letter-spacing: -0.015em;
    color: var(--color-text-primary);
    margin-bottom: 0.45rem;
    transition: color var(--transition-theme);
  }

  &__summary {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    line-height: 1.64;
    margin-bottom: 1.1rem;
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
  padding: 0.28rem 0.67rem;
  background: color-mix(in srgb, var(--color-pill-bg) 84%, var(--color-bg-card));
  color: var(--color-pill-text);
  border: 1.2px solid var(--color-pill-border);
  border-radius: var(--radius-pill);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition:
    background var(--transition-theme),
    color var(--transition-theme),
    border-color var(--transition-theme);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .skill-card {
    transition: none;
  }

  .skill-card:hover {
    transform: none;
  }
}
</style>
