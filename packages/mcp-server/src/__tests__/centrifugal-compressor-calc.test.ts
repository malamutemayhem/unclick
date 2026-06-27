import { describe, it, expect } from "vitest";
import {
  flowCapacity, pressureRatio, efficiency, reliability,
  ccCost, oilFree, forHighFlow, impeller,
  bestUse, centrifugalCompressorTypes,
} from "../centrifugal-compressor-calc.js";

describe("flowCapacity", () => {
  it("pipeline barrel highest flow", () => {
    expect(flowCapacity("pipeline_barrel_casing")).toBeGreaterThan(flowCapacity("single_stage_overhung"));
  });
});

describe("pressureRatio", () => {
  it("integrally geared highest pressure ratio", () => {
    expect(pressureRatio("integrally_geared")).toBeGreaterThan(pressureRatio("fan_type_low_pressure"));
  });
});

describe("efficiency", () => {
  it("integrally geared most efficient", () => {
    expect(efficiency("integrally_geared")).toBeGreaterThan(efficiency("fan_type_low_pressure"));
  });
});

describe("reliability", () => {
  it("pipeline barrel most reliable", () => {
    expect(reliability("pipeline_barrel_casing")).toBeGreaterThan(reliability("single_stage_overhung"));
  });
});

describe("ccCost", () => {
  it("pipeline barrel most expensive", () => {
    expect(ccCost("pipeline_barrel_casing")).toBeGreaterThan(ccCost("fan_type_low_pressure"));
  });
});

describe("oilFree", () => {
  it("all centrifugal compressors are oil free", () => {
    expect(oilFree("integrally_geared")).toBe(true);
  });
});

describe("forHighFlow", () => {
  it("multi stage for high flow", () => {
    expect(forHighFlow("multi_stage_inline")).toBe(true);
  });
  it("single stage not for high flow", () => {
    expect(forHighFlow("single_stage_overhung")).toBe(false);
  });
});

describe("impeller", () => {
  it("integrally geared uses bull gear pinion", () => {
    expect(impeller("integrally_geared")).toBe("bull_gear_pinion_multiple_stage_high_speed");
  });
});

describe("bestUse", () => {
  it("pipeline barrel for natural gas", () => {
    expect(bestUse("pipeline_barrel_casing")).toBe("natural_gas_pipeline_high_pressure_transport");
  });
});

describe("centrifugalCompressorTypes", () => {
  it("returns 5 types", () => {
    expect(centrifugalCompressorTypes()).toHaveLength(5);
  });
});
