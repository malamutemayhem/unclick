import { describe, it, expect } from "vitest";
import {
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb,
  lighten, darken, saturate, desaturate,
  luminance, contrastRatio, mixColors, isLight
} from "../color.js";

describe("color", () => {
  it("hexToRgb parses 6-digit hex", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("00ff00")).toEqual({ r: 0, g: 255, b: 0 });
  });

  it("hexToRgb parses 3-digit shorthand", () => {
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("rgbToHex converts back", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
    expect(rgbToHex({ r: 0, g: 128, b: 255 })).toBe("#0080ff");
  });

  it("round-trips hex -> rgb -> hex", () => {
    expect(rgbToHex(hexToRgb("#abcdef"))).toBe("#abcdef");
  });

  it("rgbToHsl and back for pure red", () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(hsl.h).toBeCloseTo(0, 0);
    expect(hsl.s).toBeCloseTo(1, 1);
    expect(hsl.l).toBeCloseTo(0.5, 1);
    const rgb = hslToRgb(hsl);
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it("grayscale has saturation 0", () => {
    const hsl = rgbToHsl({ r: 128, g: 128, b: 128 });
    expect(hsl.s).toBe(0);
  });

  it("lighten makes color lighter", () => {
    const lighter = lighten("#800000", 0.2);
    const lOrig = rgbToHsl(hexToRgb("#800000")).l;
    const lNew = rgbToHsl(hexToRgb(lighter)).l;
    expect(lNew).toBeGreaterThan(lOrig);
  });

  it("darken makes color darker", () => {
    const darker = darken("#8080ff", 0.2);
    const lOrig = rgbToHsl(hexToRgb("#8080ff")).l;
    const lNew = rgbToHsl(hexToRgb(darker)).l;
    expect(lNew).toBeLessThan(lOrig);
  });

  it("luminance of white is 1, black is 0", () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 2);
    expect(luminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 2);
  });

  it("contrastRatio of black/white is 21", () => {
    expect(contrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 0);
  });

  it("mixColors blends evenly", () => {
    const mixed = mixColors("#000000", "#ffffff", 0.5);
    const rgb = hexToRgb(mixed);
    expect(rgb.r).toBeCloseTo(128, 0);
    expect(rgb.g).toBeCloseTo(128, 0);
    expect(rgb.b).toBeCloseTo(128, 0);
  });

  it("isLight detects light colors", () => {
    expect(isLight("#ffffff")).toBe(true);
    expect(isLight("#000000")).toBe(false);
  });
});
