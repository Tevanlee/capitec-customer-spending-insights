<script setup lang="ts">
interface PillProps {
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary'
  size?: 'sm' | 'md'
  customColor?: string
}

withDefaults(
  defineProps<PillProps>(),
  {
    variant: 'neutral',
    size: 'md',
  }
)
</script>

<template><span
  :class="['base-pill', `base-pill--${variant}`, `base-pill--${size}`]"
  :style="customColor ? { '--pill-custom-color': customColor } : undefined"
>
  <slot></slot>
</span></template>

<style scoped lang="scss">
.base-pill {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: var(--radius-sm);

  &--sm {
    font-size: var(--font-xs);
    padding: 2px 6px;
  }

  &--md {
    font-size: var(--font-xs);
    padding: 2px 8px;
  }

  &--success {
    background: color-mix(in srgb, var(--color-success) 12%, transparent);
    color: var(--color-success);
  }

  &--warning {
    background: color-mix(in srgb, var(--color-warning) 12%, transparent);
    color: var(--color-warning);
  }

  &--danger {
    background: color-mix(in srgb, #e63934 12%, transparent);
    color: #e63934;
  }

  &--neutral {
    background: var(--color-surface-subtle);
    color: var(--color-text-muted);
  }

  &--primary {
    background: var(--color-primary-soft);
    color: var(--color-primary);
  }
}
</style>