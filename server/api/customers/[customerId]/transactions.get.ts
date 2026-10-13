import type { TransactionsResponse } from "~types";

export default defineEventHandler(
  async (event): Promise<TransactionsResponse> => {
    const query = getQuery(event);
    const limit = parseInt(query.limit as string, 10) || 20;
    const offset = parseInt(query.offset as string, 10) || 0;
    const categoryFilter = query.category as string;
    const sortBy = (query.sortBy as string) || "date_desc";

    let dataset = [
      {
        id: "txn_123456",
        date: "2026-04-08T14:30:00Z",
        merchant: "Pick n Pay",
        category: "Groceries",
        amount: 245.8,
        description: "Weekly groceries",
        paymentMethod: "Credit Card",
        icon: "shopping-cart",
        categoryColor: "#FF6B6B",
      },
      {
        id: "txn_123457",
        date: "2026-04-07T10:15:00Z",
        merchant: "Netflix",
        category: "Entertainment",
        amount: 199.0,
        description: "Monthly subscription",
        paymentMethod: "Debit Order",
        icon: "film",
        categoryColor: "#4ECDC4",
      },
      {
        id: "txn_123458",
        date: "2026-04-06T18:45:00Z",
        merchant: "TotalEnergies",
        category: "Transportation",
        amount: 680.45,
        description: "Fuel refuel",
        paymentMethod: "Cheque Card",
        icon: "car",
        categoryColor: "#45B7D1",
      },
      {
        id: "txn_123459",
        date: "2026-04-05T13:20:00Z",
        merchant: "Spur Steak Ranch",
        category: "Dining",
        amount: 350.0,
        description: "Family dinner",
        paymentMethod: "Credit Card",
        icon: "utensils",
        categoryColor: "#F7DC6F",
      },
      {
        id: "txn_123460",
        date: "2026-04-04T09:00:00Z",
        merchant: "Superbalist",
        category: "Shopping",
        amount: 450.8,
        description: "Winter jacket",
        paymentMethod: "EFT",
        icon: "shopping-bag",
        categoryColor: "#BB8FCE",
      },
      {
        id: "txn_123461",
        date: "2026-04-02T11:10:00Z",
        merchant: "Eskom",
        category: "Utilities",
        amount: 458.7,
        description: "Prepaid electricity",
        paymentMethod: "Debit Order",
        icon: "zap",
        categoryColor: "#85C1E9",
      },
      {
        id: "txn_123462",
        date: "2026-03-29T16:00:00Z",
        merchant: "Woolworths",
        category: "Groceries",
        amount: 512.3,
        description: "Mid-month stocking",
        paymentMethod: "Cheque Card",
        icon: "shopping-cart",
        categoryColor: "#FF6B6B",
      },
      {
        id: "txn_123463",
        date: "2026-03-25T20:30:00Z",
        merchant: "Ster-Kinekor",
        category: "Entertainment",
        amount: 220.0,
        description: "Movie tickets",
        paymentMethod: "Credit Card",
        icon: "film",
        categoryColor: "#4ECDC4",
      },
    ];

    if (categoryFilter) {
      dataset = dataset.filter(
        (t) => t.category.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }

    dataset.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (sortBy === "date_desc") return dateB - dateA;
      if (sortBy === "date_asc") return dateA - dateB;
      if (sortBy === "amount_desc") return b.amount - a.amount;
      if (sortBy === "amount_asc") return a.amount - b.amount;
      return 0;
    });

    return {
      data: dataset.slice(offset, offset + limit),
      pagination: {
        total: dataset.length,
        limit,
        offset,
        hasMore: offset + limit < dataset.length,
      },
    };
  },
);
