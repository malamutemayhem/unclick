import { describe, it, expect } from "vitest";
import {
  adsorptionCapacity, contactTime, regenerability, particleRemoval,
  acfCost, reusable, forGasPhase, carbonType,
  bestUse, activatedCarbonFilterTypes,
} from "../activated-carbon-filter-calc.js";

describe("adsorptionCapacity", () => {
  it("granular fixed bed and fluidized bed highest adsorption", () => {
    expect(adsorptionCapacity("granular_fixed_bed")).toBeGreaterThan(adsorptionCapacity("carbon_block"));
    expect(adsorptionCapacity("fluidized_bed_carbon")).toBeGreaterThan(adsorptionCapacity("carbon_block"));
  });
});

describe("contactTime", () => {
  it("powdered dosing fastest contact time", () => {
    expect(contactTime("powdered_dosing")).toBeGreaterThan(contactTime("carbon_block"));
  });
});

describe("regenerability", () => {
  it("granular fixed bed most regenerable", () => {
    expect(regenerability("granular_fixed_bed")).toBeGreaterThan(regenerability("powdered_dosing"));
  });
});

describe("particleRemoval", () => {
  it("carbon block best particle removal", () => {
    expect(particleRemoval("carbon_block")).toBeGreaterThan(particleRemoval("powdered_dosing"));
  });
});

describe("acfCost", () => {
  it("impregnated specialty most expensive", () => {
    expect(acfCost("impregnated_specialty")).toBeGreaterThan(acfCost("powdered_dosing"));
  });
});

describe("reusable", () => {
  it("granular fixed bed is reusable", () => {
    expect(reusable("granular_fixed_bed")).toBe(true);
  });
  it("powdered dosing not reusable", () => {
    expect(reusable("powdered_dosing")).toBe(false);
  });
});

describe("forGasPhase", () => {
  it("impregnated specialty for gas phase", () => {
    expect(forGasPhase("impregnated_specialty")).toBe(true);
  });
  it("carbon block not for gas phase", () => {
    expect(forGasPhase("carbon_block")).toBe(false);
  });
});

describe("carbonType", () => {
  it("carbon block uses compressed block", () => {
    expect(carbonType("carbon_block")).toBe("compressed_carbon_block_sub_micron_pore_cyst_lead_remove");
  });
});

describe("bestUse", () => {
  it("powdered dosing for emergency spill response", () => {
    expect(bestUse("powdered_dosing")).toBe("emergency_spill_response_seasonal_taste_odor_batch_treat");
  });
});

describe("activatedCarbonFilterTypes", () => {
  it("returns 5 types", () => {
    expect(activatedCarbonFilterTypes()).toHaveLength(5);
  });
});
