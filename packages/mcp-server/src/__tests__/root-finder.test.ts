import { describe, it, expect } from "vitest";
import {
  bisection, newtonRaphson, secant, regulaFalsi,
  fixedPoint, numericalDerivative,
} from "../root-finder.js";

describe("bisection", () => {
  it("finds root of x^2 - 4", () => {
    const result = bisection(x => x * x - 4, 0, 3);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(2, 6);
  });

  it("finds root of cos(x)", () => {
    const result = bisection(Math.cos, 0, Math.PI);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(Math.PI / 2, 6);
  });
});

describe("newtonRaphson", () => {
  it("finds root of x^2 - 4", () => {
    const result = newtonRaphson(x => x * x - 4, x => 2 * x, 3);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(2, 8);
  });

  it("converges faster than bisection", () => {
    const bisResult = bisection(x => x * x - 4, 0, 3);
    const nrResult = newtonRaphson(x => x * x - 4, x => 2 * x, 3);
    expect(nrResult.iterations).toBeLessThan(bisResult.iterations);
  });

  it("reports non-convergence for zero derivative", () => {
    const result = newtonRaphson(() => 1, () => 0, 1);
    expect(result.converged).toBe(false);
  });
});

describe("secant", () => {
  it("finds root of x^2 - 4", () => {
    const result = secant(x => x * x - 4, 1, 3);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(2, 6);
  });
});

describe("regulaFalsi", () => {
  it("finds root of x^3 - x - 2", () => {
    const result = regulaFalsi(x => x * x * x - x - 2, 1, 2);
    expect(result.converged).toBe(true);
    expect(Math.abs(result.root * result.root * result.root - result.root - 2)).toBeLessThan(1e-6);
  });
});

describe("fixedPoint", () => {
  it("finds fixed point of cos(x)", () => {
    const result = fixedPoint(Math.cos, 1);
    expect(result.converged).toBe(true);
    expect(Math.abs(Math.cos(result.root) - result.root)).toBeLessThan(1e-6);
  });
});

describe("numericalDerivative", () => {
  it("approximates derivative of x^2", () => {
    expect(numericalDerivative(x => x * x, 3)).toBeCloseTo(6, 4);
  });

  it("approximates derivative of sin", () => {
    expect(numericalDerivative(Math.sin, 0)).toBeCloseTo(1, 6);
  });

  it("approximates derivative of e^x", () => {
    expect(numericalDerivative(Math.exp, 1)).toBeCloseTo(Math.E, 5);
  });
});
