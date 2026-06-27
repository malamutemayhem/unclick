import { describe, it, expect } from "vitest";
import { LogisticRegression } from "../logistic-regression.js";

describe("LogisticRegression", () => {
  it("predict returns 0 or 1", () => {
    const lr = new LogisticRegression(2);
    const result = lr.predict([1, 0]);
    expect([0, 1]).toContain(result);
  });

  it("predictProbability returns value between 0 and 1", () => {
    const lr = new LogisticRegression(2);
    const prob = lr.predictProbability([1, 0]);
    expect(prob).toBeGreaterThanOrEqual(0);
    expect(prob).toBeLessThanOrEqual(1);
  });

  it("train learns linearly separable data", () => {
    const lr = new LogisticRegression(2);
    const data = [
      [0, 0], [0, 1], [1, 0],
      [3, 3], [3, 4], [4, 3],
    ];
    const labels = [0, 0, 0, 1, 1, 1];
    lr.train(data, labels, 0.5, 200);
    expect(lr.predict([0, 0])).toBe(0);
    expect(lr.predict([4, 4])).toBe(1);
  });

  it("train returns loss history", () => {
    const lr = new LogisticRegression(2);
    const data = [[0, 0], [1, 1]];
    const labels = [0, 1];
    const { losses } = lr.train(data, labels, 0.1, 10);
    expect(losses.length).toBe(10);
  });

  it("loss decreases during training", () => {
    const lr = new LogisticRegression(2);
    const data = [[0, 0], [0, 1], [5, 5], [5, 6]];
    const labels = [0, 0, 1, 1];
    const { losses } = lr.train(data, labels, 0.1, 50);
    expect(losses[losses.length - 1]).toBeLessThan(losses[0]);
  });

  it("accuracy measures classification quality", () => {
    const lr = new LogisticRegression(2);
    const data = [[0, 0], [0, 1], [5, 5], [5, 6]];
    const labels = [0, 0, 1, 1];
    lr.train(data, labels, 0.5, 200);
    expect(lr.accuracy(data, labels)).toBe(1);
  });

  it("decisionBoundary returns weights and bias", () => {
    const lr = new LogisticRegression(2);
    const boundary = lr.decisionBoundary();
    expect(boundary.weights.length).toBe(2);
    expect(typeof boundary.bias).toBe("number");
  });

  it("handles multi-feature input", () => {
    const lr = new LogisticRegression(3);
    const data = [[0, 0, 0], [5, 5, 5]];
    const labels = [0, 1];
    lr.train(data, labels, 0.1, 50);
    expect(lr.predict([5, 5, 5])).toBe(1);
  });
});
