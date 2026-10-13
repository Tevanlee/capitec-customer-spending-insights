import { computed, readonly } from 'vue';
import { ApiClient } from '~/services/apiClient';
import type { Period, SortBy } from '~~/types';

export const useDashboard = () => {
  const route = useRoute();
  const router = useRouter();
  const requestUrl = useRequestURL();

  // Init apiClient class
  const api = new ApiClient(import.meta.server ? requestUrl.origin : '', 300);

  // Reactive State
  const customerId = useState('dashboard_customer_id', () => '12345');

  const period = useState<Period>(
    'dashboard_period',
    () => (route.query.period as Period) || '30d',
  );

  const activeCategory = useState(
    'dashboard_category',
    () => (route.query.category as string) || '',
  );

  const sortBy = useState<SortBy>(
    'dashboard_sort_by',
    () => (route.query.sortBy as SortBy) || 'date_desc',
  );

  const offset = useState(
    'dashboard_offset',
    () => Number(route.query.offset) || 0,
  );
  const limit = useState('dashboard_limit', () => 3);

  const updateUrlQuery = (params: Record<string, any>) => {
    router.replace({
      query: {
        ...route.query,
        ...params,
      },
    });
  };

  // API - Customer Profile
  const {
    data: profile,
    status: profileStatus,
    error: profileError,
  } = useAsyncData(() => api.getCustomerProfile(customerId.value));

  // API - Spending Summary
  const {
    data: summary,
    status: summaryStatus,
    error: summaryError,
  } = useAsyncData(
    () => api.getSpendingSummary(customerId.value, period.value),
    { watch: [period] },
  );

  // API - Categories
  const { data: categories, error: cateforiesError } = useAsyncData(
    () => api.getSpendingCategories(customerId.value, period.value),
    { watch: [period] },
  );

  // API - Monthly Spending Trends
  const { data: trends, error: trendsError } = useAsyncData(() =>
    api.getMonthlyTrends(customerId.value, 6),
  );

  // API - Transactions
  const {
    data: transactionsData,
    status: transactionsStatus,
    error: transactionsErr,
  } = useAsyncData(
    () =>
      api.getTransactions(
        customerId.value,
        limit.value,
        offset.value,
        activeCategory.value || undefined,
        undefined,
        undefined,
        sortBy.value,
      ),
    { watch: [activeCategory, sortBy, offset] },
  );

  // API - Target Goals
  const { data: goals, error: goalsErr } = useAsyncData(() =>
    api.getSpendingGoals(customerId.value),
  );

  // API - Filters
  const {
    data: filters,
    status: filterStatus,
    error: filterErr,
  } = useAsyncData(() => api.getFiltersConfiguration(customerId.value));

  const totalTransactions = computed(
    () => transactionsData.value?.pagination?.total || 0,
  );
  const currentPage = computed(
    () => Math.floor(offset.value / limit.value) + 1,
  );
  const totalPages = computed(
    () => Math.ceil(totalTransactions.value / limit.value) || 1,
  );

  const changePeriod = (newPeriod: Period) => {
    period.value = newPeriod;
    offset.value = 0;
    updateUrlQuery({ period: newPeriod, offset: undefined });
  };

  const selectCategory = (categoryName: string) => {
    const nextCategory =
      activeCategory.value === categoryName ? '' : categoryName;
    activeCategory.value = nextCategory;
    offset.value = 0;
    updateUrlQuery({ category: nextCategory || undefined, offset: undefined });
  };

  const changeSort = (newSort: SortBy) => {
    sortBy.value = newSort;
    offset.value = 0;
    updateUrlQuery({ sortBy: newSort, offset: undefined });
  };

  const nextPage = () => {
    if (transactionsData.value?.pagination?.hasMore) {
      const nextOffset = offset.value + limit.value;
      offset.value = nextOffset;
      updateUrlQuery({ offset: nextOffset });
    }
  };

  const prevPage = () => {
    if (offset.value > 0) {
      const prevOffset = Math.max(0, offset.value - limit.value);
      offset.value = prevOffset;
      updateUrlQuery({ offset: prevOffset === 0 ? undefined : prevOffset });
    }
  };

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'ZAR 0.00';
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: profile.value?.currency || 'ZAR',
    }).format(value);
  };

  return {
    period: readonly(period),
    activeCategory: readonly(activeCategory),
    sortBy: readonly(sortBy),

    profile,
    summary,
    categories,
    trends,
    goals,
    filters,
    pagination: computed(() => transactionsData.value?.pagination),
    transactions: computed(() => transactionsData.value?.data || []),

    totalTransactions,
    currentPage,
    totalPages,
    limit: readonly(limit),
    offset: readonly(offset),

    isDashboardLoading: computed(() => {
      return (
        summaryStatus.value === 'pending' ||
        profileStatus.value === 'pending' ||
        filterStatus.value === 'pending'
      );
    }),
    isTransactionsLoading: computed(
      () => transactionsStatus.value === 'pending',
    ),

    isSummaryLoading: computed(() => summaryStatus.value === 'pending'),

    hasNetworkError: computed(() => {
      return !!(
        profileError.value ||
        summaryError.value ||
        cateforiesError.value ||
        trendsError.value ||
        transactionsErr.value ||
        goalsErr.value ||
        filterErr.value
      );
    }),

    errorMessage: computed(() => {
      return (
        profileError.value?.message ||
        summaryError.value?.message ||
        cateforiesError.value?.message ||
        trendsError.value?.message ||
        transactionsErr.value?.message ||
        goalsErr.value?.message ||
        filterErr.value?.message ||
        null
      );
    }),

    changePeriod,
    selectCategory,
    changeSort,
    nextPage,
    prevPage,
    formatCurrency,
  };
};
