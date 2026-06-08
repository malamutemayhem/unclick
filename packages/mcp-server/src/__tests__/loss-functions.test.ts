import { describe, it, expect } from "vitest";
import { LossFunctions } from "../loss-functions.js";

describe("LossFunctions", () => {
  it("mse computes mean squared error", () => {
    expect(LossFunctions.mse([1, 2, 3], [1, 2, 3])).toBe(0);
    expect(LossFunctions.mse([1, 2, 3], [2, 3, 4])).toBe(1);
  });

  it("rmse is sqrt of mse", () => {
    expect(LossFunctions.rmse([1, 2, 3], [2, 3, 4])).toBe(1);
  });

  it("mae computes mean absolute error", () => {
    expect(LossFunctions.mae([1, 2, 3], [1, 2, 3])).toBe(0);
    expect(LossFunctions.mae([1, 2, 3], [2, 3, 4])).toBe(1);
  });

  it("huber behaves like mse for small errors", () => {
    const mse = LossFunctions.mse([1], [1.5]);
    const huber = LossFunctions.huber([1], [1.5]);
    expect(huber).toBeCloseTo(mse / 2, 2);
  });

  it("huber behaves like mae for large errors", () => {
    const huber = LossFunctions.huber([1], [10], 1);
    expect(huber).toBeLessThan(LossFunctions.mse([1], [10]));
  });

  it("crossEntropy is 0 for perfect predictions", () => {
    const loss = LossFunctions.crossEntropy([1, 0], [0.9999, 0.0001]);
    expect(loss).toBeLessThan(0.01);
  });

  it("crossEntropy is high for bad predictions", () => {
    const loss = LossFunctions.crossEntropy([1, 0], [0.1, 0.9]);
    expect(loss).toBeGreaterThan(1);
  });

  it("hinge loss is 0 for correct confident predictions", () => {
    expect(LossFunctions.hinge([1, -1], [2, -2])).toBe(0);
  });

  it("hinge loss penalizes wrong predictions", () => {
    expect(LossFunctions.hinge([1], [-1])).toBe(2);
  });

  it("r2Score is 1 for perfect fit", () => {
    expect(LossFunctions.r2Score([1, 2, 3], [1, 2, 3])).toBe(1);
  });

  it("r2Score is 0 for mean prediction", () => {
    const r2 = LossFunctions.r2Score([1, 2, 3], [2, 2, 2]);
    expect(r2).toBe(0);
  });

  it("mape computes percentage error", () => {
    expect(LossFunctions.mape([100, 200], [110, 220])).toBe(0.1);
  });
});
