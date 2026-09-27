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
      "Sole technical lead for a shopping platform with 590,000 monthly active users; own architecture, platform strategy, and engineering operations across web, backend, and browser extensions.",
    contributions: [
      "Built the frontend for ai.price.com, a Gemini-powered shopping assistant for pricing, cash-back, and coupons, designing its state management and the WebSocket integration that renders model output; click-through on AI-driven recommendations rose 15% after launch.",
      "Quadrupled the web app's Lighthouse performance score by reworking rendering, API call patterns, and frontend architecture.",
      "Cut load times 20% across the web app and browser extensions (10,000+ users on Chrome, Firefox, Safari, and Edge) through frontend and backend architecture work in TypeScript, Angular, Python, and AWS.",
      "Established CI/CD and release processes from scratch with GitHub Actions and Docker, standardizing development workflows and cutting deployment time 25%."
    ],
  },
  {
    role: "Founder",
    company: "TaskRiver.ai",
    company_link: "https://taskriver.ai",
    period: "2026 – Present",
    current: true,
    description:
      "Founded and run an automation practice that helps local service businesses replace repetitive manual work with reliable systems, alongside a portfolio of independently operated products.",
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
      "Rewrote the company's browser extensions in Angular and TypeScript as fully featured in-browser experiences, and ran releases and versioning across the Chrome, Firefox, Edge, and Safari stores.",
      "Set the technical roadmap with product and executive leadership, turning business priorities into architecture decisions and delivery milestones.",
      "Led frontend architecture (Django, SCSS, JavaScript), platform scalability, and release operations for a small, distributed remote team."
    ],
  },
  {
    role: "Senior Web Developer",
    company: "Marlinco and The Alchemedia Project (now part of Marlin Connections)",
    company_link: "https://www.marlinconnections.net/",
    period: "Aug 2012 – Nov 2016",
    description: "Marlinco, Aug 2012 – Feb 2015; The Alchemedia Project, Feb 2015 – Nov 2016.",
    contributions: [
      "Built and launched a B2B e-commerce platform for Starbucks Branded Solutions from the ground up, used by businesses across the US to order custom coffee and products.",
      "Created a self-service Angular and C# tool that generates branded PDF sales materials for Procter & Gamble's national sales team, cutting a multi-hour manual process to minutes.",
      "Developed enterprise web applications for global clients on Microsoft and LAMP stacks (C#, PHP, Python/Django, SQL Server, IIS, Apache), contributing to a 22% increase in client revenue.",
      "Automated deployment workflows and reached a 99% successful deployment rate.",
    ],
  },
  {
    role: "IT Programmer",
    company: "Springfield ReManufacturing Corp. (part of SRC Holdings)",
    company_link: "https://www.srcreman.com/",
    period: "Aug 2011 – Aug 2012",
    description:
      "Developed internal tools and web applications to improve operational efficiency.",
    contributions: [
      "Built internal tools in PHP, MySQL, and JavaScript on IIS, adopted across departments and raising operational efficiency 20%.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "The Alchemedia Project (now part of Marlin Connections)",
    company_link: "https://www.marlinconnections.net/",
    period: "Nov 2010 – Aug 2011",
    description:
      "Built MVC-based web applications using C# and gained foundational experience in full-stack development and software architecture.",
    contributions: [
      "Built MVC web applications in C#, SQL Server, and JavaScript across five concurrent client projects.",
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
