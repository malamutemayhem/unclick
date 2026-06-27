import { describe, it, expect } from "vitest";
import { BaseConverter } from "../base-converter.js";

describe("BaseConverter", () => {
  it("converts to binary", () => {
    expect(BaseConverter.toBinary(10)).toBe("1010");
    expect(BaseConverter.toBinary(255)).toBe("11111111");
    expect(BaseConverter.toBinary(0)).toBe("0");
  });

  it("converts from binary", () => {
    expect(BaseConverter.fromBinary("1010")).toBe(10);
    expect(BaseConverter.fromBinary("11111111")).toBe(255);
  });

  it("converts to hex", () => {
    expect(BaseConverter.toHex(255)).toBe("FF");
    expect(BaseConverter.toHex(16)).toBe("10");
  });

  it("converts from hex", () => {
    expect(BaseConverter.fromHex("FF")).toBe(255);
    expect(BaseConverter.fromHex("10")).toBe(16);
  });

  it("converts to octal", () => {
    expect(BaseConverter.toOctal(8)).toBe("10");
    expect(BaseConverter.toOctal(64)).toBe("100");
  });

  it("converts from octal", () => {
    expect(BaseConverter.fromOctal("10")).toBe(8);
  });

  it("converts between arbitrary bases", () => {
    expect(BaseConverter.convert("FF", 16, 2)).toBe("11111111");
    expect(BaseConverter.convert("1010", 2, 10)).toBe("10");
  });

  it("handles base 36", () => {
    expect(BaseConverter.toBase36(36)).toBe("10");
    expect(BaseConverter.fromBase36("10")).toBe(36);
  });

  it("handles negative numbers", () => {
    expect(BaseConverter.toBinary(-5)).toBe("-101");
    expect(BaseConverter.fromBase("-101", 2)).toBe(-5);
  });

  it("counts set bits", () => {
    expect(BaseConverter.bitCount(7)).toBe(3);
    expect(BaseConverter.bitCount(8)).toBe(1);
    expect(BaseConverter.bitCount(0)).toBe(0);
  });

  it("checks power of two", () => {
    expect(BaseConverter.isPowerOfTwo(1)).toBe(true);
    expect(BaseConverter.isPowerOfTwo(8)).toBe(true);
    expect(BaseConverter.isPowerOfTwo(7)).toBe(false);
    expect(BaseConverter.isPowerOfTwo(0)).toBe(false);
  });

  it("finds next power of two", () => {
    expect(BaseConverter.nextPowerOfTwo(5)).toBe(8);
    expect(BaseConverter.nextPowerOfTwo(8)).toBe(8);
    expect(BaseConverter.nextPowerOfTwo(1)).toBe(1);
  });

  it("throws on invalid base", () => {
    expect(() => BaseConverter.toBase(10, 1)).toThrow();
    expect(() => BaseConverter.toBase(10, 65)).toThrow();
  });

  it("throws on invalid digit", () => {
    expect(() => BaseConverter.fromBase("G", 16)).toThrow();
  });
});
