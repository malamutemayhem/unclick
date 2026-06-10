import { describe, expect, it } from "vitest";

import {
  convertColor,
  getColorInfo,
  generateColorPalette,
  mixColors,
  checkContrastRatio,
} from "../color-tool.js";

describe("convertColor", () => {
  it("returns error when value is missing", () => {
    expect(convertColor({})).toHaveProperty("error");
  });

  it("returns error for unsupported format", () => {
    const result = convertColor({ color: "#FF0000", from: "lab" }) as any;
    expect(result.error).toContain("not supported");
  });

  it("converts hex to all formats", () => {
    const result = convertColor({ color: "#FF0000", from: "hex" }) as any;
    expect(result.hex).toBe("#FF0000");
    expect(result.rgb).toBe("rgb(255, 0, 0)");
    expect(result.rgb_object).toEqual({ r: 255, g: 0, b: 0 });
    expect(result.hsl_object.h).toBe(0);
    expect(result.hsl_object.s).toBe(100);
    expect(result.hsl_object.l).toBe(50);
  });

  it("converts 3-digit hex", () => {
    const result = convertColor({ color: "#F00", from: "hex" }) as any;
    expect(result.hex).toBe("#FF0000");
  });

  it("converts hex without hash prefix", () => {
    const result = convertColor({ color: "00FF00", from: "hex" }) as any;
    expect(result.hex).toBe("#00FF00");
  });

  it("converts from rgb format", () => {
    const result = convertColor({ color: "255, 255, 0", from: "rgb" }) as any;
    expect(result.hex).toBe("#FFFF00");
  });

  it("converts from hsl format", () => {
    const result = convertColor({ color: "0, 100%, 50%", from: "hsl" }) as any;
    expect(result.hex).toBe("#FF0000");
  });

  it("converts from hsv format", () => {
    const result = convertColor({ color: "120, 100%, 100%", from: "hsv" }) as any;
    expect(result.rgb_object.g).toBe(255);
  });

  it("converts from cmyk format", () => {
    const result = convertColor({ color: "0%, 0%, 0%, 0%", from: "cmyk" }) as any;
    expect(result.hex).toBe("#FFFFFF");
  });

  it("handles black in cmyk (100% key)", () => {
    const result = convertColor({ color: "0%, 0%, 0%, 100%", from: "cmyk" }) as any;
    expect(result.hex).toBe("#000000");
  });

  it("returns error for invalid hex", () => {
    const result = convertColor({ color: "ZZZZZZ", from: "hex" }) as any;
    expect(result.error).toBeTruthy();
  });

  it("accepts color alias for value", () => {
    const result = convertColor({ value: "#0000FF", from_format: "hex" }) as any;
    expect(result.hex).toBe("#0000FF");
  });
});

describe("getColorInfo", () => {
  it("returns error when value is missing", () => {
    expect(getColorInfo({})).toHaveProperty("error");
  });

  it("identifies a dark color", () => {
    const result = getColorInfo({ color: "#000000" }) as any;
    expect(result.is_dark).toBe(true);
    expect(result.is_light).toBe(false);
    expect(result.suggested_text_color).toBe("#FFFFFF");
  });

  it("identifies a light color", () => {
    const result = getColorInfo({ color: "#FFFFFF" }) as any;
    expect(result.is_dark).toBe(false);
    expect(result.is_light).toBe(true);
    expect(result.suggested_text_color).toBe("#000000");
  });

  it("finds a close color name", () => {
    const result = getColorInfo({ color: "#FF0000" }) as any;
    expect(result.name).toBe("red");
  });

  it("returns luminance as a number", () => {
    const result = getColorInfo({ color: "#808080" }) as any;
    expect(typeof result.luminance).toBe("number");
    expect(result.luminance).toBeGreaterThan(0);
    expect(result.luminance).toBeLessThan(1);
  });

  it("parses rgb() string input", () => {
    const result = getColorInfo({ color: "rgb(0, 0, 255)" }) as any;
    expect(result.hex).toBe("#0000FF");
    expect(result.name).toBe("blue");
  });
});

