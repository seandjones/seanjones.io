<template>
  <section id="projects" class="projects" aria-labelledby="projects-heading" role="region" aria-describedby="projects-description">
    <div class="projects__container">
      <div class="projects__header">
        <p class="projects__eyebrow">Selected work</p>
        <h2 id="projects-heading" class="projects__heading">Case Studies</h2>
        <p id="projects-description" class="projects__subheading">
          End-to-end product and platform work spanning consumer-facing, e-commerce, and internal
          sales tooling. Each case study highlights the challenge, approach, and measurable impact.
        </p>
      </div>

      <div class="projects__grid">
        <article
          v-for="(project, index) in items"
          :key="project.id"
          class="project-tile"
          :class="{ 'project-tile--featured': index === 0 }"
          :aria-label="`${project.title} case study`"
        >
          <img
            class="project-tile__image"
            :src="project.imageSrc"
            :alt="project.imageAlt"
            loading="lazy"
            decoding="async"
          />

          <div class="project-tile__body">
            <h3 class="project-tile__title">{{ project.title }}</h3>
            <p class="project-tile__description">{{ project.description }}</p>

            <button
              type="button"
              class="project-tile__button"
              :aria-label="`Open ${project.title} details`"
              @click="openProjectModal(project, $event)"
            >
              View Case Study
            </button>
          </div>
        </article>
      </div>

      <transition name="project-modal">
        <div
          v-if="activeProject"
          class="project-modal"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`project-modal-title-${activeProject.id}`"
          @click.self="closeProjectModal"
        >
          <div ref="modalPanelRef" class="project-modal__panel">
            <button
              ref="closeButtonRef"
              type="button"
              class="project-modal__close"
              aria-label="Close case study details"
              @click="closeProjectModal"
            >
              Close
            </button>

            <img
              class="project-modal__image"
              :src="activeProject.imageSrc"
              :alt="activeProject.imageAlt"
              loading="lazy"
              decoding="async"
            />

            <h3 :id="`project-modal-title-${activeProject.id}`" class="project-modal__title">
              {{ activeProject.title }}
            </h3>
            <p class="project-modal__description">{{ activeProject.description }}</p>

            <ul class="project-modal__details" :aria-label="`${activeProject.title} highlights`">
              <li
                v-for="(detail, index) in activeProject.details"
                :key="`${activeProject.id}-modal-detail-${index}`"
                class="project-modal__detail"
              >
                {{ detail }}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

interface CaseStudy {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  details: string[];
}

// Content model remains plain and nested for easy future extraction to its own route/data source.
const defaultProjects: CaseStudy[] = [
  {
    id: "case-study-1",
    imageSrc: "/project-price-platform.svg",
    imageAlt: "Price.com platform architecture and delivery metrics dashboard interface",
    title: "Price.com Web Application and Extension Platform",
    description:
      "Full ownership of the Price.com web application and browser extension platform, including a major frontend rewrite and sustained feature development across a Python/Django/TypeScript/Angular stack serving thousands of users.",
    details: [
      "Problem: Legacy vanilla JS/CSS codebase was bottlenecking velocity; inconsistent architecture was compounding onboarding and scaling costs.",
      "Solution: Led a full frontend rewrite to TypeScript/SCSS, introduced a shared component library, established GitHub Flow with automated CI/CD gates, and shipped backend improvements alongside the new frontend.",
      "Impact: Deployment frequency increased 3×, time-to-feature dropped ~40%. The architecture directly enabled the LLM-powered discovery interface shipped 18 months later.",
    ],
  },
   {
    id: "case-study-4",
    imageSrc: "/project-ai-assistant.svg",
    imageAlt: "AI shopping assistant conversation interface with personalized deal recommendations",
    title: "Smart Shopping Assistant: ai.price.com",
    description:
      "Frontend architecture and development of an LLM-powered pricing, cash-back, and coupon optimization assistant, helping consumers cut through decision paralysis and find the best deal, fast.",
    details: [
      "Challenge: Price comparison data is abundant but overwhelming, and users needed a conversational layer that surfaces what matters and explains trade-offs in plain language.",
      "Solution: Built the frontend using FastAPI/WebSockets/TypeScript/SCSS, integrating LLM-generated insights for personalized deal recommendations and real-time pricing context.",
      "Impact: Session duration increased 35% and conversion rate for users who engaged with AI recommendations rose 28% within 60 days of launch. Established the agentic UI pattern now central to the product roadmap.",
    ],
  },
  {
    id: "case-study-2",
    imageSrc: "/project-starbucks-b2b.svg",
    imageAlt: "B2B e-commerce catalog and performance analytics interface for Starbucks Branded Solutions",
    title: "Starbucks Branded Solutions: B2B E-commerce Platform",
    description:
      "Ground-up build and launch of a B2B e-commerce platform for the Starbucks Branded Solutions division, serving businesses across the US with custom coffee and product ordering.",
    details: [
      "Challenge: The existing ordering process was manual and error-prone; the division needed a scalable digital channel to support growth without proportionally growing ops headcount.",
      "Approach: Led full-stack development (C#/Umbraco/SCSS/JavaScript), drove architecture and technology selection, and managed cross-functional delivery across design, product, and client stakeholders. Key features included product recommendations, streamlined B2B checkout, and inventory management.",
      "Impact: Online order volume grew 45% in the first quarter post-launch; customer service requests fell 20% through improved self-service checkout and order tracking. The architecture supported a 3× catalog expansion without rework.",
    ],
  },


  {
    id: "case-study-3",
    imageSrc: "/project-pg-generator.svg",
    imageAlt: "Sales PDF generator interface showing configurable template and output preview",
    title: "Procter & Gamble: Sales Materials Generator",
    description:
      "On-demand PDF generation tool for P&G's national sales team, replacing a manual multi-hour process with a self-service Angular + C# application that produces branded materials in minutes.",
    details: [
      "Challenge: Creating customized sales decks and leave-behinds took 4+ hours per rep and introduced frequent formatting errors and brand inconsistencies.",
      "Solution: Built a dynamic PDF generator using C#/iTextSharp with an Angular-driven template engine, where reps enter deal specifics, select a template, and receive print-ready output.",
      "Impact: Materials production time dropped from 4+ hours to under 20 minutes (5× faster). Sales team capacity for client-facing prep increased materially, and the tool was adopted by 100% of the field sales org within two months of launch.",
    ],
  },

];

