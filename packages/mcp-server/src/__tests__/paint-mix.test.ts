import { describe, it, expect } from "vitest";
import {
  createCMYK, cmykToRgb, rgbToCmyk, mixSubtractive,
  tint, shade, tone, complementary, colorDistance,
  coverage, paintsNeeded, dryingTime,
  PRESET_COLORS, getPreset, formatCMYK,
} from "../paint-mix.js";

describe("createCMYK", () => {
  it("creates CMYK color", () => {
    const c = createCMYK(100, 0, 0, 0);
    expect(c.cyan).toBe(100);
    expect(c.magenta).toBe(0);
  });
});

describe("cmykToRgb / rgbToCmyk", () => {
  it("white CMYK to white RGB", () => {
    const rgb = cmykToRgb(createCMYK(0, 0, 0, 0));
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(255);
    expect(rgb.b).toBe(255);
  });

  it("black CMYK to black RGB", () => {
    const rgb = cmykToRgb(createCMYK(0, 0, 0, 100));
    expect(rgb.r).toBe(0);
  });

  it("round-trips for pure color", () => {
    const original = createCMYK(0, 100, 100, 0);
    const rgb = cmykToRgb(original);
    const back = rgbToCmyk(rgb);
    expect(back.magenta).toBe(100);
    expect(back.yellow).toBe(100);
  });
});

describe("mixSubtractive", () => {
  it("equal mix of two colors", () => {
    const red = createCMYK(0, 100, 100, 0);
    const blue = createCMYK(100, 100, 0, 0);
    const mixed = mixSubtractive([red, blue]);
    expect(mixed.cyan).toBe(50);
    expect(mixed.magenta).toBe(100);
  });

  it("weighted mix", () => {
    const white = createCMYK(0, 0, 0, 0);
    const black = createCMYK(0, 0, 0, 100);
    const mixed = mixSubtractive([white, black], [3, 1]);
    expect(mixed.key).toBe(25);
  });
});

describe("tint", () => {
  it("tinting reduces saturation", () => {
    const red = createCMYK(0, 100, 100, 0);
    const tinted = tint(red, 0.5);
    expect(tinted.magenta).toBe(50);
    expect(tinted.yellow).toBe(50);
  });
});

describe("shade", () => {
  it("shading increases key", () => {
    const red = createCMYK(0, 100, 100, 0);
    const shaded = shade(red, 0.5);
    expect(shaded.key).toBe(50);
  });
});

describe("tone", () => {
  it("toning changes both", () => {
    const blue = createCMYK(100, 100, 0, 0);
    const toned = tone(blue, 0.5);
    expect(toned.cyan).toBeLessThan(100);
    expect(toned.key).toBeGreaterThan(0);
  });
});

describe("complementary", () => {
  it("complement of red is cyan-ish", () => {
    const red = PRESET_COLORS.red;
    const comp = complementary(red);
    expect(comp.cyan).toBeGreaterThan(0);
  });
});

describe("colorDistance", () => {
  it("same color has 0 distance", () => {
    expect(colorDistance(PRESET_COLORS.red, PRESET_COLORS.red)).toBe(0);
  });

  it("different colors have positive distance", () => {
    expect(colorDistance(PRESET_COLORS.red, PRESET_COLORS.blue)).toBeGreaterThan(0);
  });
});

describe("coverage / paintsNeeded", () => {
  it("coverage calculation", () => {
    expect(coverage(5, 2)).toBe(25);
  });

  it("paints needed", () => {
    expect(paintsNeeded(50, 2)).toBeGreaterThan(0);
  });
});

describe("dryingTime", () => {
  it("warm dry conditions are faster", () => {
    const warm = dryingTime(25, 40);
    const cold = dryingTime(5, 80);
    expect(warm).toBeLessThan(cold);
  });
});

describe("PRESET_COLORS / getPreset", () => {
  it("has standard colors", () => {
    expect(Object.keys(PRESET_COLORS).length).toBeGreaterThan(5);
  });

  it("getPreset finds color", () => {
    expect(getPreset("Red")).not.toBeNull();
  });

  it("getPreset returns null for unknown", () => {
    expect(getPreset("chartreuse")).toBeNull();
  });
});

describe("formatCMYK", () => {
  it("formats CMYK string", () => {
    expect(formatCMYK(createCMYK(10, 20, 30, 40))).toBe("C:10 M:20 Y:30 K:40");
  });
});
