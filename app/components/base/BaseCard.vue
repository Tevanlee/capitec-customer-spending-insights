<script setup lang="ts">
interface CardProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  variant?: 'default' | 'subtle' | 'error';
}

withDefaults(defineProps<CardProps>(), {
  padding: 'md',
  shadow: false,
  variant: 'default',
});
</script>

<template>
  <div
    :class="[
      'base-card',
      `base-card--padding-${padding}`,
      `base-card--${variant}`,
      { 'base-card--shadow': shadow },
    ]">
    <div v-if="$slots.header" class="base-card__header">
      <slot name="header"></slot>
    </div>
    <div class="base-card__content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;

  &--padding {
    &-none {
      padding: 0;
    }

    &-sm {
      padding: var(--space-4);
    }

    &-md {
      padding: var(--space-6);
    }

    &-lg {
      padding: var(--space-8);
    }
  }

  &--subtle {
    background: var(--color-surface-subtle);
  }

  &--error {
    background: var(--color-background);
    border-color: var(--color-border-subtle);
    max-width: 500px;
    margin: auto;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: var(--space-4);
  }

  &__footer {
    margin-top: var(--space-4);
    border-top: 1px solid var(--color-border-subtle);
    padding-top: var(--space-4);
  }
}
</style>
