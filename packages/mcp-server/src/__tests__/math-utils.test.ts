import { describe, it, expect } from "vitest";
import { clamp, lerp, inverseLerp, remap, gcd, lcm, isPrime, factorial, fibonacci, mean, median, standardDeviation, sum, product } from "../math-utils.js";

describe("math-utils", () => {
  it("clamp constrains value", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("lerp interpolates", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
  });

  it("inverseLerp", () => {
    expect(inverseLerp(0, 10, 5)).toBe(0.5);
  });

  it("remap maps between ranges", () => {
    expect(remap(5, 0, 10, 0, 100)).toBe(50);
  });

  it("gcd", () => {
    expect(gcd(12, 8)).toBe(4);
    expect(gcd(7, 13)).toBe(1);
  });

  it("lcm", () => {
    expect(lcm(4, 6)).toBe(12);
  });

  it("isPrime", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(17)).toBe(true);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
  });

  it("factorial", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(() => factorial(-1)).toThrow();
  });

  it("fibonacci", () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(10)).toBe(55);
  });

  it("mean", () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
    expect(mean([])).toBe(0);
  });

  it("median", () => {
    expect(median([1, 3, 5])).toBe(3);
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("standardDeviation", () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2, 0);
  });

  it("sum and product", () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(product([2, 3, 4])).toBe(24);
  });
});
