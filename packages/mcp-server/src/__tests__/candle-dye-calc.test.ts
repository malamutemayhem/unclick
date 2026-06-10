import { describe, it, expect } from "vitest";
import {
  colorIntensity, mixEase, burnClean, colorStability,
  dyeCost, allNatural, glowsUV, dyeForm,
  bestCandle, candleDyes,
} from "../candle-dye-calc.js";

describe("colorIntensity", () => {
  it("dye block chip most intense color", () => {
    expect(colorIntensity("dye_block_chip")).toBeGreaterThan(colorIntensity("natural_botanical_herb"));
  });
});

describe("mixEase", () => {
  it("liquid dye drop easiest to mix", () => {
    expect(mixEase("liquid_dye_drop")).toBeGreaterThan(mixEase("natural_botanical_herb"));
  });
});

describe("burnClean", () => {
  it("natural botanical herb cleanest burn", () => {
    expect(burnClean("natural_botanical_herb")).toBeGreaterThan(burnClean("mica_powder_shimmer"));
  });
});

describe("colorStability", () => {
  it("dye block chip most stable color", () => {
    expect(colorStability("dye_block_chip")).toBeGreaterThan(colorStability("natural_botanical_herb"));
  });
});

describe("dyeCost", () => {
  it("uv glow pigment most expensive", () => {
    expect(dyeCost("uv_glow_pigment")).toBeGreaterThan(dyeCost("liquid_dye_drop"));
  });
});

describe("allNatural", () => {
  it("natural botanical herb is all natural", () => {
    expect(allNatural("natural_botanical_herb")).toBe(true);
  });
  it("liquid dye drop is not all natural", () => {
    expect(allNatural("liquid_dye_drop")).toBe(false);
  });
});

describe("glowsUV", () => {
  it("uv glow pigment glows under uv", () => {
    expect(glowsUV("uv_glow_pigment")).toBe(true);
  });
  it("dye block chip does not glow", () => {
    expect(glowsUV("dye_block_chip")).toBe(false);
  });
});

describe("dyeForm", () => {
  it("mica powder shimmer is fine metallic powder", () => {
    expect(dyeForm("mica_powder_shimmer")).toBe("fine_metallic_powder");
  });
});

describe("bestCandle", () => {
  it("liquid dye drop best for pillar solid color", () => {
    expect(bestCandle("liquid_dye_drop")).toBe("pillar_solid_color");
  });
});

describe("candleDyes", () => {
  it("returns 5 types", () => {
    expect(candleDyes()).toHaveLength(5);
  });
});
