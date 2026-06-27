import { describe, it, expect } from "vitest";
import { softmax, attentionWeights, topAttention, contextSelect, normalizeAttention } from "../attention-mechanism.js";

describe("softmax", () => {
  it("sums to 1", () => {
    const result = softmax([1, 2, 3]);
    const sum = result.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1);
  });

  it("higher values get higher probability", () => {
    const result = softmax([1, 10, 2]);
    expect(result[1]).toBeGreaterThan(result[0]);
    expect(result[1]).toBeGreaterThan(result[2]);
  });

  it("temperature affects distribution", () => {
    const hot = softmax([1, 5], 0.1);
    const cold = softmax([1, 5], 10);
    expect(hot[1]).toBeGreaterThan(cold[1]);
  });
});

describe("attentionWeights", () => {
  it("assigns weights based on relevance and recency", () => {
    const items = [
      { item: "a", relevance: 1, recency: 1 },
      { item: "b", relevance: 0.1, recency: 0.1 },
    ];
    const result = attentionWeights(items);
    expect(result[0].weight).toBeGreaterThan(result[1].weight);
  });

  it("returns empty for empty input", () => {
    expect(attentionWeights([])).toEqual([]);
  });
});

describe("topAttention", () => {
  it("returns top k items", () => {
    const items = [
      { item: "a", relevance: 1, recency: 1 },
      { item: "b", relevance: 0.5, recency: 0.5 },
      { item: "c", relevance: 0.1, recency: 0.1 },
    ];
    const top = topAttention(items, 2);
    expect(top.length).toBe(2);
    expect(top[0].item).toBe("a");
  });
});

describe("contextSelect", () => {
  it("selects items within budget", () => {
    const items = [
      { item: "big", relevance: 1, recency: 1 },
      { item: "medium", relevance: 0.8, recency: 0.8 },
      { item: "small", relevance: 0.5, recency: 0.5 },
    ];
    const selected = contextSelect(items, 10, (item) => item === "big" ? 8 : 3);
    expect(selected.length).toBeGreaterThanOrEqual(1);
  });
});

describe("normalizeAttention", () => {
  it("normalizes to sum 1", () => {
    const result = normalizeAttention([2, 3, 5]);
    expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1);
    expect(result[2]).toBeCloseTo(0.5);
  });

  it("handles zero sum", () => {
    const result = normalizeAttention([0, 0, 0]);
    expect(result.every((v) => v === 1 / 3)).toBe(true);
  });

  it("handles empty", () => {
    expect(normalizeAttention([])).toEqual([]);
  });
});
