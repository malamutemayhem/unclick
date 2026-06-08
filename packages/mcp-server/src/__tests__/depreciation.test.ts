import { describe, it, expect } from "vitest";
import { DepreciationCalculator } from "../depreciation.js";

describe("DepreciationCalculator", () => {
  it("straight line depreciation", () => {
    const schedule = DepreciationCalculator.straightLine(10000, 2000, 4);
    expect(schedule.length).toBe(4);
    expect(schedule[0].depreciation).toBe(2000);
    expect(schedule[3].bookValue).toBeCloseTo(2000);
  });

  it("declining balance depreciation", () => {
    const schedule = DepreciationCalculator.decliningBalance(10000, 1000, 5);
    expect(schedule.length).toBe(5);
    expect(schedule[0].depreciation).toBeGreaterThan(schedule[1].depreciation);
    expect(schedule[4].bookValue).toBeGreaterThanOrEqual(1000);
  });

  it("sum of years digits depreciation", () => {
    const schedule = DepreciationCalculator.sumOfYearsDigits(10000, 2000, 4);
    expect(schedule.length).toBe(4);
    expect(schedule[0].depreciation).toBeGreaterThan(schedule[3].depreciation);
    expect(schedule[3].bookValue).toBeCloseTo(2000, 0);
  });

  it("units of production depreciation", () => {
    const schedule = DepreciationCalculator.unitsOfProduction(
      10000, 2000, 8000, [2000, 3000, 2000, 1000],
    );
    expect(schedule.length).toBe(4);
    expect(schedule[0].depreciation).toBeCloseTo(2000);
    expect(schedule[1].depreciation).toBeCloseTo(3000);
  });

  it("calculates annual rate", () => {
    const rate = DepreciationCalculator.annualRate(10000, 2000, 4);
    expect(rate).toBeCloseTo(0.2);
  });

  it("calculates total depreciation", () => {
    expect(DepreciationCalculator.totalDepreciation(10000, 2000)).toBe(8000);
  });

  it("straight line has equal annual amounts", () => {
    const schedule = DepreciationCalculator.straightLine(50000, 5000, 10);
    const amounts = schedule.map((e) => e.depreciation);
    expect(new Set(amounts.map((a) => Math.round(a))).size).toBe(1);
  });

  it("accumulated depreciation equals total", () => {
    const schedule = DepreciationCalculator.sumOfYearsDigits(20000, 4000, 5);
    const last = schedule[schedule.length - 1];
    expect(last.accumulatedDepreciation).toBeCloseTo(16000, 0);
  });
});
