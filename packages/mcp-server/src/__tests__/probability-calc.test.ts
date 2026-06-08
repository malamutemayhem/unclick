import { describe, it, expect } from "vitest";
import { ProbabilityCalc } from "../probability-calc.js";

describe("ProbabilityCalc", () => {
  it("union of independent events", () => {
    expect(ProbabilityCalc.union(0.5, 0.3)).toBe(0.65);
  });

  it("union with known intersection", () => {
    expect(ProbabilityCalc.union(0.5, 0.3, 0.1)).toBe(0.7);
  });

  it("intersection of independent events", () => {
    expect(ProbabilityCalc.intersection(0.5, 0.4)).toBe(0.2);
  });

  it("complement", () => {
    expect(ProbabilityCalc.complement(0.3)).toBe(0.7);
  });

  it("conditional probability", () => {
    expect(ProbabilityCalc.conditional(0.1, 0.5)).toBe(0.2);
  });

  it("conditional returns 0 when pB is 0", () => {
    expect(ProbabilityCalc.conditional(0.1, 0)).toBe(0);
  });

  it("bayes theorem", () => {
    const result = ProbabilityCalc.bayes(0.9, 0.01, 0.05);
    expect(result).toBe(0.18);
  });

  it("binomial probability", () => {
    const result = ProbabilityCalc.binomial(10, 3, 0.5);
    expect(result).toBeCloseTo(0.1172, 3);
  });

  it("binomial CDF", () => {
    const result = ProbabilityCalc.binomialCdf(10, 5, 0.5);
    expect(result).toBeGreaterThan(0.5);
    expect(result).toBeLessThan(0.7);
  });

  it("poisson probability", () => {
    const result = ProbabilityCalc.poisson(3, 2);
    expect(result).toBeCloseTo(0.1804, 3);
  });

  it("geometric probability", () => {
    const result = ProbabilityCalc.geometric(3, 0.5);
    expect(result).toBe(0.125);
  });

  it("hypergeometric probability", () => {
    const result = ProbabilityCalc.hypergeometric(52, 13, 5, 2);
    expect(result).toBeGreaterThan(0.2);
    expect(result).toBeLessThan(0.35);
  });

  it("expectedValue computes weighted sum", () => {
    const outcomes = [
      { value: 10, probability: 0.5 },
      { value: 20, probability: 0.3 },
      { value: 30, probability: 0.2 },
    ];
    expect(ProbabilityCalc.expectedValue(outcomes)).toBe(17);
  });

  it("variance computes spread", () => {
    const outcomes = [
      { value: 1, probability: 0.5 },
      { value: 2, probability: 0.5 },
    ];
    expect(ProbabilityCalc.variance(outcomes)).toBe(0.25);
  });

  it("standardDeviation is sqrt of variance", () => {
    const outcomes = [
      { value: 1, probability: 0.5 },
      { value: 2, probability: 0.5 },
    ];
    expect(ProbabilityCalc.standardDeviation(outcomes)).toBe(0.5);
  });
});
