import { describe, it, expect } from "vitest";
import {
  medianCut, colorDistance, nearestColor, quantize, rgbToHex, hexToRgb,
} from "../color-quantizer.js";
import type { RGB } from "../color-quantizer.js";

describe("medianCut", () => {
  it("reduces to requested number of colors", () => {
    const colors: RGB[] = [
      { r: 255, g: 0, b: 0 },
      { r: 250, g: 5, b: 5 },
      { r: 0, g: 255, b: 0 },
      { r: 5, g: 250, b: 5 },
      { r: 0, g: 0, b: 255 },
      { r: 5, g: 5, b: 250 },
    ];
    const palette = medianCut(colors, 3);
    expect(palette.length).toBeLessThanOrEqual(3);
  });

  it("handles empty input", () => {
    expect(medianCut([], 4)).toEqual([]);
  });

  it("handles single color request", () => {
    const colors: RGB[] = [{ r: 100, g: 100, b: 100 }, { r: 200, g: 200, b: 200 }];
    const palette = medianCut(colors, 1);
    expect(palette).toHaveLength(1);
  });
});

describe("colorDistance", () => {
  it("returns 0 for same color", () => {
    expect(colorDistance({ r: 100, g: 100, b: 100 }, { r: 100, g: 100, b: 100 })).toBe(0);
  });

  it("calculates euclidean distance", () => {
    const d = colorDistance({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(d).toBeCloseTo(Math.sqrt(255 * 255 * 3));
  });
});

describe("nearestColor", () => {
  it("finds closest color in palette", () => {
    const palette: RGB[] = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
    ];
    const result = nearestColor({ r: 200, g: 10, b: 10 }, palette);
    expect(result).toEqual({ r: 255, g: 0, b: 0 });
  });
});

describe("quantize", () => {
  it("maps all colors to palette", () => {
    const colors: RGB[] = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
      { r: 128, g: 0, b: 0 },
    ];
    const result = quantize(colors, 2);
    expect(result).toHaveLength(4);
    const unique = new Set(result.map((c) => `${c.r},${c.g},${c.b}`));
    expect(unique.size).toBeLessThanOrEqual(2);
  });
});

describe("rgbToHex / hexToRgb", () => {
  it("converts rgb to hex", () => {
    expect(rgbToHex({ r: 255, g: 128, b: 0 })).toBe("#ff8000");
  });

  it("converts hex to rgb", () => {
    expect(hexToRgb("#ff8000")).toEqual({ r: 255, g: 128, b: 0 });
  });

  it("roundtrips", () => {
    const color: RGB = { r: 42, g: 128, b: 200 };
    expect(hexToRgb(rgbToHex(color))).toEqual(color);
  });
});
