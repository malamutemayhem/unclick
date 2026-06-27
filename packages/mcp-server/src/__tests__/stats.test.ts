import { describe, it, expect } from "vitest";
import { mean, median, mode, variance, stddev, percentile, sum, min, max, range } from "../stats.js";

describe("mean", () => {
  it("calculates average", () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
  });

  it("handles single value", () => {
    expect(mean([42])).toBe(42);
  });

  it("throws on empty array", () => {
    expect(() => mean([])).toThrow("Empty array");
  });
});

describe("median", () => {
  it("returns middle value for odd length", () => {
    expect(median([3, 1, 2])).toBe(2);
  });

  it("returns average of middle two for even length", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("handles single value", () => {
    expect(median([7])).toBe(7);
  });

  it("throws on empty array", () => {
    expect(() => median([])).toThrow("Empty array");
  });
});

describe("mode", () => {
  it("returns most frequent value", () => {
    expect(mode([1, 2, 2, 3])).toEqual([2]);
  });

  it("returns multiple modes", () => {
    const result = mode([1, 1, 2, 2, 3]);
    expect(result).toContain(1);
    expect(result).toContain(2);
    expect(result).toHaveLength(2);
  });

  it("all unique returns all", () => {
    expect(mode([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("throws on empty array", () => {
    expect(() => mode([])).toThrow("Empty array");
  });
});

describe("variance", () => {
  it("calculates population variance", () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9])).toBe(4);
  });

  it("returns 0 for identical values", () => {
    expect(variance([5, 5, 5])).toBe(0);
  });
});

describe("stddev", () => {
  it("calculates standard deviation", () => {
    expect(stddev([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2);
  });
});

describe("percentile", () => {
  it("calculates 50th percentile (median)", () => {
    expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
  });

  it("calculates 0th percentile (min)", () => {
    expect(percentile([1, 2, 3, 4, 5], 0)).toBe(1);
  });

  it("calculates 100th percentile (max)", () => {
    expect(percentile([1, 2, 3, 4, 5], 100)).toBe(5);
  });

  it("interpolates between values", () => {
    const result = percentile([1, 2, 3, 4, 5], 25);
    expect(result).toBe(2);
  });

  it("throws on empty array", () => {
    expect(() => percentile([], 50)).toThrow("Empty array");
  });
});

describe("sum", () => {
  it("sums values", () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });

  it("returns 0 for empty array", () => {
    expect(sum([])).toBe(0);
  });
});

describe("min", () => {
  it("returns minimum", () => {
    expect(min([3, 1, 4, 1, 5])).toBe(1);
  });

  it("throws on empty array", () => {
    expect(() => min([])).toThrow("Empty array");
  });
});

describe("max", () => {
  it("returns maximum", () => {
    expect(max([3, 1, 4, 1, 5])).toBe(5);
  });

  it("throws on empty array", () => {
    expect(() => max([])).toThrow("Empty array");
  });
});

describe("range", () => {
  it("returns max minus min", () => {
    expect(range([1, 5, 3, 9, 2])).toBe(8);
  });

  it("returns 0 for identical values", () => {
    expect(range([4, 4, 4])).toBe(0);
  });
});
