export interface CustomerProfile {
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  accountType: "standard" | "premium";
  totalSpent: number;
  currency: string;
}
