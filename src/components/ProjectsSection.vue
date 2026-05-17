<template>
  <section id="projects" class="projects" aria-labelledby="projects-heading">
    <div class="projects__container">
      <div class="projects__header">
        <p class="projects__eyebrow">Selected work</p>
        <h2 id="projects-heading" class="projects__heading">Case Studies</h2>
        <p class="projects__subheading">
          Placeholder projects for now. The section is data-driven so cards and detail bullets can
          scale without layout changes.
        </p>
      </div>

      <div class="projects__grid">
        <article
          v-for="project in items"
          :key="project.id"
          class="project-tile"
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
              @click="openProjectModal(project)"
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
          <div class="project-modal__panel">
            <button
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

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
    imageSrc: "/project-placeholder.svg",
    imageAlt: "Price.com platform visual placeholder",
    title: "Price.com Web Application and Extension Platform",
    description:
      "Full ownership of the price.com web application and extension platform, including a major frontend rewrite and new feature development across the stack (Python/Django/Typescript/Angular).",
    details: [
      "Problem: Needed to modernize a legacy codebase, development workflows and architecture to support rapid growth and new use cases.",
      "Solution: Led a successful rewrite of the frontend from vanilla css/Javascript to SASS/Typescript and establishing github flow best practices. Drove adoption of a new component library, while also leading backend improvements to support new features and performance goals.",
      "Impact: The rewrite and platform improvements enabled a increases in development velocity, while also improving performance and reliability. The new architecture and design system laid the foundation for future growth and innovation across the product.",
    ],
  },
   {
    id: "case-study-4",
    imageSrc: "/project-placeholder.svg",
    imageAlt: "ai.price.com visual placeholder",
    title: "Smart shopping assistant for ai.price.com",
    description:
      "Frontend Development of an LLM-powered pricing/cash back/coupons optimization platform for consumers, helping them maximize savings and make informed purchasing decisions.",
    details: [
      "Challenge: Consumers needed a smarter way to navigate the complex world of online shopping and pricing, with dynamic pricing, numerous options and overwhelming information.",
      "Solution: Worked with the team to develop a smart shopping assistant using FastAPI/Websockets/Javascript/SCSS and integrated it with LLMs to provide personalized pricing insights, product recommendations and deal alerts. The assistant analyzed user preferences, browsing behavior and market trends to help users find the best deals and make informed purchasing decisions.",
      "Impact: The smart shopping assistant improved user engagement and satisfaction, helping users save money and make better purchasing decisions. The integration of LLMs provided a unique and valuable user experience, setting ai.price.com apart in the competitive online shopping space.",
    ],
  },
  {
    id: "case-study-2",
    imageSrc: "/project-placeholder.svg",
    imageAlt: "Starbucks Branded Solutions visual placeholder",
    title: "Starbucks Branded Solutions E-commerce Platform",
    description:
      "Ground up development and launch of a new e-commerce platform for Starbucks Branded Solutions, a B2B division providing coffee and related products to businesses across the US.",
    details: [
      "Challenge: Build a scalable, user-friendly e-commerce platform to support Starbucks Branded Solutions' growth and evolving customer needs.",
      "Approach: Led the end-to-end development of the new platform, including architecture design (C#/Umbraco/SCSS/Javascript), technology selection, and cross-functional collaboration with design, product and stakeholders. Implemented key features such as personalized product recommendations, streamlined checkout and robust inventory management.",
      "Results: The platform launch was a success, driving significant increases in online sales and customer engagement for Starbucks Branded Solutions. The new architecture and features positioned the business for continued growth and innovation in the B2B e-commerce space.",
      "Key learnings: The project reinforced the importance of user-centered design, cross-functional collaboration and scalable architecture in building successful e-commerce platforms. It also highlighted the value of iterative development and continuous improvement based on user feedback and data.",
    ],
  },


  {
    id: "case-study-3",
    imageSrc: "/project-placeholder.svg",
    imageAlt: "Procter & Gamble Pro PDF Generator visual placeholder",
    title: "Procter & Gamble Pro PDF Generator Tool",
    description:
      "Development of a PDF generation tool for Procter & Gamble's sales team, enabling them to create customized sales materials and presentations on demand.",
    details: [
      "Challenge: Sales team needed a more efficient way to create customized sales materials and presentations, which were previously created manually and time-consuming.",
      "Solution: Developed a PDF generation tool using C#/iTextSharp and a templating engine driven by Angular, allowing the sales team to easily create customized materials by inputting key information and selecting from pre-designed templates.",
      "Impact: The tool significantly reduced the time and effort required for the sales team to create customized materials, improving efficiency and enabling more timely and effective client interactions.",
    ],
  },
];

const props = defineProps<{
  items?: CaseStudy[];
}>();

const items = computed(() => props.items ?? defaultProjects);
const activeProject = ref<CaseStudy | null>(null);

function openProjectModal(project: CaseStudy) {
  activeProject.value = project;
}

function closeProjectModal() {
  activeProject.value = null;
}

function onEscapeKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && activeProject.value) {
    closeProjectModal();
  }
}

watch(activeProject, (project) => {
  document.body.style.overflow = project ? 'hidden' : '';
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
  padding: 5rem 1.5rem;
  background:
    radial-gradient(circle at 12% 10%, color-mix(in srgb, var(--color-accent) 11%, transparent), transparent 45%),
    linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%);
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
    margin-bottom: 3rem;
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
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.65;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: 700px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1050px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}

.project-tile {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-theme),
    background var(--transition-theme);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.14), 0 2px 10px rgba(0, 0, 0, 0.06);
  }

  [data-theme='dark'] &:hover {
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.38);
  }

  &__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
    border-bottom: 1px solid var(--color-border);
  }

  &__body {
    padding: 1.1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (min-width: 768px) {
      padding: 1.25rem;
    }
  }

  &__title {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-text-primary);
    line-height: 1.25;
  }

  &__description {
    font-size: 0.92rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  &__button {
    margin-top: auto;
    align-self: flex-start;
    border: 1px solid var(--color-accent);
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    color: var(--color-accent);
    padding: 0.5rem 0.8rem;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background var(--transition-base), color var(--transition-base),
      transform var(--transition-base), box-shadow var(--transition-base);

    &:hover {
      background: var(--color-accent);
      color: var(--color-on-accent);
      transform: translateY(-1px);
      box-shadow: 0 6px 16px color-mix(in srgb, var(--color-accent) 32%, transparent);
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
  background: color-mix(in srgb, var(--color-bg) 40%, black 60%);
}

.project-modal__panel {
  width: min(760px, 100%);
  max-height: min(88vh, 860px);
  overflow-y: auto;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.35);
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
</style>
