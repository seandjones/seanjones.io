<template>
  <section
    id="work"
    class="work"
    aria-labelledby="work-heading"
    role="region"
    aria-describedby="work-description"
  >
    <div class="work__container">
      <div class="work__header">
        <h2 id="work-heading" class="work__heading">Experience</h2>
        <p id="work-description" class="work__subheading">
          Combines deep technical expertise with product and engineering leadership to deliver high-performance, scalable systems.
        </p>
      </div>

      <div class="timeline">
        <article
          v-for="(job, index) in jobs"
          :key="index"
          class="timeline__item"
          :class="{ 'timeline__item--current': index === 0 }"
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
              <span v-if="index === 0" class="timeline__badge">Current</span>
            </div>
            <h3 class="timeline__role">{{ job.role }}</h3>
            <p v-if="job.company_link" class="timeline__company">
              <a
                class="timeline__company-link"
                :href="job.company_link"
                target="_blank"
                rel="noopener noreferrer"
                >{{ job.company }}</a
              >
            </p>
            <p v-else class="timeline__company">{{ job.company }}</p>
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
      "Leading engineering teams to build scalable web applications and browser extensions that enhance product discovery and price comparison for millions of transactions.",
    contributions: [
      "Boosted user click-through rate (CTR) on AI recommendations by 15% by leading the frontend architecture, state management, and interface responsiveness for an LLM-powered product discovery platform.",
      "Spearheaded frontend and backend architecture across web applications and browser extensions (Chrome, Firefox, Safari), resulting in reduced load times by 20%, by deploying solutions using TypeScript, Angular, Python, and AWS.",
      "Decreased deployment time by 25%, increasing team velocity, by establishing standardized development workflows, tooling, and release processes.",
      "Improved application performance 4x (validated via Lighthouse) and enhanced user experience across modern JavaScript applications by optimizing rendering, API integration patterns, and frontend architecture decisions.",
      "Partnered with product and executive stakeholders to align technical roadmap with business priorities.",
      "Led cross-functional engineering initiatives spanning frontend architecture, platform scalability, and release operations across distributed teams.",
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
      "Delivered scalable enterprise-level web applications for global clients, generating 22% increase in client revenue, by utilizing Microsoft and LAMP stacks (C#, PHP, Python/Django, SQL Server, IIS, Apache).",
      "Achieved a 99% successful deployment rate, drastically minimizing the need for production rollbacks, by implementing automated deployment workflows and scalable backend architectures.",
    ],
  },
  {
    role: "IT Programmer",
    company: "Springfield ReManufacturing Corp.",
    company_link: "https://www.srcreman.com/",
    period: "Aug 2011 – Aug 2012",
    description:
      "Developed internal tools and web applications to improve operational efficiency.",
    contributions: [
      "Increased operational efficiency by 20%, saving hundreds of manual hours weekly, by building and deploying internal PHP, MySQL, and JavaScript tools on IIS Servers.",
      "Achieved a 100% adoption rate among internal teams, measured by active daily users, by collaborating across departments to deliver business-critical solutions.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Marlin Connections",
    company_link: "https://www.marlinconnections.net/",
    period: "Nov 2010 – Aug 2011",
    description:
      "Built MVC-based web applications using C# and gained foundational experience in full-stack development and software architecture.",
    contributions: [
      "Developed MVC-based web applications using C#, SQL Server, IIS, JavaScript, and SCSS/SASS for multiple client engagements. Maintained a 100% on-time delivery record across 5 concurrent client web application projects.",
      "Converted wireframes and visual designs into responsive, production-ready applications, improving delivery speed and frontend consistency across projects.",
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
      box-shadow: var(--shadow-card-hover);
    }
  }

  // Current role card gets accent left border
  &__item--current &__card {
    border-color: color-mix(in srgb, var(--color-accent) 44%, var(--color-border));
    background: linear-gradient(
      138deg,
      color-mix(in srgb, var(--color-accent) 9%, var(--color-bg-card)) 0%,
      var(--color-bg-card) 42%
    );
    box-shadow: 0 16px 38px color-mix(in srgb, var(--color-accent) 17%, transparent),
      var(--shadow-card);
  }

  &__item--current &__dot {
    box-shadow: 0 0 0 2px var(--color-accent),
      0 0 0 7px color-mix(in srgb, var(--color-accent) 22%, transparent);
  }

  &__meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.5rem;
  }

  &__period {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    padding: 0.15rem 0.5rem;
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    color: var(--color-accent);
    border: 1px solid color-mix(in srgb, var(--color-accent) 35%, transparent);
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-left: 0.6rem;
    vertical-align: middle;
    transition: background var(--transition-theme), border-color var(--transition-theme);
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

  &__company-link {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    color: inherit;
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--color-accent) 40%, transparent);
    text-underline-offset: 0.2em;

    &:hover {
      color: var(--color-text-primary);
      text-decoration-color: var(--color-accent);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
      border-radius: 3px;
    }
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
