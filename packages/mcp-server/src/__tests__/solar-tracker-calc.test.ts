import { describe, it, expect } from "vitest";
import {
  gain, reliability, windResist, maintenance,
  stCost, motorized, forUtility, drive,
  bestUse, solarTrackerTypes,
} from "../solar-tracker-calc.js";

describe("gain", () => {
  it("dual axis highest gain", () => {
    expect(gain("dual_axis_pedestal")).toBeGreaterThan(gain("passive_thermal_tracker"));
  });
});

describe("reliability", () => {
  it("passive most reliable", () => {
    expect(reliability("passive_thermal_tracker")).toBeGreaterThan(reliability("dual_axis_pedestal"));
  });
});

describe("windResist", () => {
  it("passive best wind resistance", () => {
    expect(windResist("passive_thermal_tracker")).toBeGreaterThan(windResist("dual_axis_pedestal"));
  });
});

describe("maintenance", () => {
  it("passive lowest maintenance", () => {
    expect(maintenance("passive_thermal_tracker")).toBeGreaterThan(maintenance("dual_axis_pedestal"));
  });
});

describe("stCost", () => {
  it("concentrated most expensive", () => {
    expect(stCost("concentrated_parabolic")).toBeGreaterThan(stCost("passive_thermal_tracker"));
  });
});

describe("motorized", () => {
  it("single axis is motorized", () => {
    expect(motorized("single_axis_horizontal")).toBe(true);
  });
  it("passive not motorized", () => {
    expect(motorized("passive_thermal_tracker")).toBe(false);
  });
});

describe("forUtility", () => {
  it("single axis for utility", () => {
    expect(forUtility("single_axis_horizontal")).toBe(true);
  });
  it("dual axis not utility", () => {
    expect(forUtility("dual_axis_pedestal")).toBe(false);
  });
});

describe("drive", () => {
  it("passive uses thermal expansion", () => {
    expect(drive("passive_thermal_tracker")).toBe("thermal_fluid_expansion_gravity");
  });
});

describe("bestUse", () => {
  it("single axis for utility scale", () => {
    expect(bestUse("single_axis_horizontal")).toBe("utility_scale_flat_terrain");
  });
});

describe("solarTrackerTypes", () => {
  it("returns 5 types", () => {
    expect(solarTrackerTypes()).toHaveLength(5);
  });
});
