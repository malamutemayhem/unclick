import { describe, it, expect } from "vitest";
import {
  output, depth, precision, mobility,
  drCost, selfPropelled, forCapital, method,
  bestUse, dredgeTypes,
} from "../dredge-type-calc.js";

describe("output", () => {
  it("cutter suction highest output", () => {
    expect(output("cutter_suction_hydraulic")).toBeGreaterThan(output("grab_clamshell_crane"));
  });
});

describe("depth", () => {
  it("grab crane deepest", () => {
    expect(depth("grab_clamshell_crane")).toBeGreaterThan(depth("water_injection_agitation"));
  });
});

describe("precision", () => {
  it("bucket ladder most precise", () => {
    expect(precision("bucket_ladder_mechanical")).toBeGreaterThan(precision("water_injection_agitation"));
  });
});

describe("mobility", () => {
  it("trailing hopper most mobile", () => {
    expect(mobility("trailing_suction_hopper")).toBeGreaterThan(mobility("cutter_suction_hydraulic"));
  });
});

describe("drCost", () => {
  it("trailing hopper most expensive", () => {
    expect(drCost("trailing_suction_hopper")).toBeGreaterThan(drCost("water_injection_agitation"));
  });
});

describe("selfPropelled", () => {
  it("trailing hopper is self propelled", () => {
    expect(selfPropelled("trailing_suction_hopper")).toBe(true);
  });
  it("cutter suction not self propelled", () => {
    expect(selfPropelled("cutter_suction_hydraulic")).toBe(false);
  });
});

describe("forCapital", () => {
  it("cutter suction for capital dredging", () => {
    expect(forCapital("cutter_suction_hydraulic")).toBe(true);
  });
  it("grab not for capital", () => {
    expect(forCapital("grab_clamshell_crane")).toBe(false);
  });
});

describe("method", () => {
  it("water injection uses low pressure jet", () => {
    expect(method("water_injection_agitation")).toBe("low_pressure_water_jet_fluidize");
  });
});

describe("bestUse", () => {
  it("cutter suction for channel deepening", () => {
    expect(bestUse("cutter_suction_hydraulic")).toBe("channel_deepening_land_reclaim");
  });
});

describe("dredgeTypes", () => {
  it("returns 5 types", () => {
    expect(dredgeTypes()).toHaveLength(5);
  });
});
