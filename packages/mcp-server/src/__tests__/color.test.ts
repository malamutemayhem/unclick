import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, lighten, darken, luminance, contrastRatio } from "../color.js";

describe("hexToRgb", () => {
  it("parses 6-digit hex", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("parses 3-digit hex", () => {
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("parses without hash", () => {
    expect(hexToRgb("00ff00")).toEqual({ r: 0, g: 255, b: 0 });
  });
});

describe("rgbToHex", () => {
  it("converts rgb to hex", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
  });

  it("clamps values", () => {
    expect(rgbToHex({ r: 300, g: -10, b: 128 })).toBe("#ff0080");
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

describe("hslToRgb", () => {
  it("converts red", () => {
    const rgb = hslToRgb({ h: 0, s: 100, l: 50 });
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it("converts grey", () => {
    const rgb = hslToRgb({ h: 0, s: 0, l: 50 });
    expect(rgb.r).toBe(128);
    expect(rgb.g).toBe(128);
    expect(rgb.b).toBe(128);
  });
});

describe("lighten", () => {
  it("lightens a color", () => {
    const result = lighten("#000000", 50);
    const rgb = hexToRgb(result);
    expect(rgb.r).toBeGreaterThan(0);
  });
});

describe("darken", () => {
  it("darkens a color", () => {
    const result = darken("#ffffff", 50);
    const rgb = hexToRgb(result);
    expect(rgb.r).toBeLessThan(255);
  });
});

describe("luminance", () => {
  it("white is 1", () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 2);
  });

  it("black is 0", () => {
    expect(luminance({ r: 0, g: 0, b: 0 })).toBe(0);
  });
});

describe("contrastRatio", () => {
  it("black and white has max contrast", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
  });

  it("same color has ratio of 1", () => {
    expect(contrastRatio("#ff0000", "#ff0000")).toBeCloseTo(1, 1);
  });
});
