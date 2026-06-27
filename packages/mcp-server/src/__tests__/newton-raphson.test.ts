import { describe, it, expect } from "vitest";
import { NewtonRaphson } from "../newton-raphson.js";

describe("NewtonRaphson", () => {
  it("finds root of x^2 - 4", () => {
    const result = NewtonRaphson.solve(x => x * x - 4, x => 2 * x, 3);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(2, 8);
  });

  it("finds root of cos(x)", () => {
    const result = NewtonRaphson.solve(Math.cos, x => -Math.sin(x), 1);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(Math.PI / 2, 8);
  });

  it("reports non-convergence on zero derivative", () => {
    const result = NewtonRaphson.solve(x => x * x * x, x => 0, 1);
    expect(result.converged).toBe(false);
  });

  it("solveNumericalDerivative works", () => {
    const result = NewtonRaphson.solveNumericalDerivative(x => x * x - 9, 5);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(3, 5);
  });

  it("sqrt computes correctly", () => {
    expect(NewtonRaphson.sqrt(25)).toBeCloseTo(5, 8);
    expect(NewtonRaphson.sqrt(2)).toBeCloseTo(Math.SQRT2, 8);
  });

  it("sqrt of negative is NaN", () => {
    expect(NewtonRaphson.sqrt(-1)).toBeNaN();
  });

  it("nthRoot computes cube root", () => {
    expect(NewtonRaphson.nthRoot(27, 3)).toBeCloseTo(3, 8);
  });

  it("converges in few iterations", () => {
    const result = NewtonRaphson.solve(x => x * x - 2, x => 2 * x, 1);
    expect(result.iterations).toBeLessThan(20);
  });
});