const props = defineProps<{
  items?: CaseStudy[];
}>();

const items = computed(() => props.items ?? defaultProjects);
const activeProject = ref<CaseStudy | null>(null);
const modalPanelRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);
const returnFocusTarget = ref<HTMLElement | null>(null);

function openProjectModal(project: CaseStudy, event?: MouseEvent) {
  returnFocusTarget.value = (event?.currentTarget as HTMLElement | null) ?? null;
  activeProject.value = project;
}

function closeProjectModal() {
  activeProject.value = null;
}

function onEscapeKey(event: KeyboardEvent) {
  if (!activeProject.value) {
    return;
  }

  if (event.key === 'Escape') {
    closeProjectModal();
    return;
  }

  if (event.key !== 'Tab' || !modalPanelRef.value) {
    return;
  }

  const focusableElements = modalPanelRef.value.querySelectorAll<HTMLElement>(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
  );

  if (!focusableElements.length) {
    return;
  }

  const first = focusableElements.item(0);
  const last = focusableElements.item(focusableElements.length - 1);

  if (!first || !last) {
    return;
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

watch(activeProject, async (project) => {
  document.body.style.overflow = project ? 'hidden' : '';

  if (project) {
    await nextTick();
    closeButtonRef.value?.focus();
  } else {
    returnFocusTarget.value?.focus();
  }
});

onMounted(() => {
  window.addEventListener('keydown', onEscapeKey);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onEscapeKey);
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
.projects {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(5.5rem, 9vw, 8.5rem) 1.2rem;
  background:
    radial-gradient(circle at 88% 8%, color-mix(in srgb, var(--color-accent) 26%, transparent), transparent 42%),
    radial-gradient(circle at 16% 86%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 44%),
    linear-gradient(165deg, color-mix(in srgb, var(--color-accent) 10%, var(--color-bg-secondary)) 0%, var(--color-bg) 58%);
  transition: background var(--transition-theme);

  &::before {
    content: '';
    position: absolute;
    inset: -9rem -22vw auto auto;
    width: min(70vw, 900px);
    height: clamp(180px, 25vw, 340px);
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-accent) 18%, transparent);
    transform: rotate(-8deg);
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto auto -9rem -22vw;
    width: min(72vw, 920px);
    height: clamp(220px, 32vw, 420px);
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-text-primary) 6%, transparent);
    transform: rotate(9deg);
    z-index: -1;
  }

  @media (min-width: 768px) {
    padding: clamp(6rem, 9vw, 9rem) clamp(1.6rem, 5vw, 3rem);
  }

  &__container {
    max-width: 1220px;
    margin: 0 auto;
  }

  &__header {
    text-align: left;
    max-width: 74ch;
    margin-bottom: clamp(2.2rem, 5vw, 4.2rem);
  }

  &__eyebrow {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: 0.75rem;
  }

  &__heading {
    font-size: clamp(2.45rem, 8vw, 5rem);
    font-weight: 780;
    letter-spacing: -0.04em;
    line-height: 0.96;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
    text-wrap: balance;
  }

  &__subheading {
    font-size: clamp(1rem, 1.8vw, 1.16rem);
    color: color-mix(in srgb, var(--color-text-secondary) 94%, var(--color-text-primary));
    max-width: 65ch;
    margin: 0;
    line-height: 1.7;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1rem, 2.5vw, 1.8rem);

    @media (min-width: 700px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1040px) {
      grid-template-columns: repeat(12, minmax(0, 1fr));
      align-items: stretch;
    }
  }
}

