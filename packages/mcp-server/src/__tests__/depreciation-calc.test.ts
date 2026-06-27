import { describe, it, expect } from "vitest";
import { DepreciationCalc } from "../depreciation-calc.js";

describe("DepreciationCalc", () => {
  it("straightLine produces even depreciation", () => {
    const schedule = DepreciationCalc.straightLine(10000, 2000, 4);
    expect(schedule.length).toBe(4);
    expect(schedule[0].depreciation).toBe(2000);
    expect(schedule[3].bookValue).toBe(2000);
    expect(schedule[3].accumulatedDepreciation).toBe(8000);
  });

  it("decliningBalance front-loads depreciation", () => {
    const schedule = DepreciationCalc.decliningBalance(10000, 1000, 5);
    expect(schedule.length).toBe(5);
    expect(schedule[0].depreciation).toBeGreaterThan(schedule[1].depreciation);
    expect(schedule[4].bookValue).toBeGreaterThanOrEqual(1000);
  });

  it("decliningBalance respects salvage value", () => {
    const schedule = DepreciationCalc.decliningBalance(10000, 5000, 3);
    const finalBook = schedule[schedule.length - 1].bookValue;
    expect(finalBook).toBeGreaterThanOrEqual(5000);
  });

  it("sumOfYearsDigits produces decreasing schedule", () => {
    const schedule = DepreciationCalc.sumOfYearsDigits(10000, 1000, 5);
    expect(schedule.length).toBe(5);
    expect(schedule[0].depreciation).toBeGreaterThan(schedule[4].depreciation);
    expect(schedule[4].bookValue).toBeCloseTo(1000, 0);
  });

  it("unitsOfProduction varies by usage", () => {
    const schedule = DepreciationCalc.unitsOfProduction(10000, 2000, 1000, [300, 400, 300]);
    expect(schedule.length).toBe(3);
    expect(schedule[0].depreciation).toBe(2400);
    expect(schedule[1].depreciation).toBe(3200);
    expect(schedule[2].bookValue).toBe(2000);
  });

  it("totalDepreciation is cost minus salvage", () => {
    expect(DepreciationCalc.totalDepreciation(10000, 2000)).toBe(8000);
  });

  it("annualRate calculates percentage", () => {
    const rate = DepreciationCalc.annualRate(10000, 2000, 4);
    expect(rate).toBe(20);
  });
});
