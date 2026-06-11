import { describe, it, expect } from "vitest";
import {
  range, sensitivity, maintenance, falseAlarm,
  bdCost, selfAligning, forHighCeiling, optics,
  bestUse, beamDetectorTypes,
} from "../beam-detector-calc.js";

describe("range", () => {
  it("linear heat longest range", () => {
    expect(range("linear_heat_fiber")).toBeGreaterThan(range("conventional_reflective"));
  });
});

describe("sensitivity", () => {
  it("open path most sensitive", () => {
    expect(sensitivity("open_path_ir_gas")).toBeGreaterThan(sensitivity("conventional_reflective"));
  });
});

describe("maintenance", () => {
  it("addressable lowest maintenance", () => {
    expect(maintenance("addressable_motorized")).toBeGreaterThan(maintenance("projected_beam_long_range"));
  });
});

describe("falseAlarm", () => {
  it("linear heat fewest false alarms", () => {
    expect(falseAlarm("linear_heat_fiber")).toBeGreaterThan(falseAlarm("conventional_reflective"));
  });
});

describe("bdCost", () => {
  it("open path most expensive", () => {
    expect(bdCost("open_path_ir_gas")).toBeGreaterThan(bdCost("conventional_reflective"));
  });
});

describe("selfAligning", () => {
  it("addressable is self aligning", () => {
    expect(selfAligning("addressable_motorized")).toBe(true);
  });
  it("conventional not self aligning", () => {
    expect(selfAligning("conventional_reflective")).toBe(false);
  });
});

describe("forHighCeiling", () => {
  it("projected beam for high ceiling", () => {
    expect(forHighCeiling("projected_beam_long_range")).toBe(true);
  });
  it("linear heat not high ceiling", () => {
    expect(forHighCeiling("linear_heat_fiber")).toBe(false);
  });
});

describe("optics", () => {
  it("linear heat uses fiber raman", () => {
    expect(optics("linear_heat_fiber")).toBe("fiber_optic_raman_dts_cable");
  });
});

describe("bestUse", () => {
  it("open path for petrochemical", () => {
    expect(bestUse("open_path_ir_gas")).toBe("petrochemical_gas_leak_detect");
  });
});

describe("beamDetectorTypes", () => {
  it("returns 5 types", () => {
    expect(beamDetectorTypes()).toHaveLength(5);
  });
});
