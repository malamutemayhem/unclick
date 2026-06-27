import { describe, it, expect } from "vitest";
import { Regularization } from "../regularization.js";

describe("Regularization", () => {
  it("l1 computes sum of absolute weights", () => {
    expect(Regularization.l1([1, -2, 3], 0.1)).toBe(0.6);
  });

  it("l2 computes sum of squared weights", () => {
    expect(Regularization.l2([1, 2, 3], 0.1)).toBe(1.4);
  });

  it("elasticNet combines l1 and l2", () => {
    const l1 = Regularization.l1([1, 2], 0.1);
    const l2 = Regularization.l2([1, 2], 0.1);
    const en = Regularization.elasticNet([1, 2], 0.1, 0.5);
    expect(en).toBeCloseTo((l1 + l2) / 2, 3);
  });

  it("l1Gradient returns sign-based gradient", () => {
    const grad = Regularization.l1Gradient([3, -2, 0], 0.1);
    expect(grad[0]).toBe(0.1);
    expect(grad[1]).toBe(-0.1);
    expect(grad[2]).toBe(0);
  });

  it("l2Gradient returns proportional gradient", () => {
    const grad = Regularization.l2Gradient([3, -2], 0.1);
    expect(grad[0]).toBe(0.6);
    expect(grad[1]).toBe(-0.4);
  });

  it("dropout zeros some values", () => {
    const values = new Array(100).fill(1);
    const dropped = Regularization.dropout(values, 0.5);
    const zeros = dropped.filter(v => v === 0).length;
    expect(zeros).toBeGreaterThan(20);
    expect(zeros).toBeLessThan(80);
  });

  it("batchNorm normalizes values", () => {
    const result = Regularization.batchNorm([10, 20, 30, 40, 50]);
    const mean = result.normalized.reduce((s, v) => s + v, 0) / result.normalized.length;
    expect(mean).toBeCloseTo(0, 2);
  });

  it("batchNorm returns statistics", () => {
    const result = Regularization.batchNorm([10, 20, 30]);
    expect(result.mean).toBe(20);
    expect(result.variance).toBeGreaterThan(0);
  });

  it("clipGradients limits gradient norm", () => {
    const grad = [3, 4];
    const clipped = Regularization.clipGradients(grad, 1);
    const norm = Math.sqrt(clipped.reduce((s, g) => s + g * g, 0));
    expect(norm).toBeCloseTo(1, 2);
  });

  it("clipGradients preserves small gradients", () => {
    const grad = [0.1, 0.2];
    const clipped = Regularization.clipGradients(grad, 10);
    expect(clipped).toEqual(grad);
  });

  it("weightDecay shrinks weights", () => {
    const decayed = Regularization.weightDecay([1, 2, 3], 0.01, 0.1);
    expect(decayed[0]).toBeLessThan(1);
    expect(decayed[1]).toBeLessThan(2);
  });
});
