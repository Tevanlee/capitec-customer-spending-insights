<script setup lang="ts">
import type { NavigationLink } from '~/types';

interface SidebarLinkProps {
  link: NavigationLink;
  active: boolean;
  collapsed: boolean;
}

defineProps<SidebarLinkProps>();
</script>

<template>
  <NuxtLink
    :key="link.label"
    :to="link.to"
    class="sidebar-link"
    :class="{
      'sidebar-link--active': active,
      'sidebar-link-collapsed': collapsed,
    }"
    :aria-current="active ? 'page' : undefined"
    :aria-label="collapsed ? link.label : undefined"
    :title="collapsed ? link.label : undefined">
    <component :is="link.icon" :size="16" :stroke-width="1.5" />
    <span v-if="!collapsed">{{ link.label }}</span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.sidebar-link {
  display: flex;
  min-width: 0;
  min-height: var(--sidebar-link-min-height);
  align-items: center;
  gap: var(--space-5);
  padding: 0 var(--space-4);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--font-md);
  font-weight: 400;
  white-space: nowrap;
  transition:
    background-color 160ms ease,
    color 160ms ease;

  &:hover {
    background: var(--color-surface-subtle);
    color: var(--color-text);
    font-weight: 500;
  }

  &--active {
    background: var(--color-primary-soft);
    color: var(--color-primary);
    font-weight: 500;
  }

  :deep(svg) {
    flex: 0 0 auto;
  }

  &-collapsed {
    @media (min-width: 768px) {
      .sidebar-link {
        justify-content: center;
        padding-inline: 0;
      }
    }
  }
}
</style>
