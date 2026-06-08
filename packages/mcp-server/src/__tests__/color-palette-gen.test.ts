import { describe, it, expect } from "vitest";
import { ColorPaletteGen } from "../color-palette-gen.js";

describe("ColorPaletteGen", () => {
  it("converts HSL to RGB", () => {
    const rgb = ColorPaletteGen.hslToRgb({ h: 0, s: 1, l: 0.5 });
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it("converts RGB to hex", () => {
    expect(ColorPaletteGen.rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
    expect(ColorPaletteGen.rgbToHex({ r: 0, g: 255, b: 0 })).toBe("#00ff00");
  });

  it("converts hex to RGB", () => {
    const rgb = ColorPaletteGen.hexToRgb("#ff8000");
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(128);
    expect(rgb.b).toBe(0);
  });

  it("generates complementary color", () => {
    const comp = ColorPaletteGen.complementary({ h: 0, s: 1, l: 0.5 });
    expect(comp.h).toBe(180);
  });

  it("generates analogous palette", () => {
    const palette = ColorPaletteGen.analogous({ h: 120, s: 1, l: 0.5 });
    expect(palette.length).toBe(3);
    expect(palette[0].h).toBe(90);
    expect(palette[2].h).toBe(150);
  });

  it("generates triadic palette", () => {
    const palette = ColorPaletteGen.triadic({ h: 0, s: 1, l: 0.5 });
    expect(palette.length).toBe(3);
    expect(palette[1].h).toBe(120);
    expect(palette[2].h).toBe(240);
  });

  it("generates monochromatic palette", () => {
    const palette = ColorPaletteGen.monochromatic({ h: 200, s: 0.8, l: 0.5 }, 5);
    expect(palette.length).toBe(5);
    expect(palette.every((c) => c.h === 200)).toBe(true);
  });

  it("calculates contrast ratio", () => {
    const ratio = ColorPaletteGen.contrastRatio(
      { r: 255, g: 255, b: 255 },
      { r: 0, g: 0, b: 0 }
    );
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("paletteToHex converts array", () => {
    const hexes = ColorPaletteGen.paletteToHex([
      { h: 0, s: 1, l: 0.5 },
      { h: 120, s: 1, l: 0.5 },
    ]);
    expect(hexes.length).toBe(2);
    expect(hexes[0]).toBe("#ff0000");
  });
});
