import { describe, it, expect } from "vitest";
import {
  accuracy, range, allWeather, reliability,
  alCost, groundRef, forApproach, principle,
  bestUse, altimeterTypes,
} from "../altimeter-type-calc.js";

describe("accuracy", () => {
  it("laser most accurate", () => {
    expect(accuracy("laser_lidar_terrain")).toBeGreaterThan(accuracy("encoding_mode_c_gilham"));
  });
});

describe("range", () => {
  it("barometric longest range", () => {
    expect(range("barometric_aneroid")).toBeGreaterThan(range("laser_lidar_terrain"));
  });
});

describe("allWeather", () => {
  it("radar best all weather", () => {
    expect(allWeather("radar_radio_fmcw")).toBeGreaterThan(allWeather("laser_lidar_terrain"));
  });
});

describe("reliability", () => {
  it("barometric most reliable", () => {
    expect(reliability("barometric_aneroid")).toBeGreaterThan(reliability("laser_lidar_terrain"));
  });
});

describe("alCost", () => {
  it("laser most expensive", () => {
    expect(alCost("laser_lidar_terrain")).toBeGreaterThan(alCost("barometric_aneroid"));
  });
});

describe("groundRef", () => {
  it("radar uses ground ref", () => {
    expect(groundRef("radar_radio_fmcw")).toBe(true);
  });
  it("barometric no ground ref", () => {
    expect(groundRef("barometric_aneroid")).toBe(false);
  });
});

describe("forApproach", () => {
  it("radar for approach", () => {
    expect(forApproach("radar_radio_fmcw")).toBe(true);
  });
  it("barometric not for approach", () => {
    expect(forApproach("barometric_aneroid")).toBe(false);
  });
});

describe("principle", () => {
  it("gps uses satellite geometric", () => {
    expect(principle("gps_geometric_gnss")).toBe("satellite_geometric_wgs84_ht");
  });
});

describe("bestUse", () => {
  it("barometric for cruise altitude", () => {
    expect(bestUse("barometric_aneroid")).toBe("cruise_altitude_standard_flight");
  });
});

describe("altimeterTypes", () => {
  it("returns 5 types", () => {
    expect(altimeterTypes()).toHaveLength(5);
  });
});
