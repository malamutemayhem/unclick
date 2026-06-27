import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, interpolateColor, createScale, heatmapColor, adjustBrightness } from "../color-scale.js";

describe("color-scale", () => {
  describe("hexToRgb", () => {
    it("parses 6-digit hex", () => {
      expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    });
    it("parses without hash", () => {
      expect(hexToRgb("00ff00")).toEqual({ r: 0, g: 255, b: 0 });
    });
    it("parses mixed case", () => {
      expect(hexToRgb("#0000FF")).toEqual({ r: 0, g: 0, b: 255 });
    });
  });

  describe("rgbToHex", () => {
    it("converts rgb to hex", () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
    });
    it("pads single digit values", () => {
      expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
    });
    it("rounds fractional values", () => {
      expect(rgbToHex({ r: 127.6, g: 0, b: 0 })).toBe("#800000");
    });
  });

  describe("interpolateColor", () => {
    it("returns c1 at t=0", () => {
      const c1 = { r: 255, g: 0, b: 0 };
      const c2 = { r: 0, g: 255, b: 0 };
      expect(interpolateColor(c1, c2, 0)).toEqual(c1);
    });
    it("returns c2 at t=1", () => {
      const c1 = { r: 255, g: 0, b: 0 };
      const c2 = { r: 0, g: 255, b: 0 };
      expect(interpolateColor(c1, c2, 1)).toEqual(c2);
    });
    it("returns midpoint at t=0.5", () => {
      const c1 = { r: 0, g: 0, b: 0 };
      const c2 = { r: 100, g: 200, b: 50 };
      expect(interpolateColor(c1, c2, 0.5)).toEqual({ r: 50, g: 100, b: 25 });
    });
  });

  describe("createScale", () => {
    it("creates scale with correct number of steps", () => {
      const scale = createScale(["#000000", "#ffffff"], 5);
      expect(scale).toHaveLength(5);
    });
    it("starts and ends with given colors", () => {
      const scale = createScale(["#000000", "#ffffff"], 3);
      expect(scale[0]).toBe("#000000");
      expect(scale[2]).toBe("#ffffff");
    });
    it("throws with fewer than 2 colors", () => {
      expect(() => createScale(["#000000"], 5)).toThrow("Need at least 2 colors");
    });
    it("handles 3-color gradient", () => {
      const scale = createScale(["#ff0000", "#00ff00", "#0000ff"], 5);
      expect(scale).toHaveLength(5);
    });
  });

  describe("heatmapColor", () => {
    it("returns blue at min", () => {
      expect(heatmapColor(0)).toBe("#0000ff");
    });
    it("returns red at max", () => {
      expect(heatmapColor(1)).toBe("#ff0000");
    });
    it("returns a color for mid values", () => {
      const c = heatmapColor(0.5);
      expect(c).toMatch(/^#[0-9a-f]{6}$/);
    });
    it("clamps below min", () => {
      expect(heatmapColor(-1, 0, 1)).toBe("#0000ff");
    });
  });

  describe("adjustBrightness", () => {
    it("doubles brightness", () => {
      expect(adjustBrightness("#404040", 2)).toBe("#808080");
    });
    it("halves brightness", () => {
      expect(adjustBrightness("#808080", 0.5)).toBe("#404040");
    });
    it("clamps at 255", () => {
      const result = adjustBrightness("#ffffff", 2);
      expect(result).toBe("#ffffff");
    });
    it("clamps at 0", () => {
      const result = adjustBrightness("#808080", 0);
      expect(result).toBe("#000000");
    });
  });
});
