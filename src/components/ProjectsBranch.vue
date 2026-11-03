<template>
  <section id="projects" class="section projects" aria-labelledby="projects-heading">
    <div class="section__inner">
      <header class="section__head">
        <h2 id="projects-heading" class="t-display">Projects</h2>
      </header>
      <p class="section__intro projects__intro">Independent products I've built and run on my own time.</p>

      <ol class="branch">
        <li v-for="project in independentProjects" :id="project.id" :key="project.id" class="branch__stop">
          <span class="branch__tick" aria-hidden="true"></span>
          <h3 class="t-title">{{ project.title }}</h3>
          <img
            class="branch__shot"
            :src="`/work/${project.image.name}-720.webp`"
            :srcset="`/work/${project.image.name}-720.webp 720w, /work/${project.image.name}-1200.webp 1200w`"
            sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw"
            width="720"
            height="450"
            :alt="project.image.alt"
            loading="lazy"
            decoding="async"
          />
          <p class="branch__summary">{{ project.summary }}</p>
          <a class="branch__visit" :href="project.url" target="_blank" rel="noopener noreferrer">
            Visit {{ project.domain }}<span class="visually-hidden"> (opens in a new tab)</span>
          </a>
          <details class="disclosure branch__details">
            <summary class="disclosure__summary">How it works</summary>
            <dl>
              <template v-if="project.problem.length">
                <dt class="t-label">Problem</dt>
                <dd v-for="(p, i) in project.problem" :key="`p${i}`">{{ p.text }}</dd>
              </template>
              <template v-if="project.did.length">
                <dt class="t-label">What I did</dt>
                <dd v-for="(p, i) in project.did" :key="`d${i}`">
                  <strong v-if="p.label">{{ p.label }}. </strong>{{ p.text }}
                </dd>
              </template>
              <template v-if="project.result.length">
                <dt class="t-label">Result</dt>
                <dd v-for="(p, i) in project.result" :key="`r${i}`">{{ p.text }}</dd>
              </template>
            </dl>
          </details>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { independentProjects } from '../content/site'
</script>

<style lang="scss" scoped>
.projects {
  background: var(--ground-2);
}

.projects__intro {
  margin: -1.75rem 0 2.5rem;
}

// A branch line: dashed ink, the transit-map convention for a secondary route.
.branch {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem clamp(1.25rem, 2.5vw, 2rem);
  padding-top: 2.25rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top: 5px dashed var(--ink);
  }

  @media (max-width: 1099px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
    padding-top: 0;
    padding-left: 1.5rem;

    &::before {
      right: auto;
      bottom: 0;
      border-top: none;
      border-left: 5px dashed var(--ink);
    }
  }
}

.branch__stop {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  scroll-margin-top: 6rem;
}

.branch__tick {
  position: absolute;
  top: -2.25rem;
  left: 0;
  width: 5px;
  height: 1.1rem;
  background: var(--ink);

  @media (max-width: 639px) {
    top: 0.45rem;
    left: -1.5rem;
    width: 1.1rem;
    height: 5px;
  }
}

.branch__shot {
  width: 100%;
  height: auto;
  border: 2px solid var(--rule-strong);
}

.branch__summary {
  flex: 1;
  color: var(--ink-2);
}

.branch__visit {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-weight: 800;
}

.branch__details {
  border-top: 1px solid var(--rule);

  dl {
    display: grid;
    gap: 0.4rem;
    padding-bottom: 0.5rem;
  }

  dt {
    margin-top: 0.6rem;
    color: var(--ink-2);
  }

  dd {
    font-size: var(--fs-body);
  }
}
</style>
