import { describe, it, expect } from "vitest";
import { clamp, lerp, inverseLerp, remap, round, sum, mean, median, standardDeviation, percentile, gcd, lcm, isPrime, fibonacci } from "../math-utils.js";

describe("math-utils", () => {
  it("clamp", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
  it("lerp", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
  });
  it("inverseLerp", () => {
    expect(inverseLerp(0, 10, 5)).toBe(0.5);
    expect(inverseLerp(5, 5, 5)).toBe(0);
  });
  it("remap", () => {
    expect(remap(5, 0, 10, 0, 100)).toBe(50);
  });
  it("round", () => {
    expect(round(3.14159, 2)).toBe(3.14);
    expect(round(3.145, 2)).toBe(3.15);
  });
  it("sum", () => { expect(sum([1, 2, 3])).toBe(6); });
  it("mean", () => {
    expect(mean([1, 2, 3])).toBe(2);
    expect(mean([])).toBe(0);
  });
  it("median", () => {
    expect(median([1, 3, 2])).toBe(2);
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([])).toBe(0);
  });
  it("standardDeviation", () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2, 0);
    expect(standardDeviation([])).toBe(0);
  });
  it("percentile", () => {
    expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
    expect(percentile([], 50)).toBe(0);
  });
  it("gcd", () => { expect(gcd(12, 8)).toBe(4); });
  it("lcm", () => { expect(lcm(4, 6)).toBe(12); });
  it("isPrime", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(1)).toBe(false);
  });
  it("fibonacci", () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(10)).toBe(55);
  });
});
