import { describe, it, expect } from "vitest";
import {
  waterVolume, viewClarity, maintenanceEase, fishCapacity,
  tankCost, lidIncluded, co2Ready, glassMaterial,
  bestKeeper, fishTanks,
} from "../fish-tank-calc.js";

describe("waterVolume", () => {
  it("bow front display most water volume", () => {
    expect(waterVolume("bow_front_display")).toBeGreaterThan(waterVolume("nano_5_gallon"));
  });
});

describe("viewClarity", () => {
  it("rimless cube best view clarity", () => {
    expect(viewClarity("rimless_cube")).toBeGreaterThan(viewClarity("standard_20_gallon"));
  });
});

describe("maintenanceEase", () => {
  it("standard 20 gallon easiest maintenance", () => {
    expect(maintenanceEase("standard_20_gallon")).toBeGreaterThan(maintenanceEase("planted_high_tech"));
  });
});

describe("fishCapacity", () => {
  it("bow front display most fish capacity", () => {
    expect(fishCapacity("bow_front_display")).toBeGreaterThan(fishCapacity("nano_5_gallon"));
  });
});

describe("tankCost", () => {
  it("planted high tech most expensive", () => {
    expect(tankCost("planted_high_tech")).toBeGreaterThan(tankCost("nano_5_gallon"));
  });
});

describe("lidIncluded", () => {
  it("standard 20 gallon has lid included", () => {
    expect(lidIncluded("standard_20_gallon")).toBe(true);
  });
  it("rimless cube does not", () => {
    expect(lidIncluded("rimless_cube")).toBe(false);
  });
});

describe("co2Ready", () => {
  it("planted high tech is co2 ready", () => {
    expect(co2Ready("planted_high_tech")).toBe(true);
  });
  it("standard 20 gallon is not", () => {
    expect(co2Ready("standard_20_gallon")).toBe(false);
  });
});

describe("glassMaterial", () => {
  it("rimless cube uses low iron ultra clear", () => {
    expect(glassMaterial("rimless_cube")).toBe("low_iron_ultra_clear");
  });
});

describe("bestKeeper", () => {
  it("nano 5 gallon for betta shrimp desktop", () => {
    expect(bestKeeper("nano_5_gallon")).toBe("betta_shrimp_desktop");
  });
});

describe("fishTanks", () => {
  it("returns 5 types", () => {
    expect(fishTanks()).toHaveLength(5);
  });
});
