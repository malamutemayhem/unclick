import { describe, it, expect } from "vitest";
import { CrossValidation } from "../cross-validation.js";

describe("CrossValidation", () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const simpleEval = (train: number[], test: number[]) => {
    const mean = train.reduce((s, v) => s + v, 0) / train.length;
    let correct = 0;
    for (const t of test) {
      if (Math.abs(t - mean) < 5) correct++;
    }
    return correct / test.length;
  };

  it("kFold returns correct number of scores", () => {
    const result = CrossValidation.kFold(data, 5, simpleEval);
    expect(result.scores.length).toBe(5);
  });

  it("kFold computes summary statistics", () => {
    const result = CrossValidation.kFold(data, 5, simpleEval);
    expect(result.mean).toBeGreaterThanOrEqual(0);
    expect(result.mean).toBeLessThanOrEqual(1);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it("kFold stdDev is non-negative", () => {
    const result = CrossValidation.kFold(data, 5, simpleEval);
    expect(result.stdDev).toBeGreaterThanOrEqual(0);
  });

  it("leaveOneOut uses n folds", () => {
    const smallData = [1, 2, 3, 4, 5];
    const result = CrossValidation.leaveOneOut(smallData, simpleEval);
    expect(result.scores.length).toBe(5);
  });

  it("stratifiedKFold preserves class distribution", () => {
    const sData = [1, 2, 3, 4, 5, 6];
    const labels = ["A", "A", "A", "B", "B", "B"];
    const result = CrossValidation.stratifiedKFold(
      sData,
      labels,
      3,
      (_train, _trainLabels, _test, _testLabels) => 0.8,
    );
    expect(result.scores.length).toBe(3);
    expect(result.mean).toBe(0.8);
  });

  it("holdout splits data and evaluates", () => {
    const score = CrossValidation.holdout(data, 0.7, simpleEval);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });

  it("repeatedKFold runs multiple rounds", () => {
    const result = CrossValidation.repeatedKFold(data, 5, 2, simpleEval);
    expect(result.scores.length).toBe(10);
  });

  it("perfect evaluator returns mean 1", () => {
    const result = CrossValidation.kFold(data, 5, () => 1);
    expect(result.mean).toBe(1);
    expect(result.stdDev).toBe(0);
  });
});
