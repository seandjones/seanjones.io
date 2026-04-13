<template>
  <div
    v-if="enabled"
    ref="followerRef"
    class="cursor-follower"
    aria-hidden="true"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const enabled = ref(false)
const followerRef = ref<HTMLElement | null>(null)

let rafId: number | null = null
let pointerX = 0
let pointerY = 0

function updateFollowerPosition() {
  if (!followerRef.value) {
    rafId = null
    return
  }

  followerRef.value.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
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

  enabled.value = !prefersReducedMotion && !hasCoarsePointer

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
  z-index: 90;
  background: color-mix(in srgb, var(--color-accent) 52%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 72%, white 28%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 40%, transparent), 0 0 24px color-mix(in srgb, var(--color-accent) 40%, transparent);
  transform: translate3d(-9999px, -9999px, 0);
  transition: transform 0.16s cubic-bezier(0.19, 1, 0.22, 1), background var(--transition-theme), border-color var(--transition-theme), box-shadow var(--transition-theme);
  mix-blend-mode: plus-lighter;
}

:global([data-theme='light']) .cursor-follower {
  background: color-mix(in srgb, var(--color-accent) 68%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 85%, black 15%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 58%, transparent), 0 0 30px color-mix(in srgb, var(--color-accent) 52%, transparent);
}

:global([data-theme='dark']) .cursor-follower {
  background: color-mix(in srgb, var(--color-accent) 50%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 78%, white 22%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 36%, transparent), 0 0 26px color-mix(in srgb, var(--color-accent) 42%, transparent);
}
</style>
