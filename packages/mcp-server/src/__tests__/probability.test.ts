import { describe, it, expect } from "vitest";
import { mean, variance, standardDeviation, median, percentile, zScore, covariance, correlation } from "../probability.js";

describe("mean", () => {
  it("computes average", () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
  });
  it("empty returns 0", () => {
    expect(mean([])).toBe(0);
  });
});

describe("variance", () => {
  it("computes population variance", () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9])).toBe(4);
  });
  it("empty returns 0", () => {
    expect(variance([])).toBe(0);
  });
});

describe("standardDeviation", () => {
  it("computes sd", () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2);
  });
});

describe("median", () => {
  it("odd length", () => {
    expect(median([3, 1, 2])).toBe(2);
  });
  it("even length", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });
  it("empty returns 0", () => {
    expect(median([])).toBe(0);
  });
});

describe("percentile", () => {
  it("50th percentile is median", () => {
    expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
  });
  it("0th percentile is min", () => {
    expect(percentile([10, 20, 30], 0)).toBe(10);
  });
  it("100th percentile is max", () => {
    expect(percentile([10, 20, 30], 100)).toBe(30);
  });
});

describe("zScore", () => {
  it("mean value has z-score 0", () => {
    expect(zScore(3, [1, 2, 3, 4, 5])).toBeCloseTo(0);
  });
  it("above mean is positive", () => {
    expect(zScore(5, [1, 2, 3, 4, 5])).toBeGreaterThan(0);
  });
});

describe("covariance", () => {
  it("positive covariance", () => {
    expect(covariance([1, 2, 3], [1, 2, 3])).toBeGreaterThan(0);
  });
  it("negative covariance", () => {
    expect(covariance([1, 2, 3], [3, 2, 1])).toBeLessThan(0);
  });
});

describe("correlation", () => {
  it("perfect positive", () => {
    expect(correlation([1, 2, 3], [2, 4, 6])).toBeCloseTo(1);
  });
  it("perfect negative", () => {
    expect(correlation([1, 2, 3], [6, 4, 2])).toBeCloseTo(-1);
  });
  it("zero sd returns 0", () => {
    expect(correlation([1, 1, 1], [2, 2, 2])).toBe(0);
  });
});
