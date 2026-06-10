import { describe, it, expect } from "vitest";
import {
  gripLevel, dustLevel, toneBrightness, longevity,
  rosinCost, allergenFree, suitsSolo, resinBase,
  bestInstrument, rosins,
} from "../rosin-calc.js";

describe("gripLevel", () => {
  it("bass extra sticky highest grip", () => {
    expect(gripLevel("bass_extra_sticky")).toBeGreaterThan(gripLevel("light_amber_violin"));
  });
});

describe("dustLevel", () => {
  it("hypoallergenic gold least dust", () => {
    expect(dustLevel("hypoallergenic_gold")).toBeGreaterThan(dustLevel("bass_extra_sticky"));
  });
});

describe("toneBrightness", () => {
  it("light amber violin brightest tone", () => {
    expect(toneBrightness("light_amber_violin")).toBeGreaterThan(toneBrightness("dark_soft_cello"));
  });
});

describe("longevity", () => {
  it("pop style grip enhance longest lasting", () => {
    expect(longevity("pop_style_grip_enhance")).toBeGreaterThan(longevity("bass_extra_sticky"));
  });
});

describe("rosinCost", () => {
  it("hypoallergenic gold most expensive", () => {
    expect(rosinCost("hypoallergenic_gold")).toBeGreaterThan(rosinCost("light_amber_violin"));
  });
});

describe("allergenFree", () => {
  it("hypoallergenic gold is allergen free", () => {
    expect(allergenFree("hypoallergenic_gold")).toBe(true);
  });
  it("light amber violin is not", () => {
    expect(allergenFree("light_amber_violin")).toBe(false);
  });
});

describe("suitsSolo", () => {
  it("light amber violin suits solo", () => {
    expect(suitsSolo("light_amber_violin")).toBe(true);
  });
  it("bass extra sticky does not", () => {
    expect(suitsSolo("bass_extra_sticky")).toBe(false);
  });
});

describe("resinBase", () => {
  it("hypoallergenic gold uses synthetic gold flake mix", () => {
    expect(resinBase("hypoallergenic_gold")).toBe("synthetic_gold_flake_mix");
  });
});

describe("bestInstrument", () => {
  it("dark soft cello best for cello warm deep tone", () => {
    expect(bestInstrument("dark_soft_cello")).toBe("cello_warm_deep_tone");
  });
});

describe("rosins", () => {
  it("returns 5 types", () => {
    expect(rosins()).toHaveLength(5);
  });
});
