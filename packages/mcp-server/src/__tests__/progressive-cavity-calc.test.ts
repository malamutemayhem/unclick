import { describe, it, expect } from "vitest";
import {
  flowSteadiness, viscosityRange, solidsHandling, selfPriming,
  pcCost, highPressure, forSludge, rotor,
  bestUse, progressiveCavityTypes,
} from "../progressive-cavity-calc.js";

describe("flowSteadiness", () => {
  it("dosing metering best flow steadiness", () => {
    expect(flowSteadiness("dosing_metering_prec")).toBeGreaterThan(flowSteadiness("open_hopper_feed"));
  });
});

describe("viscosityRange", () => {
  it("open hopper widest viscosity range", () => {
    expect(viscosityRange("open_hopper_feed")).toBeGreaterThan(viscosityRange("close_coupled_compact"));
  });
});

describe("solidsHandling", () => {
  it("open hopper best solids handling", () => {
    expect(solidsHandling("open_hopper_feed")).toBeGreaterThan(solidsHandling("dosing_metering_prec"));
  });
});

describe("selfPriming", () => {
  it("single stage best self priming", () => {
    expect(selfPriming("single_stage_standard")).toBeGreaterThan(selfPriming("dosing_metering_prec"));
  });
});

describe("pcCost", () => {
  it("multi stage most expensive", () => {
    expect(pcCost("multi_stage_high_press")).toBeGreaterThan(pcCost("close_coupled_compact"));
  });
});

describe("highPressure", () => {
  it("multi stage is high pressure", () => {
    expect(highPressure("multi_stage_high_press")).toBe(true);
  });
  it("single stage not high pressure", () => {
    expect(highPressure("single_stage_standard")).toBe(false);
  });
});

describe("forSludge", () => {
  it("single stage for sludge", () => {
    expect(forSludge("single_stage_standard")).toBe(true);
  });
  it("dosing metering not for sludge", () => {
    expect(forSludge("dosing_metering_prec")).toBe(false);
  });
});

describe("rotor", () => {
  it("close coupled uses compact footprint", () => {
    expect(rotor("close_coupled_compact")).toBe("close_coupled_motor_compact_footprint_rotor");
  });
});

describe("bestUse", () => {
  it("dosing metering for polymer dosing", () => {
    expect(bestUse("dosing_metering_prec")).toBe("polymer_dosing_flocculant_injection_precise");
  });
});

describe("progressiveCavityTypes", () => {
  it("returns 5 types", () => {
    expect(progressiveCavityTypes()).toHaveLength(5);
  });
});
