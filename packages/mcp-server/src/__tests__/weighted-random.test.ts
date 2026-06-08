import { describe, it, expect } from "vitest";
import { weightedRandom, weightedSample, WeightedPool, normalizeWeights } from "../weighted-random.js";

describe("weightedRandom", () => {
  it("returns items from the list", () => {
    const items = ["a", "b", "c"];
    const weights = [1, 1, 1];
    for (let i = 0; i < 20; i++) {
      expect(items).toContain(weightedRandom(items, weights));
    }
  });

  it("heavily weighted item appears most", () => {
    const counts = { a: 0, b: 0 };
    for (let i = 0; i < 1000; i++) {
      const pick = weightedRandom(["a", "b"], [99, 1]);
      counts[pick as "a" | "b"]++;
    }
    expect(counts.a).toBeGreaterThan(counts.b * 5);
  });
});

describe("weightedSample", () => {
  it("returns requested count without duplicates", () => {
    const result = weightedSample(["a", "b", "c", "d"], [1, 1, 1, 1], 3);
    expect(result.length).toBe(3);
    expect(new Set(result).size).toBe(3);
  });
});

describe("WeightedPool", () => {
  it("pick returns from pool", () => {
    const pool = new WeightedPool<string>();
    pool.add("x", 10);
    pool.add("y", 1);
    expect(pool.size).toBe(2);
    expect(["x", "y"]).toContain(pool.pick());
  });

  it("throws on empty pool", () => {
    const pool = new WeightedPool<string>();
    expect(() => pool.pick()).toThrow("empty");
  });
});

describe("normalizeWeights", () => {
  it("normalizes to sum to 1", () => {
    const result = normalizeWeights([2, 3, 5]);
    expect(result[0]).toBeCloseTo(0.2);
    expect(result[1]).toBeCloseTo(0.3);
    expect(result[2]).toBeCloseTo(0.5);
  });

  it("handles all zeros", () => {
    expect(normalizeWeights([0, 0])).toEqual([0, 0]);
  });
});
