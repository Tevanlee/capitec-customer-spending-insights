<script setup lang="ts">
import type { Period, DateRangePreset } from '~~/types';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  profileName?: string;
  period: string;
  filters?: {
    dateRangePresets: Array<{ label: string; value: Period }>;
  } | null;
}

withDefaults(defineProps<DashboardHeaderProps>(), {
  title: 'Hello',
  subtitle: 'Here is an overview of your money and spending habits.',
});

defineEmits<{
  (e: 'changePeriod', period: Period): void;
}>();
</script>

<template>
  <header class="dashboard-overview-header">
    <div class="welcome-block">
      <h1>{{ `${title} ${profileName || 'Valued Client'}` }}</h1>
      <p>{{ subtitle }}</p>
    </div>

    <div
      class="period-picker"
      role="group"
      aria-label="Filter spending by period">
      <BaseButton
        v-for="preset in filters?.dateRangePresets"
        :key="preset.value"
        variant="secondary"
        size="sm"
        :active="period === preset.value"
        @click="$emit('changePeriod', preset.value)">
        {{ preset.label }}
      </BaseButton>
    </div>
  </header>
</template>

<style scoped lang="scss">
.dashboard-overview-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-5);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  .welcome-block {
    h1 {
      font-size: var(--font-xl);
      font-weight: 500;
    }

    p {
      font-size: var(--font-md);
      font-weight: 300;
    }
  }
}

.period-picker {
  display: flex;
  gap: var(--space-1);
  background: var(--color-surface-subtle);
  padding: var(--space-1);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-subtle);
  width: max-content;
}
</style>
