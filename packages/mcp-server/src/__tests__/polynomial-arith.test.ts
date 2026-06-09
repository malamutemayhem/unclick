import { describe, it, expect } from "vitest";
import { Polynomial, fromRoots, lagrangeInterpolation } from "../polynomial-arith.js";

describe("Polynomial", () => {
  it("evaluates constant", () => {
    const p = new Polynomial([5]);
    expect(p.evaluate(10)).toBe(5);
  });

  it("evaluates linear", () => {
    const p = new Polynomial([1, 2]);
    expect(p.evaluate(3)).toBe(7);
  });

  it("evaluates quadratic", () => {
    const p = new Polynomial([1, 0, 1]);
    expect(p.evaluate(3)).toBe(10);
  });

  it("adds polynomials", () => {
    const a = new Polynomial([1, 2, 3]);
    const b = new Polynomial([4, 5]);
    const sum = a.add(b);
    expect(sum.coeffs).toEqual([5, 7, 3]);
  });

  it("subtracts polynomials", () => {
    const a = new Polynomial([5, 3]);
    const b = new Polynomial([2, 1]);
    const diff = a.subtract(b);
    expect(diff.coeffs).toEqual([3, 2]);
  });

  it("multiplies polynomials", () => {
    const a = new Polynomial([1, 1]);
    const b = new Polynomial([1, 1]);
    const prod = a.multiply(b);
    expect(prod.coeffs).toEqual([1, 2, 1]);
  });

  it("computes derivative", () => {
    const p = new Polynomial([3, 0, 2]);
    const d = p.derivative();
    expect(d.coeffs).toEqual([0, 4]);
  });

  it("computes integral", () => {
    const p = new Polynomial([4, 3]);
    const i = p.integral(0);
    expect(i.coeffs[0]).toBe(0);
    expect(i.coeffs[1]).toBe(4);
    expect(i.coeffs[2]).toBeCloseTo(1.5);
  });

  it("returns degree", () => {
    expect(new Polynomial([1, 2, 3]).degree).toBe(2);
    expect(new Polynomial([5]).degree).toBe(0);
  });

  it("toString formats correctly", () => {
    const p = new Polynomial([1, 0, 3]);
    const str = p.toString();
    expect(str).toContain("3x^2");
    expect(str).toContain("1");
  });

  it("checks equality", () => {
    const a = new Polynomial([1, 2, 3]);
    const b = new Polynomial([1, 2, 3]);
    expect(a.isEqual(b)).toBe(true);
  });
});

describe("fromRoots", () => {
  it("creates polynomial from roots", () => {
    const p = fromRoots(1, -1);
    expect(p.evaluate(1)).toBeCloseTo(0);
    expect(p.evaluate(-1)).toBeCloseTo(0);
  });
});

describe("lagrangeInterpolation", () => {
  it("interpolates through points", () => {
    const p = lagrangeInterpolation([[0, 1], [1, 3], [2, 7]]);
    expect(p.evaluate(0)).toBeCloseTo(1);
    expect(p.evaluate(1)).toBeCloseTo(3);
    expect(p.evaluate(2)).toBeCloseTo(7);
  });
});
