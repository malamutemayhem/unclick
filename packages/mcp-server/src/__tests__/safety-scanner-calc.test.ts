import { describe, it, expect } from "vitest";
import {
  fieldRange, angularCoverage, resolution, environmentalTolerance,
  ssCost_, outdoorRated, forAgvProtection, technology,
  bestUse, safetyScannerTypes,
} from "../safety-scanner-calc.js";

describe("fieldRange", () => {
  it("radar safety sensor longest field range", () => {
    expect(fieldRange("radar_safety_sensor")).toBeGreaterThan(fieldRange("ultrasonic_safety"));
  });
});

describe("angularCoverage", () => {
  it("laser area scanner widest angular coverage", () => {
    expect(angularCoverage("laser_area_scanner")).toBeGreaterThan(angularCoverage("ultrasonic_safety"));
  });
});

describe("resolution", () => {
  it("vision safe camera highest resolution", () => {
    expect(resolution("vision_safe_camera")).toBeGreaterThan(resolution("ultrasonic_safety"));
  });
});

describe("environmentalTolerance", () => {
  it("radar safety sensor best environmental tolerance", () => {
    expect(environmentalTolerance("radar_safety_sensor")).toBeGreaterThan(environmentalTolerance("vision_safe_camera"));
  });
});

describe("ssCost_", () => {
  it("time of flight 3d most expensive", () => {
    expect(ssCost_("time_of_flight_3d")).toBeGreaterThan(ssCost_("ultrasonic_safety"));
  });
});

describe("outdoorRated", () => {
  it("radar safety sensor outdoor rated", () => {
    expect(outdoorRated("radar_safety_sensor")).toBe(true);
  });
  it("laser area scanner not outdoor rated", () => {
    expect(outdoorRated("laser_area_scanner")).toBe(false);
  });
});

describe("forAgvProtection", () => {
  it("laser area scanner for agv protection", () => {
    expect(forAgvProtection("laser_area_scanner")).toBe(true);
  });
  it("radar safety sensor not for agv protection", () => {
    expect(forAgvProtection("radar_safety_sensor")).toBe(false);
  });
});

describe("technology", () => {
  it("ultrasonic uses echo ranging", () => {
    expect(technology("ultrasonic_safety")).toBe("ultrasonic_transducer_echo_ranging_simple_zone");
  });
});

describe("bestUse", () => {
  it("laser area scanner for agv amr collision avoidance", () => {
    expect(bestUse("laser_area_scanner")).toBe("agv_amr_collision_avoidance_robot_cell_area_guard");
  });
});

describe("safetyScannerTypes", () => {
  it("returns 5 types", () => {
    expect(safetyScannerTypes()).toHaveLength(5);
  });
});
