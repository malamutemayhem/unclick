import { describe, it, expect } from "vitest";
import { GaloisField, ReedSolomon } from "../reed-solomon.js";

describe("GaloisField", () => {
  const gf = new GaloisField();

  it("addition is XOR", () => {
    expect(gf.add(5, 3)).toBe(6);
    expect(gf.add(0, 7)).toBe(7);
    expect(gf.add(5, 5)).toBe(0);
  });

  it("multiplication works", () => {
    expect(gf.multiply(0, 5)).toBe(0);
    expect(gf.multiply(1, 5)).toBe(5);
    expect(gf.multiply(2, 3)).toBeGreaterThan(0);
  });

  it("division is inverse of multiplication", () => {
    const a = 7;
    const b = 3;
    const product = gf.multiply(a, b);
    expect(gf.divide(product, b)).toBe(a);
  });

  it("throws on division by zero", () => {
    expect(() => gf.divide(5, 0)).toThrow();
  });

  it("computes inverse", () => {
    const a = 5;
    const inv = gf.inverse(a);
    expect(gf.multiply(a, inv)).toBe(1);
  });

  it("computes power", () => {
    expect(gf.power(2, 0)).toBe(1);
    expect(gf.power(2, 1)).toBe(2);
    expect(gf.power(2, 8)).toBeGreaterThan(0);
  });

  it("reports size", () => {
    expect(gf.getSize()).toBe(256);
  });
});

describe("ReedSolomon", () => {
  it("generates generator polynomial", () => {
    const rs = new ReedSolomon(4);
    const gen = rs.generatorPoly();
    expect(gen).toHaveLength(5);
    expect(gen[0]).toBe(1);
  });

  it("encodes data with parity bytes", () => {
    const rs = new ReedSolomon(4);
    const data = [1, 2, 3, 4, 5];
    const encoded = rs.encode(data);
    expect(encoded).toHaveLength(data.length + 4);
    expect(encoded.slice(0, 5)).toEqual(data);
  });

  it("detects no errors in clean data", () => {
    const rs = new ReedSolomon(4);
    const encoded = rs.encode([1, 2, 3, 4, 5]);
    expect(rs.hasErrors(encoded)).toBe(false);
  });

  it("detects corrupted data", () => {
    const rs = new ReedSolomon(4);
    const encoded = rs.encode([1, 2, 3, 4, 5]);
    encoded[0] = encoded[0] ^ 0xFF;
    expect(rs.hasErrors(encoded)).toBe(true);
  });

  it("reports redundancy and max errors", () => {
    const rs = new ReedSolomon(6);
    expect(rs.getRedundancy()).toBe(6);
    expect(rs.maxErrors()).toBe(3);
  });
});
