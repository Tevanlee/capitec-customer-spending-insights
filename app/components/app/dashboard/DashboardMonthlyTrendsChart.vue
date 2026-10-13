<script setup lang="ts">
import type { MonthlyTrendsResponse } from '~~/types';

interface DashboardMonthlyTrendsProps {
  title?: string;
  subtitle?: string;
  trends: MonthlyTrendsResponse | undefined;
  formatCurrency: (val: number | undefined) => string;
}

withDefaults(defineProps<DashboardMonthlyTrendsProps>(), {
  title: 'Monthly Trends',
  subtitle: 'Your total spending profile across the last 6 months.',
});
</script>

<template>
  <BaseCard padding="md" class="chart-widget-panel">
    <template #header>
      <h2>{{ title }}</h2>
      <p class="panel-subtitle">
        {{ subtitle }}
      </p>
    </template>

    <div class="visual-chart-frame">
      <div
        v-for="item in trends?.trends"
        :key="item.month"
        class="chart-column">
        <div class="chart-bar-container">
          <div
            class="chart-bar"
            :style="{
              '--bar-height': `${Math.min((item.totalSpent / 6000) * 100, 100)}%`,
            }">
            <span class="chart-tooltip">
              {{ formatCurrency(item.totalSpent) }}
            </span>
          </div>
        </div>
        <span class="chart-label">
          {{
            new Date(item.month + '-02').toLocaleDateString('en-ZA', {
              month: 'short',
            })
          }}
        </span>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.panel-subtitle {
  font-size: 13px;
  color: var(--color-text-muted);
}

.visual-chart-frame {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 140px;
  padding-top: var(--space-4);
  gap: var(--space-3);
}

.chart-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
}

.chart-bar-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.chart-bar {
  width: 100%;
  max-width: 32px;
  height: var(--bar-height, 100%);
  background: var(--color-primary);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  position: relative;
  cursor: pointer;
  transition: height 200ms ease;

  &:hover {
    background: var(--color-primary-hover);

    .chart-tooltip {
      opacity: 1;
      transform: translate(-50%, -6px);
    }
  }
}

.chart-tooltip {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background: var(--color-primary-soft);
  color: var(--color-text);
  padding: 4px 6px;
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 120ms ease;
  z-index: 5;
}

.chart-label {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
  font-weight: 500;
}
</style>
