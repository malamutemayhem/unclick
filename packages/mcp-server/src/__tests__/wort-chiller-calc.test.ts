import { describe, it, expect } from "vitest";
import {
  coolingSpeed, heatExchange, sanitization, waterEfficiency,
  wcCost, recirculating, forLargeBatch, chillerConfig,
  bestUse, wortChillerTypes,
} from "../wort-chiller-calc.js";

describe("coolingSpeed", () => {
  it("ice bank fastest cooling speed", () => {
    expect(coolingSpeed("ice_bank")).toBeGreaterThan(coolingSpeed("immersion_coil"));
  });
});

describe("heatExchange", () => {
  it("counterflow plate best heat exchange", () => {
    expect(heatExchange("counterflow_plate")).toBeGreaterThan(heatExchange("immersion_coil"));
  });
});

describe("sanitization", () => {
  it("immersion coil best sanitization", () => {
    expect(sanitization("immersion_coil")).toBeGreaterThan(sanitization("ice_bank"));
  });
});

describe("waterEfficiency", () => {
  it("glycol jacketed best water efficiency", () => {
    expect(waterEfficiency("glycol_jacketed")).toBeGreaterThan(waterEfficiency("immersion_coil"));
  });
});

describe("wcCost", () => {
  it("ice bank most expensive", () => {
    expect(wcCost("ice_bank")).toBeGreaterThan(wcCost("immersion_coil"));
  });
});

describe("recirculating", () => {
  it("glycol jacketed is recirculating", () => {
    expect(recirculating("glycol_jacketed")).toBe(true);
  });
  it("immersion coil not recirculating", () => {
    expect(recirculating("immersion_coil")).toBe(false);
  });
});

describe("forLargeBatch", () => {
  it("counterflow plate for large batch", () => {
    expect(forLargeBatch("counterflow_plate")).toBe(true);
  });
  it("immersion coil not for large batch", () => {
    expect(forLargeBatch("immersion_coil")).toBe(false);
  });
});

describe("chillerConfig", () => {
  it("shell tube uses tube bundle", () => {
    expect(chillerConfig("shell_tube")).toBe("shell_tube_bundle_wort_inside_coolant_outside_cip_cleanable");
  });
});

describe("bestUse", () => {
  it("glycol jacketed for fermentation temperature control", () => {
    expect(bestUse("glycol_jacketed")).toBe("fermentation_temperature_control_glycol_jacket_lager_ale_tank");
  });
});

describe("wortChillerTypes", () => {
  it("returns 5 types", () => {
    expect(wortChillerTypes()).toHaveLength(5);
  });
});
