import { ofetch } from 'ofetch';

import type {
  CustomerProfile,
  SpendingSummary,
  SpendingCategoriesResponse,
  MonthlyTrendsResponse,
  TransactionsResponse,
  SpendingGoalsResponse,
  FiltersResponse,
} from '~types';

export class ApiClient {
  private client: typeof ofetch;

  constructor(apiBaseUrl: string = '', networkDelayMs: number = 300) {
    this.client = ofetch.create({
      baseURL: apiBaseUrl,
      async onResponse() {
        if (networkDelayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, networkDelayMs));
        }
      },
      // Error interceptor
      onResponseError(context) {
        const errorMsg =
          context.response?._data?.statusMessage ||
          `Network request failed on ${context.request}`;
        throw new Error(errorMsg);
      },
    });
  }

  // Customer Profile
  async getCustomerProfile(customerId: string): Promise<CustomerProfile> {
    return this.client(`/api/customers/${customerId}/profile`);
  }

  // Aggregate Spending Summary
  async getSpendingSummary(
    customerId: string,
    period: string,
  ): Promise<SpendingSummary> {
    return this.client(`/api/customers/${customerId}/spending/summary`, {
      query: { period },
    });
  }

  // Expenditure Categories Matrix
  async getSpendingCategories(
    customerId: string,
    period: string,
  ): Promise<SpendingCategoriesResponse> {
    return this.client(`/api/customers/${customerId}/spending/categories`, {
      query: { period },
    });
  }

  // Monthly Spending Trends
  async getMonthlyTrends(
    customerId: string,
    months: number = 6,
  ): Promise<MonthlyTrendsResponse> {
    return this.client(`/api/customers/${customerId}/spending/trends`, {
      query: { months },
    });
  }

  // Recent Activity Transactions Statement
  async getTransactions(
    customerId: string,
    limit: number = 20,
    offset: number = 0,
    category?: string,
    startDate?: string,
    endDate?: string,
    sortBy: string = 'date_desc',
  ): Promise<TransactionsResponse> {
    return this.client(`/api/customers/${customerId}/transactions`, {
      query: {
        limit,
        offset,
        category: category || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        sortBy,
      },
    });
  }

  // Budget Limits & Target Goals Monitoring
  async getSpendingGoals(customerId: string): Promise<SpendingGoalsResponse> {
    return this.client(`/api/customers/${customerId}/goals`);
  }

  // Filters Configuration Presets
  async getFiltersConfiguration(customerId: string): Promise<FiltersResponse> {
    return this.client(`/api/customers/${customerId}/filters`);
  }
}
