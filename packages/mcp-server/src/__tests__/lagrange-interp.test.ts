import { describe, it, expect } from "vitest";
import { LagrangeInterp } from "../lagrange-interp.js";

describe("LagrangeInterp", () => {
  it("interpolates through given points", () => {
    const interp = new LagrangeInterp([0, 1, 2], [0, 1, 4]);
    expect(interp.evaluate(0)).toBeCloseTo(0, 8);
    expect(interp.evaluate(1)).toBeCloseTo(1, 8);
    expect(interp.evaluate(2)).toBeCloseTo(4, 8);
  });

  it("interpolates between points", () => {
    const interp = new LagrangeInterp([0, 1, 2], [0, 1, 4]);
    expect(interp.evaluate(1.5)).toBeCloseTo(2.25, 5);
  });

  it("degree is n-1", () => {
    const interp = new LagrangeInterp([0, 1, 2], [0, 1, 4]);
    expect(interp.degree()).toBe(2);
  });

  it("fromFunction creates interpolant", () => {
    const interp = LagrangeInterp.fromFunction(x => x * x, 0, 2, 2);
    expect(interp.evaluate(1)).toBeCloseTo(1, 5);
  });

  it("chebyshevNodes returns correct count", () => {
    const nodes = LagrangeInterp.chebyshevNodes(-1, 1, 5);
    expect(nodes.length).toBe(5);
    for (const n of nodes) {
      expect(n).toBeGreaterThanOrEqual(-1);
      expect(n).toBeLessThanOrEqual(1);
    }
  });

  it("fromChebyshev reduces Runge phenomenon", () => {
    const f = (x: number) => 1 / (1 + 25 * x * x);
    const uniform = LagrangeInterp.fromFunction(f, -1, 1, 10);
    const cheb = LagrangeInterp.fromChebyshev(f, -1, 1, 11);
    expect(cheb.maxError(f)).toBeLessThan(uniform.maxError(f));
  });

  it("addPoint extends interpolation", () => {
    const interp = new LagrangeInterp([0, 1], [0, 1]);
    interp.addPoint(2, 4);
    expect(interp.degree()).toBe(2);
    expect(interp.evaluate(2)).toBeCloseTo(4, 8);
  });

  it("maxError is zero at sample points", () => {
    const f = (x: number) => x * x;
    const interp = LagrangeInterp.fromFunction(f, 0, 2, 2);
    expect(interp.maxError(f, 1000)).toBeLessThan(1e-8);
  });
});
