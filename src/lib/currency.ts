/**
 * Currency formatter for Nigerian Naira (NGN).
 * Ensures consistency across Node.js SSR and browser hydration.
 */
export function formatCurrency(
  amount: number,
  period?: "total" | "year" | "night"
): string {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "₦0";
  }

  // Format with thousands grouping
  const grouped = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const formatted = `₦${grouped}`;

  if (period === "year") {
    return `${formatted}/year`;
  }
  if (period === "night") {
    return `${formatted}/night`;
  }
  return formatted;
}
