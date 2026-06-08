import { describe, it, expect } from "vitest";
import { weightedRandomWithSeed, normalizeWeights } from "../weighted-random.js";

describe("weighted-random", () => {
  it("weightedRandomWithSeed returns deterministic results", () => {
    const items = [
      { item: "a", weight: 1 },
      { item: "b", weight: 10 },
      { item: "c", weight: 1 },
    ];
    const r1 = weightedRandomWithSeed(items, 42);
    const r2 = weightedRandomWithSeed(items, 42);
    expect(r1).toBe(r2);
  });

  it("heavily weighted item wins most selections", () => {
    const items = [
      { item: "rare", weight: 1 },
      { item: "common", weight: 1000 },
    ];
    const counts: Record<string, number> = { rare: 0, common: 0 };
    for (let seed = 0; seed < 100; seed++) {
      const picked = weightedRandomWithSeed(items, seed);
      counts[picked]++;
    }
    expect(counts.common).toBeGreaterThan(counts.rare);
  });

  it("throws on empty items", () => {
    expect(() => weightedRandomWithSeed([], 1)).toThrow("empty");
  });

  it("throws on zero total weight", () => {
    expect(() =>
      weightedRandomWithSeed([{ item: "a", weight: 0 }], 1)
    ).toThrow("positive");
  });

  it("normalizeWeights sums to 1", () => {
    const items = [
      { item: "a", weight: 3 },
      { item: "b", weight: 7 },
    ];
    const norm = normalizeWeights(items);
    const total = norm.reduce((s, i) => s + i.weight, 0);
    expect(total).toBeCloseTo(1, 10);
    expect(norm[0].weight).toBeCloseTo(0.3, 10);
    expect(norm[1].weight).toBeCloseTo(0.7, 10);
  });

  it("normalizeWeights handles zero total", () => {
    const norm = normalizeWeights([{ item: "a", weight: 0 }]);
    expect(norm[0].weight).toBe(0);
  });
});
