import { describe, it, expect } from "vitest";
import { WeightedSampler, weightedChoice } from "../weighted-sampler.js";

describe("WeightedSampler", () => {
  it("samples from single item", () => {
    const s = new WeightedSampler<string>();
    s.add("only", 1);
    expect(s.sample()).toBe("only");
  });

  it("respects weights statistically", () => {
    const s = new WeightedSampler<string>();
    s.add("heavy", 99);
    s.add("light", 1);
    const counts: Record<string, number> = { heavy: 0, light: 0 };
    for (let i = 0; i < 1000; i++) counts[s.sample()]++;
    expect(counts.heavy).toBeGreaterThan(800);
  });

  it("throws on empty", () => {
    const s = new WeightedSampler<string>();
    expect(() => s.sample()).toThrow();
  });

  it("throws on non-positive weight", () => {
    const s = new WeightedSampler<string>();
    expect(() => s.add("x", 0)).toThrow();
  });

  it("probability is correct", () => {
    const s = new WeightedSampler<string>();
    s.add("a", 3);
    s.add("b", 7);
    expect(s.probability("a")).toBeCloseTo(0.3);
    expect(s.probability("b")).toBeCloseTo(0.7);
  });

  it("sampleN returns n items", () => {
    const s = new WeightedSampler<string>();
    s.add("a", 1);
    s.add("b", 1);
    expect(s.sampleN(5).length).toBe(5);
  });

  it("clear empties sampler", () => {
    const s = new WeightedSampler<string>();
    s.add("a", 1);
    s.clear();
    expect(s.size).toBe(0);
  });
});

describe("weightedChoice", () => {
  it("returns an item", () => {
    const result = weightedChoice(["a", "b"], [1, 1]);
    expect(["a", "b"]).toContain(result);
  });

  it("throws on mismatch", () => {
    expect(() => weightedChoice(["a"], [1, 2])).toThrow();
  });
});
