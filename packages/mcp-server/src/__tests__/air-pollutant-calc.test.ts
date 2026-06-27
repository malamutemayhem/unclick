import { describe, it, expect } from "vitest";
import {
  healthImpactScore, atmosphericLifetimeHours, regulatoryLimitUgM3,
  indoorPenetration, climateImpact, visibleSmog,
  greenhouse, primarySource, healthEffect, airPollutants,
} from "../air-pollutant-calc.js";

describe("healthImpactScore", () => {
  it("pm25 highest health impact", () => {
    expect(healthImpactScore("pm25")).toBeGreaterThan(
      healthImpactScore("nitrogen_dioxide")
    );
  });
});

describe("atmosphericLifetimeHours", () => {
  it("pm25 longest lifetime", () => {
    expect(atmosphericLifetimeHours("pm25")).toBeGreaterThan(
      atmosphericLifetimeHours("nitrogen_dioxide")
    );
  });
});

describe("regulatoryLimitUgM3", () => {
  it("ozone has highest limit", () => {
    expect(regulatoryLimitUgM3("ozone")).toBeGreaterThan(
      regulatoryLimitUgM3("pm25")
    );
  });
});

describe("indoorPenetration", () => {
  it("pm25 penetrates indoors most", () => {
    expect(indoorPenetration("pm25")).toBeGreaterThan(
      indoorPenetration("ozone")
    );
  });
});

describe("climateImpact", () => {
  it("ozone highest climate impact", () => {
    expect(climateImpact("ozone")).toBeGreaterThan(
      climateImpact("pm25")
    );
  });
});

describe("visibleSmog", () => {
  it("pm25 causes visible smog", () => {
    expect(visibleSmog("pm25")).toBe(true);
  });
  it("ozone does not", () => {
    expect(visibleSmog("ozone")).toBe(false);
  });
});

describe("greenhouse", () => {
  it("ozone is greenhouse gas", () => {
    expect(greenhouse("ozone")).toBe(true);
  });
  it("pm25 is not", () => {
    expect(greenhouse("pm25")).toBe(false);
  });
});

describe("primarySource", () => {
  it("sulfur dioxide from coal burning", () => {
    expect(primarySource("sulfur_dioxide")).toBe("coal_burning");
  });
});

describe("healthEffect", () => {
  it("pm25 causes lung penetration", () => {
    expect(healthEffect("pm25")).toBe("lung_penetration");
  });
});

describe("airPollutants", () => {
  it("returns 5 pollutants", () => {
    expect(airPollutants()).toHaveLength(5);
  });
});
