import { describe, it, expect } from "vitest";
import {
  pressureRating, volumeEfficiency, stressDistribution, weldComplexity,
  spCost, elevated, forLpg, shell,
  bestUse, sphericalTankTypes,
} from "../spherical-tank-calc.js";

describe("pressureRating", () => {
  it("nuclear containment highest pressure", () => {
    expect(pressureRating("nuclear_containment")).toBeGreaterThanOrEqual(pressureRating("deep_sea_submersible"));
  });
});

describe("volumeEfficiency", () => {
  it("horton sphere excellent volume efficiency", () => {
    expect(volumeEfficiency("horton_sphere_lpg")).toBeGreaterThan(volumeEfficiency("water_tower_elevated"));
  });
});

describe("stressDistribution", () => {
  it("spheres have best stress distribution", () => {
    expect(stressDistribution("horton_sphere_lpg")).toBeGreaterThan(stressDistribution("water_tower_elevated"));
  });
});

describe("weldComplexity", () => {
  it("umbrella roof least weld complexity", () => {
    expect(weldComplexity("water_tower_elevated")).toBeGreaterThan(weldComplexity("deep_sea_submersible"));
  });
});

describe("spCost", () => {
  it("nuclear containment most expensive", () => {
    expect(spCost("nuclear_containment")).toBeGreaterThan(spCost("water_tower_elevated"));
  });
});

describe("elevated", () => {
  it("horton sphere is elevated", () => {
    expect(elevated("horton_sphere_lpg")).toBe(true);
  });
  it("pressurized ammonia not elevated", () => {
    expect(elevated("pressurized_ammonia")).toBe(false);
  });
});

describe("forLpg", () => {
  it("horton sphere for lpg", () => {
    expect(forLpg("horton_sphere_lpg")).toBe(true);
  });
  it("water tower not for lpg", () => {
    expect(forLpg("water_tower_elevated")).toBe(false);
  });
});

describe("shell", () => {
  it("deep sea uses titanium or steel", () => {
    expect(shell("deep_sea_submersible")).toBe("titanium_or_steel_sphere_external_hydrostatic");
  });
});

describe("bestUse", () => {
  it("pressurized ammonia for fertilizer plant", () => {
    expect(bestUse("pressurized_ammonia")).toBe("ammonia_storage_fertilizer_plant_refrigerated");
  });
});

describe("sphericalTankTypes", () => {
  it("returns 5 types", () => {
    expect(sphericalTankTypes()).toHaveLength(5);
  });
});
