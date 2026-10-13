<script setup lang="ts">
import { Menu, Moon, Sun } from '@lucide/vue';

interface HeaderProps {
  mobileNavOpen: boolean;
  titleEyebrow?: string;
  title?: string;
}

withDefaults(defineProps<HeaderProps>(), {
  titleEyebrow: 'Personal Banking',
  title: 'Customer - Spending Insights',
});

const emit = defineEmits<{
  toggleMobileNav: [];
}>();

const { theme, toggleTheme } = useHeader();
</script>

<template>
  <header class="app-header">
    <div class="app-header-leading">
      <button
        type="button"
        class="app-header-mobile-menu"
        :aria-label="mobileNavOpen ? 'Close navigation' : 'Open navigation'"
        :aria-expanded="mobileNavOpen"
        aria-controls="primary-navigation"
        @click="emit('toggleMobileNav')">
        <Menu :size="18" :stroke-width="1" />
      </button>

      <div class="app-header-context">
        <span class="app-header-eyebrow">{{ titleEyebrow }}</span>
        <span class="app-header-title">{{ title }}</span>
      </div>
    </div>

    <div class="app-header-actions">
      <button
        type="button"
        class="app-header-theme-toggle"
        :aria-label="
          theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        "
        :title="
          theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        "
        @click="toggleTheme">
        <Moon v-if="theme === 'light'" :size="18" :stroke-width="1" />
        <Sun v-else :size="18" :stroke-width="1" />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  grid-area: header;
  display: flex;
  min-height: var(--header-height);
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5);
  background: var(--color-background);

  &-leading,
  &-actions {
    display: flex;
    align-items: center;
    gap: var(--space-5);
  }

  &-context {
    display: grid;
    gap: 0;
    line-height: normal;
  }

  &-eyebrow {
    color: var(--color-text-muted);
    font-size: 10px;
    font-weight: 300;
  }

  &-title {
    overflow: hidden;
    color: var(--color-text);
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-mobile-menu,
  &-theme-toggle {
    display: grid;
    width: var(--space-10);
    height: var(--space-10);
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition:
      background-color 160ms ease,
      color 160ms ease,
      border-color 160ms ease;

    &:hover {
      border-color: var(--color-border-subtle);
      background: var(--color-surface-subtle);
      color: var(--color-text);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &-mobile-menu {
    display: grid;
  }

  @media (min-width: 768px) {
    padding: var(--space-6) var(--space-10);

    .app-header-eyebrow {
      font-size: var(--font-sm);
    }

    .app-header-title {
      font-size: var(--font-lg);
    }

    .app-header-mobile-menu {
      display: none;
    }
  }
}
</style>
