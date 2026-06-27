import { describe, it, expect } from "vitest";
import {
  accuracy, coverage, falseTrip, installEase,
  osCost, lineSight, forOpenPlan, detection,
  bestUse, occupancySensorTypes,
} from "../occupancy-sensor-calc.js";

describe("accuracy", () => {
  it("camera most accurate", () => {
    expect(accuracy("camera_ai_people_count")).toBeGreaterThan(accuracy("pir_passive_infrared"));
  });
});

describe("coverage", () => {
  it("microwave widest coverage", () => {
    expect(coverage("microwave_high_bay")).toBeGreaterThan(coverage("pir_passive_infrared"));
  });
});

describe("falseTrip", () => {
  it("camera fewest false trips", () => {
    expect(falseTrip("camera_ai_people_count")).toBeGreaterThan(falseTrip("ultrasonic_doppler"));
  });
});

describe("installEase", () => {
  it("pir easiest install", () => {
    expect(installEase("pir_passive_infrared")).toBeGreaterThan(installEase("camera_ai_people_count"));
  });
});

describe("osCost", () => {
  it("camera most expensive", () => {
    expect(osCost("camera_ai_people_count")).toBeGreaterThan(osCost("pir_passive_infrared"));
  });
});

describe("lineSight", () => {
  it("pir requires line of sight", () => {
    expect(lineSight("pir_passive_infrared")).toBe(true);
  });
  it("ultrasonic no line of sight", () => {
    expect(lineSight("ultrasonic_doppler")).toBe(false);
  });
});

describe("forOpenPlan", () => {
  it("ultrasonic for open plan", () => {
    expect(forOpenPlan("ultrasonic_doppler")).toBe(true);
  });
  it("pir not open plan", () => {
    expect(forOpenPlan("pir_passive_infrared")).toBe(false);
  });
});

describe("detection", () => {
  it("camera uses ai vision", () => {
    expect(detection("camera_ai_people_count")).toBe("ai_vision_thermal_people_count");
  });
});

describe("bestUse", () => {
  it("dual tech for classroom", () => {
    expect(bestUse("dual_tech_pir_us")).toBe("classroom_conference_room");
  });
});

describe("occupancySensorTypes", () => {
  it("returns 5 types", () => {
    expect(occupancySensorTypes()).toHaveLength(5);
  });
});
