import { describe, it, expect } from "vitest";
import { reciprocalRankFusion, weightedFusion, combineScores, normalizeScores } from "../fusion-scorer.js";

describe("reciprocalRankFusion", () => {
  it("fuses two ranked lists", () => {
    const list1 = ["a", "b", "c"];
    const list2 = ["b", "a", "d"];
    const results = reciprocalRankFusion([list1, list2]);
    expect(["a", "b"]).toContain(results[0].item);
    expect(results.length).toBe(4);
    const aEntry = results.find((r) => r.item === "a")!;
    const bEntry = results.find((r) => r.item === "b")!;
    expect(aEntry.fusedScore).toBeCloseTo(bEntry.fusedScore);
  });

  it("items in both lists score higher than single-list items", () => {
    const list1 = ["a", "b"];
    const list2 = ["b", "c"];
    const results = reciprocalRankFusion([list1, list2]);
    const bScore = results.find((r) => r.item === "b")!.fusedScore;
    const aScore = results.find((r) => r.item === "a")!.fusedScore;
    expect(bScore).toBeGreaterThan(aScore);
  });

  it("works with custom getId", () => {
    const list1 = [{ id: "x", val: 1 }, { id: "y", val: 2 }];
    const list2 = [{ id: "y", val: 2 }, { id: "z", val: 3 }];
    const results = reciprocalRankFusion([list1, list2], 60, (i) => i.id);
    expect(results.find((r) => r.item.id === "y")!.fusedScore).toBeGreaterThan(0);
  });

  it("handles empty lists", () => {
    const results = reciprocalRankFusion([[], []]);
    expect(results).toEqual([]);
  });

  it("single list returns ranked items", () => {
    const results = reciprocalRankFusion([["a", "b", "c"]]);
    expect(results[0].item).toBe("a");
    expect(results[0].fusedScore).toBeGreaterThan(results[1].fusedScore);
  });
});

describe("weightedFusion", () => {
  it("combines scored lists with weights", () => {
    const list1 = [{ item: "a", score: 0.9 }, { item: "b", score: 0.5 }];
    const list2 = [{ item: "b", score: 0.8 }, { item: "c", score: 0.3 }];
    const results = weightedFusion([list1, list2], [1, 1]);
    const bResult = results.find((r) => r.item === "b")!;
    expect(bResult.score).toBeGreaterThan(0);
  });

  it("respects different weights", () => {
    const list1 = [{ item: "a", score: 1.0 }];
    const list2 = [{ item: "a", score: 0.0 }];
    const heavyFirst = weightedFusion([list1, list2], [10, 1]);
    const heavySecond = weightedFusion([list1, list2], [1, 10]);
    expect(heavyFirst[0].score).toBeGreaterThan(heavySecond[0].score);
  });

  it("throws on mismatched lengths", () => {
    expect(() => weightedFusion([[], []], [1])).toThrow("Weights must match");
  });

  it("handles empty lists", () => {
    const results = weightedFusion([], []);
    expect(results).toEqual([]);
  });
});

describe("combineScores", () => {
  it("avg by default", () => {
    expect(combineScores([2, 4, 6])).toBe(4);
  });

  it("max", () => {
    expect(combineScores([2, 8, 4], "max")).toBe(8);
  });

  it("min", () => {
    expect(combineScores([2, 8, 4], "min")).toBe(2);
  });

  it("sum", () => {
    expect(combineScores([1, 2, 3], "sum")).toBe(6);
  });

  it("empty returns 0", () => {
    expect(combineScores([])).toBe(0);
  });
});

describe("normalizeScores", () => {
  it("normalizes to 0-1 range", () => {
    const items = [{ item: "a", score: 10 }, { item: "b", score: 20 }, { item: "c", score: 30 }];
    const norm = normalizeScores(items);
    expect(norm[0].score).toBe(0);
    expect(norm[2].score).toBe(1);
    expect(norm[1].score).toBeCloseTo(0.5);
  });

  it("handles equal scores", () => {
    const items = [{ item: "a", score: 5 }, { item: "b", score: 5 }];
    const norm = normalizeScores(items);
    expect(norm[0].score).toBe(1);
    expect(norm[1].score).toBe(1);
  });

  it("handles empty", () => {
    expect(normalizeScores([])).toEqual([]);
  });
});
