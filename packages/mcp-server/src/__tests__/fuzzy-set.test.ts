import { describe, it, expect } from "vitest";
import { FuzzySet } from "../fuzzy-set.js";

describe("FuzzySet", () => {
  it("triangular membership peaks at center", () => {
    const fs = FuzzySet.triangular("medium", 0, 5, 10);
    expect(fs.membership(5)).toBe(1);
    expect(fs.membership(0)).toBe(0);
    expect(fs.membership(10)).toBe(0);
    expect(fs.membership(2.5)).toBeCloseTo(0.5, 3);
  });

  it("trapezoidal has flat top", () => {
    const fs = FuzzySet.trapezoidal("warm", 20, 25, 30, 35);
    expect(fs.membership(27)).toBe(1);
    expect(fs.membership(20)).toBe(0);
    expect(fs.membership(35)).toBe(0);
  });

  it("gaussian peaks at mean", () => {
    const fs = FuzzySet.gaussian("center", 50, 10);
    expect(fs.membership(50)).toBeCloseTo(1, 3);
    expect(fs.membership(0)).toBeLessThan(0.01);
  });

  it("union takes maximum", () => {
    const a = FuzzySet.triangular("low", 0, 2, 4);
    const b = FuzzySet.triangular("high", 3, 5, 7);
    const u = FuzzySet.union(a, b);
    expect(u.membership(2)).toBe(1);
    expect(u.membership(5)).toBe(1);
  });

  it("intersection takes minimum", () => {
    const a = FuzzySet.triangular("a", 0, 3, 6);
    const b = FuzzySet.triangular("b", 2, 5, 8);
    const inter = FuzzySet.intersection(a, b);
    expect(inter.membership(0)).toBe(0);
    expect(inter.membership(4)).toBeGreaterThan(0);
    expect(inter.membership(4)).toBeLessThan(1);
  });

  it("complement inverts membership", () => {
    const fs = FuzzySet.triangular("test", 0, 5, 10);
    const c = FuzzySet.complement(fs);
    expect(c.membership(5)).toBe(0);
    expect(c.membership(0)).toBe(1);
  });

  it("fuzzify returns memberships for all sets", () => {
    const low = FuzzySet.triangular("low", 0, 0, 50);
    const high = FuzzySet.triangular("high", 50, 100, 100);
    const result = FuzzySet.fuzzify(25, [low, high]);
    expect(result.low).toBe(0.5);
    expect(result.high).toBe(0);
  });

  it("defuzzify produces center of gravity", () => {
    const low = FuzzySet.triangular("low", 0, 25, 50);
    const high = FuzzySet.triangular("high", 50, 75, 100);
    const result = FuzzySet.defuzzify(
      [{ set: low, weight: 0.8 }, { set: high, weight: 0.2 }],
      0, 100,
    );
    expect(result).toBeGreaterThan(20);
    expect(result).toBeLessThan(50);
  });

  it("getName returns set name", () => {
    const fs = FuzzySet.triangular("temp", 0, 5, 10);
    expect(fs.getName()).toBe("temp");
  });
});
