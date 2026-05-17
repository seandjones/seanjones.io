<template>
  <template v-if="enabled">
    <svg
      class="cursor-trail-svg"
      aria-hidden="true"
    >
      <line
        v-for="(_, i) in TRAIL_COUNT"
        :key="i"
        :ref="(el) => setSegmentRef(el, i)"
        class="cursor-trail-segment"
        :style="{
          opacity: ((1 - i / (TRAIL_COUNT - 1)) * 0.7).toFixed(2),
          strokeWidth: `${Math.max(0.5, (1 - i / (TRAIL_COUNT - 1)) * 12).toFixed(1)}px`,
        }"
        x1="-1" y1="-1" x2="-1" y2="-1"
      />
    </svg>
    <div
      ref="followerRef"
      class="cursor-follower"
      aria-hidden="true"
    />
  </template>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const TRAIL_COUNT = 10

const enabled = ref(false)
const followerRef = ref<HTMLElement | null>(null)
const segmentRefs: Array<Element | null> = Array(TRAIL_COUNT).fill(null)

const posHistory: Array<{ x: number; y: number }> = []

let rafId: number | null = null
let pointerX = 0
let pointerY = 0

function setSegmentRef(el: unknown, i: number): void {
  segmentRefs[i] = el instanceof Element ? el : null
}

function updateFollowerPosition() {
  if (!followerRef.value) {
    rafId = null
    return
  }

  posHistory.unshift({ x: pointerX, y: pointerY })
  if (posHistory.length > TRAIL_COUNT + 1) {
    posHistory.length = TRAIL_COUNT + 1
  }

  followerRef.value.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const p1 = posHistory[i]
    const p2 = posHistory[i + 1]
    const el = segmentRefs[i]
    if (el && p1 && p2) {
      el.setAttribute('x1', String(p1.x))
      el.setAttribute('y1', String(p1.y))
      el.setAttribute('x2', String(p2.x))
      el.setAttribute('y2', String(p2.y))
    }
  }

  rafId = null
}

function onPointerMove(event: PointerEvent) {
  pointerX = event.clientX
  pointerY = event.clientY

  if (rafId === null) {
    rafId = window.requestAnimationFrame(updateFollowerPosition)
  }
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  const isSmallerViewport = window.matchMedia('(max-width: 1024px)').matches

  enabled.value = !prefersReducedMotion && !hasCoarsePointer && !isSmallerViewport

  if (!enabled.value) {
    return
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)

  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
  }
})
</script>

<style lang="scss" scoped>
.cursor-follower {
  position: fixed;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.64;
  background: color-mix(in srgb, var(--color-accent) 46%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 72%, white 28%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 28%, transparent), 0 0 12px color-mix(in srgb, var(--color-accent) 25%, transparent);
  transform: translate3d(-9999px, -9999px, 0);
  transition: transform 0.16s cubic-bezier(0.19, 1, 0.22, 1), background var(--transition-theme), border-color var(--transition-theme), box-shadow var(--transition-theme), opacity var(--transition-theme);
  display: none;
}

:global([data-theme='light']) .cursor-follower {
  background: color-mix(in srgb, var(--color-accent) 60%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 85%, black 15%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 38%, transparent), 0 0 14px color-mix(in srgb, var(--color-accent) 30%, transparent);
}

:global([data-theme='dark']) .cursor-follower {
  background: color-mix(in srgb, var(--color-accent) 42%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 78%, white 22%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 26%, transparent), 0 0 12px color-mix(in srgb, var(--color-accent) 28%, transparent);
}

.cursor-trail-svg {
  position: fixed !important;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
}

.cursor-trail-segment {
  stroke: color-mix(in srgb, var(--color-accent) 90%, transparent);
  stroke-linecap: round;
  fill: none;
}
</style>
