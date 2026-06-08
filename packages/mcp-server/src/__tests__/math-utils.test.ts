import { describe, it, expect } from "vitest";
import {
  clamp, lerp, inverseLerp, remap, gcd, lcm, factorial,
  isPrime, roundTo, sum, average, median
} from "../math-utils.js";

describe("math-utils", () => {
  it("clamp restricts to range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("lerp interpolates", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
  });

  it("inverseLerp finds t", () => {
    expect(inverseLerp(0, 10, 5)).toBe(0.5);
    expect(inverseLerp(5, 5, 5)).toBe(0);
  });

  it("remap maps between ranges", () => {
    expect(remap(5, 0, 10, 0, 100)).toBe(50);
    expect(remap(0, 0, 10, 20, 40)).toBe(20);
  });

  it("gcd and lcm", () => {
    expect(gcd(12, 8)).toBe(4);
    expect(gcd(7, 13)).toBe(1);
    expect(lcm(4, 6)).toBe(12);
    expect(lcm(0, 5)).toBe(0);
  });

  it("factorial", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(() => factorial(-1)).toThrow();
  });

  it("isPrime", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
  });

  it("roundTo", () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
    expect(roundTo(3.145, 2)).toBe(3.15);
  });

  it("sum and average", () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(average([2, 4, 6])).toBe(4);
    expect(average([])).toBe(0);
  });

  it("median", () => {
    expect(median([1, 3, 2])).toBe(2);
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([])).toBe(0);
  });
});
