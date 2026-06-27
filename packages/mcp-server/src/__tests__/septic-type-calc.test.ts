import { describe, it, expect } from "vitest";
import {
  treatment, siteFlexibility, maintenance, longevity,
  spCost, powered, forPoorSoil, distribution,
  bestUse, septicTypeTypes,
} from "../septic-type-calc.js";

describe("treatment", () => {
  it("aerobic best treatment", () => {
    expect(treatment("aerobic_treatment_unit")).toBeGreaterThan(treatment("conventional_gravity_drain"));
  });
});

describe("siteFlexibility", () => {
  it("drip most flexible", () => {
    expect(siteFlexibility("drip_distribution_pump")).toBeGreaterThan(siteFlexibility("conventional_gravity_drain"));
  });
});

describe("maintenance", () => {
  it("conventional lowest maintenance", () => {
    expect(maintenance("conventional_gravity_drain")).toBeGreaterThan(maintenance("aerobic_treatment_unit"));
  });
});

describe("longevity", () => {
  it("chamber longest lasting", () => {
    expect(longevity("chamber_leach_plastic")).toBeGreaterThan(longevity("drip_distribution_pump"));
  });
});

describe("spCost", () => {
  it("drip most expensive", () => {
    expect(spCost("drip_distribution_pump")).toBeGreaterThan(spCost("conventional_gravity_drain"));
  });
});

describe("powered", () => {
  it("aerobic is powered", () => {
    expect(powered("aerobic_treatment_unit")).toBe(true);
  });
  it("conventional not powered", () => {
    expect(powered("conventional_gravity_drain")).toBe(false);
  });
});

describe("forPoorSoil", () => {
  it("mound for poor soil", () => {
    expect(forPoorSoil("mound_elevated_sand")).toBe(true);
  });
  it("conventional not for poor soil", () => {
    expect(forPoorSoil("conventional_gravity_drain")).toBe(false);
  });
});

describe("distribution", () => {
  it("chamber uses plastic arch", () => {
    expect(distribution("chamber_leach_plastic")).toBe("plastic_arch_chamber_no_gravel");
  });
});

describe("bestUse", () => {
  it("mound for high water table", () => {
    expect(bestUse("mound_elevated_sand")).toBe("high_water_table_clay_soil");
  });
});

describe("septicTypeTypes", () => {
  it("returns 5 types", () => {
    expect(septicTypeTypes()).toHaveLength(5);
  });
});
