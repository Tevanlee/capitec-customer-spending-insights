import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useDashboard } from './useDashboard';

vi.mock('**/services/apiClient', () => {
  return {
    ApiClient: class {
      getCustomerProfile = vi
        .fn()
        .mockResolvedValue({ customerId: '12345', name: 'John Doe' });
      getSpendingSummary = vi.fn().mockResolvedValue({ totalSpent: 4250.75 });
      getSpendingCategories = vi.fn().mockResolvedValue({ categories: [] });
      getMonthlyTrends = vi.fn().mockResolvedValue({ trends: [] });
      getTransactions = vi.fn().mockResolvedValue({ transactions: [] });
      getSpendingGoals = vi.fn().mockResolvedValue({ goals: [] });
      getFiltersConfiguration = vi
        .fn()
        .mockResolvedValue({ dateRangePresets: [] });
    },
  };
});

vi.stubGlobal('useRuntimeConfig', () => ({ public: { apiBaseUrl: '' } }));
vi.stubGlobal('useState', (key: string, init: () => any) => ref(init()));
vi.stubGlobal(
  'useAsyncData',
  vi.fn(() => ({
    data: ref(null),
    status: ref('pending'),
    error: ref(null),
    refresh: vi.fn().mockResolvedValue(null),
    execute: vi.fn().mockResolvedValue(null),
  })),
);

describe('useDashboard.ts Composable', () => {
  beforeEach(() => {
    const { changePeriod, selectCategory, activeCategory } = useDashboard();
    changePeriod('30d');
    if (activeCategory.value) {
      selectCategory(activeCategory.value);
    }
  });

  it('should initialize reactive variables with explicit defaults', () => {
    const { period, activeCategory } = useDashboard();

    expect(period.value).toBe('30d');
    expect(activeCategory.value).toBe('');
  });

  it('should mutate the timeframe period string context when changePeriod is triggered', () => {
    const { period, changePeriod } = useDashboard();

    expect(period.value).toBe('30d');
    changePeriod('90d');
    expect(period.value).toBe('90d');
  });

  it('should toggle an active filtering category cleanly on user selection changes', () => {
    const { activeCategory, selectCategory } = useDashboard();

    expect(activeCategory.value).toBe('');
    selectCategory('Entertainment');
    expect(activeCategory.value).toBe('Entertainment');

    selectCategory('Entertainment');
    expect(activeCategory.value).toBe('');
  });

  it('should properly compute loading flags and error flags initially', () => {
    const { isDashboardLoading, hasNetworkError } = useDashboard();

    expect(isDashboardLoading.value).toBe(true);
    expect(hasNetworkError.value).toBe(false);
  });
});
