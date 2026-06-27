import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToHsv, hsvToRgb, luminance, contrastRatio, mix } from "../color-space.js";

describe("hex/rgb conversions", () => {
  it("hex to rgb", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
  });

  it("short hex", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("rgb to hex", () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
  });

  it("roundtrips", () => {
    const hex = "#3a7bd5";
    expect(rgbToHex(hexToRgb(hex))).toBe(hex);
  });
});

describe("hsl conversions", () => {
  it("rgb to hsl - red", () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(hsl.h).toBeCloseTo(0);
    expect(hsl.s).toBeCloseTo(1);
    expect(hsl.l).toBeCloseTo(0.5);
  });

  it("hsl to rgb roundtrip", () => {
    const original = { r: 100, g: 150, b: 200 };
    const hsl = rgbToHsl(original);
    const back = hslToRgb(hsl);
    expect(back.r).toBeCloseTo(original.r, 0);
    expect(back.g).toBeCloseTo(original.g, 0);
    expect(back.b).toBeCloseTo(original.b, 0);
  });

  it("grey has zero saturation", () => {
    const hsl = rgbToHsl({ r: 128, g: 128, b: 128 });
    expect(hsl.s).toBe(0);
  });
});

describe("hsv conversions", () => {
  it("rgb to hsv", () => {
    const hsv = rgbToHsv({ r: 255, g: 0, b: 0 });
    expect(hsv.h).toBeCloseTo(0);
    expect(hsv.s).toBeCloseTo(1);
    expect(hsv.v).toBeCloseTo(1);
  });

  it("hsv to rgb roundtrip", () => {
    const original = { r: 100, g: 200, b: 50 };
    const hsv = rgbToHsv(original);
    const back = hsvToRgb(hsv);
    expect(back.r).toBeCloseTo(original.r, 0);
    expect(back.g).toBeCloseTo(original.g, 0);
    expect(back.b).toBeCloseTo(original.b, 0);
  });
});

describe("luminance", () => {
  it("white is ~1", () => {
    expect(luminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 1);
  });

  it("black is 0", () => {
    expect(luminance({ r: 0, g: 0, b: 0 })).toBe(0);
  });
});

describe("contrastRatio", () => {
  it("black vs white is 21", () => {
    const ratio = contrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("same color is 1", () => {
    expect(contrastRatio({ r: 128, g: 128, b: 128 }, { r: 128, g: 128, b: 128 })).toBeCloseTo(1);
  });
});

describe("mix", () => {
  it("50/50 mix", () => {
    const result = mix({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(result.r).toBeCloseTo(128, 0);
  });

  it("weighted mix", () => {
    const result = mix({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, 0.25);
    expect(result.r).toBeCloseTo(64, 0);
  });
});
