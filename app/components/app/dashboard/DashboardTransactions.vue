<script setup lang="ts">
import BaseDropdown from '~/components/base/BaseDropdown.vue';

import type { DropdownOption } from '~/types';
import type { Transaction, PaginationMeta, SortBy } from '~~/types';

interface DashboardTransactionsProps {
  title?: string;
  subtitle?: string;
  transactions: Transaction[];
  isTransactionsLoading: boolean;
  sortBy: SortBy;
  sortOptions: DropdownOption[];
  totalTransactions: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  pagination: PaginationMeta | undefined;
  formatCurrency: (val: number | undefined) => string;
  loadingText?: string;
  emptyText?: string;
  storeColumnLabel?: string;
  categoryColumnLabel?: string;
  amountColumnLabel?: string;
  previousButtonLabel?: string;
  nextButtonLabel?: string;
}

withDefaults(defineProps<DashboardTransactionsProps>(), {
  title: 'Recent Activity',
  subtitle: 'A list of your latest transactions across accounts.',
  loadingText: 'Loading transactions...',
  emptyText: 'No payments found for this category or period.',
  storeColumnLabel: 'Store / Merchant',
  categoryColumnLabel: 'Category',
  amountColumnLabel: 'Amount',
  previousButtonLabel: 'Previous',
  nextButtonLabel: 'Next',
});

defineEmits<{
  (e: 'changeSort', value: SortBy): void;
  (e: 'prevPage'): void;
  (e: 'nextPage'): void;
}>();
</script>

<template>
  <BaseCard padding="md" class="ledger-panel">
    <template #header>
      <div class="ledger-header-wrapper">
        <div>
          <h2>{{ title }}</h2>
          <p class="panel-subtitle">{{ subtitle }}</p>
        </div>

        <div class="ledger-controls">
          <BaseDropdown
            :model-value="sortBy"
            :options="sortOptions"
            @update:model-value="$emit('changeSort', $event as SortBy)" />

          <div v-if="isTransactionsLoading" class="filter-loading-indicator">
            <span class="loading-spinner" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </template>

    <div v-if="isTransactionsLoading" class="ledger-container">
      <div class="ledger-header-row">
        <span>{{ storeColumnLabel }}</span>
        <span>{{ categoryColumnLabel }}</span>
        <span class="text-right">{{ amountColumnLabel }}</span>
      </div>
      <div class="ledger-list skeleton-list">
        <div
          v-for="n in transactions.length"
          :key="n"
          class="ledger-row skeleton-row">
          <div class="merchant-cell">
            <div class="skeleton-bone skeleton-title"></div>
            <div class="skeleton-bone skeleton-subtitle"></div>
          </div>
          <div>
            <div class="skeleton-bone skeleton-tag"></div>
          </div>
          <div class="text-right">
            <div class="skeleton-bone skeleton-amount"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!transactions.length" class="ledger-state-view">
      <p>{{ emptyText }}</p>
    </div>

    <div
      v-else
      class="ledger-container"
      :class="{ 'ledger-container--loading': isTransactionsLoading }">
      <div class="ledger-header-row">
        <span>{{ storeColumnLabel }}</span>
        <span>{{ categoryColumnLabel }}</span>
        <span class="text-right">{{ amountColumnLabel }}</span>
      </div>
      <div class="ledger-list">
        <div v-for="txn in transactions" :key="txn.id" class="ledger-row">
          <div class="merchant-cell">
            <span class="merchant-name">{{ txn.merchant }}</span>
            <span class="merchant-desc">{{ txn.description }}</span>
          </div>
          <div>
            <span
              class="ledger-tag"
              :style="{ '--tag-color': txn.categoryColor }">
              {{ txn.category }}
            </span>
          </div>
          <div class="text-right font-medium text-negative">
            -{{ formatCurrency(txn.amount) }}
          </div>
        </div>
      </div>

      <div v-if="totalTransactions > limit" class="ledger-pagination-footer">
        <span class="pagination-info">
          Page <strong>{{ currentPage }}</strong> of
          <strong>{{ totalPages }}</strong>
        </span>

        <div class="pagination-actions">
          <BaseButton
            variant="secondary"
            size="sm"
            :disabled="offset === 0 || isTransactionsLoading"
            @click="$emit('prevPage')">
            {{ previousButtonLabel }}
          </BaseButton>
          <BaseButton
            variant="secondary"
            size="sm"
            :disabled="!pagination?.hasMore || isTransactionsLoading"
            @click="$emit('nextPage')">
            {{ nextButtonLabel }}
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.panel-subtitle {
  font-size: 13px;
  color: var(--color-text-muted);
}

.ledger-header-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.ledger-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.filter-loading-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-xs);
  color: var(--color-border);
  padding: 0 var(--space-2);
  border-radius: var(--radius-full);
  font-weight: 500;
}

.loading-spinner {
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.ledger-state-view {
  display: grid;
  place-items: center;
  min-height: 200px;
  color: var(--color-text-muted);
  font-size: 14px;
}

.ledger-container {
  display: flex;
  flex-direction: column;
  margin-top: var(--space-4);
  transition: opacity 160ms ease;

  &--loading {
    opacity: 0.6;
    pointer-events: none;
  }
}

.ledger-header-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  font-weight: 500;
  color: var(--color-text-muted);
  font-size: var(--font-md);
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-md);

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 120px;
  }
}

.ledger-list {
  display: flex;
  flex-direction: column;
  padding: var(--space-3);
  border: 1px solid var(--color-border-subtle);
  margin-top: var(--space-3);
  border-radius: var(--radius-md);
}

.ledger-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-1);
  border-bottom: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  font-size: var(--font-md);
  transition: background-color 140ms ease;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 120px;
  }

  &:last-child {
    border-bottom: none;
  }
}

.ledger-pagination-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  font-size: var(--font-sm);
  color: var(--color-text-muted);

  .pagination-actions {
    display: flex;
    gap: var(--space-2);
  }
}

.merchant-cell {
  display: flex;
  flex-direction: column;
  min-width: 0;

  .merchant-name {
    font-weight: 500;
    color: var(--color-text);
  }

  .merchant-desc {
    font-size: var(--font-sm);
    color: var(--color-text-muted);
  }
}

.ledger-tag {
  display: inline-block;
  font-size: var(--font-sm);
  font-weight: 500;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--tag-color) 12%, transparent);
  color: var(--tag-color);
}

.text-right {
  text-align: right;
}

.font-medium {
  font-weight: 500;
}

.text-negative {
  color: var(--color-text);
}

/* --- Skeleton UI Loading Animation Styles --- */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-bone {
  background: linear-gradient(
    90deg,
    var(--color-surface-subtle) 25%,
    var(--color-border-subtle) 50%,
    var(--color-surface-subtle) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite ease-in-out;
  border-radius: var(--radius-sm);
}

.skeleton-title {
  width: 120px;
  height: 16px;
  margin-bottom: 4px;
}

.skeleton-subtitle {
  width: 80px;
  height: 12px;
}

.skeleton-tag {
  width: 60px;
  height: 20px;
  border-radius: var(--radius-full);
}

.skeleton-amount {
  width: 70px;
  height: 16px;
  margin-left: auto;
}
</style>
