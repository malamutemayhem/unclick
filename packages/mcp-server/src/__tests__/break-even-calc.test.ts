import { describe, it, expect } from "vitest";
import { BreakEvenCalc } from "../break-even-calc.js";

describe("BreakEvenCalc", () => {
  it("units calculates break-even point", () => {
    const result = BreakEvenCalc.units(10000, 50, 30);
    expect(result.units).toBe(500);
    expect(result.revenue).toBe(25000);
    expect(result.contributionMargin).toBe(20);
  });

  it("units handles zero margin", () => {
    const result = BreakEvenCalc.units(10000, 30, 30);
    expect(result.units).toBe(Infinity);
  });

  it("revenue calculates break-even revenue", () => {
    const rev = BreakEvenCalc.revenue(10000, 0.4);
    expect(rev).toBe(25000);
  });

  it("targetProfit calculates units for desired profit", () => {
    const units = BreakEvenCalc.targetProfit(10000, 50, 30, 5000);
    expect(units).toBe(750);
  });

  it("marginOfSafety calculates percentage above break-even", () => {
    const mos = BreakEvenCalc.marginOfSafety(1000, 800);
    expect(mos).toBe(20);
  });

  it("operatingLeverage calculates DOL", () => {
    const dol = BreakEvenCalc.operatingLeverage(50000, 20000);
    expect(dol).toBe(2.5);
  });

  it("multiProduct handles product mix", () => {
    const result = BreakEvenCalc.multiProduct(
      [
        { name: "A", price: 100, variableCost: 60, salesMix: 0.6 },
        { name: "B", price: 80, variableCost: 40, salesMix: 0.4 },
      ],
      20000,
    );
    expect(result.totalUnits).toBeGreaterThan(0);
    expect(result.perProduct.length).toBe(2);
  });

  it("sensitivity shows price impact", () => {
    const results = BreakEvenCalc.sensitivity(10000, 50, 30);
    expect(results.length).toBe(5);
    const lower = results.find((r) => r.priceChange === -20)!;
    const higher = results.find((r) => r.priceChange === 20)!;
    expect(lower.breakEvenUnits).toBeGreaterThan(higher.breakEvenUnits);
  });

  it("whatIf calculates profit at given sales", () => {
    const result = BreakEvenCalc.whatIf(10000, 50, 30, 600);
    expect(result.profit).toBe(2000);
    expect(result.aboveBreakEven).toBe(true);
    expect(result.unitsAbove).toBe(100);
  });

  it("whatIf detects below break-even", () => {
    const result = BreakEvenCalc.whatIf(10000, 50, 30, 400);
    expect(result.profit).toBeLessThan(0);
    expect(result.aboveBreakEven).toBe(false);
  });
});
