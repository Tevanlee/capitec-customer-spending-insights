import type { SpendingSummary } from "~types";

export default defineEventHandler(async (event): Promise<SpendingSummary> => {
  const query = getQuery(event);
  const period = (query.period as SpendingSummary["period"]) || "30d";

  const multiplier =
    period === "7d" ? 0.25 : period === "90d" ? 3 : period === "1y" ? 12 : 1;

  return {
    period,
    totalSpent: Number((4250.75 * multiplier).toFixed(2)),
    transactionCount: Math.round(47 * multiplier),
    averageTransaction: 90.44,
    topCategory: "Groceries",
    comparedToPrevious: {
      spentChange: 12.5,
      transactionChange: -3.2,
    },
  };
});
