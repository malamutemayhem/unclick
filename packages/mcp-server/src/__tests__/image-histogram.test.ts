import { describe, it, expect } from "vitest";
import { computeHistogram, normalizeHistogram, cumulativeHistogram, histogramEqualization, percentile, entropy, otsuThreshold } from "../image-histogram.js";

describe("computeHistogram", () => {
  it("computes basic stats", () => {
    const h = computeHistogram([1, 2, 3, 4, 5]);
    expect(h.min).toBe(1);
    expect(h.max).toBe(5);
    expect(h.mean).toBe(3);
    expect(h.median).toBe(3);
    expect(h.total).toBe(5);
  });

  it("computes standard deviation", () => {
    const h = computeHistogram([2, 4, 4, 4, 5, 5, 7, 9]);
    expect(h.stddev).toBeCloseTo(2, 0);
  });

  it("handles empty values", () => {
    const h = computeHistogram([]);
    expect(h.total).toBe(0);
    expect(h.mean).toBe(0);
  });

  it("bins values correctly", () => {
    const values = [0, 0, 0, 255, 255];
    const h = computeHistogram(values, 256);
    expect(h.bins[0]).toBe(3);
    expect(h.bins[255]).toBe(2);
  });
});

describe("normalizeHistogram", () => {
  it("normalizes to 0-1 range", () => {
    const h = computeHistogram([0, 0, 0, 100, 200], 10);
    const norm = normalizeHistogram(h);
    const max = Math.max(...norm);
    expect(max).toBe(1);
  });
});

describe("cumulativeHistogram", () => {
  it("accumulates correctly", () => {
    const h = computeHistogram([0, 1, 2, 3], 4);
    const cum = cumulativeHistogram(h);
    expect(cum[cum.length - 1]).toBe(4);
  });
});

describe("histogramEqualization", () => {
  it("spreads values", () => {
    const values = [10, 10, 10, 20, 20, 30];
    const equalized = histogramEqualization(values, 32);
    expect(equalized.length).toBe(values.length);
  });
});

describe("percentile", () => {
  it("computes 50th percentile", () => {
    const h = computeHistogram([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10);
    const p50 = percentile(h, 50);
    expect(p50).toBeGreaterThan(4);
    expect(p50).toBeLessThan(7);
  });
});

describe("entropy", () => {
  it("uniform distribution has max entropy", () => {
    const uniform = new Array(256).fill(0).map((_, i) => i);
    const h = computeHistogram(uniform, 256);
    const e = entropy(h);
    expect(e).toBeGreaterThan(7);
  });

  it("single value has zero entropy", () => {
    const h = computeHistogram([5, 5, 5, 5], 256);
    const e = entropy(h);
    expect(e).toBeCloseTo(0);
  });
});

describe("otsuThreshold", () => {
  it("finds threshold between two groups", () => {
    const low = Array.from({ length: 50 }, (_, i) => 10 + (i % 10));
    const high = Array.from({ length: 50 }, (_, i) => 190 + (i % 10));
    const values = [...low, ...high];
    const h = computeHistogram(values, 256);
    const threshold = otsuThreshold(h);
    expect(threshold).toBeGreaterThan(10);
    expect(threshold).toBeLessThan(200);
  });
});
