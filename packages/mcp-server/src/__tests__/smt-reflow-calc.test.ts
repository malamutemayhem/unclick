import { describe, it, expect } from "vitest";
import {
  thermalUniformity, throughput, profileControl, voidReduction,
  srCost, leadFree, forHighReliability, heating,
  bestUse, smtReflowTypes,
} from "../smt-reflow-calc.js";

describe("thermalUniformity", () => {
  it("vapor phase best thermal uniformity", () => {
    expect(thermalUniformity("vapor_phase")).toBeGreaterThan(thermalUniformity("infrared"));
  });
});

describe("throughput", () => {
  it("dual lane highest throughput", () => {
    expect(throughput("dual_lane")).toBeGreaterThan(throughput("vapor_phase"));
  });
});

describe("profileControl", () => {
  it("vapor phase best profile control", () => {
    expect(profileControl("vapor_phase")).toBeGreaterThan(profileControl("infrared"));
  });
});

describe("voidReduction", () => {
  it("vacuum reflow best void reduction", () => {
    expect(voidReduction("vacuum_reflow")).toBeGreaterThan(voidReduction("convection_inline"));
  });
});

describe("srCost", () => {
  it("vacuum reflow most expensive", () => {
    expect(srCost("vacuum_reflow")).toBeGreaterThan(srCost("infrared"));
  });
});

describe("leadFree", () => {
  it("all types are lead free capable", () => {
    expect(leadFree("convection_inline")).toBe(true);
    expect(leadFree("vapor_phase")).toBe(true);
  });
});

describe("forHighReliability", () => {
  it("vacuum reflow for high reliability", () => {
    expect(forHighReliability("vacuum_reflow")).toBe(true);
  });
  it("convection inline not for high reliability", () => {
    expect(forHighReliability("convection_inline")).toBe(false);
  });
});

describe("heating", () => {
  it("vapor phase uses fluorinated fluid", () => {
    expect(heating("vapor_phase")).toBe("fluorinated_fluid_boiling_point_condensation_heat_transfer");
  });
});

describe("bestUse", () => {
  it("dual lane for high mix dual product", () => {
    expect(bestUse("dual_lane")).toBe("high_mix_dual_product_simultaneous_run_maximum_utilization");
  });
});

describe("smtReflowTypes", () => {
  it("returns 5 types", () => {
    expect(smtReflowTypes()).toHaveLength(5);
  });
});
