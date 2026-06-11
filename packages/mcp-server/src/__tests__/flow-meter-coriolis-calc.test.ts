import { describe, it, expect } from "vitest";
import {
  accuracy, densityMeas, pressureDrop, zeroStability,
  cmCost, massFlow, forCustody, tube,
  bestUse, flowMeterCoriolisTypes,
} from "../flow-meter-coriolis-calc.js";

describe("accuracy", () => {
  it("micro motion most accurate", () => {
    expect(accuracy("micro_motion_low_flow")).toBeGreaterThan(accuracy("dual_tube_high_flow"));
  });
});

describe("densityMeas", () => {
  it("micro motion best density measurement", () => {
    expect(densityMeas("micro_motion_low_flow")).toBeGreaterThan(densityMeas("straight_tube_hygienic"));
  });
});

describe("pressureDrop", () => {
  it("straight tube lowest pressure drop", () => {
    expect(pressureDrop("straight_tube_hygienic")).toBeGreaterThan(pressureDrop("micro_motion_low_flow"));
  });
});

describe("zeroStability", () => {
  it("micro motion best zero stability", () => {
    expect(zeroStability("micro_motion_low_flow")).toBeGreaterThan(zeroStability("dual_tube_high_flow"));
  });
});

describe("cmCost", () => {
  it("dual tube most expensive", () => {
    expect(cmCost("dual_tube_high_flow")).toBeGreaterThanOrEqual(cmCost("high_pressure_dense"));
  });
});

describe("massFlow", () => {
  it("all coriolis meters measure mass flow", () => {
    expect(massFlow("bent_tube_standard")).toBe(true);
  });
});

describe("forCustody", () => {
  it("bent tube for custody transfer", () => {
    expect(forCustody("bent_tube_standard")).toBe(true);
  });
  it("straight tube not for custody", () => {
    expect(forCustody("straight_tube_hygienic")).toBe(false);
  });
});

describe("tube", () => {
  it("straight tube uses sanitary tri clamp", () => {
    expect(tube("straight_tube_hygienic")).toBe("straight_tube_drainable_sanitary_tri_clamp");
  });
});

describe("bestUse", () => {
  it("micro motion for catalyst additive", () => {
    expect(bestUse("micro_motion_low_flow")).toBe("catalyst_additive_micro_dosing_lab_precision");
  });
});

describe("flowMeterCoriolisTypes", () => {
  it("returns 5 types", () => {
    expect(flowMeterCoriolisTypes()).toHaveLength(5);
  });
});
