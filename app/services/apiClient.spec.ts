import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ofetch } from 'ofetch';
import { ApiClient } from './apiClient';

vi.mock('ofetch', () => {
  const mockFetchInstance = vi.fn();
  return {
    ofetch: {
      create: vi.fn(() => mockFetchInstance),
    },
  };
});

describe('apiClient.ts Service Test Suit', () => {
  let client: ApiClient;
  let mockHttpClient: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockHttpClient = ofetch.create({});
    client = new ApiClient('http://mock-api.local', 0);
  });

  // Customer Profile
  it('should securely parse and fetch Endpoint 1 (Customer Profile) data payloads', async () => {
    const mockProfile = { customerId: '12345', name: 'John Doe' };
    mockHttpClient.mockResolvedValueOnce(mockProfile);

    const result = await client.getCustomerProfile('12345');

    expect(mockHttpClient).toHaveBeenCalledWith('/api/customers/12345/profile');
    expect(result.name).toBe('John Doe');
  });

  // Aggregate Spending Summary
  it('should accurately forward period query parameters for Endpoint 2 (Spending Summary)', async () => {
    const mockSummary = { totalSpent: 4250.75, period: '30d' };
    mockHttpClient.mockResolvedValueOnce(mockSummary);

    const result = await client.getSpendingSummary('12345', '30d');

    expect(mockHttpClient).toHaveBeenCalledWith(
      '/api/customers/12345/spending/summary',
      { query: { period: '30d' } },
    );
    expect(result.totalSpent).toBe(4250.75);
  });

  // Expenditure Categories Matrix
  it('should correctly handle time window query configurations for Endpoint 3 (Categories Matrix)', async () => {
    const mockCategories = { totalAmount: 4250.75 };
    mockHttpClient.mockResolvedValueOnce(mockCategories);

    const result = await client.getSpendingCategories('12345', '7d');

    expect(mockHttpClient).toHaveBeenCalledWith(
      '/api/customers/12345/spending/categories',
      { query: { period: '7d' } },
    );
  });

  // Monthly Spending Trends Tracker
  it('should forward structural month calculation offsets for Endpoint 4 (Spending Trends)', async () => {
    mockHttpClient.mockResolvedValueOnce({ trends: [] });

    await client.getMonthlyTrends('12345', 6);

    expect(mockHttpClient).toHaveBeenCalledWith(
      '/api/customers/12345/spending/trends',
      { query: { months: 6 } },
    );
  });

  // Recent Transactions Statement
  it('should append category query filters when requested on Endpoint 5 (Transactions Statement)', async () => {
    mockHttpClient.mockResolvedValueOnce({ transactions: [] });

    await client.getTransactions('12345', 10, 0, 'Groceries');

    expect(mockHttpClient).toHaveBeenCalledWith(
      '/api/customers/12345/transactions',
      {
        query: {
          limit: 10,
          offset: 0,
          category: 'Groceries',
          sortBy: 'date_desc',
        },
      },
    );
  });

  // Budget Limits & Target Goals Monitoring
  it('should securely access explicit path maps for Endpoint 6 (Spending Goals)', async () => {
    mockHttpClient.mockResolvedValueOnce({ goals: [] });

    await client.getSpendingGoals('12345');

    expect(mockHttpClient).toHaveBeenCalledWith('/api/customers/12345/goals');
  });

  // Filters Configuration Presets
  it('should map available client-facing selection presets from Endpoint 7 (Filters Engine)', async () => {
    mockHttpClient.mockResolvedValueOnce({ categories: [] });

    await client.getFiltersConfiguration('12345');

    expect(mockHttpClient).toHaveBeenCalledWith('/api/customers/12345/filters');
  });
});
