import { describe, it, expect } from "vitest";
import {
  roughness, speed, consistency, geometry,
  sfCost, abrasiveFree, forBearing, medium,
  bestUse, superfinishTypes,
} from "../superfinish-calc.js";

describe("roughness", () => {
  it("stone oscillation best roughness", () => {
    expect(roughness("stone_oscillation_plunge")).toBeGreaterThan(roughness("centrifugal_barrel_mass"));
  });
});

describe("speed", () => {
  it("roller burnish fastest", () => {
    expect(speed("roller_burnish_rz")).toBeGreaterThan(speed("stone_oscillation_plunge"));
  });
});

describe("consistency", () => {
  it("stone oscillation most consistent", () => {
    expect(consistency("stone_oscillation_plunge")).toBeGreaterThan(consistency("centrifugal_barrel_mass"));
  });
});

describe("geometry", () => {
  it("centrifugal barrel best geometry handling", () => {
    expect(geometry("centrifugal_barrel_mass")).toBeGreaterThan(geometry("roller_burnish_rz"));
  });
});

describe("sfCost", () => {
  it("stone oscillation most expensive", () => {
    expect(sfCost("stone_oscillation_plunge")).toBeGreaterThan(sfCost("roller_burnish_rz"));
  });
});

describe("abrasiveFree", () => {
  it("roller burnish is abrasive-free", () => {
    expect(abrasiveFree("roller_burnish_rz")).toBe(true);
  });
  it("stone oscillation not abrasive-free", () => {
    expect(abrasiveFree("stone_oscillation_plunge")).toBe(false);
  });
});

describe("forBearing", () => {
  it("stone oscillation for bearings", () => {
    expect(forBearing("stone_oscillation_plunge")).toBe(true);
  });
  it("belt microfinish not for bearings", () => {
    expect(forBearing("belt_microfinish_wide")).toBe(false);
  });
});

describe("medium", () => {
  it("roller burnish uses hardened roller tool", () => {
    expect(medium("roller_burnish_rz")).toBe("hardened_roller_hydrostatic_tool");
  });
});

describe("bestUse", () => {
  it("stone oscillation for bearing race crankshaft", () => {
    expect(bestUse("stone_oscillation_plunge")).toBe("bearing_race_crankshaft_journal");
  });
});

describe("superfinishTypes", () => {
  it("returns 5 types", () => {
    expect(superfinishTypes()).toHaveLength(5);
  });
});
