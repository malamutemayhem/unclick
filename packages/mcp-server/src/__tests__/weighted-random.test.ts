import { describe, it, expect } from "vitest";
import { weightedRandom, weightedSample, WeightedSelector } from "../weighted-random.js";

describe("weightedRandom", () => {
  it("returns a value", () => {
    const result = weightedRandom([{ value: "a", weight: 1 }, { value: "b", weight: 1 }]);
    expect(["a", "b"]).toContain(result);
  });

  it("respects weights over many samples", () => {
    const counts: Record<string, number> = { a: 0, b: 0 };
    for (let i = 0; i < 1000; i++) {
      const r = weightedRandom([{ value: "a", weight: 9 }, { value: "b", weight: 1 }]);
      counts[r]++;
    }
    expect(counts.a).toBeGreaterThan(counts.b);
  });

  it("throws on empty", () => {
    expect(() => weightedRandom([])).toThrow("Empty");
  });
});

describe("weightedSample", () => {
  it("returns requested count", () => {
    const items = [{ value: "x", weight: 1 }];
    expect(weightedSample(items, 5)).toHaveLength(5);
  });
});

describe("WeightedSelector", () => {
  it("selects from added items", () => {
    const ws = new WeightedSelector<string>();
    ws.add("a", 1).add("b", 1);
    expect(["a", "b"]).toContain(ws.select());
  });

  it("tracks size", () => {
    const ws = new WeightedSelector<string>();
    ws.add("a", 1).add("b", 2);
    expect(ws.size).toBe(2);
  });

  it("throws on empty select", () => {
    const ws = new WeightedSelector<string>();
    expect(() => ws.select()).toThrow("No items");
  });

  it("clear empties selector", () => {
    const ws = new WeightedSelector<string>();
    ws.add("a", 1);
    ws.clear();
    expect(ws.size).toBe(0);
  });
});
