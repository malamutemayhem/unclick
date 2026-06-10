import { describe, it, expect } from "vitest";
import {
  inkCoverage, inkControl, surfaceAdapt, durability,
  brayerCost, forRelief, forMonoprint, rollerMaterial,
  bestTechnique, brayers,
} from "../brayer-calc.js";

describe("inkCoverage", () => {
  it("gelatin mono print best ink coverage", () => {
    expect(inkCoverage("gelatin_mono_print")).toBeGreaterThan(inkCoverage("hard_rubber_precise"));
  });
});

describe("inkControl", () => {
  it("hard rubber precise best ink control", () => {
    expect(inkControl("hard_rubber_precise")).toBeGreaterThan(inkControl("foam_roller_texture"));
  });
});

describe("surfaceAdapt", () => {
  it("gelatin mono print best surface adapt", () => {
    expect(surfaceAdapt("gelatin_mono_print")).toBeGreaterThan(surfaceAdapt("hard_rubber_precise"));
  });
});

describe("durability", () => {
  it("polyurethane durometer most durable", () => {
    expect(durability("polyurethane_durometer")).toBeGreaterThan(durability("gelatin_mono_print"));
  });
});

describe("brayerCost", () => {
  it("gelatin mono print more expensive than soft rubber", () => {
    expect(brayerCost("gelatin_mono_print")).toBeGreaterThan(brayerCost("soft_rubber_standard"));
  });
});

describe("forRelief", () => {
  it("soft rubber standard is for relief", () => {
    expect(forRelief("soft_rubber_standard")).toBe(true);
  });
  it("gelatin mono print is not for relief", () => {
    expect(forRelief("gelatin_mono_print")).toBe(false);
  });
});

describe("forMonoprint", () => {
  it("gelatin mono print is for monoprint", () => {
    expect(forMonoprint("gelatin_mono_print")).toBe(true);
  });
  it("hard rubber precise is not for monoprint", () => {
    expect(forMonoprint("hard_rubber_precise")).toBe(false);
  });
});

describe("rollerMaterial", () => {
  it("gelatin mono print uses animal gelatin slab", () => {
    expect(rollerMaterial("gelatin_mono_print")).toBe("animal_gelatin_slab");
  });
});

describe("bestTechnique", () => {
  it("polyurethane durometer best for viscosity print multi", () => {
    expect(bestTechnique("polyurethane_durometer")).toBe("viscosity_print_multi");
  });
});

describe("brayers", () => {
  it("returns 5 types", () => {
    expect(brayers()).toHaveLength(5);
  });
});
