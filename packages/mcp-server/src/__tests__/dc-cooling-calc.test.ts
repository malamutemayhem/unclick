import { describe, it, expect } from "vitest";
import {
  capacity, pue, density, reliability,
  coolCost, waterless, forAiRack, medium,
  bestUse, dcCoolings,
} from "../dc-cooling-calc.js";

describe("capacity", () => {
  it("immersion two phase highest capacity", () => {
    expect(capacity("immersion_two_phase")).toBeGreaterThan(capacity("air_crah_raised_floor"));
  });
});

describe("pue", () => {
  it("immersion two phase best pue", () => {
    expect(pue("immersion_two_phase")).toBeGreaterThan(pue("air_crah_raised_floor"));
  });
});

describe("density", () => {
  it("immersion two phase highest density", () => {
    expect(density("immersion_two_phase")).toBeGreaterThan(density("air_crah_raised_floor"));
  });
});

describe("reliability", () => {
  it("air crah raised floor most reliable", () => {
    expect(reliability("air_crah_raised_floor")).toBeGreaterThan(reliability("immersion_two_phase"));
  });
});

describe("coolCost", () => {
  it("immersion two phase most expensive", () => {
    expect(coolCost("immersion_two_phase")).toBeGreaterThan(coolCost("air_crah_raised_floor"));
  });
});

describe("waterless", () => {
  it("immersion single phase is waterless", () => {
    expect(waterless("immersion_single_phase")).toBe(true);
  });
  it("direct liquid cold plate not waterless", () => {
    expect(waterless("direct_liquid_cold_plate")).toBe(false);
  });
});

describe("forAiRack", () => {
  it("direct liquid cold plate is for ai rack", () => {
    expect(forAiRack("direct_liquid_cold_plate")).toBe(true);
  });
  it("air crah raised floor not for ai rack", () => {
    expect(forAiRack("air_crah_raised_floor")).toBe(false);
  });
});

describe("medium", () => {
  it("immersion two phase uses fluorocarbon boil condense", () => {
    expect(medium("immersion_two_phase")).toBe("fluorocarbon_boil_condense");
  });
});

describe("bestUse", () => {
  it("direct liquid cold plate best for gpu cluster 100kw rack", () => {
    expect(bestUse("direct_liquid_cold_plate")).toBe("gpu_cluster_100kw_rack");
  });
});

describe("dcCoolings", () => {
  it("returns 5 types", () => {
    expect(dcCoolings()).toHaveLength(5);
  });
});
