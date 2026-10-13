import type { CustomerProfile } from "~types";

export default defineEventHandler(async (event): Promise<CustomerProfile> => {
  const customerId = getRouterParam(event, "customerId");

  if (!customerId) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Bad Request: Missing customerId dynamic route token mapping parameters.",
    });
  }

  return {
    customerId: customerId || "12345",
    name: "Tevan Wilfred",
    email: "john.doe@email.com",
    joinDate: "2023-01-15",
    accountType: "premium",
    totalSpent: 15420.5,
    currency: "ZAR",
  };
});
