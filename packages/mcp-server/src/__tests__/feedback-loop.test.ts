import { describe, it, expect } from "vitest";
import { feedbackLoop, selectBest, isImproving } from "../feedback-loop.js";

describe("feedbackLoop", () => {
  it("converges when target score reached", async () => {
    let value = 0;
    const result = await feedbackLoop(
      value,
      (input) => input * 2,
      (output) => output >= 16 ? 1 : output / 16,
      (input) => input + 1,
      { maxIterations: 10, targetScore: 1 },
    );
    expect(result.converged).toBe(true);
    expect(result.bestIteration.score).toBe(1);
  });

  it("stops at max iterations", async () => {
    let callCount = 0;
    const result = await feedbackLoop(
      0,
      (n) => n + 1,
      () => { callCount++; return 0.1 * callCount; },
      (n) => n + 1,
      { maxIterations: 3, targetScore: 1, improvementThreshold: 0 },
    );
    expect(result.totalIterations).toBe(3);
  });

  it("tracks all iterations", async () => {
    const result = await feedbackLoop(
      1,
      (n) => n * 2,
      (n) => n / 100,
      (n) => n + 1,
      { maxIterations: 3, targetScore: 1 },
    );
    expect(result.iterations.length).toBe(3);
    expect(result.iterations[0].input).toBe(1);
  });

  it("converges on insufficient improvement", async () => {
    const result = await feedbackLoop(
      10,
      (n) => n,
      (n) => n / 100,
      (n) => n + 0.001,
      { maxIterations: 10, improvementThreshold: 0.01 },
    );
    expect(result.converged).toBe(true);
    expect(result.totalIterations).toBeLessThanOrEqual(10);
  });
});

describe("selectBest", () => {
  it("picks highest scored", () => {
    expect(selectBest([{ item: "a", score: 0.5 }, { item: "b", score: 0.9 }])).toBe("b");
  });

  it("returns undefined for empty", () => {
    expect(selectBest([])).toBeUndefined();
  });
});

describe("isImproving", () => {
  it("detects improvement", () => {
    expect(isImproving([1, 2, 3])).toBe(true);
  });

  it("detects stagnation", () => {
    expect(isImproving([3, 3, 3])).toBe(false);
  });

  it("handles single value", () => {
    expect(isImproving([5])).toBe(true);
  });
});
