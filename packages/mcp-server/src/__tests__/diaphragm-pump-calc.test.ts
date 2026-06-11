import { describe, it, expect } from "vitest";
import {
  flow, pressure, dryRun, selfPrime,
  dpCost, sealless, forChemical, material,
  bestUse, diaphragmPumpTypes,
} from "../diaphragm-pump-calc.js";

describe("flow", () => {
  it("air operated highest flow", () => {
    expect(flow("air_operated_double")).toBeGreaterThan(flow("metering_solenoid_driven"));
  });
});

describe("pressure", () => {
  it("hydraulic highest pressure", () => {
    expect(pressure("hydraulic_high_pressure")).toBeGreaterThan(pressure("air_operated_double"));
  });
});

describe("dryRun", () => {
  it("air operated best dry run", () => {
    expect(dryRun("air_operated_double")).toBeGreaterThan(dryRun("hydraulic_high_pressure"));
  });
});

describe("selfPrime", () => {
  it("air operated best self prime", () => {
    expect(selfPrime("air_operated_double")).toBeGreaterThan(selfPrime("hydraulic_high_pressure"));
  });
});

describe("dpCost", () => {
  it("hydraulic most expensive", () => {
    expect(dpCost("hydraulic_high_pressure")).toBeGreaterThan(dpCost("metering_solenoid_driven"));
  });
});

describe("sealless", () => {
  it("air operated is sealless", () => {
    expect(sealless("air_operated_double")).toBe(true);
  });
  it("hydraulic not sealless", () => {
    expect(sealless("hydraulic_high_pressure")).toBe(false);
  });
});

describe("forChemical", () => {
  it("air operated for chemical", () => {
    expect(forChemical("air_operated_double")).toBe(true);
  });
  it("electric not chemical", () => {
    expect(forChemical("electric_single_diaphragm")).toBe(false);
  });
});

describe("material", () => {
  it("sanitary uses full ptfe", () => {
    expect(material("sanitary_ptfe_lined")).toBe("full_ptfe_wetted_fda_compliant");
  });
});

describe("bestUse", () => {
  it("metering for precision dosing", () => {
    expect(bestUse("metering_solenoid_driven")).toBe("precision_chemical_metering");
  });
});

describe("diaphragmPumpTypes", () => {
  it("returns 5 types", () => {
    expect(diaphragmPumpTypes()).toHaveLength(5);
  });
});
