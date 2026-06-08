import { describe, it, expect } from "vitest";
import { ScoringEngine } from "../scoring-engine.js";

describe("ScoringEngine", () => {
  it("scores with single rule", () => {
    const engine = new ScoringEngine();
    engine.addRule("quality", 10, (v) => Number(v) / 100);
    const result = engine.score({ quality: 80 });
    expect(result.total).toBe(8);
    expect(result.normalized).toBeCloseTo(0.8, 1);
  });

  it("scores with multiple rules", () => {
    const engine = new ScoringEngine();
    engine.addRule("speed", 5, (v) => Number(v) / 100);
    engine.addRule("accuracy", 5, (v) => Number(v) / 100);
    const result = engine.score({ speed: 100, accuracy: 50 });
    expect(result.total).toBe(7.5);
    expect(result.breakdown.length).toBe(2);
  });

  it("clamps values to 0-1 range", () => {
    const engine = new ScoringEngine();
    engine.addRule("val", 10, () => 1.5);
    const result = engine.score({});
    expect(result.total).toBe(10);
  });

  it("clamps negative values to 0", () => {
    const engine = new ScoringEngine();
    engine.addRule("val", 10, () => -0.5);
    const result = engine.score({});
    expect(result.total).toBe(0);
  });

  it("scoreMany ranks items", () => {
    const engine = new ScoringEngine();
    engine.addRule("score", 10, (v) => Number(v) / 100);
    const results = engine.scoreMany([
      { score: 50 },
      { score: 90 },
      { score: 70 },
    ]);
    expect(results[0].index).toBe(1);
    expect(results[2].index).toBe(0);
  });

  it("threshold maps linearly", () => {
    expect(ScoringEngine.threshold(50, 0, 100)).toBe(0.5);
    expect(ScoringEngine.threshold(-5, 0, 100)).toBe(0);
    expect(ScoringEngine.threshold(150, 0, 100)).toBe(1);
  });

  it("boolean converts truthy/falsy", () => {
    expect(ScoringEngine.boolean(true)).toBe(1);
    expect(ScoringEngine.boolean(false)).toBe(0);
    expect(ScoringEngine.boolean("yes")).toBe(1);
    expect(ScoringEngine.boolean(0)).toBe(0);
  });

  it("range maps value to score", () => {
    const ranges = [
      { min: 0, max: 50, score: 0.3 },
      { min: 50, max: 100, score: 0.8 },
    ];
    expect(ScoringEngine.range(25, ranges)).toBe(0.3);
    expect(ScoringEngine.range(75, ranges)).toBe(0.8);
    expect(ScoringEngine.range(100, ranges)).toBe(0);
  });

  it("penalty decreases score above limit", () => {
    expect(ScoringEngine.penalty(5, 10)).toBe(1);
    expect(ScoringEngine.penalty(15, 10, 0.1)).toBe(0.5);
  });

  it("bonus counts met conditions", () => {
    expect(ScoringEngine.bonus([true, true, false])).toBeCloseTo(0.667, 2);
    expect(ScoringEngine.bonus([true, true])).toBe(1);
  });

  it("weighted computes weighted average", () => {
    const result = ScoringEngine.weighted([
      { value: 1, weight: 3 },
      { value: 0, weight: 1 },
    ]);
    expect(result).toBe(0.75);
  });

  it("letterGrade returns correct grades", () => {
    expect(ScoringEngine.letterGrade(0.95)).toBe("A");
    expect(ScoringEngine.letterGrade(0.85)).toBe("B");
    expect(ScoringEngine.letterGrade(0.55)).toBe("F");
  });

  it("stars converts to star rating", () => {
    expect(ScoringEngine.stars(1, 5)).toBe(5);
    expect(ScoringEngine.stars(0.5, 5)).toBe(2.5);
    expect(ScoringEngine.stars(0, 5)).toBe(0);
  });
});