describe("generateColorPalette", () => {
  it("returns error when base_hex is missing", () => {
    expect(generateColorPalette({})).toHaveProperty("error");
  });

  it("returns palette with correct structure", () => {
    const result = generateColorPalette({ color: "#FF0000" }) as any;
    expect(result.base).toBe("#FF0000");
    expect(result.complementary).toHaveLength(1);
    expect(result.analogous).toHaveLength(2);
    expect(result.triadic).toHaveLength(2);
    expect(result.split_complementary).toHaveLength(2);
    expect(result.tetradic).toHaveLength(3);
    expect(result.shades).toHaveLength(5);
    expect(result.tints).toHaveLength(5);
  });

  it("returns valid hex strings in palette", () => {
    const result = generateColorPalette({ color: "#3366CC" }) as any;
    const hexPattern = /^#[0-9A-F]{6}$/;
    expect(result.complementary[0]).toMatch(hexPattern);
    for (const shade of result.shades) {
      expect(shade).toMatch(hexPattern);
    }
  });

  it("complementary of red is cyan-ish", () => {
    const result = generateColorPalette({ color: "#FF0000" }) as any;
    expect(result.complementary[0]).toBe("#00FFFF");
  });
});

describe("mixColors", () => {
  it("returns error when color1 is missing", () => {
    expect(mixColors({ color2: "#000000" })).toHaveProperty("error");
  });

  it("returns error when color2 is missing", () => {
    expect(mixColors({ color1: "#FF0000" })).toHaveProperty("error");
  });

  it("mixes black and white at 50% to gray", () => {
    const result = mixColors({ color1: "#000000", color2: "#FFFFFF", ratio: 0.5 }) as any;
    expect(result.mixed_hex).toBe("#808080");
  });

  it("ratio=0 returns color1", () => {
    const result = mixColors({ color1: "#FF0000", color2: "#0000FF", ratio: 0 }) as any;
    expect(result.mixed_hex).toBe("#FF0000");
  });

  it("ratio=1 returns color2", () => {
    const result = mixColors({ color1: "#FF0000", color2: "#0000FF", ratio: 1 }) as any;
    expect(result.mixed_hex).toBe("#0000FF");
  });

  it("defaults ratio to 0.5", () => {
    const result = mixColors({ color1: "#000000", color2: "#FFFFFF" }) as any;
    expect(result.ratio).toBe(0.5);
  });

  it("clamps ratio to [0, 1]", () => {
    const r1 = mixColors({ color1: "#000000", color2: "#FFFFFF", ratio: -1 }) as any;
    expect(r1.ratio).toBe(0);
    const r2 = mixColors({ color1: "#000000", color2: "#FFFFFF", ratio: 2 }) as any;
    expect(r2.ratio).toBe(1);
  });

  it("includes a description", () => {
    const result = mixColors({ color1: "#FF0000", color2: "#0000FF", ratio: 0.5 }) as any;
    expect(result.description).toContain("50%");
  });
});

describe("checkContrastRatio", () => {
  it("returns error when foreground is missing", () => {
    expect(checkContrastRatio({ background: "#FFF" })).toHaveProperty("error");
  });

  it("returns error when background is missing", () => {
    expect(checkContrastRatio({ foreground: "#000" })).toHaveProperty("error");
  });

  it("black on white is max contrast (21:1)", () => {
    const result = checkContrastRatio({ foreground: "#000000", background: "#FFFFFF" }) as any;
    expect(result.contrast_ratio).toBe(21);
    expect(result.wcag.aa_normal_text).toBe(true);
    expect(result.wcag.aaa_normal_text).toBe(true);
    expect(result.rating).toContain("AAA");
  });

  it("same color has 1:1 contrast", () => {
    const result = checkContrastRatio({ foreground: "#808080", background: "#808080" }) as any;
    expect(result.contrast_ratio).toBe(1);
    expect(result.wcag.aa_normal_text).toBe(false);
    expect(result.rating).toContain("Fail");
  });

  it("returns proper WCAG ratings for medium contrast", () => {
    const result = checkContrastRatio({ foreground: "#767676", background: "#FFFFFF" }) as any;
    expect(result.contrast_ratio).toBeGreaterThanOrEqual(4.5);
    expect(result.wcag.aa_normal_text).toBe(true);
  });

  it("accepts foreground_hex alias", () => {
    const result = checkContrastRatio({ foreground_hex: "#000", background_hex: "#FFF" }) as any;
    expect(result.contrast_ratio).toBe(21);
  });

  it("returns contrast_ratio_string in N:1 format", () => {
    const result = checkContrastRatio({ foreground: "#000", background: "#FFF" }) as any;
    expect(result.contrast_ratio_string).toBe("21:1");
  });
});
