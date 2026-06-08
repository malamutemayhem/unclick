import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, rgbToHsl, luminance, contrastRatio, isAccessible } from "../color-utils.js";

describe("hexToRgb", () => {
  it("converts hex to RGB", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb("0000ff")).toEqual({ r: 0, g: 0, b: 255 });
  });
});

describe("rgbToHex", () => {
  it("converts RGB to hex", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
    expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe("#00ff00");
  });
});

describe("rgbToHsl", () => {
  it("converts red", () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
    expect(hsl.l).toBe(50);
  });
  it("converts white", () => {
    const hsl = rgbToHsl({ r: 255, g: 255, b: 255 });
    expect(hsl.l).toBe(100);
  });
  it("converts black", () => {
    const hsl = rgbToHsl({ r: 0, g: 0, b: 0 });
    expect(hsl.l).toBe(0);
  });
});

describe("luminance", () => {
  it("white has high luminance", () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 1);
  });
  it("black has zero luminance", () => {
    expect(luminance({ r: 0, g: 0, b: 0 })).toBe(0);
  });
});

describe("contrastRatio", () => {
  it("black/white has max contrast", () => {
    const ratio = contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(ratio).toBeCloseTo(21, 0);
  });
  it("same color has contrast 1", () => {
    const ratio = contrastRatio({ r: 128, g: 128, b: 128 }, { r: 128, g: 128, b: 128 });
    expect(ratio).toBe(1);
  });
});

describe("isAccessible", () => {
  it("black on white passes AA", () => {
    expect(isAccessible({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).toBe(true);
  });
  it("black on white passes AAA", () => {
    expect(isAccessible({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, "AAA")).toBe(true);
  });
  it("similar colors fail AA", () => {
    expect(isAccessible({ r: 200, g: 200, b: 200 }, { r: 210, g: 210, b: 210 })).toBe(false);
  });
});
