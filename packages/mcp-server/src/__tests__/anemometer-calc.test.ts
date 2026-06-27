import { describe, it, expect } from "vitest";
import {
  windSpeedAccuracy, responseTime, durability, maintenanceNeed,
  instrumentCost, hasMovingParts, measuresDirection, sensingMethod,
  bestApplication, anemometers,
} from "../anemometer-calc.js";

describe("windSpeedAccuracy", () => {
  it("ultrasonic most accurate", () => {
    expect(windSpeedAccuracy("ultrasonic")).toBeGreaterThan(windSpeedAccuracy("pitot_tube"));
  });
});

describe("responseTime", () => {
  it("ultrasonic fastest response", () => {
    expect(responseTime("ultrasonic")).toBeGreaterThan(responseTime("cup"));
  });
});

describe("durability", () => {
  it("ultrasonic most durable", () => {
    expect(durability("ultrasonic")).toBeGreaterThan(durability("hot_wire"));
  });
});

describe("maintenanceNeed", () => {
  it("hot wire highest maintenance", () => {
    expect(maintenanceNeed("hot_wire")).toBeGreaterThan(maintenanceNeed("ultrasonic"));
  });
});

describe("instrumentCost", () => {
  it("ultrasonic most expensive", () => {
    expect(instrumentCost("ultrasonic")).toBeGreaterThan(instrumentCost("cup"));
  });
});

describe("hasMovingParts", () => {
  it("cup has moving parts", () => {
    expect(hasMovingParts("cup")).toBe(true);
  });
  it("ultrasonic does not", () => {
    expect(hasMovingParts("ultrasonic")).toBe(false);
  });
});

describe("measuresDirection", () => {
  it("vane measures direction", () => {
    expect(measuresDirection("vane")).toBe(true);
  });
  it("cup does not", () => {
    expect(measuresDirection("cup")).toBe(false);
  });
});

describe("sensingMethod", () => {
  it("ultrasonic uses transit time sound pulse", () => {
    expect(sensingMethod("ultrasonic")).toBe("transit_time_sound_pulse");
  });
});

describe("bestApplication", () => {
  it("hot wire for hvac lab low velocity", () => {
    expect(bestApplication("hot_wire")).toBe("hvac_lab_low_velocity");
  });
});

describe("anemometers", () => {
  it("returns 5 types", () => {
    expect(anemometers()).toHaveLength(5);
  });
});
