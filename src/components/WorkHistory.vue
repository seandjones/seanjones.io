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
          Combines deep technical expertise with product and engineering leadership to deliver
          high-performance, scalable systems, both inside a venture-backed startup and across
          independently built products.
        </p>
      </div>

      <div class="work__current" role="list" aria-label="Current roles">
        <article
          v-for="role in currentRoles"
          :key="`${role.company}-${role.role}`"
          class="featured-role"
          role="listitem"
          :aria-label="`Current role at ${role.company}`"
        >
          <div class="featured-role__meta">
            <span class="featured-role__period">{{ role.period }}</span>
            <span class="featured-role__badge">Current Role</span>
          </div>
          <h3 class="featured-role__role">{{ role.role }}</h3>
          <p v-if="role.company_link" class="featured-role__company">
            <a
              class="featured-role__company-link"
              :href="role.company_link"
              target="_blank"
              rel="noopener noreferrer"
              >{{ role.company }}</a
            >
          </p>
          <p v-else class="featured-role__company">{{ role.company }}</p>
          <p class="featured-role__description">{{ role.description }}</p>
          <ul
            class="featured-role__contributions"
            :aria-label="`Key contributions at ${role.company}`"
          >
            <li
              v-for="(point, i) in role.contributions"
              :key="i"
              class="featured-role__contribution"
            >
              {{ point }}
            </li>
          </ul>
        </article>
      </div>

      <p class="work__bridge">Previous Roles</p>

      <div class="timeline" aria-label="Earlier experience timeline">
        <article v-for="(job, index) in previousRoles" :key="index" class="timeline__item">
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
  /** Concurrent present-day roles render as featured cards above the timeline. */
  current?: boolean;
}

const jobs: Job[] = [
  {
    role: "Director of Engineering",
    company: "Price.com",
    company_link: "https://price.com",
    period: "Nov 2022 – Present",
    current: true,
    description:
      "Sole technical lead in a lean startup environment: owning architecture, platform strategy, and engineering operations across frontend, backend, and browser extension surfaces.",
    contributions: [
      "Architected and delivered an LLM-powered product discovery platform, owning frontend architecture, state management, and API integration that resulted in a 15% increase in user CTR on AI-driven recommendations.",
      "Improved application performance 4x (validated via Lighthouse) by overhauling rendering pipelines, API integration patterns, and frontend architecture across modern JavaScript applications.",
      "Spearheaded frontend and backend architecture across web applications and browser extensions (Chrome, Firefox, Safari, Edge), reducing load times by 20% using TypeScript, Angular, Python, and AWS.",
      "Decreased deployment time by 25% by establishing standardized development workflows, tooling, and CI/CD release processes from the ground up."
    ],
  },
  {
    role: "Founder",
    company: "TaskRiver.ai",
    company_link: "https://taskriver.ai",
    period: "2026 – Present",
    current: true,
    description:
      "Founded and run an automation practice that helps local service businesses replace repetitive manual work with reliable systems, spanning client engagements and a portfolio of independently operated products.",
    contributions: [
      "Design and implement custom automation systems covering missed call recovery, lead capture and qualification, estimate follow-up, review request workflows, CRM synchronization, and appointment reminders.",
      "Built and operate WhatContractorsPay.com, a construction software pricing database where every submitted figure is verified against a state contractor-license board before publication.",
      "Building The Family Shortlist, a directory pairing Colorado dementia care facilities with CDPHE health inspection data for families comparing care options.",
      "Publish FSMA Radar, a weekly regulatory digest for QA and food-safety managers, built on automated monitoring of the Federal Register, the eCFR, and FDA enforcement activity.",
      "Own the full stack of each venture end to end: product definition, architecture, data pipelines, frontend, and go-to-market.",
    ],
  },
   {
    role: "Lead Software Engineer",
    company: "Price.com",
    company_link: "https://price.com",
    period: "Nov 2016 – Nov 2022",
    description:
      "Led engineering efforts across frontend and browser extension development, driving architectural decisions and delivery milestones in a fast-paced startup environment.",
    contributions: [
      "Partnered directly with product and executive stakeholders to define and execute technical roadmap, translating business priorities into architectural decisions and delivery milestones.",
      "Led cross-functional engineering initiatives spanning frontend architecture (Django/SCSS/JavaScript/HTML5), platform scalability, and release operations across a distributed remote team.",
      "Rewrote all browser extensions to be fully featured in-browser experiences using Angular and TypeScript and handled all deployments for Chrome, Firefox, Edge and Safari including release processes and versioning."
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

const currentRoles = jobs.filter((job) => job.current);
const previousRoles = jobs.filter((job) => !job.current);
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

  &__current {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  &__bridge {
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-secondary);
    margin: 0 0 1.25rem 3px;
  }
}

// ─── Featured Current Role ──────────────────────────────────────────────────

.featured-role {
  background: linear-gradient(
    138deg,
    color-mix(in srgb, var(--color-accent) 10%, var(--color-bg-card)) 0%,
    var(--color-bg-card) 44%
  );
  border: 1px solid color-mix(in srgb, var(--color-accent) 48%, var(--color-border));
  border-radius: var(--radius-card);
  box-shadow: 0 16px 38px color-mix(in srgb, var(--color-accent) 17%, transparent),
    var(--shadow-card);
  padding: 1.5rem;
  transition: background var(--transition-theme), border-color var(--transition-theme),
    box-shadow var(--transition-theme);

  @media (min-width: 640px) {
    padding: 1.75rem 2rem;
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

  // Without an explicit color the badge inherits near-black body text and
  // disappears against the dark-theme card surface.
  &__badge {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-on-accent);
    background: var(--color-accent);
    border-radius: 999px;
    padding: 0.18rem 0.6rem;
    margin-left: 0.35rem;
    transition: color var(--transition-theme), background var(--transition-theme);
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
      opacity: 0.7;
    }
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
