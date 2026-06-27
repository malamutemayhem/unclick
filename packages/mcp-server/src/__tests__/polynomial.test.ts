import { describe, it, expect } from "vitest";
import { Polynomial, lagrangeInterpolation } from "../polynomial.js";

describe("Polynomial", () => {
  it("evaluates correctly", () => {
    // 2x^2 + 3x + 1
    const p = new Polynomial([1, 3, 2]);
    expect(p.evaluate(0)).toBe(1);
    expect(p.evaluate(1)).toBe(6);
    expect(p.evaluate(2)).toBe(15);
  });

  it("tracks degree", () => {
    expect(new Polynomial([1, 2, 3]).degree).toBe(2);
    expect(new Polynomial([5]).degree).toBe(0);
    expect(new Polynomial([0]).degree).toBe(0);
  });

  it("strips trailing zeros", () => {
    const p = new Polynomial([1, 2, 0, 0]);
    expect(p.degree).toBe(1);
  });

  it("adds polynomials", () => {
    const a = new Polynomial([1, 2, 3]);
    const b = new Polynomial([4, 5]);
    const c = a.add(b);
    expect(c.evaluate(1)).toBe(a.evaluate(1) + b.evaluate(1));
  });

  it("subtracts polynomials", () => {
    const a = new Polynomial([5, 3, 2]);
    const b = new Polynomial([1, 1, 1]);
    const c = a.sub(b);
    expect(c.coefficients).toEqual([4, 2, 1]);
  });

  it("multiplies polynomials", () => {
    // (x + 1)(x + 2) = x^2 + 3x + 2
    const a = new Polynomial([1, 1]);
    const b = new Polynomial([2, 1]);
    const c = a.mul(b);
    expect(c.coefficients).toEqual([2, 3, 1]);
  });

  it("scales by constant", () => {
    const p = new Polynomial([1, 2, 3]);
    const s = p.scale(2);
    expect(s.coefficients).toEqual([2, 4, 6]);
  });

  it("computes derivative", () => {
    // 3x^2 + 2x + 1 -> 6x + 2
    const p = new Polynomial([1, 2, 3]);
    const d = p.derivative();
    expect(d.coefficients).toEqual([2, 6]);
  });

  it("computes integral", () => {
    // 2x + 1 -> x^2 + x + C
    const p = new Polynomial([1, 2]);
    const i = p.integral(0);
    expect(i.coefficients).toEqual([0, 1, 1]);
  });

  it("finds linear roots", () => {
    // 2x + 4 = 0 -> x = -2
    const p = new Polynomial([4, 2]);
    expect(p.roots()).toEqual([-2]);
  });

  it("finds quadratic roots", () => {
    // x^2 - 5x + 6 = (x-2)(x-3)
    const p = new Polynomial([6, -5, 1]);
    const r = p.roots().sort((a, b) => a - b);
    expect(r[0]).toBeCloseTo(2);
    expect(r[1]).toBeCloseTo(3);
  });

  it("handles no real roots", () => {
    // x^2 + 1
    const p = new Polynomial([1, 0, 1]);
    expect(p.roots()).toEqual([]);
  });

  it("converts to string", () => {
    const p = new Polynomial([1, 0, 2]);
    expect(p.toString()).toBe("2x^2 + 1");
  });
});

describe("lagrangeInterpolation", () => {
  it("interpolates through points", () => {
    const points: [number, number][] = [[0, 1], [1, 3], [2, 7]];
    const p = lagrangeInterpolation(points);
    expect(p.evaluate(0)).toBeCloseTo(1);
    expect(p.evaluate(1)).toBeCloseTo(3);
    expect(p.evaluate(2)).toBeCloseTo(7);
  });
});
