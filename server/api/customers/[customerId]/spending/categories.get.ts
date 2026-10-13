import type { SpendingCategoriesResponse } from "~types";

export default defineEventHandler(
  async (event): Promise<SpendingCategoriesResponse> => {
    const query = getQuery(event);
    const startDate = (query.startDate as string) || "2024-08-16";
    const endDate = (query.endDate as string) || "2024-09-16";

    return {
      dateRange: {
        startDate,
        endDate,
      },
      totalAmount: 4250.75,
      categories: [
        {
          name: "Groceries",
          amount: 1250.3,
          percentage: 29.4,
          transactionCount: 15,
          color: "#FF6B6B",
          icon: "shopping-cart",
        },
        {
          name: "Entertainment",
          amount: 890.2,
          percentage: 20.9,
          transactionCount: 8,
          color: "#4ECDC4",
          icon: "film",
        },
        {
          name: "Transportation",
          amount: 680.45,
          percentage: 16.0,
          transactionCount: 12,
          color: "#45B7D1",
          icon: "car",
        },
        {
          name: "Dining",
          amount: 520.3,
          percentage: 12.2,
          transactionCount: 9,
          color: "#F7DC6F",
          icon: "utensils",
        },
        {
          name: "Shopping",
          amount: 450.8,
          percentage: 10.6,
          transactionCount: 6,
          color: "#BB8FCE",
          icon: "shopping-bag",
        },
        {
          name: "Utilities",
          amount: 458.7,
          percentage: 10.8,
          transactionCount: 3,
          color: "#85C1E9",
          icon: "zap",
        },
      ],
    };
  },
);
