import { describe, it, expect } from "vitest";
import { FixedPoint } from "../fixed-point-math.js";

describe("fixed-point-math", () => {
  it("from and toNumber roundtrip", () => {
    const fp = FixedPoint.from(3.14);
    expect(fp.toNumber()).toBeCloseTo(3.14, 2);
  });

  it("adds", () => {
    const a = FixedPoint.from(1.5);
    const b = FixedPoint.from(2.3);
    expect(a.add(b).toNumber()).toBeCloseTo(3.8, 2);
  });

  it("subtracts", () => {
    const result = FixedPoint.from(5).subtract(FixedPoint.from(2.5));
    expect(result.toNumber()).toBeCloseTo(2.5, 2);
  });

  it("multiplies", () => {
    const result = FixedPoint.from(3).multiply(FixedPoint.from(4));
    expect(result.toNumber()).toBeCloseTo(12, 2);
  });

  it("divides", () => {
    const result = FixedPoint.from(10).divide(FixedPoint.from(4));
    expect(result.toNumber()).toBeCloseTo(2.5, 2);
  });

  it("throws on division by zero", () => {
    expect(() => FixedPoint.from(1).divide(FixedPoint.from(0))).toThrow();
  });

  it("abs and negate", () => {
    const neg = FixedPoint.from(-5);
    expect(neg.abs().toNumber()).toBeCloseTo(5, 2);
    expect(neg.negate().toNumber()).toBeCloseTo(5, 2);
  });

  it("compareTo", () => {
    expect(FixedPoint.from(3).compareTo(FixedPoint.from(2))).toBeGreaterThan(0);
    expect(FixedPoint.from(1).compareTo(FixedPoint.from(2))).toBeLessThan(0);
  });

  it("equals", () => {
    expect(FixedPoint.from(1.5).equals(FixedPoint.from(1.5))).toBe(true);
  });
});
