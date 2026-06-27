import { describe, it, expect } from "vitest";
import {
  colorOptions, brightnessEven, installEase, effectRange,
  stripCost, cuttable, waterproof, chipType,
  bestSetup, ledStrips,
} from "../led-strip-calc.js";

describe("colorOptions", () => {
  it("addressable pixel most color options", () => {
    expect(colorOptions("addressable_pixel")).toBeGreaterThan(colorOptions("cob_seamless"));
  });
});

describe("brightnessEven", () => {
  it("cob seamless most even brightness", () => {
    expect(brightnessEven("cob_seamless")).toBeGreaterThan(brightnessEven("rgb_color_basic"));
  });
});

describe("installEase", () => {
  it("rgb color basic easiest install", () => {
    expect(installEase("rgb_color_basic")).toBeGreaterThan(installEase("neon_flex_tube"));
  });
});

describe("effectRange", () => {
  it("addressable pixel most effects", () => {
    expect(effectRange("addressable_pixel")).toBeGreaterThan(effectRange("cob_seamless"));
  });
});

describe("stripCost", () => {
  it("addressable pixel most expensive", () => {
    expect(stripCost("addressable_pixel")).toBeGreaterThan(stripCost("rgb_color_basic"));
  });
});

describe("cuttable", () => {
  it("rgb color basic is cuttable", () => {
    expect(cuttable("rgb_color_basic")).toBe(true);
  });
  it("neon flex tube is not", () => {
    expect(cuttable("neon_flex_tube")).toBe(false);
  });
});

describe("waterproof", () => {
  it("neon flex tube is waterproof", () => {
    expect(waterproof("neon_flex_tube")).toBe(true);
  });
  it("rgb color basic is not", () => {
    expect(waterproof("rgb_color_basic")).toBe(false);
  });
});

describe("chipType", () => {
  it("addressable pixel uses ws2812b individual", () => {
    expect(chipType("addressable_pixel")).toBe("ws2812b_individual");
  });
});

describe("bestSetup", () => {
  it("cob seamless best for cove ceiling no dots", () => {
    expect(bestSetup("cob_seamless")).toBe("cove_ceiling_no_dots");
  });
});

describe("ledStrips", () => {
  it("returns 5 types", () => {
    expect(ledStrips()).toHaveLength(5);
  });
});
