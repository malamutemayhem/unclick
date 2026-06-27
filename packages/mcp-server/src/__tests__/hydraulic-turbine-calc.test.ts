import { describe, it, expect } from "vitest";
import {
  efficiency, headRange, flowRange, partLoadEff,
  htCost, impulse, forHighHead, runner,
  bestUse, hydraulicTurbineTypes,
} from "../hydraulic-turbine-calc.js";

describe("efficiency", () => {
  it("francis most efficient", () => {
    expect(efficiency("francis_mixed_flow")).toBeGreaterThan(efficiency("crossflow_banki_michell"));
  });
});

describe("headRange", () => {
  it("pelton wheel widest head range", () => {
    expect(headRange("pelton_wheel_impulse")).toBeGreaterThan(headRange("kaplan_axial_prop"));
  });
});

describe("flowRange", () => {
  it("kaplan widest flow range", () => {
    expect(flowRange("kaplan_axial_prop")).toBeGreaterThan(flowRange("pelton_wheel_impulse"));
  });
});

describe("partLoadEff", () => {
  it("crossflow best part load efficiency", () => {
    expect(partLoadEff("crossflow_banki_michell")).toBeGreaterThan(partLoadEff("francis_mixed_flow"));
  });
});

describe("htCost", () => {
  it("kaplan most expensive", () => {
    expect(htCost("kaplan_axial_prop")).toBeGreaterThan(htCost("crossflow_banki_michell"));
  });
});

describe("impulse", () => {
  it("pelton wheel is impulse", () => {
    expect(impulse("pelton_wheel_impulse")).toBe(true);
  });
  it("francis is not impulse", () => {
    expect(impulse("francis_mixed_flow")).toBe(false);
  });
});

describe("forHighHead", () => {
  it("pelton wheel for high head", () => {
    expect(forHighHead("pelton_wheel_impulse")).toBe(true);
  });
  it("kaplan not for high head", () => {
    expect(forHighHead("kaplan_axial_prop")).toBe(false);
  });
});

describe("runner", () => {
  it("francis uses curved vane runner", () => {
    expect(runner("francis_mixed_flow")).toBe("curved_vane_runner_radial_to_axial_flow");
  });
});

describe("bestUse", () => {
  it("crossflow for micro hydro", () => {
    expect(bestUse("crossflow_banki_michell")).toBe("micro_hydro_developing_region_simple_robust");
  });
});

describe("hydraulicTurbineTypes", () => {
  it("returns 5 types", () => {
    expect(hydraulicTurbineTypes()).toHaveLength(5);
  });
});
