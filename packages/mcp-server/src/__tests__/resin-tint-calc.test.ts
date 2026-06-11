import { describe, it, expect } from "vitest";
import {
  colorIntense, mixEase, transparency, colorRange,
  tintCost, shimmer, opaque, pigmentBase,
  bestUse, resinTints,
} from "../resin-tint-calc.js";

describe("colorIntense", () => {
  it("opaque paste solid most intense color", () => {
    expect(colorIntense("opaque_paste_solid")).toBeGreaterThan(colorIntense("glow_powder_dark"));
  });
});

describe("mixEase", () => {
  it("liquid pigment standard easiest mix", () => {
    expect(mixEase("liquid_pigment_standard")).toBeGreaterThan(mixEase("glow_powder_dark"));
  });
});

describe("transparency", () => {
  it("alcohol ink swirl most transparent", () => {
    expect(transparency("alcohol_ink_swirl")).toBeGreaterThan(transparency("opaque_paste_solid"));
  });
});

describe("colorRange", () => {
  it("liquid pigment standard widest color range", () => {
    expect(colorRange("liquid_pigment_standard")).toBeGreaterThan(colorRange("glow_powder_dark"));
  });
});

describe("tintCost", () => {
  it("glow powder dark most expensive", () => {
    expect(tintCost("glow_powder_dark")).toBeGreaterThan(tintCost("liquid_pigment_standard"));
  });
});

describe("shimmer", () => {
  it("mica powder shimmer has shimmer", () => {
    expect(shimmer("mica_powder_shimmer")).toBe(true);
  });
  it("liquid pigment standard no shimmer", () => {
    expect(shimmer("liquid_pigment_standard")).toBe(false);
  });
});

describe("opaque", () => {
  it("opaque paste solid is opaque", () => {
    expect(opaque("opaque_paste_solid")).toBe(true);
  });
  it("alcohol ink swirl not opaque", () => {
    expect(opaque("alcohol_ink_swirl")).toBe(false);
  });
});

describe("pigmentBase", () => {
  it("mica powder shimmer uses mineral mica flake", () => {
    expect(pigmentBase("mica_powder_shimmer")).toBe("mineral_mica_flake");
  });
});

describe("bestUse", () => {
  it("liquid pigment standard best for general transparent tint", () => {
    expect(bestUse("liquid_pigment_standard")).toBe("general_transparent_tint");
  });
});

describe("resinTints", () => {
  it("returns 5 types", () => {
    expect(resinTints()).toHaveLength(5);
  });
});
