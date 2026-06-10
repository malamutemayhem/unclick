import { describe, it, expect } from "vitest";
import {
  biodiversity, depthMeters, distanceFromShoreKm,
  growthRateCmPerYear, waveProtection, lagoonPresent,
  volcanicOrigin, exampleReef, bleachingVulnerability, coralReefTypes,
} from "../coral-reef-calc.js";

describe("biodiversity", () => {
  it("barrier has highest biodiversity", () => {
    expect(biodiversity("barrier")).toBeGreaterThan(
      biodiversity("bank")
    );
  });
});

describe("depthMeters", () => {
  it("bank is deepest", () => {
    expect(depthMeters("bank")).toBeGreaterThan(
      depthMeters("patch")
    );
  });
});

describe("distanceFromShoreKm", () => {
  it("bank is farthest from shore", () => {
    expect(distanceFromShoreKm("bank")).toBeGreaterThan(
      distanceFromShoreKm("fringing")
    );
  });
});

describe("growthRateCmPerYear", () => {
  it("patch grows fastest", () => {
    expect(growthRateCmPerYear("patch")).toBeGreaterThan(
      growthRateCmPerYear("bank")
    );
  });
});

describe("waveProtection", () => {
  it("barrier provides most wave protection", () => {
    expect(waveProtection("barrier")).toBeGreaterThan(
      waveProtection("bank")
    );
  });
});

describe("lagoonPresent", () => {
  it("atoll has a lagoon", () => {
    expect(lagoonPresent("atoll")).toBe(true);
  });
  it("fringing does not", () => {
    expect(lagoonPresent("fringing")).toBe(false);
  });
});

describe("volcanicOrigin", () => {
  it("atoll has volcanic origin", () => {
    expect(volcanicOrigin("atoll")).toBe(true);
  });
  it("barrier does not", () => {
    expect(volcanicOrigin("barrier")).toBe(false);
  });
});

describe("exampleReef", () => {
  it("barrier example is great barrier reef", () => {
    expect(exampleReef("barrier")).toBe("great_barrier_reef");
  });
});

describe("bleachingVulnerability", () => {
  it("patch is most vulnerable to bleaching", () => {
    expect(bleachingVulnerability("patch")).toBeGreaterThan(
      bleachingVulnerability("bank")
    );
  });
});

describe("coralReefTypes", () => {
  it("returns 5 types", () => {
    expect(coralReefTypes()).toHaveLength(5);
  });
});
