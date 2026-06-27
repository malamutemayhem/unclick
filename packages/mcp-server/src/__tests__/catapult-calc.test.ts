import { describe, it, expect } from "vitest";
import {
  torsionForce, projectileRange, armLength, crewSize,
  reloadTimeS, maxProjectileKg, ropeWeight, windageEffect,
  accuracyPercent, catapultTypes,
} from "../catapult-calc.js";

describe("torsionForce", () => {
  it("positive force", () => {
    expect(torsionForce(5, 10)).toBeGreaterThan(0);
  });
});

describe("projectileRange", () => {
  it("positive range", () => {
    expect(projectileRange(5000, 10, 45)).toBeGreaterThan(0);
  });
  it("zero mass = 0", () => {
    expect(projectileRange(5000, 0, 45)).toBe(0);
  });
});

describe("armLength", () => {
  it("onager longest", () => {
    expect(armLength("onager")).toBeGreaterThan(armLength("scorpio"));
  });
});

describe("crewSize", () => {
  it("onager needs most crew", () => {
    expect(crewSize("onager")).toBeGreaterThan(crewSize("scorpio"));
  });
});

describe("reloadTimeS", () => {
  it("scorpio fastest", () => {
    expect(reloadTimeS("scorpio")).toBeLessThan(reloadTimeS("onager"));
  });
});

describe("maxProjectileKg", () => {
  it("onager throws heaviest", () => {
    expect(maxProjectileKg("onager")).toBeGreaterThan(maxProjectileKg("ballista"));
  });
});

describe("ropeWeight", () => {
  it("positive kg", () => {
    expect(ropeWeight(3, 5)).toBeGreaterThan(0);
  });
});

describe("windageEffect", () => {
  it("positive effect", () => {
    expect(windageEffect(10, 20)).toBeGreaterThan(0);
  });
  it("zero mass = 0", () => {
    expect(windageEffect(10, 0)).toBe(0);
  });
});

describe("accuracyPercent", () => {
  it("decreases with range", () => {
    expect(accuracyPercent(50, 100)).toBeGreaterThan(accuracyPercent(90, 100));
  });
});

describe("catapultTypes", () => {
  it("returns 5 types", () => {
    expect(catapultTypes()).toHaveLength(5);
  });
});
