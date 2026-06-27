import { describe, it, expect } from "vitest";
import {
  sensitivity, airVelocity, maintenance, falseAlarm,
  ddCost, aspirating, forHvac, sampling,
  bestUse, ductDetectorTypes,
} from "../duct-detector-calc.js";

describe("sensitivity", () => {
  it("aspirating most sensitive", () => {
    expect(sensitivity("air_sampling_aspirating")).toBeGreaterThan(sensitivity("beam_projected_duct"));
  });
});

describe("airVelocity", () => {
  it("aspirating handles highest velocity", () => {
    expect(airVelocity("air_sampling_aspirating")).toBeGreaterThan(airVelocity("ionization_duct_mount"));
  });
});

describe("maintenance", () => {
  it("photoelectric easiest maintenance", () => {
    expect(maintenance("photoelectric_sampling")).toBeGreaterThan(maintenance("air_sampling_aspirating"));
  });
});

describe("falseAlarm", () => {
  it("combination lowest false alarm", () => {
    expect(falseAlarm("combination_photo_heat")).toBeGreaterThan(falseAlarm("ionization_duct_mount"));
  });
});

describe("ddCost", () => {
  it("aspirating most expensive", () => {
    expect(ddCost("air_sampling_aspirating")).toBeGreaterThan(ddCost("ionization_duct_mount"));
  });
});

describe("aspirating", () => {
  it("air sampling is aspirating", () => {
    expect(aspirating("air_sampling_aspirating")).toBe(true);
  });
  it("photoelectric not aspirating", () => {
    expect(aspirating("photoelectric_sampling")).toBe(false);
  });
});

describe("forHvac", () => {
  it("all types for hvac", () => {
    expect(forHvac("photoelectric_sampling")).toBe(true);
  });
});

describe("sampling", () => {
  it("aspirating uses laser particle", () => {
    expect(sampling("air_sampling_aspirating")).toBe("pipe_network_laser_particle");
  });
});

describe("bestUse", () => {
  it("beam for large duct", () => {
    expect(bestUse("beam_projected_duct")).toBe("large_duct_high_velocity");
  });
});

describe("ductDetectorTypes", () => {
  it("returns 5 types", () => {
    expect(ductDetectorTypes()).toHaveLength(5);
  });
});
