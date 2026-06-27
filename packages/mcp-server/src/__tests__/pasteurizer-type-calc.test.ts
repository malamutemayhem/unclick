import { describe, it, expect } from "vitest";
import {
  throughput, shelfLife, nutrient, energy,
  pzCost, continuous, forDairy, heating,
  bestUse, pasteurizerTypes,
} from "../pasteurizer-type-calc.js";

describe("throughput", () => {
  it("htst highest throughput", () => {
    expect(throughput("htst_plate_heat")).toBeGreaterThan(throughput("batch_vat_low_temp"));
  });
});

describe("shelfLife", () => {
  it("uht longest shelf life", () => {
    expect(shelfLife("uht_ultra_high_temp")).toBeGreaterThan(shelfLife("batch_vat_low_temp"));
  });
});

describe("nutrient", () => {
  it("batch vat best nutrient retention", () => {
    expect(nutrient("batch_vat_low_temp")).toBeGreaterThan(nutrient("uht_ultra_high_temp"));
  });
});

describe("energy", () => {
  it("ohmic most energy efficient", () => {
    expect(energy("ohmic_electric_heat")).toBeGreaterThan(energy("uht_ultra_high_temp"));
  });
});

describe("pzCost", () => {
  it("uht most expensive", () => {
    expect(pzCost("uht_ultra_high_temp")).toBeGreaterThan(pzCost("batch_vat_low_temp"));
  });
});

describe("continuous", () => {
  it("htst is continuous", () => {
    expect(continuous("htst_plate_heat")).toBe(true);
  });
  it("batch vat not continuous", () => {
    expect(continuous("batch_vat_low_temp")).toBe(false);
  });
});

describe("forDairy", () => {
  it("htst for dairy", () => {
    expect(forDairy("htst_plate_heat")).toBe(true);
  });
  it("ohmic not for dairy", () => {
    expect(forDairy("ohmic_electric_heat")).toBe(false);
  });
});

describe("heating", () => {
  it("ohmic uses electric current volumetric", () => {
    expect(heating("ohmic_electric_heat")).toBe("electric_current_volumetric");
  });
});

describe("bestUse", () => {
  it("batch vat best for craft cheese small dairy", () => {
    expect(bestUse("batch_vat_low_temp")).toBe("craft_cheese_small_dairy_batch");
  });
});

describe("pasteurizerTypes", () => {
  it("returns 5 types", () => {
    expect(pasteurizerTypes()).toHaveLength(5);
  });
});
