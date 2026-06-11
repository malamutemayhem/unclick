import { describe, it, expect } from "vitest";
import {
  energyEfficiency, capacity, scalingHandle, flexibility,
  fcCost, vaporRecompress, forHighCapacity, method,
  bestUse, forcedCircEvapTypes,
} from "../forced-circ-evap-calc.js";

describe("energyEfficiency", () => {
  it("mvr most energy efficient", () => {
    expect(energyEfficiency("mvr_mechanical_vapor")).toBeGreaterThan(energyEfficiency("submerged_tube_standard"));
  });
});

describe("capacity", () => {
  it("flash evap highest capacity", () => {
    expect(capacity("flash_evap_multi_stage")).toBeGreaterThan(capacity("mvr_mechanical_vapor"));
  });
});

describe("scalingHandle", () => {
  it("submerged tube best scaling handling", () => {
    expect(scalingHandle("submerged_tube_standard")).toBeGreaterThan(scalingHandle("mvr_mechanical_vapor"));
  });
});

describe("flexibility", () => {
  it("mvr most flexible", () => {
    expect(flexibility("mvr_mechanical_vapor")).toBeGreaterThan(flexibility("flash_evap_multi_stage"));
  });
});

describe("fcCost", () => {
  it("flash evap most expensive", () => {
    expect(fcCost("flash_evap_multi_stage")).toBeGreaterThan(fcCost("submerged_tube_standard"));
  });
});

describe("vaporRecompress", () => {
  it("mvr uses vapor recompression", () => {
    expect(vaporRecompress("mvr_mechanical_vapor")).toBe(true);
  });
  it("submerged tube does not", () => {
    expect(vaporRecompress("submerged_tube_standard")).toBe(false);
  });
});

describe("forHighCapacity", () => {
  it("flash evap for high capacity", () => {
    expect(forHighCapacity("flash_evap_multi_stage")).toBe(true);
  });
  it("mvr not for high capacity", () => {
    expect(forHighCapacity("mvr_mechanical_vapor")).toBe(false);
  });
});

describe("method", () => {
  it("mvr uses mechanical compressor", () => {
    expect(method("mvr_mechanical_vapor")).toBe("mechanical_compressor_vapor_recompress");
  });
});

describe("bestUse", () => {
  it("multiple effect for pulp mill", () => {
    expect(bestUse("multiple_effect_cascade")).toBe("pulp_mill_black_liquor_sugar_refinery");
  });
});

describe("forcedCircEvapTypes", () => {
  it("returns 5 types", () => {
    expect(forcedCircEvapTypes()).toHaveLength(5);
  });
});
