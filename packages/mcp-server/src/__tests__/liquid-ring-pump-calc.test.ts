import { describe, it, expect } from "vitest";
import {
  vacuumDepth, throughput, gasHandling, sealLiquidUse,
  lrCost, isothermal, forChemical, pumpConfig,
  bestUse, liquidRingPumpTypes,
} from "../liquid-ring-pump-calc.js";

describe("vacuumDepth", () => {
  it("hybrid lr best vacuum depth", () => {
    expect(vacuumDepth("hybrid_lr")).toBeGreaterThan(vacuumDepth("compressor_lr"));
  });
});

describe("throughput", () => {
  it("single stage highest throughput", () => {
    expect(throughput("single_stage_lr")).toBeGreaterThan(throughput("hybrid_lr"));
  });
});

describe("gasHandling", () => {
  it("compressor lr best gas handling", () => {
    expect(gasHandling("compressor_lr")).toBeGreaterThan(gasHandling("recirculate_lr"));
  });
});

describe("sealLiquidUse", () => {
  it("recirculate lr highest seal liquid use (conserves)", () => {
    expect(sealLiquidUse("recirculate_lr")).toBeGreaterThan(sealLiquidUse("hybrid_lr"));
  });
});

describe("lrCost", () => {
  it("hybrid lr most expensive", () => {
    expect(lrCost("hybrid_lr")).toBeGreaterThan(lrCost("single_stage_lr"));
  });
});

describe("isothermal", () => {
  it("single stage is isothermal", () => {
    expect(isothermal("single_stage_lr")).toBe(true);
  });
  it("all types are isothermal", () => {
    expect(isothermal("hybrid_lr")).toBe(true);
  });
});

describe("forChemical", () => {
  it("single stage for chemical", () => {
    expect(forChemical("single_stage_lr")).toBe(true);
  });
  it("recirculate not for chemical", () => {
    expect(forChemical("recirculate_lr")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("two stage uses dual impeller deeper vacuum series", () => {
    expect(pumpConfig("two_stage_lr")).toBe("two_stage_lr_liquid_ring_pump_dual_impeller_deeper_vacuum_series");
  });
});

describe("bestUse", () => {
  it("compressor lr for flare gas recover gas boost press", () => {
    expect(bestUse("compressor_lr")).toBe("flare_gas_compressor_lr_liquid_ring_pump_recover_gas_boost_press");
  });
});

describe("liquidRingPumpTypes", () => {
  it("returns 5 types", () => {
    expect(liquidRingPumpTypes()).toHaveLength(5);
  });
});
