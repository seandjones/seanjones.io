<template>
  <section
    id="skills"
    class="skills"
    aria-labelledby="skills-heading"
    role="region"
    aria-describedby="skills-description"
  >
    <div class="skills__container">
      <div class="skills__header">
        <h2 id="skills-heading" class="skills__heading">Skills &amp; Expertise</h2>
        <p id="skills-description" class="skills__subheading">
          Proven track record leading architecture, performance optimization, and platform
          delivery across TypeScript, Angular, Python, ASP.NET, C#, SQL Server, IIS, and
          AWS ecosystems serving large-scale user bases.
        </p>
      </div>

      <div class="skills__grid">
        <article
          v-for="(group, index) in skillGroups"
          :key="group.title"
          class="skill-card"
          :class="{ 'skill-card--featured': index === 0 || index === 3 }"
        >
          <!-- <span
            v-if="index === 0 || index === 3"
            class="skill-card__index"
            aria-hidden="true"
          >
            {{ String(index + 1).padStart(2, "0") }}
          </span> -->
          <!-- Index is currently hidden as it doesn't add much value and can be distracting; can be re-enabled if needed for emphasis -->
          <h3 class="skill-card__title">{{ group.title }}</h3>
          <p class="skill-card__summary">{{ group.summary }}</p>
          <ul class="skill-card__list" :aria-label="`${group.title} skills`">
            <li v-for="skill in group.skills" :key="skill" class="skill-pill">
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
  title: string;
  summary: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Application Management",
    summary:
      "Leading teams, setting architecture, and owning outcomes across the full product lifecycle.",
    skills: [
      "System Architecture",
      "Team Leadership",
      "Agile / Scrum",
      "Deployment Pipelines",
      "Performance Optimization",
      "Code Review",
    ],
  },
  {
    title: "Frontend Engineering",
    summary:
      "TypeScript-first, framework-agnostic, precision UI from component architecture to pixel.",
    skills: [
      "TypeScript",
      "JavaScript (ES2024+)",
      "Angular",
      "Vue",
      "React",
      "SCSS / CSS",
      "HTML5",
      "Webpack",
      "Vite",],
  },
  {
    title: "Extension Development",
    summary:
      "Shipped cross-browser extensions to millions of users across all major platforms.",
    skills: [
      "Chrome Extension",
      "Firefox Extension",
      "Safari Extension",
      "Microsoft Edge Extension",
      "Extension APIs",
      "Packaging & Publishing",
      "Deployment Pipelines",
    ],
  },
  {
    title: "Backend & APIs",
    summary:
      "API design, data modeling, and systems built to handle real load at production scale.",
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "C#",
      ".NET Core",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "SQL Server",
    ],
  },
  {
    title: "AI Engineering",
    summary:
      "Integrating LLMs into product surfaces since before it was a job title, from prompts to agentic workflows.",
    skills: [
      "Prompt Engineering",
      "Harness Engineering",
      "AI Product Strategy",
      "Agentic Workflows",
    ],
  },
];
</script>

<style lang="scss" scoped>
.skills {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(5.5rem, 9vw, 8.2rem) 1.2rem;
  background: radial-gradient(
      ellipse at 4% 52%,
      color-mix(in srgb, var(--color-accent) 22%, transparent),
      transparent 46%
    ),
    radial-gradient(
      circle at 96% 6%,
      color-mix(in srgb, var(--color-accent) 10%, transparent),
      transparent 38%
    ),
    linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg) 100%);
  transition: background var(--transition-theme);

  &::before {
    content: "";
    position: absolute;
    inset: auto -18vw -7rem auto;
    width: min(68vw, 860px);
    height: clamp(160px, 22vw, 320px);
    border-radius: 999px;
    transform: rotate(6deg);
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
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
  padding: 1.6rem 1.4rem 1.5rem;
  transition: background var(--transition-theme), border-color var(--transition-theme),
    box-shadow 0.34s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;

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

    .skill-card__title {
      font-size: clamp(1.5rem, 2.6vw, 2rem);
      font-weight: 780;
      letter-spacing: -0.032em;
      line-height: 1.08;
      margin-bottom: 0.7rem;
    }

    .skill-card__summary {
      font-size: 0.95rem;
      max-width: 52ch;
      margin-bottom: 1.4rem;
    }
  }

  @media (min-width: 1100px) {
    &:nth-child(2) {
      grid-column: span 3;
    }

    &:nth-child(3) {
      grid-column: span 4;
    }

    &:nth-child(5) {
      grid-column: span 5;
    }
  }

  &__index {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--color-accent);
    opacity: 0.7;
    margin-bottom: 0.85rem;
    display: block;
    font-variant-numeric: tabular-nums;
  }

  &__title {
    font-size: 1.08rem;
    font-weight: 720;
    letter-spacing: -0.012em;
    color: var(--color-text-primary);
    margin-bottom: 0.42rem;
    transition: color var(--transition-theme);
  }

  &__summary {
    font-size: 0.875rem;
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
    margin-top: auto;
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
  transition: background var(--transition-theme), color var(--transition-theme),
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
