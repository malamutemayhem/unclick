import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, luminance, contrastRatio } from "../color.js";

describe("color", () => {
  it("hexToRgb parses 6-digit hex", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
  });

  it("hexToRgb parses 3-digit shorthand", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("rgbToHex converts back", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
  });

  it("hex roundtrip", () => {
    expect(rgbToHex(hexToRgb("#1a2b3c"))).toBe("#1a2b3c");
  });

  it("rgbToHsl converts known values", () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(hsl.h).toBeCloseTo(0);
    expect(hsl.s).toBeCloseTo(1);
    expect(hsl.l).toBeCloseTo(0.5);
  });

  it("hslToRgb roundtrips", () => {
    const original = { r: 100, g: 150, b: 200 };
    const hsl = rgbToHsl(original);
    const back = hslToRgb(hsl);
    expect(back.r).toBeCloseTo(original.r, 0);
    expect(back.g).toBeCloseTo(original.g, 0);
    expect(back.b).toBeCloseTo(original.b, 0);
  });

  it("luminance of white is ~1", () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 1);
  });

  it("luminance of black is ~0", () => {
    expect(luminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 1);
  });

  it("contrast ratio of black/white is ~21", () => {
    const ratio = contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("contrast ratio of same color is 1", () => {
    const c = { r: 128, g: 128, b: 128 };
    expect(contrastRatio(c, c)).toBeCloseTo(1, 1);
  });
});
