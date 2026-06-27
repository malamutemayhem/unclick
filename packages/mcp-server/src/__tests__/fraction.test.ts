import { describe, it, expect } from "vitest";
import { Fraction } from "../fraction.js";

describe("fraction", () => {
  it("reduces to simplest form", () => {
    const f = new Fraction(4, 6);
    expect(f.num).toBe(2);
    expect(f.den).toBe(3);
  });

  it("adds fractions", () => {
    const a = new Fraction(1, 3);
    const b = new Fraction(1, 6);
    const sum = a.add(b);
    expect(sum.num).toBe(1);
    expect(sum.den).toBe(2);
  });

  it("subtracts fractions", () => {
    const result = new Fraction(3, 4).subtract(new Fraction(1, 4));
    expect(result.num).toBe(1);
    expect(result.den).toBe(2);
  });

  it("multiplies fractions", () => {
    const result = new Fraction(2, 3).multiply(new Fraction(3, 4));
    expect(result.num).toBe(1);
    expect(result.den).toBe(2);
  });

  it("divides fractions", () => {
    const result = new Fraction(1, 2).divide(new Fraction(3, 4));
    expect(result.num).toBe(2);
    expect(result.den).toBe(3);
  });

  it("converts to number", () => {
    expect(new Fraction(1, 4).toNumber()).toBe(0.25);
  });

  it("toString", () => {
    expect(new Fraction(3, 4).toString()).toBe("3/4");
    expect(new Fraction(6, 3).toString()).toBe("2");
  });

  it("fromDecimal", () => {
    const f = Fraction.fromDecimal(0.75);
    expect(f.num).toBe(3);
    expect(f.den).toBe(4);
  });

  it("compareTo", () => {
    expect(new Fraction(1, 2).compareTo(new Fraction(1, 3))).toBe(1);
    expect(new Fraction(1, 3).compareTo(new Fraction(1, 2))).toBe(-1);
    expect(new Fraction(1, 2).compareTo(new Fraction(2, 4))).toBe(0);
  });

  it("throws on division by zero", () => {
    expect(() => new Fraction(1, 0)).toThrow();
  });
});
