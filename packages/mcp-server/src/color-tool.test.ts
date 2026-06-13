import { describe, expect, it } from "vitest";
import {
  convertColor,
  getColorInfo,
  mixColors,
  checkContrastRatio,
  generateColorPalette,
} from "./color-tool.js";

describe("color-tool", () => {
  describe("convertColor", () => {
    it("converts pure red hex to every space", () => {
      const r = convertColor({ value: "#FF0000", from_format: "hex" }) as Record<string, unknown>;
      expect(r.rgb).toBe("rgb(255, 0, 0)");
      expect(r.hsl_object).toEqual({ h: 0, s: 100, l: 50 });
      expect(r.cmyk_object).toEqual({ c: 0, m: 100, y: 100, k: 0 });
    });

    it("expands 3-digit hex shorthand", () => {
      const r = convertColor({ value: "#0f0", from_format: "hex" }) as Record<string, unknown>;
      expect(r.rgb).toBe("rgb(0, 255, 0)");
      expect(r.hex).toBe("#00FF00");
    });

    it("round-trips rgb back to hex", () => {
      const r = convertColor({ value: "rgb(0, 0, 255)", from_format: "rgb" }) as Record<string, string>;
      expect(r.hex).toBe("#0000FF");
    });

    it("reports a parse failure as an error", () => {
      const r = convertColor({ value: "nothex", from_format: "hex" }) as Record<string, string>;
      expect(r.error).toMatch(/Could not parse/);
    });

    it("requires a from_format", () => {
      expect(convertColor({ value: "#FFF" })).toEqual({
        error: "from_format is required (hex, rgb, hsl, hsv, cmyk).",
      });
    });
  });

  describe("getColorInfo", () => {
    it("flags a dark color and suggests white text", () => {
      const r = getColorInfo({ value: "#000000" }) as Record<string, unknown>;
      expect(r.is_dark).toBe(true);
      expect(r.suggested_text_color).toBe("#FFFFFF");
      expect(r.name).toBe("black");
    });

    it("flags a light color and suggests black text", () => {
      const r = getColorInfo({ value: "#FFFFFF" }) as Record<string, unknown>;
      expect(r.is_light).toBe(true);
      expect(r.suggested_text_color).toBe("#000000");
    });
  });

  describe("mixColors", () => {
    it("mixes black and white 50/50 into mid grey", () => {
      const r = mixColors({ color1_hex: "#000000", color2_hex: "#FFFFFF", ratio: 0.5 }) as Record<string, string>;
      expect(r.mixed_hex).toBe("#808080");
    });

    it("clamps ratio and returns color1 at ratio 0", () => {
      const r = mixColors({ color1_hex: "#112233", color2_hex: "#FFFFFF", ratio: 0 }) as Record<string, string>;
      expect(r.mixed_hex).toBe("#112233");
    });
  });

  describe("checkContrastRatio", () => {
    it("gives black-on-white the maximal 21:1 ratio", () => {
      const r = checkContrastRatio({ foreground_hex: "#000000", background_hex: "#FFFFFF" }) as {
        contrast_ratio: number;
        wcag: Record<string, boolean>;
        rating: string;
      };
      expect(r.contrast_ratio).toBe(21);
      expect(r.wcag.aaa_normal_text).toBe(true);
      expect(r.rating).toMatch(/AAA/);
    });

    it("fails an insufficient pairing", () => {
      const r = checkContrastRatio({ foreground_hex: "#777777", background_hex: "#888888" }) as {
        rating: string;
      };
      expect(r.rating).toMatch(/Fail/);
    });
  });

  describe("generateColorPalette", () => {
    it("returns a complementary hue for the base color", () => {
      const r = generateColorPalette({ base_hex: "#FF0000" }) as { base: string; complementary: string[] };
      expect(r.base).toBe("#FF0000");
      // Red's complement is cyan.
      expect(r.complementary[0]).toBe("#00FFFF");
    });
  });
});
