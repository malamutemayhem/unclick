import { describe, it, expect } from "vitest";
import { TrendAnalyzer } from "../trend-analyzer.js";

describe("TrendAnalyzer", () => {
  it("analyze detects upward trend", () => {
    const result = TrendAnalyzer.analyze([10, 12, 14, 16, 18, 20]);
    expect(result.direction).toBe("up");
    expect(result.slope).toBeGreaterThan(0);
    expect(result.strength).toBeGreaterThan(0);
  });

  it("analyze detects downward trend", () => {
    const result = TrendAnalyzer.analyze([20, 18, 16, 14, 12, 10]);
    expect(result.direction).toBe("down");
    expect(result.slope).toBeLessThan(0);
  });

  it("analyze detects flat trend", () => {
    const result = TrendAnalyzer.analyze([10, 10, 10, 10, 10]);
    expect(result.direction).toBe("flat");
  });

  it("percentChange calculates period changes", () => {
    const changes = TrendAnalyzer.percentChange([100, 110, 105, 120]);
    expect(changes.length).toBe(3);
    expect(changes[0]).toBe(10);
  });

  it("peaks finds local maxima", () => {
    const peaks = TrendAnalyzer.peaks([1, 3, 2, 5, 1, 4, 2]);
    expect(peaks).toContain(1);
    expect(peaks).toContain(3);
    expect(peaks).toContain(5);
  });

  it("troughs finds local minima", () => {
    const troughs = TrendAnalyzer.troughs([3, 1, 4, 2, 5, 1, 3]);
    expect(troughs).toContain(1);
    expect(troughs).toContain(3);
    expect(troughs).toContain(5);
  });

  it("forecast extrapolates trend", () => {
    const forecast = TrendAnalyzer.forecast([10, 20, 30, 40, 50], 3);
    expect(forecast.length).toBe(3);
    expect(forecast[0]).toBeCloseTo(60, 0);
    expect(forecast[1]).toBeCloseTo(70, 0);
  });

  it("seasonality detects periodic patterns", () => {
    const data = [10, 20, 30, 10, 20, 30, 10, 20, 30];
    const seasonal = TrendAnalyzer.seasonality(data, 3);
    expect(seasonal.length).toBe(3);
    expect(seasonal[0]).toBeLessThan(0);
    expect(seasonal[2]).toBeGreaterThan(0);
  });

  it("handles single data point", () => {
    const result = TrendAnalyzer.analyze([5]);
    expect(result.direction).toBe("flat");
    expect(result.slope).toBe(0);
  });
});
