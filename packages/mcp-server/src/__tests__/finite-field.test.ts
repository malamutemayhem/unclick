import { describe, it, expect } from "vitest";
import { FieldElement, field, isPrime, gcd, extendedGcd } from "../finite-field.js";

describe("FieldElement", () => {
  it("wraps values modulo prime", () => {
    const a = new FieldElement(8, 7);
    expect(a.value).toBe(1);
  });

  it("handles negative values", () => {
    const a = new FieldElement(-1, 7);
    expect(a.value).toBe(6);
  });

  it("adds correctly", () => {
    const a = new FieldElement(3, 7);
    const b = new FieldElement(5, 7);
    expect(a.add(b).value).toBe(1);
  });

  it("subtracts correctly", () => {
    const a = new FieldElement(2, 7);
    const b = new FieldElement(5, 7);
    expect(a.sub(b).value).toBe(4);
  });

  it("multiplies correctly", () => {
    const a = new FieldElement(3, 7);
    const b = new FieldElement(4, 7);
    expect(a.mul(b).value).toBe(5);
  });

  it("computes power", () => {
    const a = new FieldElement(3, 7);
    expect(a.pow(3).value).toBe(6); // 27 mod 7 = 6
  });

  it("computes inverse", () => {
    const a = new FieldElement(3, 7);
    const inv = a.inv();
    expect(a.mul(inv).value).toBe(1);
  });

  it("divides correctly", () => {
    const a = new FieldElement(2, 7);
    const b = new FieldElement(3, 7);
    const c = a.div(b);
    expect(c.mul(b).value).toBe(2);
  });

  it("throws on zero inverse", () => {
    const z = new FieldElement(0, 7);
    expect(() => z.inv()).toThrow();
  });

  it("negates correctly", () => {
    const a = new FieldElement(3, 7);
    expect(a.neg().value).toBe(4);
    expect(a.add(a.neg()).value).toBe(0);
  });

  it("equals works", () => {
    const a = new FieldElement(3, 7);
    const b = new FieldElement(3, 7);
    expect(a.equals(b)).toBe(true);
  });

  it("throws on mismatched fields", () => {
    const a = new FieldElement(1, 7);
    const b = new FieldElement(1, 11);
    expect(() => a.add(b)).toThrow();
  });
});

describe("field factory", () => {
  it("creates elements in same field", () => {
    const f7 = field(7);
    const a = f7(3);
    const b = f7(5);
    expect(a.add(b).value).toBe(1);
  });
});

describe("isPrime", () => {
  it("identifies primes", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(13)).toBe(true);
  });

  it("rejects non-primes", () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(9)).toBe(false);
  });
});

describe("gcd", () => {
  it("computes gcd", () => {
    expect(gcd(12, 8)).toBe(4);
    expect(gcd(7, 13)).toBe(1);
  });
});

describe("extendedGcd", () => {
  it("finds Bezout coefficients", () => {
    const result = extendedGcd(12, 8);
    expect(result.gcd).toBe(4);
    expect(12 * result.x + 8 * result.y).toBe(4);
  });
});
