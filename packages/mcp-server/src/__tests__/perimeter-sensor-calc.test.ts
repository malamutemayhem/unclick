import { describe, it, expect } from "vitest";
import {
  range, falseAlarm, covertness, weather,
  psCost, invisible, forHighSecurity, detection,
  bestUse, perimeterSensorTypes,
} from "../perimeter-sensor-calc.js";

describe("range", () => {
  it("fiber optic longest range", () => {
    expect(range("fiber_optic_fence")).toBeGreaterThan(range("infrared_beam_active"));
  });
});

describe("falseAlarm", () => {
  it("lidar fewest false alarms", () => {
    expect(falseAlarm("lidar_laser_scan")).toBeGreaterThan(falseAlarm("microwave_volumetric"));
  });
});

describe("covertness", () => {
  it("buried cable most covert", () => {
    expect(covertness("buried_cable_rf")).toBeGreaterThan(covertness("infrared_beam_active"));
  });
});

describe("weather", () => {
  it("buried cable best weather resist", () => {
    expect(weather("buried_cable_rf")).toBeGreaterThan(weather("lidar_laser_scan"));
  });
});

describe("psCost", () => {
  it("lidar most expensive", () => {
    expect(psCost("lidar_laser_scan")).toBeGreaterThan(psCost("infrared_beam_active"));
  });
});

describe("invisible", () => {
  it("microwave is invisible", () => {
    expect(invisible("microwave_volumetric")).toBe(true);
  });
  it("infrared not invisible", () => {
    expect(invisible("infrared_beam_active")).toBe(false);
  });
});

describe("forHighSecurity", () => {
  it("fiber optic for high security", () => {
    expect(forHighSecurity("fiber_optic_fence")).toBe(true);
  });
  it("microwave not high security", () => {
    expect(forHighSecurity("microwave_volumetric")).toBe(false);
  });
});

describe("detection", () => {
  it("buried cable uses leaky coax", () => {
    expect(detection("buried_cable_rf")).toBe("leaky_coax_rf_field_buried");
  });
});

describe("bestUse", () => {
  it("lidar for airport data center", () => {
    expect(bestUse("lidar_laser_scan")).toBe("airport_data_center_analytic");
  });
});

describe("perimeterSensorTypes", () => {
  it("returns 5 types", () => {
    expect(perimeterSensorTypes()).toHaveLength(5);
  });
});
