import { describe, it, expect } from "vitest";
import { GaloisField } from "../galois-field.js";

describe("GaloisField", () => {
  const gf7 = new GaloisField(7);

  it("add wraps around modulus", () => {
    expect(gf7.add(5, 4)).toBe(2);
  });

  it("subtract wraps correctly", () => {
    expect(gf7.subtract(2, 5)).toBe(4);
  });

  it("multiply wraps correctly", () => {
    expect(gf7.multiply(3, 4)).toBe(5);
  });

  it("power computes modular exponentiation", () => {
    expect(gf7.power(3, 3)).toBe(6);
  });

  it("inverse satisfies a * a^-1 = 1", () => {
    for (let a = 1; a < 7; a++) {
      const inv = gf7.inverse(a);
      expect(gf7.multiply(a, inv)).toBe(1);
    }
  });

  it("divide works correctly", () => {
    expect(gf7.divide(6, 3)).toBe(2);
  });

  it("elements returns all field elements", () => {
    expect(gf7.elements()).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it("generators finds primitive roots", () => {
    const gens = gf7.generators();
    expect(gens.length).toBeGreaterThan(0);
    expect(gens).toContain(3);
  });

  it("order computes element order", () => {
    expect(gf7.order(1)).toBe(1);
    const gen = gf7.generators()[0];
    expect(gf7.order(gen)).toBe(6);
  });

  it("negate returns additive inverse", () => {
    expect(gf7.add(3, gf7.negate(3))).toBe(0);
  });
});
