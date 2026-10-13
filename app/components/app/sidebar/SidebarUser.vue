<script setup lang="ts">
import type { CustomerProfile } from '~~/types';

interface SidebarUserProps {
  initials: string;
  profile: CustomerProfile | undefined;
  collapsed: boolean;
}

defineProps<SidebarUserProps>()
</script>

<template>
<div
  class="app-sidebar-user"
  :class="{ 'app-sidebar-user-collapsed': collapsed }"
  v-if="initials && profile"
>
  <div
    class="app-sidebar-user-avatar"
    aria-hidden="true"
  >{{ initials }}</div>

  <div
    v-if="!collapsed"
    class="app-sidebar-user-info"
  >
    <span class="app-sidebar-user-name">{{ profile?.name }}</span>
    <span class="app-sidebar-user-type">{{ profile?.accountType ? `${profile.accountType} account` : 'Secure link...' }}</span>
  </div>
</div>
</template>

<style lang="scss" scoped>
.app-sidebar-user {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6) 0 0;
  border-top: 1px solid var(--color-border-subtle);

  &-info {
    display: grid;
    min-width: 0;
    gap: var(--space-1);
    line-height: 1;
  }

  &-name,
  &-type {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-name {
    color: var(--color-text);
    font-size: var(--font-md);
    font-weight: 500;
  }

  &-type {
    color: var(--color-text-muted);
    font-size: var(--font-sm);
  }

  &-avatar {
    display: grid;
    width: var(--space-10);
    height: var(--space-10);
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--color-border-subtle);
    background: var(--color-primary-soft);
    color: var(--color-primary);
    font-size: var(--font-md);
    font-weight: 600;
  }

  &-collapsed {
    @media (min-width: 768px) {
      justify-content: center;
      padding-inline: 0;
    }
  }
}
</style>