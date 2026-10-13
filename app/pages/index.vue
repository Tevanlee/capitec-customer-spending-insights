<script lang="ts" setup>
import DashboardHeader from '~/components/app/dashboard/DashboardHeader.vue';
import DashboardMetricsGrid from '~/components/app/dashboard/DashboardMetricsGrid.vue';
import DashboardMonthlyTrendsChart from '~/components/app/dashboard/DashboardMonthlyTrendsChart.vue';
import DashboardBudgetGoalsWidget from '~/components/app/dashboard/DashboardBudgetGoalsWidget.vue';
import DashboardCategoryDistribution from '~/components/app/dashboard/DashboardCategoryDistribution.vue';
import DashboardTransactions from '~/components/app/dashboard/DashboardTransactions.vue';

const {
  period,
  activeCategory,
  sortBy,
  profile,
  summary,
  categories,
  transactions,
  trends,
  goals,
  filters,
  pagination,
  totalTransactions,
  currentPage,
  totalPages,
  limit,
  offset,
  isTransactionsLoading,
  isSummaryLoading,
  changePeriod,
  selectCategory,
  changeSort,
  nextPage,
  prevPage,
  formatCurrency,
} = useDashboard();

const sortOptions = [
  { label: 'Newest First', value: 'date_desc' },
  { label: 'Oldest First', value: 'date_asc' },
  { label: 'Highest Amount', value: 'amount_desc' },
  { label: 'Lowest Amount', value: 'amount_asc' },
];
</script>

<template>
  <div class="dashboard-overview">
    <DashboardHeader
      :profile-name="profile?.name"
      :period="period"
      :filters="filters"
      @change-period="changePeriod" />

    <DashboardMetricsGrid
      :summary="summary"
      :format-currency="formatCurrency"
      :is-loading="isSummaryLoading" />

    <div class="dashboard-split-view visual-insights-row">
      <DashboardMonthlyTrendsChart
        :trends="trends"
        :format-currency="formatCurrency" />

      <DashboardBudgetGoalsWidget
        :goals="goals"
        :format-currency="formatCurrency" />
    </div>

    <div class="dashboard-split-view">
      <DashboardCategoryDistribution
        :categories="categories"
        :active-category="activeCategory"
        :format-currency="formatCurrency"
        @select-category="selectCategory" />

      <DashboardTransactions
        :transactions="transactions"
        :is-transactions-loading="isTransactionsLoading"
        :sort-by="sortBy"
        :sort-options="sortOptions"
        :total-transactions="totalTransactions"
        :limit="limit"
        :offset="offset"
        :current-page="currentPage"
        :total-pages="totalPages"
        :pagination="pagination"
        :format-currency="formatCurrency"
        @change-sort="changeSort"
        @prev-page="prevPage"
        @next-page="nextPage" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-overview {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);

  &.network-error {
    height: 100%;
  }
}

.network-error-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: auto;
  border-radius: var(--radius-xl);

  h3 {
    font-size: var(--font-xl);
    font-weight: 600;
  }

  p {
    font-size: var(--font-md);
  }
}

.dashboard-split-view {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;

  @media (min-width: 1200px) {
    grid-template-columns: 400px minmax(0, 1fr);
  }
}

.visual-insights-row {
  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
</style>
