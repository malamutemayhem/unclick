import { describe, it, expect } from "vitest";
import { Rational, rat, fromDecimal, mediant, harmonicMean } from "../rational-number.js";

describe("Rational", () => {
  it("reduces to lowest terms", () => {
    const r = new Rational(4, 6);
    expect(r.num).toBe(2);
    expect(r.den).toBe(3);
  });

  it("handles negative denominator", () => {
    const r = new Rational(1, -3);
    expect(r.num).toBe(-1);
    expect(r.den).toBe(3);
  });

  it("throws on zero denominator", () => {
    expect(() => new Rational(1, 0)).toThrow();
  });

  it("adds fractions", () => {
    const a = rat(1, 3);
    const b = rat(1, 6);
    const sum = a.add(b);
    expect(sum.num).toBe(1);
    expect(sum.den).toBe(2);
  });

  it("subtracts fractions", () => {
    const diff = rat(3, 4).sub(rat(1, 4));
    expect(diff.num).toBe(1);
    expect(diff.den).toBe(2);
  });

  it("multiplies fractions", () => {
    const prod = rat(2, 3).mul(rat(3, 4));
    expect(prod.num).toBe(1);
    expect(prod.den).toBe(2);
  });

  it("divides fractions", () => {
    const quot = rat(1, 2).div(rat(1, 3));
    expect(quot.num).toBe(3);
    expect(quot.den).toBe(2);
  });

  it("negates", () => {
    const neg = rat(3, 5).negate();
    expect(neg.num).toBe(-3);
  });

  it("reciprocal", () => {
    const r = rat(3, 7).reciprocal();
    expect(r.num).toBe(7);
    expect(r.den).toBe(3);
  });

  it("absolute value", () => {
    expect(rat(-3, 5).abs().num).toBe(3);
  });

  it("equality", () => {
    expect(rat(2, 4).equals(rat(1, 2))).toBe(true);
    expect(rat(1, 3).equals(rat(1, 2))).toBe(false);
  });

  it("comparison", () => {
    expect(rat(1, 2).compareTo(rat(1, 3))).toBeGreaterThan(0);
    expect(rat(1, 3).compareTo(rat(1, 2))).toBeLessThan(0);
  });

  it("predicates", () => {
    expect(rat(0, 1).isZero()).toBe(true);
    expect(rat(1, 2).isPositive()).toBe(true);
    expect(rat(-1, 2).isNegative()).toBe(true);
    expect(rat(5, 1).isInteger()).toBe(true);
  });

  it("converts to number", () => {
    expect(rat(1, 4).toNumber()).toBeCloseTo(0.25);
  });

  it("toString", () => {
    expect(rat(3, 4).toString()).toBe("3/4");
    expect(rat(5, 1).toString()).toBe("5");
  });

  it("toMixed", () => {
    expect(rat(7, 3).toMixed()).toBe("2 1/3");
    expect(rat(6, 3).toMixed()).toBe("2");
    expect(rat(1, 3).toMixed()).toBe("1/3");
  });

  it("power", () => {
    const r = rat(2, 3).pow(2);
    expect(r.num).toBe(4);
    expect(r.den).toBe(9);
  });

  it("negative power", () => {
    const r = rat(2, 3).pow(-1);
    expect(r.num).toBe(3);
    expect(r.den).toBe(2);
  });
});

describe("fromDecimal", () => {
  it("converts 0.5 to 1/2", () => {
    const r = fromDecimal(0.5);
    expect(r.num).toBe(1);
    expect(r.den).toBe(2);
  });

  it("converts 0.333... to 1/3", () => {
    const r = fromDecimal(1 / 3);
    expect(r.num).toBe(1);
    expect(r.den).toBe(3);
  });
});

describe("mediant", () => {
  it("computes mediant of fractions", () => {
    const m = mediant(rat(1, 2), rat(1, 3));
    expect(m.num).toBe(2);
    expect(m.den).toBe(5);
  });
});

describe("harmonicMean", () => {
  it("computes harmonic mean", () => {
    const h = harmonicMean(rat(1, 1), rat(1, 1));
    expect(h.toNumber()).toBeCloseTo(1);
  });
});
