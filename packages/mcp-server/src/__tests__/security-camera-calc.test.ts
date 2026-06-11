import { describe, it, expect } from "vitest";
import {
  resolution, nightVision, coverage, durability,
  scCost, outdoor, forPerimeter, lens,
  bestUse, securityCameraTypes,
} from "../security-camera-calc.js";

describe("resolution", () => {
  it("ptz highest resolution", () => {
    expect(resolution("ptz_pan_tilt_zoom")).toBeGreaterThan(resolution("dome_fixed_indoor"));
  });
});

describe("nightVision", () => {
  it("thermal best night vision", () => {
    expect(nightVision("thermal_imaging_ir")).toBeGreaterThan(nightVision("dome_fixed_indoor"));
  });
});

describe("coverage", () => {
  it("ptz widest coverage", () => {
    expect(coverage("ptz_pan_tilt_zoom")).toBeGreaterThan(coverage("bullet_long_range"));
  });
});

describe("durability", () => {
  it("bullet most durable", () => {
    expect(durability("bullet_long_range")).toBeGreaterThan(durability("dome_fixed_indoor"));
  });
});

describe("scCost", () => {
  it("thermal most expensive", () => {
    expect(scCost("thermal_imaging_ir")).toBeGreaterThan(scCost("dome_fixed_indoor"));
  });
});

describe("outdoor", () => {
  it("bullet is outdoor", () => {
    expect(outdoor("bullet_long_range")).toBe(true);
  });
  it("dome not outdoor", () => {
    expect(outdoor("dome_fixed_indoor")).toBe(false);
  });
});

describe("forPerimeter", () => {
  it("thermal for perimeter", () => {
    expect(forPerimeter("thermal_imaging_ir")).toBe(true);
  });
  it("fisheye not for perimeter", () => {
    expect(forPerimeter("fisheye_360_panoramic")).toBe(false);
  });
});

describe("lens", () => {
  it("fisheye uses 360 lens", () => {
    expect(lens("fisheye_360_panoramic")).toBe("fisheye_1_6mm_360_dewarping");
  });
});

describe("bestUse", () => {
  it("thermal for zero light perimeter", () => {
    expect(bestUse("thermal_imaging_ir")).toBe("critical_perimeter_zero_light");
  });
});

describe("securityCameraTypes", () => {
  it("returns 5 types", () => {
    expect(securityCameraTypes()).toHaveLength(5);
  });
});
