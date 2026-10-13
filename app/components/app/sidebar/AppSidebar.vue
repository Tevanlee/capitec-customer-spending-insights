<script setup lang="ts">
import AppLogo from '../AppLogo.vue';
import SidebarGroup from './SidebarGroup.vue';
import SidebarUser from './SidebarUser.vue';

import {
    ChevronLeft,
    ChevronRight,
    X,
} from '@lucide/vue'

interface SidebarProps {
    mobileOpen: boolean;
    collapsed: boolean;
}

defineProps<SidebarProps>();


const emit = defineEmits<{
    closeMobile: []
    toggleCollapse: []
}>()

const closeNavigation = () => emit('closeMobile')

const { profile, route, userInitials, navigationGroups } = useSidebar()

</script>

<template>
<aside
    id="primary-navigation"
    class="app-sidebar"
    :class="{
        'app-sidebar-mobile-open': mobileOpen,
        'app-sidebar-collapsed': collapsed,
    }"
>
    <div class="app-sidebar-brand">
        <NuxtLink
            to="/"
            class="app-sidebar-brand-link"
            aria-label="Capitec spending insights overview"
            @click="closeNavigation"
        >
            <AppLogo />
        </NuxtLink>

        <button
            type="button"
            class="app-sidebar-collapse"
            :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            :aria-expanded="!collapsed"
            @click="emit('toggleCollapse')"
        >
            <ChevronLeft
                v-if="!collapsed"
                :size="18"
            />
            <ChevronRight
                v-else
                :size="18"
            />
        </button>

        <button
            type="button"
            class="app-sidebar-close"
            aria-label="Close navigation"
            @click="closeNavigation"
        >
            <X :size="18" />
        </button>
    </div>

    <nav
        class="app-sidebar-nav"
        aria-label="Primary navigation"
    >
        <div
            class="app-sidebar-nav-group"
            v-if="navigationGroups"
        >

            <SidebarGroup
                :groups="navigationGroups"
                :active-route="route.path"
                :collapsed="collapsed"
            />
        </div>
    </nav>

    <div class="app-sidebar-bottom">
        <SidebarUser
            :initials="userInitials"
            :profile="profile"
            :collapsed="collapsed"
        />
    </div>
</aside>

<button
    v-if="mobileOpen"
    type="button"
    class="app-sidebar-backdrop"
    aria-label="Close navigation"
    @click="closeNavigation"
></button>
</template>

<style scoped lang="scss">
.app-sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 40;
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
    width: min(280px, calc(100vw - 48px));
    height: 100vh;
    height: 100svh;
    gap: var(--space-10);
    padding: var(--space-6);
    overflow-y: auto;
    background: var(--color-surface);
    border-right: 1px solid var(--color-border);
    transform: translateX(-100%);
    transition: transform 200ms ease;

    &.app-sidebar-mobile-open {
        transform: translateX(0);
    }

    &-brand {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-1);

        &-link {
            display: flex;
            align-items: center;
        }
    }

    &-collapse,
    &-close {
        display: grid;
        width: var(--space-10);
        height: var(--space-10);
        flex: 0 0 auto;
        place-items: center;
        border: 1px solid var(--color-border-subtle);
        border-radius: var(--radius-md);
        background: transparent;
        color: var(--color-text-muted);

        &:hover {
            background: var(--color-surface-subtle);
            color: var(--color-text);
        }
    }

    &-collapse {
        display: none;
    }

    &-close {
        display: grid;
        margin-left: auto;
    }

    &-nav {
        display: grid;
        align-content: start;
        gap: 4px;
    }

    &-bottom {
        display: grid;
        gap: var(--space-5);
        margin-top: auto;
    }

    @media (min-width: 768px) {
        position: sticky;
        top: 0;
        width: auto;
        height: 100svh;
        background: var(--color-background);
        border-right: none;
        transform: translateX(0);

        .app-sidebar-collapse {
            display: grid;
            margin-left: auto;
        }

        .app-sidebar-close {
            display: none;
        }
    }

    &-collapsed {
        @media (min-width: 768px) {
            padding-inline: 10px;

            .app-sidebar-brand {
                justify-content: center;
                padding: 0;
            }

            .app-sidebar-brand-link {
                display: none;
            }

            .app-sidebar-collapse {
                margin: 0 auto;
            }
        }
    }
}

.app-sidebar-backdrop {
    position: fixed;
    z-index: 30;
    inset: 0;
    display: block;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);

    @media (min-width: 768px) {
        display: none;
    }
}
</style>
