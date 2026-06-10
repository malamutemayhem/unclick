import { describe, it, expect } from "vitest";
import {
  accuracyMeters, weatherDependence, powerRequired,
  skillRequired, updateRateHz, passive,
  worksIndoors, bestApplication, historicalEra, navigationTypes,
} from "../navigation-type-calc.js";

describe("accuracyMeters", () => {
  it("gps is most accurate", () => {
    expect(accuracyMeters("gps")).toBeLessThan(
      accuracyMeters("celestial")
    );
  });
});

describe("weatherDependence", () => {
  it("celestial is most weather dependent", () => {
    expect(weatherDependence("celestial")).toBeGreaterThan(
      weatherDependence("inertial")
    );
  });
});

describe("powerRequired", () => {
  it("celestial needs no power", () => {
    expect(powerRequired("celestial")).toBe(0);
  });
});

describe("skillRequired", () => {
  it("celestial needs most skill", () => {
    expect(skillRequired("celestial")).toBeGreaterThan(
      skillRequired("gps")
    );
  });
});

describe("updateRateHz", () => {
  it("inertial updates fastest", () => {
    expect(updateRateHz("inertial")).toBeGreaterThan(
      updateRateHz("gps")
    );
  });
});

describe("passive", () => {
  it("gps is passive", () => {
    expect(passive("gps")).toBe(true);
  });
  it("radio is not", () => {
    expect(passive("radio")).toBe(false);
  });
});

describe("worksIndoors", () => {
  it("inertial works indoors", () => {
    expect(worksIndoors("inertial")).toBe(true);
  });
  it("gps does not", () => {
    expect(worksIndoors("gps")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("gps for car navigation", () => {
    expect(bestApplication("gps")).toBe("car_navigation");
  });
});

describe("historicalEra", () => {
  it("gps is modern", () => {
    expect(historicalEra("gps")).toBe("modern");
  });
});

describe("navigationTypes", () => {
  it("returns 5 types", () => {
    expect(navigationTypes()).toHaveLength(5);
  });
});
