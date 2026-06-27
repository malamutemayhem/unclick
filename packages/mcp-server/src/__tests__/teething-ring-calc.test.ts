import { describe, it, expect } from "vitest";
import {
  gumRelief, gripEase, durability, sensoryStimulation,
  ringCost, freezerSafe, allNatural, ringMaterial,
  bestStage, teethingRings,
} from "../teething-ring-calc.js";

describe("gumRelief", () => {
  it("water filled cool best gum relief", () => {
    expect(gumRelief("water_filled_cool")).toBeGreaterThan(gumRelief("fabric_crinkle_combo"));
  });
});

describe("gripEase", () => {
  it("rubber banana shape easiest grip", () => {
    expect(gripEase("rubber_banana_shape")).toBeGreaterThan(gripEase("wooden_natural_maple"));
  });
});

describe("durability", () => {
  it("wooden natural maple most durable", () => {
    expect(durability("wooden_natural_maple")).toBeGreaterThan(durability("water_filled_cool"));
  });
});

describe("sensoryStimulation", () => {
  it("fabric crinkle combo most sensory stimulation", () => {
    expect(sensoryStimulation("fabric_crinkle_combo")).toBeGreaterThan(sensoryStimulation("wooden_natural_maple"));
  });
});

describe("ringCost", () => {
  it("fabric crinkle combo most expensive", () => {
    expect(ringCost("fabric_crinkle_combo")).toBeGreaterThan(ringCost("water_filled_cool"));
  });
});

describe("freezerSafe", () => {
  it("water filled cool is freezer safe", () => {
    expect(freezerSafe("water_filled_cool")).toBe(true);
  });
  it("wooden natural maple is not", () => {
    expect(freezerSafe("wooden_natural_maple")).toBe(false);
  });
});

describe("allNatural", () => {
  it("wooden natural maple is all natural", () => {
    expect(allNatural("wooden_natural_maple")).toBe(true);
  });
  it("silicone textured is not", () => {
    expect(allNatural("silicone_textured")).toBe(false);
  });
});

describe("ringMaterial", () => {
  it("rubber banana shape uses natural rubber latex mold", () => {
    expect(ringMaterial("rubber_banana_shape")).toBe("natural_rubber_latex_mold");
  });
});

describe("bestStage", () => {
  it("water filled cool best for sore gum cold relief", () => {
    expect(bestStage("water_filled_cool")).toBe("sore_gum_cold_relief");
  });
});

describe("teethingRings", () => {
  it("returns 5 types", () => {
    expect(teethingRings()).toHaveLength(5);
  });
});
