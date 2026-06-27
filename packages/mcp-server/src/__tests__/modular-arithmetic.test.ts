import { describe, it, expect } from "vitest";
import { ModularArithmetic } from "../modular-arithmetic.js";

describe("ModularArithmetic", () => {
  it("mod handles negative numbers", () => {
    expect(ModularArithmetic.mod(-1, 7)).toBe(6);
    expect(ModularArithmetic.mod(10, 7)).toBe(3);
  });

  it("add wraps correctly", () => {
    expect(ModularArithmetic.add(5, 4, 7)).toBe(2);
  });

  it("multiply works", () => {
    expect(ModularArithmetic.multiply(3, 5, 7)).toBe(1);
  });

  it("power computes fast exponentiation", () => {
    expect(ModularArithmetic.power(2, 10, 1000)).toBe(24);
  });

  it("gcd computes correctly", () => {
    expect(ModularArithmetic.gcd(12, 8)).toBe(4);
    expect(ModularArithmetic.gcd(17, 13)).toBe(1);
  });

  it("lcm computes correctly", () => {
    expect(ModularArithmetic.lcm(4, 6)).toBe(12);
  });

  it("inverse satisfies a * inv = 1 mod m", () => {
    const inv = ModularArithmetic.inverse(3, 7);
    expect(inv).not.toBeNull();
    expect(ModularArithmetic.multiply(3, inv!, 7)).toBe(1);
  });

  it("inverse returns null when no inverse exists", () => {
    expect(ModularArithmetic.inverse(2, 4)).toBeNull();
  });

  it("chineseRemainder solves system", () => {
    const result = ModularArithmetic.chineseRemainder([2, 3, 2], [3, 5, 7]);
    expect(result).not.toBeNull();
    expect(result! % 3).toBe(2);
    expect(result! % 5).toBe(3);
    expect(result! % 7).toBe(2);
  });

  it("eulerTotient computes for prime", () => {
    expect(ModularArithmetic.eulerTotient(7)).toBe(6);
    expect(ModularArithmetic.eulerTotient(12)).toBe(4);
  });

  it("isPrimitiveRoot checks correctly", () => {
    expect(ModularArithmetic.isPrimitiveRoot(3, 7)).toBe(true);
    expect(ModularArithmetic.isPrimitiveRoot(2, 7)).toBe(false);
  });
});
