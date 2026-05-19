<template>
  <button
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="$emit('toggle')"
  >
    <span class="theme-toggle__track" aria-hidden="true">
      <span class="theme-toggle__icon theme-toggle__icon--sun">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      </span>
      <span class="theme-toggle__icon theme-toggle__icon--moon">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
      <span class="theme-toggle__thumb" :class="{ 'theme-toggle__thumb--dark': isDark }"></span>
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ isDark: boolean }>()
defineEmits<{ toggle: [] }>()
</script>

<style lang="scss" scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  padding: 6px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 600px) {
    order: 2;
    margin-left: auto;
    padding: 3px;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  &__track {
    position: relative;
    width: 56px;
    height: 32px;
    background: var(--color-toggle-bg);
    border-radius: 100px;
    display: flex;
    align-items: center;
    padding: 0 7px;
    justify-content: space-between;
    border: 1px solid var(--color-border);
    transition: background var(--transition-theme), border-color var(--transition-theme);

    @media (max-width: 600px) {
      width: 50px;
      height: 28px;
      padding: 0 5px;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    z-index: 1;
    transition: color var(--transition-theme);

    &--sun {
      color: var(--color-icon-sun);
    }

    &--moon {
      color: var(--color-icon-moon);
    }
  }

  &__thumb {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    background: var(--color-bg-secondary);
    border-radius: 100px;
    box-shadow: var(--shadow-toggle-thumb);
    transition: transform var(--transition-theme), background var(--transition-theme), box-shadow var(--transition-theme);

    @media (max-width: 600px) {
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
    }

    &--dark {
      transform: translateX(24px);

      @media (max-width: 600px) {
        transform: translateX(20px);
      }
    }
  }
}
</style>
