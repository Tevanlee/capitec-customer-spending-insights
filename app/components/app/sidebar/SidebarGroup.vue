<script setup lang="ts">
import SidebarLink from './SidebarLink.vue';

import type { NavigationGroup } from '~/types';

interface SidebarGroupProps {
  groups: NavigationGroup[];
  activeRoute: string;
  collapsed: boolean;
}

defineProps<SidebarGroupProps>();
</script>

<template>
  <template v-if="groups">
    <div v-for="group in groups" :key="group.title" class="sidebar-group">
      <p v-if="!collapsed" class="sidebar-group-title">
        {{ group.title }}
      </p>

      <div class="sidebar-group-links">
        <SidebarLink
          v-for="groupLink in group.links"
          :key="groupLink.to"
          :link="groupLink"
          :active="activeRoute === groupLink.to"
          :collapsed="collapsed" />
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.sidebar-group {
  &-title {
    margin: 0 0 6px;
    padding: 0 12px;
    color: var(--color-text-muted);
    font-size: var(--font-sm);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  &-links {
    display: grid;
    align-content: start;
    gap: var(--space-1);
  }
}
</style>
