import { describe, it, expect } from "vitest";
import {
  sensitivity, depth, speed, safety,
  wiCost, volumetric, forSubsurface, method,
  bestUse, weldInspectTypes,
} from "../weld-inspect-calc.js";

describe("sensitivity", () => {
  it("ultrasonic most sensitive", () => {
    expect(sensitivity("ultrasonic_ut_phased")).toBeGreaterThan(sensitivity("visual_vt_mag_glass"));
  });
});

describe("depth", () => {
  it("radiographic deepest", () => {
    expect(depth("radiographic_rt_xray")).toBeGreaterThan(depth("magnetic_particle_mt"));
  });
});

describe("speed", () => {
  it("visual fastest", () => {
    expect(speed("visual_vt_mag_glass")).toBeGreaterThan(speed("radiographic_rt_xray"));
  });
});

describe("safety", () => {
  it("visual safest", () => {
    expect(safety("visual_vt_mag_glass")).toBeGreaterThan(safety("radiographic_rt_xray"));
  });
});

describe("wiCost", () => {
  it("radiographic most expensive", () => {
    expect(wiCost("radiographic_rt_xray")).toBeGreaterThan(wiCost("visual_vt_mag_glass"));
  });
});

describe("volumetric", () => {
  it("ultrasonic is volumetric", () => {
    expect(volumetric("ultrasonic_ut_phased")).toBe(true);
  });
  it("visual not volumetric", () => {
    expect(volumetric("visual_vt_mag_glass")).toBe(false);
  });
});

describe("forSubsurface", () => {
  it("radiographic for subsurface", () => {
    expect(forSubsurface("radiographic_rt_xray")).toBe(true);
  });
  it("dye penetrant not subsurface", () => {
    expect(forSubsurface("dye_penetrant_pt")).toBe(false);
  });
});

describe("method", () => {
  it("magnetic particle uses flux leakage", () => {
    expect(method("magnetic_particle_mt")).toBe("magnetic_flux_leakage_particles");
  });
});

describe("bestUse", () => {
  it("ultrasonic for thick section", () => {
    expect(bestUse("ultrasonic_ut_phased")).toBe("thick_section_critical_structural");
  });
});

describe("weldInspectTypes", () => {
  it("returns 5 types", () => {
    expect(weldInspectTypes()).toHaveLength(5);
  });
});
