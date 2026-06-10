import { describe, it, expect } from "vitest";
import {
  reflectivity, installationEase, durabilityScore, costPerSqFt,
  dustAccumulation, addsRValue, diyInstallable, installLocation,
  bestClimate, radiantBarriers,
} from "../radiant-barrier-calc.js";

describe("reflectivity", () => {
  it("foil sheet most reflective", () => {
    expect(reflectivity("foil_sheet")).toBeGreaterThan(reflectivity("spray_on"));
  });
});

describe("installationEase", () => {
  it("foil chip easiest install", () => {
    expect(installationEase("foil_chip")).toBeGreaterThan(installationEase("rigid_board"));
  });
});

describe("durabilityScore", () => {
  it("rigid board most durable", () => {
    expect(durabilityScore("rigid_board")).toBeGreaterThan(durabilityScore("foil_chip"));
  });
});

describe("costPerSqFt", () => {
  it("rigid board most expensive", () => {
    expect(costPerSqFt("rigid_board")).toBeGreaterThan(costPerSqFt("foil_chip"));
  });
});

describe("dustAccumulation", () => {
  it("foil sheet most dust accumulation", () => {
    expect(dustAccumulation("foil_sheet")).toBeGreaterThan(dustAccumulation("spray_on"));
  });
});

describe("addsRValue", () => {
  it("bubble foil adds r value", () => {
    expect(addsRValue("bubble_foil")).toBe(true);
  });
  it("foil sheet does not", () => {
    expect(addsRValue("foil_sheet")).toBe(false);
  });
});

describe("diyInstallable", () => {
  it("foil sheet is diy installable", () => {
    expect(diyInstallable("foil_sheet")).toBe(true);
  });
  it("spray on is not", () => {
    expect(diyInstallable("spray_on")).toBe(false);
  });
});

describe("installLocation", () => {
  it("foil chip in attic floor blown", () => {
    expect(installLocation("foil_chip")).toBe("attic_floor_blown");
  });
});

describe("bestClimate", () => {
  it("foil sheet for hot sunny cooling dominant", () => {
    expect(bestClimate("foil_sheet")).toBe("hot_sunny_cooling_dominant");
  });
});

describe("radiantBarriers", () => {
  it("returns 5 barriers", () => {
    expect(radiantBarriers()).toHaveLength(5);
  });
});
