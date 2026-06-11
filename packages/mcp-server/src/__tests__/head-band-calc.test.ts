import { describe, it, expect } from "vitest";
import {
  decorativeValue, durability, attachStrength, colorRange,
  bandCost, handSewn, forFine, bandMaterial,
  bestUse, headBands,
} from "../head-band-calc.js";

describe("decorativeValue", () => {
  it("hand sewn silk most decorative", () => {
    expect(decorativeValue("hand_sewn_silk")).toBeGreaterThan(decorativeValue("machine_band_basic"));
  });
});

describe("durability", () => {
  it("leather band durable most durable", () => {
    expect(durability("leather_band_durable")).toBeGreaterThan(durability("machine_band_basic"));
  });
});

describe("attachStrength", () => {
  it("leather band durable strongest attach", () => {
    expect(attachStrength("leather_band_durable")).toBeGreaterThan(attachStrength("machine_band_basic"));
  });
});

describe("colorRange", () => {
  it("decorative band pattern widest color range", () => {
    expect(colorRange("decorative_band_pattern")).toBeGreaterThan(colorRange("leather_band_durable"));
  });
});

describe("bandCost", () => {
  it("hand sewn silk most expensive", () => {
    expect(bandCost("hand_sewn_silk")).toBeGreaterThan(bandCost("machine_band_basic"));
  });
});

describe("handSewn", () => {
  it("hand sewn silk is hand sewn", () => {
    expect(handSewn("hand_sewn_silk")).toBe(true);
  });
  it("machine band basic not hand sewn", () => {
    expect(handSewn("machine_band_basic")).toBe(false);
  });
});

describe("forFine", () => {
  it("hand sewn silk is for fine", () => {
    expect(forFine("hand_sewn_silk")).toBe(true);
  });
  it("machine band basic not for fine", () => {
    expect(forFine("machine_band_basic")).toBe(false);
  });
});

describe("bandMaterial", () => {
  it("woven linen classic uses linen core weave", () => {
    expect(bandMaterial("woven_linen_classic")).toBe("linen_core_weave");
  });
});

describe("bestUse", () => {
  it("woven linen classic best for traditional hardcover", () => {
    expect(bestUse("woven_linen_classic")).toBe("traditional_hardcover");
  });
});

describe("headBands", () => {
  it("returns 5 types", () => {
    expect(headBands()).toHaveLength(5);
  });
});
