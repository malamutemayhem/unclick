import { describe, it, expect } from "vitest";
import {
  dewPoint, energyEff, airLoss, maintenance,
  caCost, lowDewPoint, forInstrumentAir, drying,
  bestUse, compressedAirDryerTypes,
} from "../compressed-air-dryer-calc.js";

describe("dewPoint", () => {
  it("desiccant heatless best dew point", () => {
    expect(dewPoint("desiccant_heatless")).toBeGreaterThan(dewPoint("refrigerated_cycling"));
  });
});

describe("energyEff", () => {
  it("deliquescent salt most energy efficient", () => {
    expect(energyEff("deliquescent_salt")).toBeGreaterThan(energyEff("desiccant_heatless"));
  });
});

describe("airLoss", () => {
  it("refrigerated cycling lowest air loss", () => {
    expect(airLoss("refrigerated_cycling")).toBeGreaterThan(airLoss("desiccant_heatless"));
  });
});

describe("maintenance", () => {
  it("membrane dryer lowest maintenance", () => {
    expect(maintenance("membrane_dryer")).toBeGreaterThan(maintenance("deliquescent_salt"));
  });
});

describe("caCost", () => {
  it("desiccant heated most expensive", () => {
    expect(caCost("desiccant_heated")).toBeGreaterThan(caCost("deliquescent_salt"));
  });
});

describe("lowDewPoint", () => {
  it("desiccant heatless is low dew point", () => {
    expect(lowDewPoint("desiccant_heatless")).toBe(true);
  });
  it("refrigerated cycling not low dew point", () => {
    expect(lowDewPoint("refrigerated_cycling")).toBe(false);
  });
});

describe("forInstrumentAir", () => {
  it("desiccant heated for instrument air", () => {
    expect(forInstrumentAir("desiccant_heated")).toBe(true);
  });
  it("membrane dryer not for instrument air", () => {
    expect(forInstrumentAir("membrane_dryer")).toBe(false);
  });
});

describe("drying", () => {
  it("membrane uses hollow fiber", () => {
    expect(drying("membrane_dryer")).toBe("hollow_fiber_membrane_sweep_air_permeation_moisture");
  });
});

describe("bestUse", () => {
  it("deliquescent for wellhead natural gas", () => {
    expect(bestUse("deliquescent_salt")).toBe("wellhead_natural_gas_remote_site_no_power_simple");
  });
});

describe("compressedAirDryerTypes", () => {
  it("returns 5 types", () => {
    expect(compressedAirDryerTypes()).toHaveLength(5);
  });
});
