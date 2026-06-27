import { describe, it, expect } from "vitest";
import {
  computeTax, afterTaxIncome, marginalRate, taxOnNextDollar,
  findIncomeForTax, compareBrackets,
  US_2024_SINGLE, AU_2024,
  withStandardDeduction, formatBreakdown,
} from "../tax-bracket.js";

const SIMPLE_BRACKETS = [
  { min: 0, max: 10000, rate: 0.10 },
  { min: 10000, max: 50000, rate: 0.20 },
  { min: 50000, max: Infinity, rate: 0.30 },
];

describe("computeTax", () => {
  it("computes tax in first bracket", () => {
    const result = computeTax(5000, SIMPLE_BRACKETS);
    expect(result.totalTax).toBe(500);
    expect(result.effectiveRate).toBeCloseTo(0.1);
    expect(result.marginalRate).toBe(0.1);
  });

  it("computes tax across brackets", () => {
    const result = computeTax(30000, SIMPLE_BRACKETS);
    expect(result.totalTax).toBe(1000 + 4000);
    expect(result.bracketBreakdown.length).toBe(2);
  });

  it("zero income", () => {
    const result = computeTax(0, SIMPLE_BRACKETS);
    expect(result.totalTax).toBe(0);
  });

  it("handles all three brackets", () => {
    const result = computeTax(70000, SIMPLE_BRACKETS);
    expect(result.totalTax).toBe(1000 + 8000 + 6000);
    expect(result.marginalRate).toBe(0.3);
  });
});

describe("afterTaxIncome", () => {
  it("computes net income", () => {
    expect(afterTaxIncome(5000, SIMPLE_BRACKETS)).toBe(4500);
  });
});

describe("marginalRate", () => {
  it("returns rate for income level", () => {
    expect(marginalRate(5000, SIMPLE_BRACKETS)).toBe(0.1);
    expect(marginalRate(30000, SIMPLE_BRACKETS)).toBe(0.2);
    expect(marginalRate(60000, SIMPLE_BRACKETS)).toBe(0.3);
  });
});

describe("taxOnNextDollar", () => {
  it("same as marginal rate", () => {
    expect(taxOnNextDollar(25000, SIMPLE_BRACKETS)).toBe(0.2);
  });
});

describe("findIncomeForTax", () => {
  it("finds income for given tax amount", () => {
    const income = findIncomeForTax(500, SIMPLE_BRACKETS);
    expect(income).toBeCloseTo(5000);
  });

  it("finds income spanning brackets", () => {
    const income = findIncomeForTax(3000, SIMPLE_BRACKETS);
    expect(computeTax(income, SIMPLE_BRACKETS).totalTax).toBeCloseTo(3000, 0);
  });
});

describe("compareBrackets", () => {
  it("compares two bracket systems", () => {
    const brackets2 = [
      { min: 0, max: 20000, rate: 0.15 },
      { min: 20000, max: Infinity, rate: 0.25 },
    ];
    const comp = compareBrackets(30000, SIMPLE_BRACKETS, brackets2);
    expect(comp.tax1).toBe(5000);
    expect(comp.tax2).toBe(5500);
    expect(comp.difference).toBe(500);
  });
});

describe("US_2024_SINGLE", () => {
  it("computes reasonable tax for 50k", () => {
    const result = computeTax(50000, US_2024_SINGLE);
    expect(result.totalTax).toBeGreaterThan(5000);
    expect(result.totalTax).toBeLessThan(15000);
  });
});

describe("AU_2024", () => {
  it("tax-free threshold", () => {
    const result = computeTax(18200, AU_2024);
    expect(result.totalTax).toBe(0);
  });

  it("taxes above threshold", () => {
    const result = computeTax(50000, AU_2024);
    expect(result.totalTax).toBeGreaterThan(0);
  });
});

describe("withStandardDeduction", () => {
  it("reduces taxable income", () => {
    const result = withStandardDeduction(50000, 14600, US_2024_SINGLE);
    expect(result.taxableIncome).toBe(35400);
  });
});

describe("formatBreakdown", () => {
  it("formats tax breakdown as text", () => {
    const result = computeTax(30000, SIMPLE_BRACKETS);
    const text = formatBreakdown(result);
    expect(text).toContain("Total Tax");
    expect(text).toContain("Effective Rate");
  });
});
