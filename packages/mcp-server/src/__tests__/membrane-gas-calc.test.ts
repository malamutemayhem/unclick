import { describe, it, expect } from "vitest";
import {
  selectivity, permeability, durability, scalability,
  mgCost, continuous, forH2, membrane,
  bestUse, membraneGasTypes,
} from "../membrane-gas-calc.js";

describe("selectivity", () => {
  it("palladium hydrogen most selective", () => {
    expect(selectivity("palladium_hydrogen_select")).toBeGreaterThan(selectivity("polymeric_hollow_fiber"));
  });
});

describe("permeability", () => {
  it("facilitated transport highest permeability", () => {
    expect(permeability("facilitated_transport")).toBeGreaterThan(permeability("palladium_hydrogen_select"));
  });
});

describe("durability", () => {
  it("ceramic tubular most durable", () => {
    expect(durability("ceramic_tubular_high_temp")).toBeGreaterThan(durability("facilitated_transport"));
  });
});

describe("scalability", () => {
  it("polymeric hollow fiber most scalable", () => {
    expect(scalability("polymeric_hollow_fiber")).toBeGreaterThan(scalability("palladium_hydrogen_select"));
  });
});

describe("mgCost", () => {
  it("palladium hydrogen most expensive", () => {
    expect(mgCost("palladium_hydrogen_select")).toBeGreaterThan(mgCost("polymeric_hollow_fiber"));
  });
});

describe("continuous", () => {
  it("all membrane gas types are continuous", () => {
    expect(continuous("polymeric_hollow_fiber")).toBe(true);
    expect(continuous("palladium_hydrogen_select")).toBe(true);
  });
});

describe("forH2", () => {
  it("palladium for hydrogen", () => {
    expect(forH2("palladium_hydrogen_select")).toBe(true);
  });
  it("polymeric not for hydrogen", () => {
    expect(forH2("polymeric_hollow_fiber")).toBe(false);
  });
});

describe("membrane", () => {
  it("carbon molecular sieve uses pyrolyzed polymer", () => {
    expect(membrane("carbon_molecular_sieve")).toBe("pyrolyzed_polymer_carbon_pore_sieve");
  });
});

describe("bestUse", () => {
  it("facilitated transport for co2 capture", () => {
    expect(bestUse("facilitated_transport")).toBe("co2_capture_flue_gas_enhanced_select");
  });
});

describe("membraneGasTypes", () => {
  it("returns 5 types", () => {
    expect(membraneGasTypes()).toHaveLength(5);
  });
});
