import { describe, it, expect } from "vitest";
import { RoiCalc } from "../roi-calc.js";

describe("RoiCalc", () => {
  it("simple calculates basic ROI", () => {
    const result = RoiCalc.simple(1000, 1500);
    expect(result.roi).toBe(50);
    expect(result.netProfit).toBe(500);
  });

  it("withTime annualizes ROI", () => {
    const result = RoiCalc.withTime(1000, 2000, 3);
    expect(result.roi).toBe(100);
    expect(result.annualizedRoi).toBeGreaterThan(0);
    expect(result.annualizedRoi).toBeLessThan(100);
  });

  it("cashFlow handles periodic cash flows", () => {
    const result = RoiCalc.cashFlow(1000, [300, 400, 500, 200]);
    expect(result.roi).toBe(40);
    expect(result.totalReturn).toBe(1400);
    expect(result.paybackPeriod).not.toBeNull();
  });

  it("cashFlow finds payback period", () => {
    const result = RoiCalc.cashFlow(1000, [500, 500, 500]);
    expect(result.paybackPeriod).not.toBeNull();
    expect(result.paybackPeriod!).toBeLessThanOrEqual(2);
  });

  it("npv calculates net present value", () => {
    const npv = RoiCalc.npv(0.1, [500, 500, 500], 1000);
    expect(npv).toBeGreaterThan(0);
  });

  it("npv with high discount rate reduces value", () => {
    const highDiscount = RoiCalc.npv(0.5, [500, 500], 1000);
    const lowDiscount = RoiCalc.npv(0.05, [500, 500], 1000);
    expect(lowDiscount).toBeGreaterThan(highDiscount);
  });

  it("irr finds internal rate of return", () => {
    const rate = RoiCalc.irr([600, 600, 600], 1000);
    expect(rate).toBeGreaterThan(0);
    const npv = RoiCalc.npv(rate / 100, [600, 600, 600], 1000);
    expect(Math.abs(npv)).toBeLessThan(5);
  });

  it("compare ranks investments", () => {
    const ranked = RoiCalc.compare([
      { name: "A", cost: 1000, returns: 1200, years: 1 },
      { name: "B", cost: 1000, returns: 1500, years: 2 },
      { name: "C", cost: 1000, returns: 1100, years: 1 },
    ]);
    expect(ranked[0].rank).toBe(1);
    expect(ranked[0].annualizedRoi).toBeGreaterThanOrEqual(ranked[1].annualizedRoi);
  });

  it("handles zero investment gracefully", () => {
    const result = RoiCalc.simple(0, 100);
    expect(result.roi).toBe(0);
  });
});
