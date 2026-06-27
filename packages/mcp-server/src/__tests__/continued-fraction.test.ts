import { describe, it, expect } from "vitest";
import {
  toContinuedFraction, fromContinuedFraction, convergents,
  bestRationalApproximation, evaluate, isPeriodicCF,
  sqrtCF, goldenRatio, eCF, cfToString,
} from "../continued-fraction.js";

describe("toContinuedFraction", () => {
  it("converts integer", () => {
    expect(toContinuedFraction(3)).toEqual([3]);
  });

  it("converts 3/2", () => {
    expect(toContinuedFraction(1.5)).toEqual([1, 2]);
  });

  it("converts pi approximately", () => {
    const cf = toContinuedFraction(Math.PI, 5);
    expect(cf[0]).toBe(3);
    expect(cf[1]).toBe(7);
  });
});

describe("fromContinuedFraction", () => {
  it("converts back to fraction", () => {
    const { num, den } = fromContinuedFraction([1, 2]);
    expect(num).toBe(3);
    expect(den).toBe(2);
  });

  it("handles single term", () => {
    const { num, den } = fromContinuedFraction([5]);
    expect(num).toBe(5);
    expect(den).toBe(1);
  });

  it("handles empty", () => {
    const { num, den } = fromContinuedFraction([]);
    expect(num).toBe(0);
    expect(den).toBe(1);
  });
});

describe("convergents", () => {
  it("computes convergents of pi", () => {
    const cf = toContinuedFraction(Math.PI, 5);
    const convs = convergents(cf);
    expect(convs[0]).toEqual({ num: 3, den: 1 });
    expect(convs[1]).toEqual({ num: 22, den: 7 });
  });

  it("convergents approach value", () => {
    const cf = toContinuedFraction(Math.PI, 8);
    const convs = convergents(cf);
    const last = convs[convs.length - 1];
    expect(last.num / last.den).toBeCloseTo(Math.PI, 8);
  });
});

describe("bestRationalApproximation", () => {
  it("approximates pi with small denominator", () => {
    const approx = bestRationalApproximation(Math.PI, 10);
    expect(approx.num).toBe(22);
    expect(approx.den).toBe(7);
  });

  it("better with larger denominator", () => {
    const approx = bestRationalApproximation(Math.PI, 1000);
    expect(Math.abs(approx.num / approx.den - Math.PI)).toBeLessThan(0.001);
  });
});

describe("evaluate", () => {
  it("evaluates CF to number", () => {
    expect(evaluate([3, 7, 15, 1])).toBeCloseTo(355 / 113);
  });
});

describe("sqrtCF", () => {
  it("sqrt(2) = [1; 2, 2, 2, ...]", () => {
    const cf = sqrtCF(2);
    expect(cf[0]).toBe(1);
    expect(cf[1]).toBe(2);
  });

  it("sqrt(4) = [2]", () => {
    expect(sqrtCF(4)).toEqual([2]);
  });

  it("sqrt(3)", () => {
    const cf = sqrtCF(3);
    expect(cf[0]).toBe(1);
  });
});

describe("goldenRatio", () => {
  it("generates all ones", () => {
    const cf = goldenRatio(5);
    expect(cf).toEqual([1, 1, 1, 1, 1]);
  });

  it("converges to golden ratio", () => {
    const cf = goldenRatio(20);
    const val = evaluate(cf);
    expect(val).toBeCloseTo((1 + Math.sqrt(5)) / 2, 4);
  });
});

describe("eCF", () => {
  it("starts with [2, 1, 2, 1, ...]", () => {
    const cf = eCF(7);
    expect(cf[0]).toBe(2);
    expect(cf[1]).toBe(1);
    expect(cf[2]).toBe(2);
  });

  it("converges to e", () => {
    const cf = eCF(15);
    const val = evaluate(cf);
    expect(val).toBeCloseTo(Math.E, 5);
  });
});

describe("cfToString", () => {
  it("formats CF notation", () => {
    expect(cfToString([3, 7, 15, 1])).toBe("[3; 7, 15, 1]");
  });
});

describe("isPeriodicCF", () => {
  it("detects periodic pattern", () => {
    const cf = [1, 2, 2, 2, 2, 2, 2, 2, 2];
    const result = isPeriodicCF(cf);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.period).toEqual([2]);
    }
  });
});
