<script setup lang="ts">
import type { SpendingCategoriesResponse } from '~~/types';

interface DashboardCategoryDistributionProps {
  title?: string;
  subtitle?: string;
  categories: SpendingCategoriesResponse | undefined;
  activeCategory: string;
  formatCurrency: (val: number | undefined) => string;
}

withDefaults(defineProps<DashboardCategoryDistributionProps>(), {
  title: 'Spending Categories',
  subtitle: 'Click on a category to see those specific payments.',
});

defineEmits<{
  (e: 'selectCategory', name: string): void;
}>();
</script>

<template>
  <BaseCard padding="md" class="category-panel">
    <template #header>
      <h2>{{ title }}</h2>
      <p class="panel-subtitle">
        {{ subtitle }}
      </p>
    </template>

    <div class="category-list">
      <button
        v-for="cat in categories?.categories"
        :key="cat.name"
        type="button"
        class="category-row-btn"
        :class="{ 'category-row-btn--active': activeCategory === cat.name }"
        @click="$emit('selectCategory', cat.name)">
        <div class="category-meta">
          <span
            class="category-indicator-dot"
            :style="{ backgroundColor: cat.color }"></span>
          <span class="category-name">{{ cat.name }}</span>
        </div>
        <div class="category-values">
          <span class="category-amount">{{ formatCurrency(cat.amount) }}</span>
          <span class="category-percentage">{{ cat.percentage }}%</span>
        </div>
      </button>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.panel-subtitle {
  font-size: 13px;
  color: var(--color-text-muted);
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: var(--space-4);
}

.category-row-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background: var(--color-surface-subtle);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 160ms ease;

  &:hover {
    border-color: var(--color-border-subtle);
    background: var(--color-primary-soft);
  }

  &--active {
    background: var(--color-primary-soft);
    border-color: var(--color-primary-soft);

    .category-name {
      font-weight: 600;
      color: var(--color-primary);
    }
  }
}

.category-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.category-name {
  font-size: 14px;
  color: var(--color-text);
}

.category-values {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  font-size: 14px;

  .category-amount {
    font-weight: 500;
    color: var(--color-text);
  }

  .category-percentage {
    color: var(--color-text-muted);
    font-size: 12px;
    width: 36px;
    text-align: right;
  }
}
</style>
