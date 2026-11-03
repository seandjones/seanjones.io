<template>
  <button
    type="button"
    class="theme-toggle"
    aria-label="Night map"
    :aria-pressed="isDark"
    @click="$emit('toggle')"
  >
    <span class="theme-toggle__label">Night<span class="theme-toggle__label-rest"> map</span></span>
    <span class="theme-toggle__switch" aria-hidden="true"><span class="theme-toggle__knob"></span></span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ isDark: boolean }>()
defineEmits<{ toggle: [] }>()
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 44px;
  padding: 0 0.25rem;
  border: none;
  background: none;
  font-size: var(--fs-label);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  flex-shrink: 0;

  // On narrow screens the label shortens to "Night" rather than disappearing.
  @media (max-width: 719px) {
    gap: 0.4rem;

    .theme-toggle__label-rest {
      display: none;
    }
  }
}

.theme-toggle__switch {
  position: relative;
  width: 2.5rem;
  height: 1.4rem;
  border: 2px solid var(--ink);
}

.theme-toggle__knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(1.4rem - 8px);
  height: calc(1.4rem - 8px);
  background: var(--ink);
  transition: transform 160ms var(--ease-out);

  [aria-pressed='true'] & {
    transform: translateX(1.1rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle__knob {
    transition: none;
  }
}
</style>
