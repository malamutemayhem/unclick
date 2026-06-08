import { describe, it, expect } from "vitest";
import { mean, median, mode, variance, stddev, percentile, sum, min, max, range } from "../math-stats.js";

describe("math-stats", () => {
  it("mean", () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
    expect(mean([])).toBe(0);
  });

  it("median odd count", () => {
    expect(median([3, 1, 2])).toBe(2);
  });

  it("median even count", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("mode", () => {
    expect(mode([1, 2, 2, 3])).toEqual([2]);
    expect(mode([1, 1, 2, 2])).toEqual([1, 2]);
    expect(mode([])).toEqual([]);
  });

  it("variance and stddev", () => {
    const vals = [2, 4, 4, 4, 5, 5, 7, 9];
    expect(variance(vals)).toBeCloseTo(4.571, 2);
    expect(stddev(vals)).toBeCloseTo(2.138, 2);
  });

  it("percentile", () => {
    const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(percentile(vals, 50)).toBe(5.5);
    expect(percentile(vals, 0)).toBe(1);
    expect(percentile(vals, 100)).toBe(10);
  });

  it("sum", () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([])).toBe(0);
  });

  it("min and max", () => {
    expect(min([3, 1, 2])).toBe(1);
    expect(max([3, 1, 2])).toBe(3);
  });

  it("range", () => {
    expect(range([1, 5, 3])).toBe(4);
  });
});
