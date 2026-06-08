import { describe, it, expect } from "vitest";
import { RomanNumeral } from "../roman-numeral.js";

describe("RomanNumeral", () => {
  it("converts numbers to roman numerals", () => {
    expect(RomanNumeral.toRoman(1)).toBe("I");
    expect(RomanNumeral.toRoman(4)).toBe("IV");
    expect(RomanNumeral.toRoman(9)).toBe("IX");
    expect(RomanNumeral.toRoman(42)).toBe("XLII");
    expect(RomanNumeral.toRoman(1994)).toBe("MCMXCIV");
    expect(RomanNumeral.toRoman(3999)).toBe("MMMCMXCIX");
  });

  it("converts roman numerals to numbers", () => {
    expect(RomanNumeral.fromRoman("I")).toBe(1);
    expect(RomanNumeral.fromRoman("IV")).toBe(4);
    expect(RomanNumeral.fromRoman("MCMXCIV")).toBe(1994);
    expect(RomanNumeral.fromRoman("MMMCMXCIX")).toBe(3999);
  });

  it("handles lowercase input", () => {
    expect(RomanNumeral.fromRoman("xiv")).toBe(14);
  });

  it("throws for invalid input", () => {
    expect(() => RomanNumeral.toRoman(0)).toThrow();
    expect(() => RomanNumeral.toRoman(4000)).toThrow();
    expect(() => RomanNumeral.toRoman(1.5)).toThrow();
    expect(() => RomanNumeral.fromRoman("")).toThrow();
    expect(() => RomanNumeral.fromRoman("ABC")).toThrow();
  });

  it("validates roman numerals", () => {
    expect(RomanNumeral.isValid("XIV")).toBe(true);
    expect(RomanNumeral.isValid("MCMXCIV")).toBe(true);
    expect(RomanNumeral.isValid("IIII")).toBe(false);
    expect(RomanNumeral.isValid("ABC")).toBe(false);
  });

  it("compares roman numerals", () => {
    expect(RomanNumeral.compare("X", "V")).toBeGreaterThan(0);
    expect(RomanNumeral.compare("V", "X")).toBeLessThan(0);
    expect(RomanNumeral.compare("X", "X")).toBe(0);
  });

  it("adds roman numerals", () => {
    expect(RomanNumeral.add("X", "V")).toBe("XV");
    expect(RomanNumeral.add("XIV", "I")).toBe("XV");
  });

  it("subtracts roman numerals", () => {
    expect(RomanNumeral.subtract("X", "V")).toBe("V");
    expect(() => RomanNumeral.subtract("V", "X")).toThrow();
  });

  it("generates range", () => {
    const range = RomanNumeral.range(1, 5);
    expect(range).toEqual(["I", "II", "III", "IV", "V"]);
  });

  it("converts to ordinal (lowercase)", () => {
    expect(RomanNumeral.toOrdinal(4)).toBe("iv");
    expect(RomanNumeral.toOrdinal(10)).toBe("x");
  });

  it("round-trips correctly", () => {
    for (let i = 1; i <= 100; i++) {
      expect(RomanNumeral.fromRoman(RomanNumeral.toRoman(i))).toBe(i);
    }
  });
});
