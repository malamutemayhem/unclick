import { describe, it, expect } from "vitest";
import { ABTestCalc } from "../ab-test-calc.js";

describe("ABTestCalc", () => {
  it("analyze returns correct rates", () => {
    const result = ABTestCalc.analyze(1000, 100, 1000, 120);
    expect(result.controlRate).toBe(0.1);
    expect(result.variantRate).toBe(0.12);
    expect(result.relativeUplift).toBe(0.2);
  });

  it("analyze detects significance with large sample", () => {
    const result = ABTestCalc.analyze(10000, 500, 10000, 600);
    expect(result.significant).toBe(true);
    expect(result.pValue).toBeLessThan(0.05);
  });

  it("analyze detects non-significance with small difference", () => {
    const result = ABTestCalc.analyze(100, 10, 100, 11);
    expect(result.significant).toBe(false);
  });

  it("analyze provides confidence interval", () => {
    const result = ABTestCalc.analyze(1000, 100, 1000, 120);
    expect(result.confidenceInterval.lower).toBeLessThan(result.confidenceInterval.upper);
  });

  it("minimumSampleSize returns positive integer", () => {
    const size = ABTestCalc.minimumSampleSize(0.1, 0.02);
    expect(size).toBeGreaterThan(0);
    expect(Number.isInteger(size)).toBe(true);
  });

  it("minimumSampleSize increases for smaller effects", () => {
    const large = ABTestCalc.minimumSampleSize(0.1, 0.05);
    const small = ABTestCalc.minimumSampleSize(0.1, 0.01);
    expect(small).toBeGreaterThan(large);
  });

  it("duration calculates test duration", () => {
    const days = ABTestCalc.duration(1000, 0.1, 0.02);
    expect(days).toBeGreaterThan(0);
    expect(Number.isInteger(days)).toBe(true);
  });

  it("bayesianProbability returns value between 0 and 1", () => {
    const prob = ABTestCalc.bayesianProbability(100, 1000, 120, 1000, 1000);
    expect(prob).toBeGreaterThan(0);
    expect(prob).toBeLessThanOrEqual(1);
  });

  it("bayesianProbability favors higher conversion rate", () => {
    const prob = ABTestCalc.bayesianProbability(50, 1000, 150, 1000, 5000);
    expect(prob).toBeGreaterThan(0.9);
  });

  it("handles zero visitors gracefully", () => {
    const result = ABTestCalc.analyze(0, 0, 0, 0);
    expect(result.controlRate).toBe(0);
    expect(result.variantRate).toBe(0);
  });
});
