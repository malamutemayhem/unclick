import { describe, it, expect } from "vitest";
import {
  createLineItem, computeLineDetail, computeInvoice,
  round2, formatCurrency, splitPayment,
  applyEarlyPaymentDiscount, lateFee, totalWithLateFee,
  prorateDays, taxInclusiveToExclusive, invoiceToText,
} from "../invoice-calc.js";

describe("computeLineDetail", () => {
  it("computes simple line", () => {
    const item = createLineItem("Widget", 5, 10);
    const detail = computeLineDetail(item);
    expect(detail.lineSubtotal).toBe(50);
    expect(detail.lineTotal).toBe(50);
  });

  it("applies discount", () => {
    const item = createLineItem("Widget", 10, 20, 0, 0.1);
    const detail = computeLineDetail(item);
    expect(detail.lineSubtotal).toBe(200);
    expect(detail.discountAmount).toBe(20);
    expect(detail.afterDiscount).toBe(180);
  });

  it("applies tax after discount", () => {
    const item = createLineItem("Widget", 1, 100, 0.1, 0.2);
    const detail = computeLineDetail(item);
    expect(detail.afterDiscount).toBe(80);
    expect(detail.taxAmount).toBe(8);
    expect(detail.lineTotal).toBe(88);
  });
});

describe("computeInvoice", () => {
  it("sums multiple items", () => {
    const items = [
      createLineItem("A", 2, 50, 0.1),
      createLineItem("B", 1, 30, 0.1),
    ];
    const result = computeInvoice(items);
    expect(result.subtotal).toBe(130);
    expect(result.totalTax).toBeCloseTo(13);
    expect(result.total).toBeCloseTo(143);
  });
});

describe("round2", () => {
  it("rounds to 2 decimals", () => {
    expect(round2(1.235)).toBe(1.24);
    expect(round2(1.234)).toBe(1.23);
  });
});

describe("formatCurrency", () => {
  it("formats with dollar sign", () => {
    expect(formatCurrency(100)).toBe("$100.00");
  });

  it("formats negative", () => {
    expect(formatCurrency(-50)).toBe("-$50.00");
  });

  it("uses custom symbol", () => {
    expect(formatCurrency(42, "€")).toBe("€42.00");
  });
});

describe("splitPayment", () => {
  it("splits evenly", () => {
    const parts = splitPayment(100, 4);
    expect(parts).toEqual([25, 25, 25, 25]);
  });

  it("handles remainder", () => {
    const parts = splitPayment(100, 3);
    const sum = parts.reduce((a, b) => a + b, 0);
    expect(round2(sum)).toBe(100);
    expect(parts.length).toBe(3);
  });
});

describe("applyEarlyPaymentDiscount", () => {
  it("applies discount", () => {
    expect(applyEarlyPaymentDiscount(100, 0.02, 5, 30)).toBe(98);
  });

  it("no discount if not early", () => {
    expect(applyEarlyPaymentDiscount(100, 0.02, 0, 30)).toBe(100);
  });
});

describe("lateFee", () => {
  it("computes late fee", () => {
    expect(lateFee(1000, 0.001, 10)).toBe(10);
  });

  it("zero for on time", () => {
    expect(lateFee(1000, 0.001, 0)).toBe(0);
  });
});

describe("totalWithLateFee", () => {
  it("adds late fee to total", () => {
    expect(totalWithLateFee(1000, 0.001, 5)).toBe(1005);
  });
});

describe("prorateDays", () => {
  it("prorates amount", () => {
    expect(prorateDays(300, 30, 10)).toBe(100);
  });
});

describe("taxInclusiveToExclusive", () => {
  it("extracts tax from inclusive price", () => {
    const result = taxInclusiveToExclusive(110, 0.1);
    expect(result.preTax).toBe(100);
    expect(result.tax).toBe(10);
  });
});

describe("invoiceToText", () => {
  it("generates text summary", () => {
    const items = [createLineItem("Widget", 2, 25, 0.1)];
    const text = invoiceToText(items);
    expect(text).toContain("Widget");
    expect(text).toContain("Total");
  });
});
