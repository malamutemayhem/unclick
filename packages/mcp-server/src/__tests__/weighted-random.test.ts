import { describe, it, expect } from "vitest";
import { weightedRandom, weightedSample, normalizeWeights, reservoirSample, shuffle, WeightedItem } from "../weighted-random.js";

describe("weightedRandom", () => {
  it("returns an item", () => {
    const items: WeightedItem<string>[] = [{ item: "a", weight: 1 }, { item: "b", weight: 1 }];
    const result = weightedRandom(items);
    expect(["a", "b"]).toContain(result);
  });

  it("returns undefined for empty array", () => {
    expect(weightedRandom([])).toBeUndefined();
  });

  it("respects weights over many trials", () => {
    const items: WeightedItem<string>[] = [{ item: "heavy", weight: 100 }, { item: "light", weight: 1 }];
    let heavyCount = 0;
    for (let i = 0; i < 200; i++) {
      if (weightedRandom(items) === "heavy") heavyCount++;
    }
    expect(heavyCount).toBeGreaterThan(150);
  });
});

describe("weightedSample", () => {
  it("returns requested count", () => {
    const items: WeightedItem<string>[] = [
      { item: "a", weight: 1 }, { item: "b", weight: 1 }, { item: "c", weight: 1 },
    ];
    expect(weightedSample(items, 2).length).toBe(2);
  });

  it("returns unique items", () => {
    const items: WeightedItem<number>[] = [
      { item: 1, weight: 1 }, { item: 2, weight: 1 }, { item: 3, weight: 1 },
    ];
    const sample = weightedSample(items, 3);
    expect(new Set(sample).size).toBe(3);
  });
});

describe("normalizeWeights", () => {
  it("normalizes to sum 1", () => {
    const items: WeightedItem<string>[] = [{ item: "a", weight: 3 }, { item: "b", weight: 7 }];
    const norm = normalizeWeights(items);
    const total = norm.reduce((s, i) => s + i.weight, 0);
    expect(total).toBeCloseTo(1);
  });

  it("handles all-zero weights", () => {
    const items: WeightedItem<string>[] = [{ item: "a", weight: 0 }];
    const norm = normalizeWeights(items);
    expect(norm[0].weight).toBe(0);
  });
});

describe("reservoirSample", () => {
  it("returns k items", () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(reservoirSample(items, 3).length).toBe(3);
  });

  it("returns all if k >= length", () => {
    expect(reservoirSample([1, 2], 5).length).toBe(2);
  });
});

describe("shuffle", () => {
  it("returns same length", () => {
    expect(shuffle([1, 2, 3]).length).toBe(3);
  });

  it("does not mutate original", () => {
    const orig = [1, 2, 3];
    shuffle(orig);
    expect(orig).toEqual([1, 2, 3]);
  });

  it("contains same elements", () => {
    const result = shuffle([1, 2, 3]);
    expect(result.sort()).toEqual([1, 2, 3]);
  });
});
