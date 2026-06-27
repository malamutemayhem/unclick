import { describe, it, expect } from "vitest";
import {
  attenuation, neutronStop, structural, compactness,
  shCost, activationFree, forMedical, material,
  bestUse, shieldingTypes,
} from "../shielding-type-calc.js";

describe("attenuation", () => {
  it("tungsten best attenuation", () => {
    expect(attenuation("tungsten_alloy_compact")).toBeGreaterThan(attenuation("borated_poly_neutron"));
  });
});

describe("neutronStop", () => {
  it("borated poly best neutron stop", () => {
    expect(neutronStop("borated_poly_neutron")).toBeGreaterThan(neutronStop("lead_sheet_gamma"));
  });
});

describe("structural", () => {
  it("concrete best structural", () => {
    expect(structural("concrete_ordinary_gamma")).toBeGreaterThan(structural("water_pool_spent_fuel"));
  });
});

describe("compactness", () => {
  it("tungsten most compact", () => {
    expect(compactness("tungsten_alloy_compact")).toBeGreaterThan(compactness("water_pool_spent_fuel"));
  });
});

describe("shCost", () => {
  it("tungsten most expensive", () => {
    expect(shCost("tungsten_alloy_compact")).toBeGreaterThan(shCost("concrete_ordinary_gamma"));
  });
});

describe("activationFree", () => {
  it("borated poly is activation free", () => {
    expect(activationFree("borated_poly_neutron")).toBe(true);
  });
  it("lead not activation free", () => {
    expect(activationFree("lead_sheet_gamma")).toBe(false);
  });
});

describe("forMedical", () => {
  it("lead for medical", () => {
    expect(forMedical("lead_sheet_gamma")).toBe(true);
  });
  it("concrete not for medical", () => {
    expect(forMedical("concrete_ordinary_gamma")).toBe(false);
  });
});

describe("material", () => {
  it("water pool uses demineralized borated water", () => {
    expect(material("water_pool_spent_fuel")).toBe("demineralized_borated_water");
  });
});

describe("bestUse", () => {
  it("tungsten best for radiation therapy collimator", () => {
    expect(bestUse("tungsten_alloy_compact")).toBe("radiation_therapy_mlc_collimator");
  });
});

describe("shieldingTypes", () => {
  it("returns 5 types", () => {
    expect(shieldingTypes()).toHaveLength(5);
  });
});
