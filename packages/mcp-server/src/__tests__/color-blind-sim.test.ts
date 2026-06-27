import { describe, it, expect } from "vitest";
import {
  simulate, simulateAll, colorDifference,
  isDistinguishable, safeColorPalette,
  checkPaletteAccessibility, luminance, contrastRatio,
  rgbToHex, hexToRgb,
} from "../color-blind-sim.js";

const RED = { r: 255, g: 0, b: 0 };
const GREEN = { r: 0, g: 255, b: 0 };
const BLUE = { r: 0, g: 0, b: 255 };
const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };

describe("simulate", () => {
  it("protanopia changes red", () => {
    const sim = simulate(RED, "protanopia");
    expect(sim.r).toBeLessThan(255);
  });

  it("deuteranopia changes green", () => {
    const sim = simulate(GREEN, "deuteranopia");
    expect(sim.g).toBeLessThan(255);
  });

  it("tritanopia changes blue", () => {
    const sim = simulate(BLUE, "tritanopia");
    expect(sim.b).toBeLessThan(255);
  });

  it("achromatopsia produces grayscale", () => {
    const sim = simulate(RED, "achromatopsia");
    expect(Math.abs(sim.r - sim.g)).toBeLessThan(5);
    expect(Math.abs(sim.g - sim.b)).toBeLessThan(5);
  });

  it("severity 0 returns original", () => {
    const sim = simulate(RED, "protanopia", 0);
    expect(sim.r).toBeCloseTo(255, -1);
  });
});

describe("simulateAll", () => {
  it("returns all CVD types", () => {
    const results = simulateAll(RED);
    expect(Object.keys(results).length).toBe(7);
    expect(results.protanopia).toBeDefined();
    expect(results.deuteranopia).toBeDefined();
  });
});

describe("colorDifference", () => {
  it("0 for same color", () => {
    expect(colorDifference(RED, RED)).toBe(0);
  });

  it("positive for different colors", () => {
    expect(colorDifference(RED, BLUE)).toBeGreaterThan(0);
  });
});

describe("isDistinguishable", () => {
  it("black and white always distinguishable", () => {
    expect(isDistinguishable(BLACK, WHITE, "protanopia")).toBe(true);
  });

  it("red and green may not be for protanopia", () => {
    const result = isDistinguishable(RED, GREEN, "protanopia", 100);
    expect(typeof result).toBe("boolean");
  });
});

describe("safeColorPalette", () => {
  it("returns 8 colors", () => {
    expect(safeColorPalette().length).toBe(8);
  });
});

describe("checkPaletteAccessibility", () => {
  it("safe palette is accessible", () => {
    const palette = safeColorPalette();
    const result = checkPaletteAccessibility(palette, "deuteranopia", 15);
    expect(result.accessible).toBe(true);
  });
});

describe("luminance", () => {
  it("white has high luminance", () => {
    expect(luminance(WHITE)).toBeCloseTo(1);
  });

  it("black has 0 luminance", () => {
    expect(luminance(BLACK)).toBeCloseTo(0);
  });
});

describe("contrastRatio", () => {
  it("black/white is 21:1", () => {
    expect(contrastRatio(BLACK, WHITE)).toBeCloseTo(21, 0);
  });

  it("same color is 1:1", () => {
    expect(contrastRatio(RED, RED)).toBeCloseTo(1);
  });
});

describe("rgbToHex / hexToRgb", () => {
  it("converts to hex", () => {
    expect(rgbToHex(RED)).toBe("#ff0000");
  });

  it("round-trips", () => {
    const hex = rgbToHex({ r: 100, g: 150, b: 200 });
    const rgb = hexToRgb(hex);
    expect(rgb.r).toBe(100);
    expect(rgb.g).toBe(150);
    expect(rgb.b).toBe(200);
  });
});
