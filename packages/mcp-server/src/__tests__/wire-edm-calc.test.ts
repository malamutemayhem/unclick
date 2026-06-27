import { describe, it, expect } from "vitest";
import {
  cutSpeed, precision, surfaceFinish, thicknessCapacity,
  weCost, submerged, forMicro, cutting,
  bestUse, wireEdmTypes,
} from "../wire-edm-calc.js";

describe("cutSpeed", () => {
  it("high speed molybdenum fastest", () => {
    expect(cutSpeed("high_speed_molybdenum")).toBeGreaterThan(cutSpeed("fine_wire_micro"));
  });
});

describe("precision", () => {
  it("fine wire micro most precise", () => {
    expect(precision("fine_wire_micro")).toBeGreaterThan(precision("high_speed_molybdenum"));
  });
});

describe("surfaceFinish", () => {
  it("fine wire micro best surface finish", () => {
    expect(surfaceFinish("fine_wire_micro")).toBeGreaterThan(surfaceFinish("high_speed_molybdenum"));
  });
});

describe("thicknessCapacity", () => {
  it("submerged flush highest thickness capacity", () => {
    expect(thicknessCapacity("submerged_flush")).toBeGreaterThan(thicknessCapacity("fine_wire_micro"));
  });
});

describe("weCost", () => {
  it("fine wire micro most expensive", () => {
    expect(weCost("fine_wire_micro")).toBeGreaterThan(weCost("high_speed_molybdenum"));
  });
});

describe("submerged", () => {
  it("submerged flush is submerged", () => {
    expect(submerged("submerged_flush")).toBe(true);
  });
  it("standard brass wire not submerged", () => {
    expect(submerged("standard_brass_wire")).toBe(false);
  });
});

describe("forMicro", () => {
  it("fine wire micro for micro", () => {
    expect(forMicro("fine_wire_micro")).toBe(true);
  });
  it("standard brass wire not for micro", () => {
    expect(forMicro("standard_brass_wire")).toBe(false);
  });
});

describe("cutting", () => {
  it("taper cutting uses uv axis", () => {
    expect(cutting("taper_cutting")).toBe("uv_axis_taper_angle_independent_top_bottom_contour_cut");
  });
});

describe("bestUse", () => {
  it("fine wire micro for medical device", () => {
    expect(bestUse("fine_wire_micro")).toBe("medical_device_micro_gear_watch_part_semiconductor_mold");
  });
});

describe("wireEdmTypes", () => {
  it("returns 5 types", () => {
    expect(wireEdmTypes()).toHaveLength(5);
  });
});
