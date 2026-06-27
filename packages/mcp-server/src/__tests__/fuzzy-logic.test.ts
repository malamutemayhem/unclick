import { describe, it, expect } from "vitest";
import {
  triangular, trapezoidal, gaussian, singleton,
  not, and, or,
  fuzzify, defuzzifyCentroid, evaluateRules,
} from "../fuzzy-logic.js";
import type { FuzzyVariable, FuzzyRule } from "../fuzzy-logic.js";

describe("membership functions", () => {
  it("triangular peaks at center", () => {
    const fn = triangular(0, 5, 10);
    expect(fn(5)).toBeCloseTo(1);
    expect(fn(0)).toBe(0);
    expect(fn(10)).toBe(0);
    expect(fn(2.5)).toBeCloseTo(0.5);
    expect(fn(-1)).toBe(0);
  });

  it("trapezoidal has flat top", () => {
    const fn = trapezoidal(0, 2, 8, 10);
    expect(fn(5)).toBe(1);
    expect(fn(1)).toBeCloseTo(0.5);
    expect(fn(9)).toBeCloseTo(0.5);
    expect(fn(-1)).toBe(0);
    expect(fn(11)).toBe(0);
  });

  it("gaussian peaks at center", () => {
    const fn = gaussian(0, 1);
    expect(fn(0)).toBeCloseTo(1);
    expect(fn(1)).toBeCloseTo(0.6065, 3);
    expect(fn(-1)).toBeCloseTo(0.6065, 3);
  });

  it("singleton matches only exact value", () => {
    const fn = singleton(5);
    expect(fn(5)).toBe(1);
    expect(fn(4.99)).toBe(0);
  });
});

describe("operators", () => {
  it("not inverts", () => {
    const fn = not(triangular(0, 5, 10));
    expect(fn(5)).toBeCloseTo(0);
    expect(fn(0)).toBe(1);
  });

  it("and takes minimum", () => {
    const fn = and(triangular(0, 3, 6), triangular(2, 5, 8));
    expect(fn(4)).toBeCloseTo(Math.min(triangular(0, 3, 6)(4), triangular(2, 5, 8)(4)));
  });

  it("or takes maximum", () => {
    const fn = or(triangular(0, 3, 6), triangular(4, 7, 10));
    expect(fn(5)).toBeCloseTo(Math.max(triangular(0, 3, 6)(5), triangular(4, 7, 10)(5)));
  });
});

describe("fuzzify", () => {
  it("returns membership values for all sets", () => {
    const temp: FuzzyVariable = {
      name: "temperature",
      sets: [
        { name: "cold", fn: triangular(0, 0, 20) },
        { name: "warm", fn: triangular(10, 25, 40) },
        { name: "hot", fn: triangular(30, 50, 50) },
      ],
      range: [0, 50],
    };
    const result = fuzzify(temp, 15);
    expect(result.has("cold")).toBe(true);
    expect(result.has("warm")).toBe(true);
    expect(result.has("hot")).toBe(true);
    expect(result.get("cold")!).toBeGreaterThan(0);
    expect(result.get("warm")!).toBeGreaterThan(0);
    expect(result.get("hot")).toBe(0);
  });
});

describe("evaluateRules and defuzzify", () => {
  it("produces reasonable output", () => {
    const speed: FuzzyVariable = {
      name: "speed",
      sets: [
        { name: "slow", fn: triangular(0, 0, 50) },
        { name: "fast", fn: triangular(30, 100, 100) },
      ],
      range: [0, 100],
    };

    const rules: FuzzyRule[] = [
      { conditions: [{ variable: "temp", set: "cold" }], output: { variable: "speed", set: "slow" } },
      { conditions: [{ variable: "temp", set: "hot" }], output: { variable: "speed", set: "fast" } },
    ];

    const inputs = new Map<string, Map<string, number>>();
    inputs.set("temp", new Map([["cold", 0.8], ["hot", 0.2]]));

    const activations = evaluateRules(rules, inputs);
    expect(activations.get("slow")).toBeCloseTo(0.8);
    expect(activations.get("fast")).toBeCloseTo(0.2);

    const output = defuzzifyCentroid(speed, activations);
    expect(output).toBeGreaterThan(0);
    expect(output).toBeLessThan(100);
    expect(output).toBeLessThan(50);
  });
});
