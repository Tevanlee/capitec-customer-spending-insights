<script lang="ts" setup>
interface FooterProps {
    copyright?: string;
    disclaimer?: string;
}
withDefaults(defineProps<FooterProps>(), {
    disclaimer: 'Spending insights · Demonstration',
    copyright: `© ${new Date().getFullYear()} Capitec Bank`
})
</script>
<template>
<footer class="app-footer">
    <span class="app-footer-copyright">
        {{ copyright }}
    </span>

    <span class="app-footer-disclaimer">
        {{ disclaimer }}
    </span>
</footer>
</template>

<style scoped lang="scss">
.app-footer {
    grid-area: footer;
    display: flex;
    flex-wrap: wrap;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    color: var(--color-text-muted);
    font-size: var(--font-xs);

    &-copyright,
    &-disclaimer {
        min-width: 0;
    }

    @media (min-width: 768px) {
        flex-wrap: nowrap;
        padding: var(--space-6) var(--space-10);
    }
}
</style>