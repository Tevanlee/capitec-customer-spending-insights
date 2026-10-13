import type { MonthlyTrendsResponse } from "~types";

export default defineEventHandler(
  async (event): Promise<MonthlyTrendsResponse> => {
    const query = getQuery(event);
    const requestedMonths = parseInt(query.months as string, 10) || 12;
    const maxMonths = Math.min(requestedMonths, 24);

    const baseTrends = [
      {
        month: "2025-05",
        totalSpent: 3980.3,
        transactionCount: 44,
        averageTransaction: 90.46,
      },
      {
        month: "2025-06",
        totalSpent: 4250.75,
        transactionCount: 47,
        averageTransaction: 90.44,
      },
      {
        month: "2025-07",
        totalSpent: 4120.1,
        transactionCount: 41,
        averageTransaction: 100.49,
      },
      {
        month: "2025-08",
        totalSpent: 4310.5,
        transactionCount: 49,
        averageTransaction: 87.96,
      },
      {
        month: "2025-09",
        totalSpent: 4480.9,
        transactionCount: 52,
        averageTransaction: 86.17,
      },
      {
        month: "2025-10",
        totalSpent: 4620.0,
        transactionCount: 50,
        averageTransaction: 92.4,
      },
      {
        month: "2025-11",
        totalSpent: 4950.35,
        transactionCount: 55,
        averageTransaction: 90.0,
      },
      {
        month: "2025-12",
        totalSpent: 5410.8,
        transactionCount: 62,
        averageTransaction: 87.27,
      },
      {
        month: "2026-01",
        totalSpent: 3890.25,
        transactionCount: 42,
        averageTransaction: 92.62,
      },
      {
        month: "2026-02",
        totalSpent: 4150.8,
        transactionCount: 38,
        averageTransaction: 109.23,
      },
      {
        month: "2026-03",
        totalSpent: 3750.6,
        transactionCount: 45,
        averageTransaction: 83.35,
      },
      {
        month: "2026-04",
        totalSpent: 4200.45,
        transactionCount: 39,
        averageTransaction: 107.7,
      },
    ];

    return {
      trends: baseTrends.slice(-maxMonths),
    };
  },
);
