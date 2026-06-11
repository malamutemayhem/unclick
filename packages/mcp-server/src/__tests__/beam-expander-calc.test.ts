import { describe, it, expect } from "vitest";
import {
  beamQuality, throughput, magnification, wavefrontError,
  beCost, adjustable, forHighPower, expanderConfig,
  bestUse, beamExpanderTypes,
} from "../beam-expander-calc.js";

describe("beamQuality", () => {
  it("diffractive best beam quality", () => {
    expect(beamQuality("diffractive_expander")).toBeGreaterThan(beamQuality("anamorphic_prism"));
  });
});

describe("throughput", () => {
  it("galilean highest throughput", () => {
    expect(throughput("galilean_expander")).toBeGreaterThan(throughput("diffractive_expander"));
  });
});

describe("magnification", () => {
  it("variable zoom best magnification", () => {
    expect(magnification("variable_zoom")).toBeGreaterThan(magnification("anamorphic_prism"));
  });
});

describe("wavefrontError", () => {
  it("diffractive best wavefront error", () => {
    expect(wavefrontError("diffractive_expander")).toBeGreaterThan(wavefrontError("anamorphic_prism"));
  });
});

describe("beCost", () => {
  it("diffractive most expensive", () => {
    expect(beCost("diffractive_expander")).toBeGreaterThan(beCost("anamorphic_prism"));
  });
});

describe("adjustable", () => {
  it("variable zoom is adjustable", () => {
    expect(adjustable("variable_zoom")).toBe(true);
  });
  it("galilean not adjustable", () => {
    expect(adjustable("galilean_expander")).toBe(false);
  });
});

describe("forHighPower", () => {
  it("galilean for high power", () => {
    expect(forHighPower("galilean_expander")).toBe(true);
  });
  it("keplerian not for high power", () => {
    expect(forHighPower("keplerian_expander")).toBe(false);
  });
});

describe("expanderConfig", () => {
  it("keplerian uses two convex internal focus spatial filter", () => {
    expect(expanderConfig("keplerian_expander")).toBe("keplerian_beam_expander_two_convex_internal_focus_spatial_filter");
  });
});

describe("bestUse", () => {
  it("diffractive for space optics ultra light aberration free", () => {
    expect(bestUse("diffractive_expander")).toBe("space_optics_diffractive_beam_expander_ultra_light_aberration_free");
  });
});

describe("beamExpanderTypes", () => {
  it("returns 5 types", () => {
    expect(beamExpanderTypes()).toHaveLength(5);
  });
});
