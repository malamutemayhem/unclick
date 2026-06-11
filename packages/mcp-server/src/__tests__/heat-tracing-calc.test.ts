import { describe, it, expect } from "vitest";
import {
  tempMaintain, energyEff, installEase, reliability,
  htCost, electric, forLongPipe, method,
  bestUse, heatTracingTypes,
} from "../heat-tracing-calc.js";

describe("tempMaintain", () => {
  it("impedance heating best temp maintain", () => {
    expect(tempMaintain("impedance_heating")).toBeGreaterThan(tempMaintain("self_regulating_elec"));
  });
});

describe("energyEff", () => {
  it("self regulating most energy efficient", () => {
    expect(energyEff("self_regulating_elec")).toBeGreaterThan(energyEff("steam_tracing_tube"));
  });
});

describe("installEase", () => {
  it("self regulating easiest install", () => {
    expect(installEase("self_regulating_elec")).toBeGreaterThan(installEase("impedance_heating"));
  });
});

describe("reliability", () => {
  it("constant watt mineral most reliable", () => {
    expect(reliability("constant_watt_mineral")).toBeGreaterThanOrEqual(reliability("skin_effect_pipeline"));
  });
});

describe("htCost", () => {
  it("impedance heating most expensive", () => {
    expect(htCost("impedance_heating")).toBeGreaterThan(htCost("steam_tracing_tube"));
  });
});

describe("electric", () => {
  it("self regulating is electric", () => {
    expect(electric("self_regulating_elec")).toBe(true);
  });
  it("steam tracing not electric", () => {
    expect(electric("steam_tracing_tube")).toBe(false);
  });
});

describe("forLongPipe", () => {
  it("skin effect for long pipe", () => {
    expect(forLongPipe("skin_effect_pipeline")).toBe(true);
  });
  it("self regulating not for long pipe", () => {
    expect(forLongPipe("self_regulating_elec")).toBe(false);
  });
});

describe("method", () => {
  it("steam tracing uses copper or steel tubing", () => {
    expect(method("steam_tracing_tube")).toBe("copper_or_steel_tubing_steam_condensate_return");
  });
});

describe("bestUse", () => {
  it("impedance heating for subsea pipeline", () => {
    expect(bestUse("impedance_heating")).toBe("subsea_pipeline_extreme_cold_high_watt_density");
  });
});

describe("heatTracingTypes", () => {
  it("returns 5 types", () => {
    expect(heatTracingTypes()).toHaveLength(5);
  });
});
