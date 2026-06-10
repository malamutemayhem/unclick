import { describe, it, expect } from "vitest";
import {
  colorIntensity, transparency, mixEase, effectRange,
  pigmentCost, uvStable, specialEffect, pigmentBase,
  bestUse, resinPigments,
} from "../resin-pigment-calc.js";

describe("colorIntensity", () => {
  it("opaque paste solid most intense", () => {
    expect(colorIntensity("opaque_paste_solid")).toBeGreaterThan(colorIntensity("glow_phosphor_dark"));
  });
});

describe("transparency", () => {
  it("liquid dye transparent most transparent", () => {
    expect(transparency("liquid_dye_transparent")).toBeGreaterThan(transparency("opaque_paste_solid"));
  });
});

describe("mixEase", () => {
  it("liquid dye transparent easiest to mix", () => {
    expect(mixEase("liquid_dye_transparent")).toBeGreaterThan(mixEase("glow_phosphor_dark"));
  });
});

describe("effectRange", () => {
  it("alcohol ink swirl widest effect range", () => {
    expect(effectRange("alcohol_ink_swirl")).toBeGreaterThan(effectRange("opaque_paste_solid"));
  });
});

describe("pigmentCost", () => {
  it("glow phosphor dark most expensive", () => {
    expect(pigmentCost("glow_phosphor_dark")).toBeGreaterThan(pigmentCost("liquid_dye_transparent"));
  });
});

describe("uvStable", () => {
  it("mica powder shimmer is uv stable", () => {
    expect(uvStable("mica_powder_shimmer")).toBe(true);
  });
  it("liquid dye transparent is not uv stable", () => {
    expect(uvStable("liquid_dye_transparent")).toBe(false);
  });
});

describe("specialEffect", () => {
  it("glow phosphor dark has special effect", () => {
    expect(specialEffect("glow_phosphor_dark")).toBe(true);
  });
  it("opaque paste solid has no special effect", () => {
    expect(specialEffect("opaque_paste_solid")).toBe(false);
  });
});

describe("pigmentBase", () => {
  it("mica powder shimmer uses mineral mica ground", () => {
    expect(pigmentBase("mica_powder_shimmer")).toBe("mineral_mica_ground");
  });
});

describe("bestUse", () => {
  it("alcohol ink swirl best for petri dish cell art", () => {
    expect(bestUse("alcohol_ink_swirl")).toBe("petri_dish_cell_art");
  });
});

describe("resinPigments", () => {
  it("returns 5 types", () => {
    expect(resinPigments()).toHaveLength(5);
  });
});
