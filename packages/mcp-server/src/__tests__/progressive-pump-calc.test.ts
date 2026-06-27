import { describe, it, expect } from "vitest";
import {
  flowSteady, throughput, viscosityRange, selfPriming,
  ppCost, gentleFlow, forAbrasive, pumpConfig,
  bestUse, progressivePumpTypes,
} from "../progressive-pump-calc.js";

describe("flowSteady", () => {
  it("metering pc best flow steady", () => {
    expect(flowSteady("metering_pc")).toBeGreaterThan(flowSteady("bridgebreaker_pc"));
  });
});

describe("throughput", () => {
  it("open hopper highest throughput", () => {
    expect(throughput("open_hopper_pc")).toBeGreaterThan(throughput("metering_pc"));
  });
});

describe("viscosityRange", () => {
  it("open hopper best viscosity range", () => {
    expect(viscosityRange("open_hopper_pc")).toBeGreaterThan(viscosityRange("metering_pc"));
  });
});

describe("selfPriming", () => {
  it("standard pc best self priming", () => {
    expect(selfPriming("standard_pc")).toBeGreaterThan(selfPriming("bridgebreaker_pc"));
  });
});

describe("ppCost", () => {
  it("hygienic pc most expensive", () => {
    expect(ppCost("hygienic_pc")).toBeGreaterThan(ppCost("standard_pc"));
  });
});

describe("gentleFlow", () => {
  it("standard pc has gentle flow", () => {
    expect(gentleFlow("standard_pc")).toBe(true);
  });
  it("bridgebreaker no gentle flow", () => {
    expect(gentleFlow("bridgebreaker_pc")).toBe(false);
  });
});

describe("forAbrasive", () => {
  it("bridgebreaker for abrasive", () => {
    expect(forAbrasive("bridgebreaker_pc")).toBe(true);
  });
  it("standard pc not for abrasive", () => {
    expect(forAbrasive("standard_pc")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("hygienic pc uses tri clamp polish cip dairy grade", () => {
    expect(pumpConfig("hygienic_pc")).toBe("hygienic_pc_progressive_pump_tri_clamp_polish_cip_dairy_grade");
  });
});

describe("bestUse", () => {
  it("metering pc for polymer dose precise rate inject", () => {
    expect(bestUse("metering_pc")).toBe("polymer_dose_metering_pc_progressive_pump_precise_rate_inject");
  });
});

describe("progressivePumpTypes", () => {
  it("returns 5 types", () => {
    expect(progressivePumpTypes()).toHaveLength(5);
  });
});
