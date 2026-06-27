import { describe, it, expect } from "vitest";
import { ProgressiveTaxCalculator, FlatTaxCalculator, SalesTaxCalculator } from "../tax-calc.js";

describe("ProgressiveTaxCalculator", () => {
  const brackets = [
    { min: 0, max: 10000, rate: 0.1 },
    { min: 10000, max: 50000, rate: 0.2 },
    { min: 50000, max: Infinity, rate: 0.3 },
  ];

  it("calculates tax with progressive brackets", () => {
    const calc = new ProgressiveTaxCalculator(brackets);
    const result = calc.calculate(30000);
    const expected = 10000 * 0.1 + 20000 * 0.2;
    expect(result.totalTax).toBeCloseTo(expected);
  });

  it("reports effective rate", () => {
    const calc = new ProgressiveTaxCalculator(brackets);
    const result = calc.calculate(10000);
    expect(result.effectiveRate).toBeCloseTo(0.1);
  });

  it("applies deductions", () => {
    const calc = new ProgressiveTaxCalculator(brackets);
    const result = calc.calculate(30000, 10000);
    const noDed = calc.calculate(30000);
    expect(result.totalTax).toBeLessThan(noDed.totalTax);
  });

  it("returns zero tax for zero income", () => {
    const calc = new ProgressiveTaxCalculator(brackets);
    const result = calc.calculate(0);
    expect(result.totalTax).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  it("provides breakdown", () => {
    const calc = new ProgressiveTaxCalculator(brackets);
    const result = calc.calculate(60000);
    expect(result.breakdown.length).toBe(3);
  });

  it("reports marginal rate", () => {
    const calc = new ProgressiveTaxCalculator(brackets);
    expect(calc.calculate(60000).marginalRate).toBe(0.3);
    expect(calc.calculate(5000).marginalRate).toBe(0.1);
  });
});

describe("FlatTaxCalculator", () => {
  it("calculates flat tax", () => {
    const calc = new FlatTaxCalculator(0.2);
    const result = calc.calculate(50000);
    expect(result.tax).toBe(10000);
    expect(result.netIncome).toBe(40000);
  });

  it("applies exemption", () => {
    const calc = new FlatTaxCalculator(0.2, 10000);
    const result = calc.calculate(50000);
    expect(result.tax).toBe(8000);
  });
});

describe("SalesTaxCalculator", () => {
  it("calculates sales tax by region", () => {
    const calc = new SalesTaxCalculator();
    calc.addRegion("CA", 0.0725);
    calc.addRegion("OR", 0);
    const result = calc.calculate(100, "CA");
    expect(result!.tax).toBeCloseTo(7.25);
    expect(result!.total).toBeCloseTo(107.25);
  });

  it("returns null for unknown region", () => {
    const calc = new SalesTaxCalculator();
    expect(calc.calculate(100, "XX")).toBeNull();
  });

  it("compares regions", () => {
    const calc = new SalesTaxCalculator();
    calc.addRegion("CA", 0.0725);
    calc.addRegion("OR", 0);
    const comparison = calc.compareRegions(100);
    expect(comparison[0].region).toBe("OR");
    expect(comparison[0].tax).toBe(0);
  });
});
