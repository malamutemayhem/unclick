import { describe, it, expect } from "vitest";
import {
  crystalSize, uniformity, capacity, purity,
  vcCost, continuous, forLargeCrystal, design,
  bestUse, vacuumCrystallizerTypes,
} from "../vacuum-crystallizer-calc.js";

describe("crystalSize", () => {
  it("oslo growth largest crystal", () => {
    expect(crystalSize("oslo_growth_type")).toBeGreaterThan(crystalSize("forced_circulation_fc"));
  });
});

describe("uniformity", () => {
  it("oslo growth most uniform", () => {
    expect(uniformity("oslo_growth_type")).toBeGreaterThan(uniformity("forced_circulation_fc"));
  });
});

describe("capacity", () => {
  it("forced circulation highest capacity", () => {
    expect(capacity("forced_circulation_fc")).toBeGreaterThan(capacity("single_stage_batch"));
  });
});

describe("purity", () => {
  it("single stage batch highest purity", () => {
    expect(purity("single_stage_batch")).toBeGreaterThan(purity("forced_circulation_fc"));
  });
});

describe("vcCost", () => {
  it("oslo growth most expensive", () => {
    expect(vcCost("oslo_growth_type")).toBeGreaterThan(vcCost("single_stage_batch"));
  });
});

describe("continuous", () => {
  it("multi stage is continuous", () => {
    expect(continuous("multi_stage_continuous")).toBe(true);
  });
  it("single stage batch not continuous", () => {
    expect(continuous("single_stage_batch")).toBe(false);
  });
});

describe("forLargeCrystal", () => {
  it("oslo growth for large crystal", () => {
    expect(forLargeCrystal("oslo_growth_type")).toBe(true);
  });
  it("forced circulation not for large crystal", () => {
    expect(forLargeCrystal("forced_circulation_fc")).toBe(false);
  });
});

describe("design", () => {
  it("dtb uses draft tube baffle", () => {
    expect(design("dtb_draft_tube_baffle")).toBe("draft_tube_baffle_internal_classification");
  });
});

describe("bestUse", () => {
  it("oslo for ammonium sulfate", () => {
    expect(bestUse("oslo_growth_type")).toBe("ammonium_sulfate_large_uniform_crystal");
  });
});

describe("vacuumCrystallizerTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumCrystallizerTypes()).toHaveLength(5);
  });
});
