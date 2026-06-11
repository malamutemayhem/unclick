import { describe, it, expect } from "vitest";
import {
  depth, loadCapacity, soilRange, vibration,
  caCost, dewatered, forDeep, method,
  bestUse, caissonTypeTypes,
} from "../caisson-type-calc.js";

describe("depth", () => {
  it("pneumatic deepest", () => {
    expect(depth("pneumatic_air_pressure")).toBeGreaterThan(depth("box_caisson_precast"));
  });
});

describe("loadCapacity", () => {
  it("drilled shaft highest capacity", () => {
    expect(loadCapacity("drilled_shaft_bored")).toBeGreaterThan(loadCapacity("box_caisson_precast"));
  });
});

describe("soilRange", () => {
  it("slurry wall widest soil range", () => {
    expect(soilRange("slurry_wall_diaphragm")).toBeGreaterThan(soilRange("box_caisson_precast"));
  });
});

describe("vibration", () => {
  it("slurry wall lowest vibration (highest score)", () => {
    expect(vibration("slurry_wall_diaphragm")).toBeGreaterThan(vibration("open_caisson_well"));
  });
});

describe("caCost", () => {
  it("pneumatic most expensive", () => {
    expect(caCost("pneumatic_air_pressure")).toBeGreaterThan(caCost("box_caisson_precast"));
  });
});

describe("dewatered", () => {
  it("pneumatic is dewatered", () => {
    expect(dewatered("pneumatic_air_pressure")).toBe(true);
  });
  it("drilled shaft not dewatered", () => {
    expect(dewatered("drilled_shaft_bored")).toBe(false);
  });
});

describe("forDeep", () => {
  it("pneumatic for deep", () => {
    expect(forDeep("pneumatic_air_pressure")).toBe(true);
  });
  it("box caisson not for deep", () => {
    expect(forDeep("box_caisson_precast")).toBe(false);
  });
});

describe("method", () => {
  it("slurry wall uses bentonite", () => {
    expect(method("slurry_wall_diaphragm")).toBe("bentonite_slurry_panel_excavate");
  });
});

describe("bestUse", () => {
  it("box caisson for marine", () => {
    expect(bestUse("box_caisson_precast")).toBe("marine_wharf_shallow_water");
  });
});

describe("caissonTypeTypes", () => {
  it("returns 5 types", () => {
    expect(caissonTypeTypes()).toHaveLength(5);
  });
});
