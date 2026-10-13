export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  description: string;
  paymentMethod: string;
  icon: string;
  categoryColor: string;
}

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface TransactionsResponse {
  data: Transaction[];
  pagination: PaginationMeta;
}

export interface CategoryPreset {
  name: string;
  color: string;
  icon: string;
}

export type Period = '7d' | '30d' | '90d' | '1y';

export interface DateRangePreset {
  label: string;
  value: Period;
}

export interface FiltersResponse {
  categories: CategoryPreset[];
  dateRangePresets: DateRangePreset[];
}

export type SortBy = 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc';
