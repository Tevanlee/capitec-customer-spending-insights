<script setup lang="ts">
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  active?: boolean
}
withDefaults(
  defineProps<ButtonProps>(),
  {
    variant: 'secondary',
    size: 'md',
    loading: false,
    disabled: false,
    type: 'button',
    active: false,
  }
)

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template><button
  :type="type"
  :disabled="disabled || loading"
  :class="[
    'base-button',
    `base-button--${variant}`,
    `base-button--${size}`,
    { 'base-button--active': active, 'base-button--loading': loading }
  ]"
  @click="$emit('click', $event)"
>
  <span
    v-if="loading"
    class="base-button__spinner"
    aria-hidden="true"
  ></span>
  <span :class="{ 'base-button__content--hidden': loading }">
    <slot></slot>
  </span>
</button></template>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 140ms ease, color 140ms ease, border-color 140ms ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--sm {
    padding: var(--space-1) var(--space-3);
    font-size: var(--font-sm);
  }

  &--md {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-sm);
  }

  &--lg {
    padding: var(--space-3) var(--space-6);
    font-size: var(--font-md);
  }

  &--secondary {
    background: var(--color-surface-subtle);
    border-color: var(--color-border-subtle);
    color: var(--color-text-secondary);

    &:hover:not(:disabled) {
      background: var(--color-surface);
      color: var(--color-text);
    }

    &.base-button--active {
      background: var(--color-surface);
      color: var(--color-primary);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
  }

  &--primary {
    background: var(--color-primary);
    color: #fff;

    &:hover:not(:disabled) {
      background: var(--color-primary-hover);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-text-secondary);

    &:hover:not(:disabled) {
      background: var(--color-surface-subtle);
      color: var(--color-text);
    }
  }
}
</style>