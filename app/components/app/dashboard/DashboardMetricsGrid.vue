<script setup lang="ts">
import type { SpendingSummary } from '~~/types';

interface DashboardMetricsProps {
  summary: SpendingSummary | undefined;
  isLoading?: boolean;
  formatCurrency: (val: number | undefined) => string;
  cardOneTitle?: string;
  cardTwoTitle?: string;
  cardThreeTitle?: string;
  vsLastPeriodText?: string;
  changeInTransactionsText?: string;
  mostSpentOnText?: string;
}

withDefaults(defineProps<DashboardMetricsProps>(), {
  cardOneTitle: 'Total Spent',
  cardTwoTitle: 'Number of Payments',
  cardThreeTitle: 'Average Payment Amount',
  vsLastPeriodText: 'vs last period',
  changeInTransactionsText: 'change in transactions',
  mostSpentOnText: 'Most spent on:',
  isLoading: false,
});
</script>

<template>
  <section class="metrics-grid">
    <template v-if="isLoading">
      <BaseCard v-for="n in 3" :key="n" padding="md">
        <div class="skeleton-bone skeleton-label"></div>
        <div class="skeleton-bone skeleton-value"></div>
        <div class="skeleton-bone skeleton-trend"></div>
      </BaseCard>
    </template>

    <template v-else>
      <BaseCard padding="md">
        <span class="metric-card-label">{{ cardOneTitle }}</span>
        <h2 class="metric-card-value">
          {{ formatCurrency(summary?.totalSpent) }}
        </h2>
        <div
          class="metric-card-trend"
          :class="
            summary?.comparedToPrevious.spentChange &&
            summary.comparedToPrevious.spentChange > 0
              ? 'trend--negative'
              : 'trend--positive'
          ">
          <span>{{ summary?.comparedToPrevious.spentChange }}%</span>
          {{ vsLastPeriodText }}
        </div>
      </BaseCard>

      <BaseCard padding="md">
        <span class="metric-card-label">{{ cardTwoTitle }}</span>
        <h2 class="metric-card-value">{{ summary?.transactionCount }}</h2>
        <div
          class="metric-card-trend"
          :class="
            summary?.comparedToPrevious.transactionChange &&
            summary.comparedToPrevious.transactionChange > 0
              ? 'trend--negative'
              : 'trend--positive'
          ">
          <span>{{ summary?.comparedToPrevious.transactionChange }}%</span>
          {{ changeInTransactionsText }}
        </div>
      </BaseCard>

      <BaseCard padding="md">
        <span class="metric-card-label">{{ cardThreeTitle }}</span>
        <h2 class="metric-card-value">
          {{ formatCurrency(summary?.averageTransaction) }}
        </h2>
        <div class="metric-card-trend">
          {{ mostSpentOnText }} <strong>{{ summary?.topCategory }}</strong>
        </div>
      </BaseCard>
    </template>
  </section>
</template>

<style scoped lang="scss">
.metrics-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.metric-card-label {
  font-size: var(--font-md);
  color: var(--color-text-muted);
  line-height: 1;
}

.metric-card-value {
  font-size: var(--font-xl);
  font-weight: 600;
  color: var(--color-text);
}

.metric-card-trend {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-4);

  span {
    font-weight: 300;
    padding-right: var(--space-2);
  }
}

.trend--negative span {
  color: var(--color-danger);
}

.trend--positive span {
  color: var(--color-success);
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

.skeleton-label {
  width: 90px;
  height: 14px;
  margin-bottom: var(--space-2);
}

.skeleton-value {
  width: 140px;
  height: 28px;
  margin-bottom: var(--space-2);
}

.skeleton-trend {
  width: 110px;
  height: 12px;
}
</style>
