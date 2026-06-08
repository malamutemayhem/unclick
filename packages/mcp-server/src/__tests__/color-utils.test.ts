import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, rgbToHsl, luminance, contrastRatio, isLight } from "../color-utils.js";

describe("color-utils", () => {
  it("hexToRgb parses 6-digit hex", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb("0000ff")).toEqual({ r: 0, g: 0, b: 255 });
  });

  it("hexToRgb parses 3-digit shorthand", () => {
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("rgbToHex converts back", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
    expect(rgbToHex({ r: 0, g: 128, b: 255 })).toBe("#0080ff");
  });

  it("roundtrip hex -> rgb -> hex", () => {
    expect(rgbToHex(hexToRgb("#1a2b3c"))).toBe("#1a2b3c");
  });

  it("rgbToHsl converts correctly", () => {
    const red = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(red.h).toBe(0);
    expect(red.s).toBe(100);
    expect(red.l).toBe(50);
  });

  it("rgbToHsl handles grayscale", () => {
    const gray = rgbToHsl({ r: 128, g: 128, b: 128 });
    expect(gray.s).toBe(0);
  });

  it("luminance of white is 1, black is 0", () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 1);
    expect(luminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 1);
  });

  it("contrastRatio of black on white is 21:1", () => {
    const ratio = contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("isLight detects light colors", () => {
    expect(isLight({ r: 255, g: 255, b: 255 })).toBe(true);
    expect(isLight({ r: 0, g: 0, b: 0 })).toBe(false);
  });
});
