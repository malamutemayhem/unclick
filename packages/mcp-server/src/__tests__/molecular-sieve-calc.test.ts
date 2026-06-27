import { describe, it, expect } from "vitest";
import {
  selectivity, capacity, regeneration, lifetime,
  msCost, pressureSwing, forDehydration, poreSize,
  bestUse, molecularSieveTypes,
} from "../molecular-sieve-calc.js";

describe("selectivity", () => {
  it("zeolite 3a most selective", () => {
    expect(selectivity("zeolite_3a_water")).toBeGreaterThan(selectivity("zeolite_13x_aromatic"));
  });
});

describe("capacity", () => {
  it("zeolite 13x highest capacity", () => {
    expect(capacity("zeolite_13x_aromatic")).toBeGreaterThan(capacity("carbon_molecular_sieve"));
  });
});

describe("regeneration", () => {
  it("carbon molecular sieve easiest regeneration", () => {
    expect(regeneration("carbon_molecular_sieve")).toBeGreaterThan(regeneration("zeolite_13x_aromatic"));
  });
});

describe("lifetime", () => {
  it("carbon molecular sieve longest lifetime", () => {
    expect(lifetime("carbon_molecular_sieve")).toBeGreaterThan(lifetime("zeolite_13x_aromatic"));
  });
});

describe("msCost", () => {
  it("zeolite 13x more expensive than 4a", () => {
    expect(msCost("zeolite_13x_aromatic")).toBeGreaterThan(msCost("zeolite_4a_general"));
  });
});

describe("pressureSwing", () => {
  it("zeolite 4a supports pressure swing", () => {
    expect(pressureSwing("zeolite_4a_general")).toBe(true);
  });
  it("zeolite 3a does not use pressure swing", () => {
    expect(pressureSwing("zeolite_3a_water")).toBe(false);
  });
});

describe("forDehydration", () => {
  it("zeolite 3a for dehydration", () => {
    expect(forDehydration("zeolite_3a_water")).toBe(true);
  });
  it("carbon molecular sieve not for dehydration", () => {
    expect(forDehydration("carbon_molecular_sieve")).toBe(false);
  });
});

describe("poreSize", () => {
  it("zeolite 4a has 4 angstrom pore", () => {
    expect(poreSize("zeolite_4a_general")).toBe("4_angstrom_admits_water_h2s_co2");
  });
});

describe("bestUse", () => {
  it("carbon molecular sieve for nitrogen generation", () => {
    expect(bestUse("carbon_molecular_sieve")).toBe("nitrogen_generation_psa_from_air_high_pur");
  });
});

describe("molecularSieveTypes", () => {
  it("returns 5 types", () => {
    expect(molecularSieveTypes()).toHaveLength(5);
  });
});
