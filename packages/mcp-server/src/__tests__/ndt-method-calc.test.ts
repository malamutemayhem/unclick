import { describe, it, expect } from "vitest";
import {
  sensitivity, speed, depth, portability,
  ndCost, volumetric, forSurface, medium,
  bestUse, ndtMethodTypes,
} from "../ndt-method-calc.js";

describe("sensitivity", () => {
  it("ultrasonic pulse echo high sensitivity", () => {
    expect(sensitivity("ultrasonic_pulse_echo")).toBeGreaterThan(sensitivity("liquid_penetrant_pt"));
  });
});

describe("speed", () => {
  it("eddy current fastest", () => {
    expect(speed("eddy_current_et")).toBeGreaterThan(speed("radiographic_xray_gamma"));
  });
});

describe("depth", () => {
  it("ultrasonic deepest inspection", () => {
    expect(depth("ultrasonic_pulse_echo")).toBeGreaterThan(depth("eddy_current_et"));
  });
});

describe("portability", () => {
  it("liquid penetrant most portable", () => {
    expect(portability("liquid_penetrant_pt")).toBeGreaterThan(portability("radiographic_xray_gamma"));
  });
});

describe("ndCost", () => {
  it("radiographic most expensive", () => {
    expect(ndCost("radiographic_xray_gamma")).toBeGreaterThan(ndCost("liquid_penetrant_pt"));
  });
});

describe("volumetric", () => {
  it("ultrasonic is volumetric", () => {
    expect(volumetric("ultrasonic_pulse_echo")).toBe(true);
  });
  it("magnetic particle not volumetric", () => {
    expect(volumetric("magnetic_particle_mt")).toBe(false);
  });
});

describe("forSurface", () => {
  it("magnetic particle for surface", () => {
    expect(forSurface("magnetic_particle_mt")).toBe(true);
  });
  it("ultrasonic not for surface", () => {
    expect(forSurface("ultrasonic_pulse_echo")).toBe(false);
  });
});

describe("medium", () => {
  it("eddy current uses electromagnetic coil probe", () => {
    expect(medium("eddy_current_et")).toBe("electromagnetic_coil_probe_array");
  });
});

describe("bestUse", () => {
  it("radiographic for weld porosity inclusion", () => {
    expect(bestUse("radiographic_xray_gamma")).toBe("weld_quality_porosity_inclusion");
  });
});

describe("ndtMethodTypes", () => {
  it("returns 5 types", () => {
    expect(ndtMethodTypes()).toHaveLength(5);
  });
});
