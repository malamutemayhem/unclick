import { describe, it, expect } from "vitest";
import {
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToHsv, hsvToRgb,
  rgbToCmyk, cmykToRgb, rgbToLab, deltaE,
  luminance, contrastRatio, mix, parseColor
} from "../color-convert.js";

describe("ColorConvert", () => {
  it("hex to RGB", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb("0000ff")).toEqual({ r: 0, g: 0, b: 255 });
  });

  it("short hex to RGB", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("RGB to hex", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
    expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe("#00ff00");
  });

  it("RGB to HSL and back", () => {
    const rgb = { r: 255, g: 0, b: 0 };
    const hsl = rgbToHsl(rgb);
    expect(hsl.h).toBeCloseTo(0);
    expect(hsl.s).toBeCloseTo(1);
    expect(hsl.l).toBeCloseTo(0.5);
    const back = hslToRgb(hsl);
    expect(back.r).toBe(255);
    expect(back.g).toBe(0);
    expect(back.b).toBe(0);
  });

  it("HSL gray", () => {
    const hsl = rgbToHsl({ r: 128, g: 128, b: 128 });
    expect(hsl.s).toBeCloseTo(0);
    const back = hslToRgb(hsl);
    expect(back.r).toBeCloseTo(128, 0);
  });

  it("RGB to HSV and back", () => {
    const rgb = { r: 0, g: 255, b: 0 };
    const hsv = rgbToHsv(rgb);
    expect(hsv.h).toBeCloseTo(120);
    expect(hsv.s).toBeCloseTo(1);
    expect(hsv.v).toBeCloseTo(1);
    const back = hsvToRgb(hsv);
    expect(back.g).toBe(255);
  });

  it("RGB to CMYK and back", () => {
    const cmyk = rgbToCmyk({ r: 255, g: 0, b: 0 });
    expect(cmyk.c).toBeCloseTo(0);
    expect(cmyk.m).toBeCloseTo(1);
    expect(cmyk.y).toBeCloseTo(1);
    expect(cmyk.k).toBeCloseTo(0);
    const back = cmykToRgb(cmyk);
    expect(back.r).toBe(255);
  });

  it("CMYK black", () => {
    const cmyk = rgbToCmyk({ r: 0, g: 0, b: 0 });
    expect(cmyk.k).toBeCloseTo(1);
  });

  it("RGB to Lab", () => {
    const lab = rgbToLab({ r: 255, g: 255, b: 255 });
    expect(lab.l).toBeCloseTo(100, 0);
  });

  it("deltaE measures color distance", () => {
    const white = rgbToLab({ r: 255, g: 255, b: 255 });
    const black = rgbToLab({ r: 0, g: 0, b: 0 });
    expect(deltaE(white, black)).toBeGreaterThan(50);
    expect(deltaE(white, white)).toBeCloseTo(0);
  });

  it("luminance calculation", () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1);
    expect(luminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0);
  });

  it("contrast ratio", () => {
    const ratio = contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("mix colors", () => {
    const mixed = mix({ r: 255, g: 0, b: 0 }, { r: 0, g: 0, b: 255 }, 0.5);
    expect(mixed.r).toBe(128);
    expect(mixed.b).toBe(128);
  });

  it("parseColor from hex", () => {
    expect(parseColor("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("parseColor from rgb()", () => {
    expect(parseColor("rgb(10, 20, 30)")).toEqual({ r: 10, g: 20, b: 30 });
  });

  it("parseColor throws on invalid", () => {
    expect(() => parseColor("not-a-color")).toThrow("Cannot parse");
  });
});
