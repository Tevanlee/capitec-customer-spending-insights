export interface SpendingSummary {
  period: "7d" | "30d" | "90d" | "1y";
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  topCategory: string;
  comparedToPrevious: {
    spentChange: number;
    transactionChange: number;
  };
}

export interface SpendingGoal {
  id: string;
  category: string;
  monthlyBudget: number;
  currentSpent: number;
  percentageUsed: number;
  daysRemaining: number;
  status: "on_track" | "warning";
}

export interface SpendingGoalsResponse {
  goals: SpendingGoal[];
}

export interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  color: string;
  icon: string;
}

export interface SpendingCategoriesResponse {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  totalAmount: number;
  categories: SpendingCategory[];
}

export interface MonthlyTrend {
  month: string;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
}

export interface MonthlyTrendsResponse {
  trends: MonthlyTrend[];
}
