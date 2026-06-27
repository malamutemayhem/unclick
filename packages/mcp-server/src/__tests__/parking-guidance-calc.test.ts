import { describe, it, expect } from "vitest";
import {
  accuracy, coverage, installEase, analytics,
  pgCost, realTime, forIndoor, detection,
  bestUse, parkingGuidanceTypes,
} from "../parking-guidance-calc.js";

describe("accuracy", () => {
  it("camera most accurate", () => {
    expect(accuracy("camera_vision_ai")).toBeGreaterThan(accuracy("led_indicator_only"));
  });
});

describe("coverage", () => {
  it("camera widest coverage", () => {
    expect(coverage("camera_vision_ai")).toBeGreaterThan(coverage("magnetic_ground_sensor"));
  });
});

describe("installEase", () => {
  it("led easiest install", () => {
    expect(installEase("led_indicator_only")).toBeGreaterThan(installEase("magnetic_ground_sensor"));
  });
});

describe("analytics", () => {
  it("camera best analytics", () => {
    expect(analytics("camera_vision_ai")).toBeGreaterThan(analytics("led_indicator_only"));
  });
});

describe("pgCost", () => {
  it("camera most expensive", () => {
    expect(pgCost("camera_vision_ai")).toBeGreaterThan(pgCost("led_indicator_only"));
  });
});

describe("realTime", () => {
  it("ultrasonic is real time", () => {
    expect(realTime("ultrasonic_ceiling_sensor")).toBe(true);
  });
  it("led not real time", () => {
    expect(realTime("led_indicator_only")).toBe(false);
  });
});

describe("forIndoor", () => {
  it("ultrasonic for indoor", () => {
    expect(forIndoor("ultrasonic_ceiling_sensor")).toBe(true);
  });
  it("magnetic not indoor", () => {
    expect(forIndoor("magnetic_ground_sensor")).toBe(false);
  });
});

describe("detection", () => {
  it("camera uses ai vision", () => {
    expect(detection("camera_vision_ai")).toBe("ai_vision_camera_multi_space");
  });
});

describe("bestUse", () => {
  it("radar for large lot zone", () => {
    expect(bestUse("radar_overhead_count")).toBe("large_lot_zone_count_display");
  });
});

describe("parkingGuidanceTypes", () => {
  it("returns 5 types", () => {
    expect(parkingGuidanceTypes()).toHaveLength(5);
  });
});