.project-tile {
  background: var(--color-bg-card);
  border: 1.4px solid color-mix(in srgb, var(--color-border) 78%, var(--color-accent) 22%);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition:
    transform 0.34s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.34s cubic-bezier(0.22, 1, 0.36, 1),
    border-color var(--transition-theme),
    background var(--transition-theme),
    filter var(--transition-base);

  @media (min-width: 1040px) {
    grid-column: span 6;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-card-hover);
    border-color: color-mix(in srgb, var(--color-accent) 44%, var(--color-border));
    filter: saturate(1.03);
  }

  &--featured {
    @media (min-width: 700px) {
      grid-column: span 2;
    }

    @media (min-width: 1040px) {
      grid-column: span 12;
      display: grid;
      grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);

      .project-tile__image {
        aspect-ratio: auto;
        min-height: 310px;
        border-bottom: none;
        border-right: 1.4px solid color-mix(in srgb, var(--color-border) 78%, var(--color-accent) 22%);
        border-radius: 0;
      }

      .project-tile__body {
        padding: clamp(1.8rem, 3.1vw, 2.8rem) clamp(1.4rem, 2.7vw, 2.4rem);
        justify-content: center;
      }

      .project-tile__title {
        font-size: clamp(1.7rem, 3.4vw, 2.35rem);
        line-height: 1.06;
        max-width: 20ch;
      }

      .project-tile__description {
        font-size: 1.04rem;
      }
    }
  }

  @media (min-width: 1040px) {
    &:nth-child(2) {
      grid-column: span 5;
    }

    &:nth-child(3) {
      grid-column: span 7;
    }

    &:nth-child(4) {
      grid-column: span 6;
    }
  }

  @media (min-width: 1040px) and (max-width: 1279px) {
    &:nth-child(4) {
      margin-top: 0;
    }
  }

  &__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
    border-bottom: 1.4px solid color-mix(in srgb, var(--color-border) 78%, var(--color-accent) 22%);
  }

  &__body {
    padding: 1.2rem 1rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;

    @media (min-width: 768px) {
      padding: 1.4rem 1.35rem 1.3rem;
    }
  }

  &__title {
    font-size: 1.15rem;
    font-weight: 760;
    letter-spacing: -0.018em;
    color: var(--color-text-primary);
    line-height: 1.14;
    text-wrap: pretty;
  }

  &__description {
    font-size: 0.95rem;
    color: var(--color-text-secondary);
    line-height: 1.66;
  }

  &__button {
    margin-top: auto;
    align-self: flex-start;
    min-height: 44px;
    border: 1.4px solid var(--color-accent);
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
    color: var(--color-accent);
    padding: 0.62rem 1.02rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background var(--transition-base), color var(--transition-base),
      transform var(--transition-base), box-shadow var(--transition-base);

    &:hover {
      background: var(--color-accent);
      color: var(--color-on-accent);
      transform: translateY(-1px);
      box-shadow: var(--shadow-accent-hover);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }
}

.project-modal {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: color-mix(in srgb, var(--color-bg) 42%, var(--color-text-primary) 58%);
}

.project-modal__panel {
  width: min(760px, 100%);
  max-height: min(88vh, 860px);
  overflow-y: auto;
  background: var(--color-bg-card);
  border: 1.4px solid color-mix(in srgb, var(--color-border) 74%, var(--color-accent) 26%);
  border-radius: 18px;
  box-shadow: var(--shadow-modal);
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.25rem 1.25rem 1.4rem;
  }
}

.project-modal__close {
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border-radius: 999px;
  padding: 0.45rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: auto;
  display: block;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

.project-modal__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
  margin-top: 0.8rem;
  border: 1px solid var(--color-border);
}

.project-modal__title {
  margin-top: 1rem;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: var(--color-text-primary);
  letter-spacing: -0.015em;
}

.project-modal__description {
  margin-top: 0.5rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

.project-modal__details {
  margin-top: 0.9rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.project-modal__detail {
  position: relative;
  padding-left: 1rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-text-secondary);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.56em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color-accent);
    opacity: 0.7;
  }
}

.project-modal-enter-active,
.project-modal-leave-active {
  transition: opacity 0.2s ease;
}

.project-modal-enter-active .project-modal__panel,
.project-modal-leave-active .project-modal__panel {
  transition: transform 0.22s ease, opacity 0.22s ease;
}

.project-modal-enter-from,
.project-modal-leave-to {
  opacity: 0;
}

.project-modal-enter-from .project-modal__panel,
.project-modal-leave-to .project-modal__panel {
  transform: scale(0.94);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .project-tile,
  .project-tile__button,
  .project-modal-enter-active,
  .project-modal-leave-active,
  .project-modal-enter-active .project-modal__panel,
  .project-modal-leave-active .project-modal__panel {
    transition: none;
  }

  .project-tile:hover,
  .project-tile__button:hover {
    transform: none;
  }
}
</style>
