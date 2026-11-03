<template>
  <section id="work" class="section work" aria-labelledby="work-heading">
    <div class="section__inner">
      <header class="section__head">
        <h2 id="work-heading" class="t-display">Work</h2>
      </header>

      <template v-for="group in groups" :key="group.id">
        <h3 v-if="group.heading" :id="`${group.id}-heading`" class="t-title work__group">{{ group.heading }}</h3>

        <article
          v-for="study in group.studies"
          :id="study.id"
          :key="study.id"
          class="study"
          :class="{ 'study--earlier': group.earlier }"
          :aria-labelledby="`${study.id}-title`"
        >
          <div class="study__head">
            <div class="study__titlerow">
              <component :is="group.earlier ? 'h4' : 'h3'" :id="`${study.id}-title`" class="t-title study__title">
                {{ study.title }}
              </component>
              <button
                type="button"
                class="study__copy"
                :aria-label="`Copy link to ${study.title}`"
                @click="copyLink(study.id)"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>
              <span class="study__copied" aria-live="polite">{{ copied === study.id ? 'Link copied' : '' }}</span>
            </div>
            <p v-if="study.lines.length" class="study__lines">
              <span class="visually-hidden">Lines: </span>
              <span v-for="line in study.lines" :key="line" class="bullet" :class="`bullet--${line}`">{{ lineNames[line] }}</span>
            </p>
            <p class="study__summary">{{ study.summary }}</p>
            <p v-if="study.live" class="study__live">
              <a :href="study.live.url" target="_blank" rel="noopener noreferrer">
                Visit {{ study.live.domain }}<span class="visually-hidden"> (opens in a new tab)</span>
              </a>
            </p>
          </div>

          <figure v-if="study.image" class="study__shot">
            <img
              :src="`/work/${study.image.name}-1200.webp`"
              :srcset="`/work/${study.image.name}-720.webp 720w, /work/${study.image.name}-1200.webp 1200w`"
              :sizes="group.earlier ? '(min-width: 960px) 30vw, 100vw' : '(min-width: 960px) 50vw, 100vw'"
              width="1200"
              height="750"
              :alt="study.image.alt"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div class="study__body">
            <section v-if="study.result.length" class="part part--result">
              <component :is="group.earlier ? 'h5' : 'h4'" class="t-label part__label">Result</component>
              <p v-for="(p, i) in study.result" :id="p.id" :key="i" class="part__text">{{ p.text }}</p>
            </section>

            <details class="disclosure study__more">
              <summary class="disclosure__summary">Full case study</summary>
              <section v-if="study.problem.length" class="part">
                <component :is="group.earlier ? 'h5' : 'h4'" class="t-label part__label">Problem</component>
                <p v-for="(p, i) in study.problem" :id="p.id" :key="i" class="part__text">{{ p.text }}</p>
              </section>
              <section v-if="study.did.length" class="part">
                <component :is="group.earlier ? 'h5' : 'h4'" class="t-label part__label">What I did</component>
                <ul class="part__list">
                  <li v-for="(p, i) in study.did" :id="p.id" :key="i" class="part__text">
                    <strong v-if="p.label" class="part__sub">{{ p.label }}.</strong>
                    {{ p.text }}
                  </li>
                </ul>
              </section>
            </details>
          </div>
        </article>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { caseStudies, lineNames } from '../content/site'

// Current Price.com work leads; 2012–2016 client work gets a compact group of its own.
const groups = [
  { id: 'work-current', heading: null, earlier: false, studies: caseStudies.filter((s) => !s.earlier) },
  { id: 'work-earlier', heading: 'Earlier work, 2012–2016', earlier: true, studies: caseStudies.filter((s) => s.earlier) },
]

const copied = ref<string | null>(null)
let timer: number | undefined

async function copyLink(id: string) {
  const url = `${window.location.origin}${window.location.pathname}#${id}`
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    // Clipboard can be unavailable (insecure context, denied permission). Fall back to the address bar.
    history.replaceState(null, '', `#${id}`)
  }
  copied.value = id
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    copied.value = null
  }, 2400)
}

onUnmounted(() => window.clearTimeout(timer))
</script>

<style lang="scss" scoped>
.study {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  grid-template-areas:
    'head body'
    'shot body';
  gap: clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 5vw, 4.5rem);
  padding: clamp(2rem, 4vw, 3.5rem) 0;
  border-bottom: 1px solid var(--rule);
  scroll-margin-top: 5rem;

  &:first-of-type {
    padding-top: 0;
  }

  @media (max-width: 959px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'head'
      'shot'
      'body';
  }
}

// Earlier client work: a compact row, smaller picture, same structure.
.study--earlier {
  grid-template-columns: minmax(0, 5fr) minmax(0, 4fr) minmax(0, 3fr);
  grid-template-areas: 'head body shot';
  padding: 1.75rem 0;

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: 959px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'head'
      'body'
      'shot';
  }
}

.work__group {
  margin-top: clamp(2.5rem, 5vw, 4rem);
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--rule-strong);
}

.study__head {
  grid-area: head;
}

.study__titlerow {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
}

.study__title {
  min-width: 0;
  padding-top: 0.55rem;
}

.study__copy {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: none;
  color: var(--ink-2);
  cursor: pointer;

  &:hover {
    color: var(--ink);
    background: var(--ground-2);
  }
}

// Sits under the icon so the title row never reflows when it appears.
.study__copied {
  position: absolute;
  right: 0;
  top: 100%;
  font-size: var(--fs-label);
  font-weight: 700;
  white-space: nowrap;
}

.study__lines {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.study__summary {
  margin-top: 0.75rem;
  color: var(--ink-2);
  max-width: 52ch;
}

.study__live {
  margin-top: 0.75rem;

  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-weight: 800;
  }
}

.study__shot {
  grid-area: shot;
  margin: 0;
  align-self: start;

  img {
    width: 100%;
    height: auto;
    border: 2px solid var(--rule-strong);
  }
}

.study__body {
  grid-area: body;
  display: grid;
  gap: 1.25rem;
  align-content: start;
}

.part__label {
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--rule);
}

.part__list {
  list-style: none;
  display: grid;
  gap: 0.9rem;
}

.part__text {
  max-width: var(--measure);
  scroll-margin-top: 6rem;
}

.part__sub {
  font-weight: 800;
}

// The result leads: it is the one line a scanning reader should not miss.
.part--result .part__text {
  font-size: var(--fs-title);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.005em;
}

.study--earlier .part--result .part__text {
  font-size: var(--fs-body);
}

.study__more {
  .part + .part {
    margin-top: 1.5rem;
  }

  .part:first-of-type {
    margin-top: 1rem;
  }
}
</style>
