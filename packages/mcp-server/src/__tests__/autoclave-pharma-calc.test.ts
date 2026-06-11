import { describe, it, expect } from "vitest";
import {
  sterilizationEfficiency, throughput, temperatureUniformity, cycleSpeed,
  apCost, forLiquid, forHeatSensitive, autoclaveConfig,
  bestUse, autoclavePharmaTypes,
} from "../autoclave-pharma-calc.js";

describe("sterilizationEfficiency", () => {
  it("prevacuum pulsing best sterilization efficiency", () => {
    expect(sterilizationEfficiency("prevacuum_pulsing")).toBeGreaterThan(sterilizationEfficiency("gravity_displacement"));
  });
});

describe("throughput", () => {
  it("prevacuum pulsing highest throughput", () => {
    expect(throughput("prevacuum_pulsing")).toBeGreaterThan(throughput("ethylene_oxide"));
  });
});

describe("temperatureUniformity", () => {
  it("prevacuum pulsing best temperature uniformity", () => {
    expect(temperatureUniformity("prevacuum_pulsing")).toBeGreaterThan(temperatureUniformity("gravity_displacement"));
  });
});

describe("cycleSpeed", () => {
  it("prevacuum pulsing fastest cycle", () => {
    expect(cycleSpeed("prevacuum_pulsing")).toBeGreaterThan(cycleSpeed("ethylene_oxide"));
  });
});

describe("apCost", () => {
  it("ethylene oxide most expensive", () => {
    expect(apCost("ethylene_oxide")).toBeGreaterThan(apCost("gravity_displacement"));
  });
});

describe("forLiquid", () => {
  it("steam air mixture for liquid", () => {
    expect(forLiquid("steam_air_mixture")).toBe(true);
  });
  it("prevacuum pulsing not for liquid", () => {
    expect(forLiquid("prevacuum_pulsing")).toBe(false);
  });
});

describe("forHeatSensitive", () => {
  it("ethylene oxide for heat sensitive", () => {
    expect(forHeatSensitive("ethylene_oxide")).toBe(true);
  });
  it("gravity displacement not for heat sensitive", () => {
    expect(forHeatSensitive("gravity_displacement")).toBe(false);
  });
});

describe("autoclaveConfig", () => {
  it("superheated water uses cascade spray uniform heat liquid", () => {
    expect(autoclaveConfig("superheated_water")).toBe("superheated_water_autoclave_cascade_spray_uniform_heat_liquid");
  });
});

describe("bestUse", () => {
  it("prevacuum pulsing for pharma gmp porous load surgical pack rapid", () => {
    expect(bestUse("prevacuum_pulsing")).toBe("pharma_gmp_prevacuum_autoclave_porous_load_surgical_pack_rapid");
  });
});

describe("autoclavePharmaTypes", () => {
  it("returns 5 types", () => {
    expect(autoclavePharmaTypes()).toHaveLength(5);
  });
});
