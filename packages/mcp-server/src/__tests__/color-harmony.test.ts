import { describe, it, expect } from "vitest";
import { ColorHarmony } from "../color-harmony.js";

describe("ColorHarmony", () => {
  it("hslToRgb converts red", () => {
    const rgb = ColorHarmony.hslToRgb(0, 1, 0.5);
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it("rgbToHsl round-trips", () => {
    const hsl = ColorHarmony.rgbToHsl(255, 0, 0);
    expect(hsl.h).toBeCloseTo(0, 0);
    expect(hsl.s).toBeCloseTo(1, 2);
    expect(hsl.l).toBeCloseTo(0.5, 2);
  });

  it("complementary returns two colors 180 degrees apart", () => {
    const colors = ColorHarmony.complementary(60, 1, 0.5);
    expect(colors.length).toBe(2);
    expect(colors[1].h).toBe(240);
  });

  it("analogous returns three colors", () => {
    const colors = ColorHarmony.analogous(120, 0.8, 0.5);
    expect(colors.length).toBe(3);
    expect(colors[0].h).toBe(90);
    expect(colors[2].h).toBe(150);
  });

  it("triadic returns three equally spaced colors", () => {
    const colors = ColorHarmony.triadic(0, 1, 0.5);
    expect(colors.map(c => c.h)).toEqual([0, 120, 240]);
  });

  it("tetradic returns four colors", () => {
    const colors = ColorHarmony.tetradic(0, 1, 0.5);
    expect(colors.length).toBe(4);
    expect(colors.map(c => c.h)).toEqual([0, 90, 180, 270]);
  });

  it("splitComplementary returns three colors", () => {
    const colors = ColorHarmony.splitComplementary(0, 1, 0.5);
    expect(colors.length).toBe(3);
    expect(colors[1].h).toBe(150);
    expect(colors[2].h).toBe(210);
  });

  it("monochromatic returns gradient of lightness", () => {
    const colors = ColorHarmony.monochromatic(200, 0.8, 0.5, 5);
    expect(colors.length).toBe(5);
    expect(colors[0].l).toBeLessThan(colors[4].l);
    expect(colors.every(c => c.h === 200)).toBe(true);
  });

  it("warmCool classifies correctly", () => {
    expect(ColorHarmony.warmCool(30)).toBe("warm");
    expect(ColorHarmony.warmCool(250)).toBe("cool");
  });

  it("hexToHsl and hslToHex round-trip", () => {
    const hex = "#ff8000";
    const hsl = ColorHarmony.hexToHsl(hex);
    expect(hsl.h).toBeCloseTo(30, -1);
    const back = ColorHarmony.hslToHex(hsl.h, hsl.s, hsl.l);
    expect(back.toLowerCase()).toBe(hex);
  });
});
