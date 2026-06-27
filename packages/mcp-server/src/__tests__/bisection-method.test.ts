import { describe, it, expect } from "vitest";
import { BisectionMethod } from "../bisection-method.js";

describe("BisectionMethod", () => {
  it("finds root of x^2 - 2", () => {
    const result = BisectionMethod.solve(x => x * x - 2, 1, 2);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(Math.SQRT2, 8);
  });

  it("fails when no sign change", () => {
    const result = BisectionMethod.solve(x => x * x + 1, 0, 2);
    expect(result.converged).toBe(false);
    expect(result.root).toBeNaN();
  });

  it("regulaFalsi converges faster", () => {
    const bisect = BisectionMethod.solve(x => x * x - 2, 1, 2);
    const rf = BisectionMethod.regulaFalsi(x => x * x - 2, 1, 2);
    expect(rf.converged).toBe(true);
    expect(rf.root).toBeCloseTo(Math.SQRT2, 8);
    expect(rf.iterations).toBeLessThanOrEqual(bisect.iterations);
  });

  it("secant method converges", () => {
    const result = BisectionMethod.secant(x => x * x - 2, 1, 2);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(Math.SQRT2, 8);
  });

  it("finds root of sin(x)", () => {
    const result = BisectionMethod.solve(Math.sin, 3, 4);
    expect(result.root).toBeCloseTo(Math.PI, 8);
  });

  it("iterations count is positive", () => {
    const result = BisectionMethod.solve(x => x * x - 3, 1, 2);
    expect(result.iterations).toBeGreaterThan(0);
    expect(result.converged).toBe(true);
  });

  it("handles exact root", () => {
    const result = BisectionMethod.solve(x => x, -1, 1);
    expect(result.root).toBeCloseTo(0, 8);
  });
});
