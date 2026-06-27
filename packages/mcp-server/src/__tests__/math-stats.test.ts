import { describe, it, expect } from "vitest";
import {
  sum, mean, median, mode, variance, standardDeviation,
  percentile, min, max, range, covariance, correlation, zScore, histogram
} from "../math-stats.js";

describe("math-stats", () => {
  it("sum", () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
    expect(sum([])).toBe(0);
  });

  it("mean", () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
    expect(mean([])).toBe(0);
  });

  it("median odd count", () => {
    expect(median([5, 1, 3])).toBe(3);
  });

  it("median even count", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("mode single mode", () => {
    expect(mode([1, 2, 2, 3])).toEqual([2]);
  });

  it("mode multiple modes", () => {
    expect(mode([1, 1, 2, 2])).toEqual([1, 2]);
  });

  it("variance population", () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(4, 1);
  });

  it("variance sample", () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9], false)).toBeCloseTo(4.571, 2);
  });

  it("standardDeviation", () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2, 1);
  });

  it("percentile", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(percentile(data, 50)).toBe(5.5);
    expect(percentile(data, 0)).toBe(1);
    expect(percentile(data, 100)).toBe(10);
  });

  it("min/max/range", () => {
    expect(min([5, 1, 9])).toBe(1);
    expect(max([5, 1, 9])).toBe(9);
    expect(range([5, 1, 9])).toBe(8);
  });

  it("correlation of perfectly correlated data", () => {
    expect(correlation([1, 2, 3], [2, 4, 6])).toBeCloseTo(1, 5);
  });

  it("zScore", () => {
    expect(zScore(5, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toBeCloseTo(0, 0);
  });

  it("histogram bins data", () => {
    const h = histogram([1, 2, 3, 4, 5], 2);
    expect(h).toHaveLength(2);
    expect(h[0].count + h[1].count).toBe(5);
  });
});
