import { describe, it, expect } from "vitest";
import {
  flow, pressure, efficiency, selfPriming,
  pmCost, sealless, forViscous, mechanism,
  bestUse, pumpTypes,
} from "../pump-type-calc.js";

describe("flow", () => {
  it("centrifugal highest flow", () => {
    expect(flow("centrifugal_radial_impeller")).toBeGreaterThan(flow("positive_disp_peristaltic"));
  });
});

describe("pressure", () => {
  it("submersible highest pressure", () => {
    expect(pressure("submersible_deep_well")).toBeGreaterThan(pressure("diaphragm_air_operated"));
  });
});

describe("efficiency", () => {
  it("centrifugal most efficient", () => {
    expect(efficiency("centrifugal_radial_impeller")).toBeGreaterThan(efficiency("diaphragm_air_operated"));
  });
});

describe("selfPriming", () => {
  it("peristaltic best self priming", () => {
    expect(selfPriming("positive_disp_peristaltic")).toBeGreaterThan(selfPriming("centrifugal_radial_impeller"));
  });
});

describe("pmCost", () => {
  it("gear most expensive", () => {
    expect(pmCost("positive_disp_gear")).toBeGreaterThan(pmCost("diaphragm_air_operated"));
  });
});

describe("sealless", () => {
  it("peristaltic is sealless", () => {
    expect(sealless("positive_disp_peristaltic")).toBe(true);
  });
  it("centrifugal not sealless", () => {
    expect(sealless("centrifugal_radial_impeller")).toBe(false);
  });
});

describe("forViscous", () => {
  it("gear for viscous", () => {
    expect(forViscous("positive_disp_gear")).toBe(true);
  });
  it("centrifugal not for viscous", () => {
    expect(forViscous("centrifugal_radial_impeller")).toBe(false);
  });
});

describe("mechanism", () => {
  it("peristaltic uses roller squeeze flexible tube", () => {
    expect(mechanism("positive_disp_peristaltic")).toBe("roller_squeeze_flexible_tube");
  });
});

describe("bestUse", () => {
  it("submersible best for borehole groundwater", () => {
    expect(bestUse("submersible_deep_well")).toBe("borehole_groundwater_extract");
  });
});

describe("pumpTypes", () => {
  it("returns 5 types", () => {
    expect(pumpTypes()).toHaveLength(5);
  });
});
