import { describe, it, expect } from "vitest";
import {
  heightAccuracy, measureSpeed, resolution, repeatability,
  spiCost, inline, forMicroPad, measureMethod,
  bestUse, spiInspectorTypes,
} from "../spi-inspector-calc.js";

describe("heightAccuracy", () => {
  it("confocal chromatic best height accuracy", () => {
    expect(heightAccuracy("confocal_chromatic")).toBeGreaterThan(heightAccuracy("laser_triangulation"));
  });
});

describe("measureSpeed", () => {
  it("dual projection fastest measurement", () => {
    expect(measureSpeed("dual_projection")).toBeGreaterThan(measureSpeed("confocal_chromatic"));
  });
});

describe("resolution", () => {
  it("confocal chromatic highest resolution", () => {
    expect(resolution("confocal_chromatic")).toBeGreaterThan(resolution("laser_triangulation"));
  });
});

describe("repeatability", () => {
  it("confocal chromatic best repeatability", () => {
    expect(repeatability("confocal_chromatic")).toBeGreaterThan(repeatability("laser_triangulation"));
  });
});

describe("spiCost", () => {
  it("confocal chromatic most expensive", () => {
    expect(spiCost("confocal_chromatic")).toBeGreaterThan(spiCost("laser_triangulation"));
  });
});

describe("inline", () => {
  it("all types are inline capable", () => {
    expect(inline("laser_triangulation")).toBe(true);
    expect(inline("confocal_chromatic")).toBe(true);
  });
});

describe("forMicroPad", () => {
  it("confocal chromatic for micro pad", () => {
    expect(forMicroPad("confocal_chromatic")).toBe(true);
  });
  it("laser triangulation not for micro pad", () => {
    expect(forMicroPad("laser_triangulation")).toBe(false);
  });
});

describe("measureMethod", () => {
  it("dual projection uses dual angle projection", () => {
    expect(measureMethod("dual_projection")).toBe("dual_angle_projection_eliminate_shadow_robust_board_warp");
  });
});

describe("bestUse", () => {
  it("confocal chromatic for wafer level package", () => {
    expect(bestUse("confocal_chromatic")).toBe("wafer_level_package_flip_chip_ultra_fine_pitch_bump_measure");
  });
});

describe("spiInspectorTypes", () => {
  it("returns 5 types", () => {
    expect(spiInspectorTypes()).toHaveLength(5);
  });
});
