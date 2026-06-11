import { describe, it, expect } from "vitest";
import {
  absorption, lowFreqPerf, durability, aesthetics,
  saCost, cleanable, forIndustrial, material,
  bestUse, soundAbsorberTypes,
} from "../sound-absorber-calc.js";

describe("absorption", () => {
  it("foam wedge best absorption", () => {
    expect(absorption("foam_wedge_anechoic")).toBeGreaterThan(absorption("microperforated_panel"));
  });
});

describe("lowFreqPerf", () => {
  it("microperforated panel best low frequency", () => {
    expect(lowFreqPerf("microperforated_panel")).toBeGreaterThan(lowFreqPerf("perforated_metal_ceil"));
  });
});

describe("durability", () => {
  it("perforated metal most durable", () => {
    expect(durability("perforated_metal_ceil")).toBeGreaterThan(durability("foam_wedge_anechoic"));
  });
});

describe("aesthetics", () => {
  it("fabric wrapped best aesthetics", () => {
    expect(aesthetics("fabric_wrapped_core")).toBeGreaterThan(aesthetics("fiberglass_panel_wall"));
  });
});

describe("saCost", () => {
  it("microperforated panel most expensive", () => {
    expect(saCost("microperforated_panel")).toBeGreaterThan(saCost("fiberglass_panel_wall"));
  });
});

describe("cleanable", () => {
  it("perforated metal is cleanable", () => {
    expect(cleanable("perforated_metal_ceil")).toBe(true);
  });
  it("fiberglass panel not cleanable", () => {
    expect(cleanable("fiberglass_panel_wall")).toBe(false);
  });
});

describe("forIndustrial", () => {
  it("fiberglass panel for industrial", () => {
    expect(forIndustrial("fiberglass_panel_wall")).toBe(true);
  });
  it("foam wedge not for industrial", () => {
    expect(forIndustrial("foam_wedge_anechoic")).toBe(false);
  });
});

describe("material", () => {
  it("fabric wrapped uses fiberglass core frame", () => {
    expect(material("fabric_wrapped_core")).toBe("fabric_stretched_over_fiberglass_core_frame");
  });
});

describe("bestUse", () => {
  it("microperforated for transparent facade", () => {
    expect(bestUse("microperforated_panel")).toBe("transparent_resonant_absorber_glass_facade");
  });
});

describe("soundAbsorberTypes", () => {
  it("returns 5 types", () => {
    expect(soundAbsorberTypes()).toHaveLength(5);
  });
});
