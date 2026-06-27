import { describe, it, expect } from "vitest";
import { toRoman, fromRoman, isValidRoman } from "../roman-numerals.js";

describe("roman-numerals", () => {
  it("converts basic numbers", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(4)).toBe("IV");
    expect(toRoman(9)).toBe("IX");
    expect(toRoman(42)).toBe("XLII");
  });

  it("converts large numbers", () => {
    expect(toRoman(1994)).toBe("MCMXCIV");
    expect(toRoman(3999)).toBe("MMMCMXCIX");
  });

  it("throws for out of range", () => {
    expect(() => toRoman(0)).toThrow();
    expect(() => toRoman(4000)).toThrow();
  });

  it("fromRoman converts back", () => {
    expect(fromRoman("XIV")).toBe(14);
    expect(fromRoman("MCMXCIV")).toBe(1994);
  });

  it("fromRoman is case insensitive", () => {
    expect(fromRoman("xiv")).toBe(14);
  });

  it("roundtrip 1-100", () => {
    for (let i = 1; i <= 100; i++) {
      expect(fromRoman(toRoman(i))).toBe(i);
    }
  });

  it("isValidRoman checks format", () => {
    expect(isValidRoman("XIV")).toBe(true);
    expect(isValidRoman("IIII")).toBe(false);
    expect(isValidRoman("")).toBe(false);
  });
});
