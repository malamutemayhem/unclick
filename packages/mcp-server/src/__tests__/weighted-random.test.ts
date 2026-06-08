import { describe, it, expect } from "vitest";
import { weightedRandom, weightedSample, normalizeWeights, cumulativeWeights, WeightedPicker } from "../weighted-random.js";

describe("weighted-random", () => {
  it("weightedRandom returns a value from items", () => {
    const items = [
      { value: "a", weight: 1 },
      { value: "b", weight: 2 },
      { value: "c", weight: 3 },
    ];
    const result = weightedRandom(items);
    expect(["a", "b", "c"]).toContain(result);
  });

  it("weightedRandom throws on empty", () => {
    expect(() => weightedRandom([])).toThrow("empty");
  });

  it("weightedSample returns correct count", () => {
    const items = [{ value: "x", weight: 1 }];
    expect(weightedSample(items, 5)).toHaveLength(5);
    expect(weightedSample(items, 0)).toHaveLength(0);
  });

  it("normalizeWeights sums to 1", () => {
    const items = [
      { value: "a", weight: 2 },
      { value: "b", weight: 3 },
    ];
    const normalized = normalizeWeights(items);
    const total = normalized.reduce((sum, i) => sum + i.weight, 0);
    expect(total).toBeCloseTo(1, 5);
  });

  it("cumulativeWeights builds cumulative", () => {
    const items = [
      { value: "a", weight: 1 },
      { value: "b", weight: 2 },
      { value: "c", weight: 3 },
    ];
    const cum = cumulativeWeights(items);
    expect(cum[0].cumulative).toBe(1);
    expect(cum[1].cumulative).toBe(3);
    expect(cum[2].cumulative).toBe(6);
  });
});

describe("WeightedPicker", () => {
  it("pick returns value from items", () => {
    const picker = new WeightedPicker([
      { value: "a", weight: 1 },
      { value: "b", weight: 1 },
    ]);
    expect(["a", "b"]).toContain(picker.pick());
  });

  it("add and remove", () => {
    const picker = new WeightedPicker<string>([]);
    picker.add("x", 5);
    expect(picker.size).toBe(1);
    expect(picker.totalWeight).toBe(5);
    picker.remove("x");
    expect(picker.size).toBe(0);
  });
});
