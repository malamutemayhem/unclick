import { describe, it, expect } from "vitest";
import {
  rideSmooth, noiseLevel, resistanceRange, durability,
  bikeCost, hasScreen, appConnected, brakeSystem,
  bestRider, spinBikes,
} from "../spin-bike-calc.js";

describe("rideSmooth", () => {
  it("direct drive pro smoothest ride", () => {
    expect(rideSmooth("direct_drive_pro")).toBeGreaterThan(rideSmooth("friction_felt_pad"));
  });
});

describe("noiseLevel", () => {
  it("magnetic silent quietest", () => {
    expect(noiseLevel("magnetic_silent")).toBeGreaterThan(noiseLevel("air_resistance_fan"));
  });
});

describe("resistanceRange", () => {
  it("direct drive pro widest resistance range", () => {
    expect(resistanceRange("direct_drive_pro")).toBeGreaterThan(resistanceRange("recumbent_back_support"));
  });
});

describe("durability", () => {
  it("direct drive pro most durable", () => {
    expect(durability("direct_drive_pro")).toBeGreaterThan(durability("friction_felt_pad"));
  });
});

describe("bikeCost", () => {
  it("direct drive pro most expensive", () => {
    expect(bikeCost("direct_drive_pro")).toBeGreaterThan(bikeCost("friction_felt_pad"));
  });
});

describe("hasScreen", () => {
  it("magnetic silent has screen", () => {
    expect(hasScreen("magnetic_silent")).toBe(true);
  });
  it("friction felt pad does not", () => {
    expect(hasScreen("friction_felt_pad")).toBe(false);
  });
});

describe("appConnected", () => {
  it("direct drive pro is app connected", () => {
    expect(appConnected("direct_drive_pro")).toBe(true);
  });
  it("air resistance fan is not", () => {
    expect(appConnected("air_resistance_fan")).toBe(false);
  });
});

describe("brakeSystem", () => {
  it("magnetic silent uses eddy current magnet", () => {
    expect(brakeSystem("magnetic_silent")).toBe("eddy_current_magnet");
  });
});

describe("bestRider", () => {
  it("recumbent back support best for rehab low impact senior", () => {
    expect(bestRider("recumbent_back_support")).toBe("rehab_low_impact_senior");
  });
});

describe("spinBikes", () => {
  it("returns 5 types", () => {
    expect(spinBikes()).toHaveLength(5);
  });
});
