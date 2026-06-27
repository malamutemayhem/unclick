import { describe, it, expect } from "vitest";
import { NumberTheoretic } from "../number-theoretic.js";

describe("NumberTheoretic", () => {
  it("isPrime identifies primes", () => {
    expect(NumberTheoretic.isPrime(2)).toBe(true);
    expect(NumberTheoretic.isPrime(17)).toBe(true);
    expect(NumberTheoretic.isPrime(4)).toBe(false);
    expect(NumberTheoretic.isPrime(1)).toBe(false);
  });

  it("primeFactors decomposes number", () => {
    expect(NumberTheoretic.primeFactors(12)).toEqual([2, 2, 3]);
    expect(NumberTheoretic.primeFactors(17)).toEqual([17]);
  });

  it("sieveOfEratosthenes finds primes up to limit", () => {
    const primes = NumberTheoretic.sieveOfEratosthenes(20);
    expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
  });

  it("divisors lists all divisors", () => {
    expect(NumberTheoretic.divisors(12)).toEqual([1, 2, 3, 4, 6, 12]);
  });

  it("sigma computes sum of divisors", () => {
    expect(NumberTheoretic.sigma(6, 1)).toBe(12);
  });

  it("isPerfect identifies perfect numbers", () => {
    expect(NumberTheoretic.isPerfect(6)).toBe(true);
    expect(NumberTheoretic.isPerfect(28)).toBe(true);
    expect(NumberTheoretic.isPerfect(12)).toBe(false);
  });

  it("mobius function computes correctly", () => {
    expect(NumberTheoretic.mobius(1)).toBe(1);
    expect(NumberTheoretic.mobius(6)).toBe(1);
    expect(NumberTheoretic.mobius(4)).toBe(0);
    expect(NumberTheoretic.mobius(2)).toBe(-1);
  });

  it("legendreSymbol computes correctly", () => {
    expect(NumberTheoretic.legendreSymbol(2, 7)).toBe(1);
    expect(NumberTheoretic.legendreSymbol(3, 7)).toBe(-1);
  });

  it("fibonacci computes correctly", () => {
    expect(NumberTheoretic.fibonacci(0)).toBe(0);
    expect(NumberTheoretic.fibonacci(1)).toBe(1);
    expect(NumberTheoretic.fibonacci(10)).toBe(55);
  });

  it("goldbachPairs finds prime pairs", () => {
    const pairs = NumberTheoretic.goldbachPairs(10);
    expect(pairs.length).toBeGreaterThan(0);
    for (const [a, b] of pairs) {
      expect(a + b).toBe(10);
      expect(NumberTheoretic.isPrime(a)).toBe(true);
      expect(NumberTheoretic.isPrime(b)).toBe(true);
    }
  });
});
