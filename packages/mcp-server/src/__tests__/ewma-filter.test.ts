import { describe, it, expect } from "vitest";
import { EWMAFilter } from "../ewma-filter.js";

describe("EWMAFilter", () => {
  it("first value is identity", () => {
    const f = new EWMAFilter(0.5);
    expect(f.update(10)).toBe(10);
  });

  it("smooths noisy data", () => {
    const f = new EWMAFilter(0.3);
    f.update(10);
    f.update(12);
    const v = f.update(8);
    expect(v).toBeGreaterThan(8);
    expect(v).toBeLessThan(12);
  });

  it("alpha=1 tracks input exactly", () => {
    const f = new EWMAFilter(1);
    f.update(5);
    expect(f.update(10)).toBe(10);
  });

  it("standardDeviation is non-negative", () => {
    const f = new EWMAFilter(0.5);
    f.update(10);
    f.update(20);
    expect(f.standardDeviation()).toBeGreaterThanOrEqual(0);
  });

  it("fromHalfLife creates filter", () => {
    const f = EWMAFilter.fromHalfLife(5);
    expect(f.getAlpha()).toBeGreaterThan(0);
    expect(f.getAlpha()).toBeLessThan(1);
  });

  it("fromSpan creates filter", () => {
    const f = EWMAFilter.fromSpan(10);
    expect(f.getAlpha()).toBeCloseTo(2 / 11, 8);
  });

  it("smooth produces array of same length", () => {
    const data = [1, 2, 3, 4, 5];
    const smoothed = EWMAFilter.smooth(data, 0.5);
    expect(smoothed.length).toBe(5);
  });

  it("reset clears state", () => {
    const f = new EWMAFilter(0.5);
    f.update(100);
    f.reset();
    expect(f.current()).toBeNull();
    expect(f.getCount()).toBe(0);
  });
});
