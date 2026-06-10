import { describe, it, expect } from "vitest";
import {
  colorIntensity, mixEase, effectRange, uvStability,
  dyeCost, transparent, glowsInDark, pigmentType,
  bestEffect, resinDyes,
} from "../resin-dye-calc.js";

describe("colorIntensity", () => {
  it("opaque paste solid most color intensity", () => {
    expect(colorIntensity("opaque_paste_solid")).toBeGreaterThan(colorIntensity("glow_phosphor_dark"));
  });
});

describe("mixEase", () => {
  it("liquid pigment drop easiest to mix", () => {
    expect(mixEase("liquid_pigment_drop")).toBeGreaterThan(mixEase("glow_phosphor_dark"));
  });
});

describe("effectRange", () => {
  it("mica powder shimmer widest effect range", () => {
    expect(effectRange("mica_powder_shimmer")).toBeGreaterThan(effectRange("opaque_paste_solid"));
  });
});

describe("uvStability", () => {
  it("opaque paste solid best uv stability", () => {
    expect(uvStability("opaque_paste_solid")).toBeGreaterThan(uvStability("alcohol_ink_swirl"));
  });
});

describe("dyeCost", () => {
  it("glow phosphor dark more expensive than liquid pigment", () => {
    expect(dyeCost("glow_phosphor_dark")).toBeGreaterThan(dyeCost("liquid_pigment_drop"));
  });
});

describe("transparent", () => {
  it("liquid pigment drop is transparent", () => {
    expect(transparent("liquid_pigment_drop")).toBe(true);
  });
  it("mica powder shimmer is not transparent", () => {
    expect(transparent("mica_powder_shimmer")).toBe(false);
  });
});

describe("glowsInDark", () => {
  it("glow phosphor dark glows in dark", () => {
    expect(glowsInDark("glow_phosphor_dark")).toBe(true);
  });
  it("liquid pigment drop does not glow in dark", () => {
    expect(glowsInDark("liquid_pigment_drop")).toBe(false);
  });
});

describe("pigmentType", () => {
  it("mica powder shimmer uses ground mica mineral", () => {
    expect(pigmentType("mica_powder_shimmer")).toBe("ground_mica_mineral");
  });
});

describe("bestEffect", () => {
  it("alcohol ink swirl best for petri dish bloom", () => {
    expect(bestEffect("alcohol_ink_swirl")).toBe("petri_dish_bloom");
  });
});

describe("resinDyes", () => {
  it("returns 5 types", () => {
    expect(resinDyes()).toHaveLength(5);
  });
});
