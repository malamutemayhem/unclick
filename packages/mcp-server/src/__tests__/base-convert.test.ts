import { describe, it, expect } from "vitest";
import { toBase, fromBase, convertBase, toBinary, toHex, fromBinary, fromHex, toOctal, fromOctal } from "../base-convert.js";

describe("base conversion", () => {
  it("toBase and fromBase roundtrip", () => {
    expect(fromBase(toBase(255, 16), 16)).toBe(255);
    expect(fromBase(toBase(42, 2), 2)).toBe(42);
    expect(fromBase(toBase(1000, 36), 36)).toBe(1000);
  });

  it("toBinary and fromBinary", () => {
    expect(toBinary(10)).toBe("1010");
    expect(fromBinary("1010")).toBe(10);
  });

  it("toHex and fromHex", () => {
    expect(toHex(255)).toBe("ff");
    expect(fromHex("ff")).toBe(255);
  });

  it("toOctal and fromOctal", () => {
    expect(toOctal(8)).toBe("10");
    expect(fromOctal("10")).toBe(8);
  });

  it("convertBase", () => {
    expect(convertBase("ff", 16, 2)).toBe("11111111");
    expect(convertBase("1010", 2, 10)).toBe("10");
  });

  it("handles zero", () => {
    expect(toBase(0, 16)).toBe("0");
  });

  it("handles negative", () => {
    expect(toBase(-10, 2)).toBe("-1010");
    expect(fromBase("-1010", 2)).toBe(-10);
  });

  it("throws for invalid base", () => {
    expect(() => toBase(10, 1)).toThrow("Base must be 2-36");
    expect(() => fromBase("5", 37)).toThrow("Base must be 2-36");
  });

  it("throws for invalid digit", () => {
    expect(() => fromBase("g", 16)).toThrow("Invalid digit");
  });
});
