<script setup lang="ts">
import type { SpendingGoalsResponse } from '~~/types';

interface DashboardBudgetGoalsProps {
  title?: string;
  subtitle?: string;
  remainingTimeLabel?: string;
  goals: SpendingGoalsResponse | undefined;
  formatCurrency: (val: number | undefined) => string;
}

withDefaults(defineProps<DashboardBudgetGoalsProps>(), {
  title: 'Budget Tracking',
  subtitle: 'Live limits matching monthly allocation frameworks.',
  remainingTimeLabel: 'days remaining',
});
</script>

<template>
  <BaseCard padding="md" class="goals-widget-panel">
    <template #header>
      <h2>{{ title }}</h2>
      <p class="panel-subtitle">
        {{ subtitle }}
      </p>
    </template>

    <div class="goals-stack-list">
      <div
        v-for="goal in goals?.goals"
        :key="goal.id"
        class="goal-progress-card">
        <div class="goal-card-meta">
          <span class="goal-category-title">{{ goal.category }}</span>
          <span class="goal-fraction-span">
            <strong>{{ formatCurrency(goal.currentSpent) }}</strong> /
            {{ formatCurrency(goal.monthlyBudget) }}
          </span>
        </div>

        <div class="progress-bar-track">
          <div
            class="progress-bar-fill"
            :class="`progress-bar-fill--${goal.status}`"
            :style="{ width: `${Math.min(goal.percentageUsed, 100)}%` }"></div>
        </div>

        <div class="goal-card-footer">
          <span class="days-left-tag"
            >{{ `${goal.daysRemaining} ${remainingTimeLabel}` }}
          </span>
          <BasePill
            size="sm"
            :variant="goal.status === 'warning' ? 'warning' : 'success'">
            {{ goal.status === 'warning' ? 'Near Limit' : 'On Track' }}
          </BasePill>
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

.goals-stack-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  justify-content: center;
  height: 100%;
  margin-top: var(--space-4);
}

.goal-progress-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.goal-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;

  .goal-category-title {
    font-weight: 500;
    color: var(--color-text);
  }

  .goal-fraction-span {
    color: var(--color-text-muted);
  }
}

.progress-bar-track {
  width: 100%;
  height: 6px;
  background: var(--color-surface-subtle);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 300ms ease;

  &--on_track {
    background: var(--color-success);
  }

  &--warning {
    background: var(--color-warning);
  }
}

.goal-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}
</style>
