import { describe, it, expect } from "vitest";
import { rgbToHsv, hsvToRgb, rgbToCmyk, cmykToRgb, rgbToLab, deltaE } from "../color-space.js";

describe("color-space", () => {
  it("rgb to hsv and back", () => {
    const rgb = { r: 255, g: 0, b: 0 };
    const hsv = rgbToHsv(rgb);
    expect(hsv.h).toBe(0);
    expect(hsv.s).toBe(100);
    expect(hsv.v).toBe(100);
    const back = hsvToRgb(hsv);
    expect(back.r).toBe(255);
    expect(back.g).toBe(0);
    expect(back.b).toBe(0);
  });

  it("rgb to cmyk and back", () => {
    const rgb = { r: 255, g: 0, b: 0 };
    const cmyk = rgbToCmyk(rgb);
    expect(cmyk.c).toBe(0);
    expect(cmyk.m).toBe(100);
    expect(cmyk.y).toBe(100);
    expect(cmyk.k).toBe(0);
    const back = cmykToRgb(cmyk);
    expect(back.r).toBe(255);
  });

  it("black to cmyk", () => {
    const cmyk = rgbToCmyk({ r: 0, g: 0, b: 0 });
    expect(cmyk.k).toBe(100);
  });

  it("rgb to lab", () => {
    const lab = rgbToLab({ r: 255, g: 0, b: 0 });
    expect(lab.l).toBeGreaterThan(50);
    expect(lab.a).toBeGreaterThan(0);
  });

  it("deltaE measures color difference", () => {
    const red = rgbToLab({ r: 255, g: 0, b: 0 });
    const green = rgbToLab({ r: 0, g: 255, b: 0 });
    const same = rgbToLab({ r: 255, g: 0, b: 0 });
    expect(deltaE(red, same)).toBeCloseTo(0);
    expect(deltaE(red, green)).toBeGreaterThan(50);
  });

  it("white hsv", () => {
    const hsv = rgbToHsv({ r: 255, g: 255, b: 255 });
    expect(hsv.s).toBe(0);
    expect(hsv.v).toBe(100);
  });
});
