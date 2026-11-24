import { describe, it, expect } from "vitest";
import { formatCurrency } from "./currency";

describe("Currency Formatter", () => {
  it("formats integer amounts with standard grouping and Naira symbol", () => {
    expect(formatCurrency(550000000)).toBe("₦550,000,000");
    expect(formatCurrency(30000000)).toBe("₦30,000,000");
  });

  it("appends correct period suffixes", () => {
    expect(formatCurrency(4500000, "year")).toBe("₦4,500,000/year");
    expect(formatCurrency(155000, "night")).toBe("₦155,000/night");
    expect(formatCurrency(550000000, "total")).toBe("₦550,000,000");
  });

  it("handles 0 and invalid inputs gracefully", () => {
    expect(formatCurrency(0)).toBe("₦0");
    // @ts-expect-error test fallback
    expect(formatCurrency(NaN)).toBe("₦0");
  });
});
