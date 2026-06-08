import { describe, it, expect } from "vitest";
import { hexToHsl, hslToHex, rgbToHsl, hslToRgb, lighten, darken, saturate, desaturate, complementary, luminance, contrastRatio } from "../color-utils.js";

describe("color-utils", () => {
  describe("rgbToHsl / hslToRgb", () => {
    it("converts red", () => {
      const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
      expect(hsl.h).toBeCloseTo(0, 0);
      expect(hsl.s).toBeCloseTo(1, 1);
      expect(hsl.l).toBeCloseTo(0.5, 1);
    });
    it("converts back", () => {
      const rgb = hslToRgb({ h: 0, s: 1, l: 0.5 });
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(0);
      expect(rgb.b).toBe(0);
    });
    it("handles grey", () => {
      const hsl = rgbToHsl({ r: 128, g: 128, b: 128 });
      expect(hsl.s).toBe(0);
    });
  });

  describe("hexToHsl / hslToHex", () => {
    it("round-trips", () => {
      const hex = "#ff8800";
      const hsl = hexToHsl(hex);
      const back = hslToHex(hsl);
      expect(back).toBe(hex);
    });
  });

  describe("lighten / darken", () => {
    it("lighten increases lightness", () => {
      const result = lighten("#808080", 0.2);
      const hsl = hexToHsl(result);
      expect(hsl.l).toBeGreaterThan(0.5);
    });
    it("darken decreases lightness", () => {
      const result = darken("#808080", 0.2);
      const hsl = hexToHsl(result);
      expect(hsl.l).toBeLessThan(0.5);
    });
  });

  describe("saturate / desaturate", () => {
    it("saturate increases saturation", () => {
      const result = saturate("#808080", 0.5);
      expect(result).not.toBe("#808080");
    });
    it("desaturate towards grey", () => {
      const result = desaturate("#ff0000", 1);
      const hsl = hexToHsl(result);
      expect(hsl.s).toBeCloseTo(0, 1);
    });
  });

  describe("complementary", () => {
    it("returns complement", () => {
      const comp = complementary("#ff0000");
      const hsl = hexToHsl(comp);
      expect(hsl.h).toBeCloseTo(180, 0);
    });
  });

  describe("luminance / contrastRatio", () => {
    it("black has low luminance", () => { expect(luminance("#000000")).toBeCloseTo(0); });
    it("white has high luminance", () => { expect(luminance("#ffffff")).toBeCloseTo(1); });
    it("black/white contrast is ~21", () => {
      expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
    });
  });
});
