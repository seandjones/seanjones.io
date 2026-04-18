<template>
  <section id="work" class="work" aria-labelledby="work-heading">
    <div class="work__container">
      <div class="work__header">
        <p class="work__eyebrow">Where I've been</p>
        <h2 id="work-heading" class="work__heading">Work History</h2>
        <p class="work__subheading">
          Over 15 years building products at the intersection of engineering leadership
          and hands-on development.
        </p>
      </div>

      <div class="timeline">
        <article
          v-for="(job, index) in jobs"
          :key="index"
          class="timeline__item"
        >
          <!-- Line + dot -->
          <div class="timeline__track" aria-hidden="true">
            <div class="timeline__dot"></div>
            <div class="timeline__line"></div>
          </div>

          <!-- Card -->
          <div class="timeline__card">
            <div class="timeline__meta">
              <span class="timeline__period">{{ job.period }}</span>
            </div>
            <h3 class="timeline__role">{{ job.role }}</h3>
            <p v-if="job.company_link">
              <a :href="job.company_link" target="_blank" rel="noopener noreferrer">{{
                job.company
              }}</a>
            </p>
            <p v-else>{{ job.company }}</p>
            <p class="timeline__description">{{ job.description }}</p>
            <ul
              class="timeline__contributions"
              :aria-label="`Key contributions at ${job.company}`"
            >
              <li
                v-for="(point, i) in job.contributions"
                :key="i"
                class="timeline__contribution"
              >
                {{ point }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Job {
  role: string;
  company: string;
  company_link?: string;
  period: string;
  description: string;
  contributions: string[];
}

const jobs: Job[] = [
  {
    role: "Director of Engineering",
    company: "Price.com",
    company_link: "https://price.com",
    period: "Nov 2016 – Present",
    description:
      "Led development of core platform features for a large-scale product matching system delivering pricing transparency across consumer and enterprise products.",
    contributions: [
      "Drove architecture and development across web applications and browser extensions (Chrome, Firefox, Safari) using a range of technologies including TypeScript, Angular, Python (Django and Fastapi) and AWS services (S3, EC2, Cloudfront)",
      "Defined and executed frontend architecture decisions for development of LLM-Powered Discovery Interface product, including component design, state management, and API integration",
      "Led technical decision-making for scalable frontend and backend systems",
      "Contributed to product strategy and execution across both consumer-facing and enterprise offerings",
      "Established and maintained development workflows, tooling, and release processes",
      "Built and optimized high-performance user experiences across modern JavaScript frameworks",
    ],
  },
  {
    role: "Senior Web Developer",
    company: "Marlin Connections",
    company_link: "https://www.marlinconnections.net/",
    period: "Aug 2012 – Nov 2016",
    description:
      "Developed and maintained enterprise-level web applications for global clients across multiple industries.",
    contributions: [
      "Delivered end-to-end web applications across Microsoft and LAMP stacks (C#, PHP, SQL Server, MySQL, Apache, IIS, Django)",
      "Designed and implemented scalable database structures and backend systems",
      "Managed deployments, staging environments, and production releases",
      "Partnered with stakeholders to translate business requirements into technical solutions",
    ],
  },
  {
    role: "IT Programmer",
    company: "Springfield ReManufacturing Corp.",
    company_link: "https://www.srcreman.com/",
    period: "2011 – 2012",
    description:
      "Developed internal tools and web applications to improve operational efficiency.",
    contributions: [
      "Established workflows and managed day-to-day development tasks",
      "Built internal tools and web applications to improve operational efficiency using PHP, MySQL, and JavaScript on IIS Servers",
      "Collaborated with internal teams to deliver business-critical solutions",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Marlin Connections",
    company_link: "https://www.marlinconnections.net/",
    period: "2010 – 2011",
    description:
      "Built MVC-based web applications using C# and gained foundational experience in full-stack development and software architecture.",
    contributions: [
      "Built MVC-based web applications using C#, SQL Server, IIS",
      "Gained foundational experience in full-stack development and software architecture",
      "Working with designers and project managers to deliver client projects on time and within scope using SCSS/SASS, JavaScript, and HTML",
      "Converting designs and wireframes into high-quality code across multiple projects and clients",
    ],
  },
];
</script>

<style lang="scss" scoped>
.work {
  padding: 5rem 1.5rem;
  background: var(--color-bg);
  transition: background var(--transition-theme);

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }

  &__container {
    max-width: 860px;
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 4rem;
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
    line-height: 1.6;
  }
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;

  &__item {
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 0 1.25rem;
    position: relative;

    @media (min-width: 640px) {
      grid-template-columns: 40px 1fr;
      gap: 0 1.75rem;
    }
  }

  // ─── Track (dot + vertical line) ───────────────────────────────────────────

  &__track {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    padding-top: 0.5rem;
  }

  &__dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--color-accent);
    border: 2.5px solid var(--color-bg);
    box-shadow: 0 0 0 2px var(--color-accent);
    flex-shrink: 0;
    transition: background var(--transition-theme), border-color var(--transition-theme),
      box-shadow var(--transition-theme);
    position: relative;
    z-index: 1;
  }

  &__line {
    width: 2px;
    flex: 1;
    background: var(--color-border);
    margin-top: 6px;
    transition: background var(--transition-theme);
    min-height: 1.5rem;
  }

  // Hide the line on the last item's track
  &__item:last-child &__line {
    display: none;
  }

  // ─── Card ──────────────────────────────────────────────────────────────────

  &__card {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-card);
    transition: background var(--transition-theme), border-color var(--transition-theme),
      box-shadow var(--transition-theme);

    @media (min-width: 640px) {
      padding: 1.75rem 2rem;
    }

    &:hover {
      box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);

      [data-theme="dark"] & {
        box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4);
      }
    }
  }

  &__meta {
    margin-bottom: 0.5rem;
  }

  &__period {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  &__role {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: var(--color-text-primary);
    line-height: 1.3;
    margin-bottom: 0.2rem;

    @media (min-width: 640px) {
      font-size: 1.25rem;
    }
  }

  &__company {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    margin-bottom: 0.875rem;
  }

  &__description {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
    line-height: 1.65;
    margin-bottom: 1rem;
  }

  &__contributions {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  &__contribution {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.55;
    padding-left: 1.1rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.55em;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--color-accent);
      opacity: 0.6;
    }
  }
}
</style>
