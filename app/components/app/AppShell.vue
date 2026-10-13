<script setup lang="ts">
import AppSidebar from './sidebar/AppSidebar.vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

const {
    isMobileNavOpen,
    isDesktopSidebarCollapsed,
    closeMobileNav,
    toggleMobileNav,
    toggleDesktopSidebar
} = useShell()

</script>

<template>
<div
    class="app-shell"
    :data-collapsed="isDesktopSidebarCollapsed || undefined"
    :data-navigation-open="isMobileNavOpen || undefined"
>
    <a
        class="skip-link"
        href="#main-content"
    >
        Skip to content
    </a>

    <AppSidebar
        :mobile-open="isMobileNavOpen"
        :collapsed="isDesktopSidebarCollapsed"
        @close-mobile="closeMobileNav"
        @toggle-collapse="toggleDesktopSidebar"
    />

    <AppHeader
        theme="dark"
        :mobile-nav-open="isMobileNavOpen"
        @toggle-mobile-nav="toggleMobileNav"
    />

    <main
        id="main-content"
        class="app-main"
    >
        <slot></slot>
    </main>

    <AppFooter />
</div>
</template>

<style scoped lang="scss">
.app-shell {
    display: grid;
    min-height: 100svh;
    grid-template:
        'header' auto
        'main' minmax(0, 1fr) 'footer' auto
        / minmax(0, 1fr);
    background: var(--color-background);
    transition: grid-template-columns 180ms ease;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    @media (min-width: 768px) {
        height: 100svh;
        max-height: 100svh;
        overflow: hidden;
        grid-template:
            'sidebar header' auto
            'sidebar main' minmax(0, 1fr) 'sidebar footer' auto
            / var(--layout-sidebar, 240px) minmax(0, 1fr);

        &[data-collapsed='true'] {
            --layout-sidebar: var(--sidebar-width-collapsed);
        }
    }
}

.app-main {
    grid-area: main;
    margin: 0;
    padding: var(--space-9) var(--space-6);
    overflow-x: clip;
    overflow-y: auto;
    overscroll-behavior: contain;
    border-top: 1px solid var(--color-border-subtle);
    border-bottom: 1px solid var(--color-border-subtle);
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    background: var(--color-surface);
    height: auto;
    overflow-y: visible;

    @media (min-width: 768px) {
        margin: 0 var(--space-6) 0 0;
        padding: var(--space-10);
        border: 1px solid var(--color-border-subtle);
        border-radius: var(--radius-xl);

        height: 100%;
        overflow-y: auto;
        overscroll-behavior: contain;
    }
}

.skip-link {
    position: fixed;
    z-index: 100;
    top: 8px;
    left: 8px;
    padding: 10px 14px;
    transform: translateY(-150%);
    border-radius: var(--radius-md);
    background: var(--color-primary);
    color: #fff;
    font-size: 14px;

    &:focus {
        transform: translateY(0);
    }
}
</style>