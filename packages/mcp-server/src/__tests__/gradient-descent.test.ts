import { describe, it, expect } from "vitest";
import { GradientDescent } from "../gradient-descent.js";

describe("GradientDescent", () => {
  const quadratic = (x: number[]) => x[0] * x[0] + x[1] * x[1];
  const quadGrad = (x: number[]) => [2 * x[0], 2 * x[1]];

  it("minimize finds minimum of quadratic", () => {
    const result = GradientDescent.minimize(quadGrad, quadratic, [5, 5], 0.1);
    expect(result.value).toBeCloseTo(0, 2);
    expect(result.x[0]).toBeCloseTo(0, 2);
    expect(result.x[1]).toBeCloseTo(0, 2);
  });

  it("minimize returns history", () => {
    const result = GradientDescent.minimize(quadGrad, quadratic, [3, 4], 0.1);
    expect(result.history.length).toBeGreaterThan(0);
    expect(result.history[0]).toBeGreaterThan(result.history[result.history.length - 1]);
  });

  it("minimize converges flag", () => {
    const result = GradientDescent.minimize(quadGrad, quadratic, [1, 1], 0.1, 1000);
    expect(result.converged).toBe(true);
  });

  it("momentum converges faster", () => {
    const resultPlain = GradientDescent.minimize(quadGrad, quadratic, [10, 10], 0.01, 500);
    const resultMom = GradientDescent.momentum(quadGrad, quadratic, [10, 10], 0.01, 0.9, 500);
    expect(resultMom.value).toBeLessThanOrEqual(resultPlain.value + 0.01);
  });

  it("adam finds minimum", () => {
    const result = GradientDescent.adam(quadGrad, quadratic, [5, 5], 0.1, 0.9, 0.999, 1000);
    expect(result.value).toBeLessThan(1);
  });

  it("adam handles non-symmetric functions", () => {
    const f = (x: number[]) => (x[0] - 3) ** 2 + (x[1] + 2) ** 2;
    const g = (x: number[]) => [2 * (x[0] - 3), 2 * (x[1] + 2)];
    const result = GradientDescent.adam(g, f, [0, 0], 0.1, 0.9, 0.999, 2000);
    expect(result.x[0]).toBeCloseTo(3, 0);
    expect(result.x[1]).toBeCloseTo(-2, 0);
  });

  it("numericalGradient approximates analytic gradient", () => {
    const grad = GradientDescent.numericalGradient(quadratic, [3, 4]);
    expect(grad[0]).toBeCloseTo(6, 2);
    expect(grad[1]).toBeCloseTo(8, 2);
  });

  it("minimize respects max iterations", () => {
    const result = GradientDescent.minimize(quadGrad, quadratic, [100, 100], 0.0001, 10);
    expect(result.iterations).toBeLessThanOrEqual(10);
  });
});
