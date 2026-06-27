import { describe, it, expect } from "vitest";
import { ComplexNumber } from "../complex-number.js";

describe("ComplexNumber", () => {
  it("add combines real and imaginary parts", () => {
    const a = new ComplexNumber(3, 4);
    const b = new ComplexNumber(1, 2);
    const c = a.add(b);
    expect(c.real).toBe(4);
    expect(c.imag).toBe(6);
  });

  it("subtract differences real and imaginary parts", () => {
    const result = new ComplexNumber(5, 3).subtract(new ComplexNumber(2, 1));
    expect(result.real).toBe(3);
    expect(result.imag).toBe(2);
  });

  it("multiply uses FOIL", () => {
    const a = new ComplexNumber(3, 2);
    const b = new ComplexNumber(1, 4);
    const c = a.multiply(b);
    expect(c.real).toBe(-5);
    expect(c.imag).toBe(14);
  });

  it("divide by complex number", () => {
    const a = new ComplexNumber(4, 2);
    const b = new ComplexNumber(2, 0);
    const c = a.divide(b);
    expect(c.real).toBe(2);
    expect(c.imag).toBe(1);
  });

  it("divide throws on zero", () => {
    expect(() => new ComplexNumber(1, 0).divide(new ComplexNumber(0, 0))).toThrow();
  });

  it("magnitude computes modulus", () => {
    expect(new ComplexNumber(3, 4).magnitude()).toBe(5);
  });

  it("phase computes argument", () => {
    const p = new ComplexNumber(0, 1).phase();
    expect(p).toBeCloseTo(Math.PI / 2, 3);
  });

  it("conjugate negates imaginary", () => {
    const c = new ComplexNumber(3, 4).conjugate();
    expect(c.real).toBe(3);
    expect(c.imag).toBe(-4);
  });

  it("power raises to integer", () => {
    const c = new ComplexNumber(0, 1).power(2);
    expect(c.real).toBeCloseTo(-1, 3);
    expect(c.imag).toBeCloseTo(0, 3);
  });

  it("fromPolar creates from magnitude and angle", () => {
    const c = ComplexNumber.fromPolar(1, Math.PI / 2);
    expect(c.real).toBeCloseTo(0, 3);
    expect(c.imag).toBeCloseTo(1, 3);
  });

  it("roots generates nth roots of unity", () => {
    const r = ComplexNumber.roots(4);
    expect(r.length).toBe(4);
    expect(r[0].real).toBeCloseTo(1, 3);
    expect(r[1].imag).toBeCloseTo(1, 3);
  });

  it("toString formats correctly", () => {
    expect(new ComplexNumber(3, 4).toString()).toBe("3 + 4i");
    expect(new ComplexNumber(3, -4).toString()).toBe("3 - 4i");
    expect(new ComplexNumber(3, 0).toString()).toBe("3");
    expect(new ComplexNumber(0, 4).toString()).toBe("4i");
  });

  it("equals checks within tolerance", () => {
    const a = new ComplexNumber(1, 2);
    const b = new ComplexNumber(1.00000000001, 2);
    expect(a.equals(b)).toBe(true);
  });
});
