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
  padding: 4px;
  border-radius: 100px;
  display: flex;
  align-items: center;

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  &__track {
    position: relative;
    width: 52px;
    height: 28px;
    background: var(--color-toggle-bg);
    border-radius: 100px;
    display: flex;
    align-items: center;
    padding: 0 6px;
    justify-content: space-between;
    border: 1px solid var(--color-border);
    transition: background var(--transition-theme), border-color var(--transition-theme);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    z-index: 1;
    transition: color var(--transition-theme);

    &--sun {
      color: #f59e0b;
    }

    &--moon {
      color: #818cf8;
    }
  }

  &__thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    background: var(--color-bg-secondary);
    border-radius: 100px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    transition: transform var(--transition-theme), background var(--transition-theme), box-shadow var(--transition-theme);

    &--dark {
      transform: translateX(24px);
    }
  }
}
</style>
