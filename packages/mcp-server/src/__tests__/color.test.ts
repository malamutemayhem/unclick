import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, luminance, contrastRatio, lerp } from "../color.js";

describe("color", () => {
  it("hexToRgb converts 6-char hex", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("hexToRgb converts 3-char hex", () => {
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("rgbToHex converts back", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
  });

  it("roundtrip hex -> rgb -> hex", () => {
    expect(rgbToHex(hexToRgb("#3498db"))).toBe("#3498db");
  });

  it("rgbToHsl converts red", () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(hsl.h).toBeCloseTo(0);
    expect(hsl.s).toBeCloseTo(1);
    expect(hsl.l).toBeCloseTo(0.5);
  });

  it("rgbToHsl converts white", () => {
    const hsl = rgbToHsl({ r: 255, g: 255, b: 255 });
    expect(hsl.s).toBe(0);
    expect(hsl.l).toBe(1);
  });

  it("hslToRgb converts back", () => {
    const rgb = hslToRgb({ h: 0, s: 1, l: 0.5 });
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it("hslToRgb handles gray", () => {
    const rgb = hslToRgb({ h: 0, s: 0, l: 0.5 });
    expect(rgb.r).toBe(128);
    expect(rgb.g).toBe(128);
    expect(rgb.b).toBe(128);
  });

  it("luminance of white is 1", () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 1);
  });

  it("luminance of black is 0", () => {
    expect(luminance({ r: 0, g: 0, b: 0 })).toBe(0);
  });

  it("contrastRatio black/white is 21", () => {
    const ratio = contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("lerp interpolates colors", () => {
    const result = lerp({ r: 0, g: 0, b: 0 }, { r: 100, g: 200, b: 50 }, 0.5);
    expect(result).toEqual({ r: 50, g: 100, b: 25 });
  });
});
