import { describe, it, expect } from "vitest";
import {
  roastUniformity, batchSize, profileControl, energyEfficiency,
  crCost, continuous, forSpecialty, roasterConfig,
  bestUse, coffeeRoasterTypes,
} from "../coffee-roaster-calc.js";

describe("roastUniformity", () => {
  it("fluid bed best roast uniformity", () => {
    expect(roastUniformity("fluid_bed")).toBeGreaterThan(roastUniformity("tangential_roaster"));
  });
});

describe("batchSize", () => {
  it("centrifugal roaster largest batch size", () => {
    expect(batchSize("centrifugal_roaster")).toBeGreaterThan(batchSize("fluid_bed"));
  });
});

describe("profileControl", () => {
  it("hybrid recirculation best profile control", () => {
    expect(profileControl("hybrid_recirculation")).toBeGreaterThan(profileControl("tangential_roaster"));
  });
});

describe("energyEfficiency", () => {
  it("hybrid recirculation best energy efficiency", () => {
    expect(energyEfficiency("hybrid_recirculation")).toBeGreaterThan(energyEfficiency("drum_roaster"));
  });
});

describe("crCost", () => {
  it("hybrid recirculation most expensive", () => {
    expect(crCost("hybrid_recirculation")).toBeGreaterThan(crCost("fluid_bed"));
  });
});

describe("continuous", () => {
  it("centrifugal roaster is continuous", () => {
    expect(continuous("centrifugal_roaster")).toBe(true);
  });
  it("drum roaster not continuous", () => {
    expect(continuous("drum_roaster")).toBe(false);
  });
});

describe("forSpecialty", () => {
  it("drum roaster for specialty", () => {
    expect(forSpecialty("drum_roaster")).toBe(true);
  });
  it("tangential roaster not for specialty", () => {
    expect(forSpecialty("tangential_roaster")).toBe(false);
  });
});

describe("roasterConfig", () => {
  it("fluid bed uses hot air levitate bean", () => {
    expect(roasterConfig("fluid_bed")).toBe("fluid_bed_air_roaster_hot_air_levitate_bean_even_roast_clean_cup");
  });
});

describe("bestUse", () => {
  it("hybrid recirculation for premium micro roastery", () => {
    expect(bestUse("hybrid_recirculation")).toBe("premium_micro_roastery_hybrid_recirculation_precise_profile_energy");
  });
});

describe("coffeeRoasterTypes", () => {
  it("returns 5 types", () => {
    expect(coffeeRoasterTypes()).toHaveLength(5);
  });
});
