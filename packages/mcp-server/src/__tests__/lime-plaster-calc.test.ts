import { describe, it, expect } from "vitest";
import {
  setCureDays, compressiveStrengthMpa, breathability,
  waterResistance, coatsRequired, polishable,
  frostResistance, skillLevel, costPerM2, limePlasterTypes,
} from "../lime-plaster-calc.js";

describe("setCureDays", () => {
  it("lime putty cures slowest", () => {
    expect(setCureDays("lime_putty")).toBeGreaterThan(
      setCureDays("tadelakt")
    );
  });
});

describe("compressiveStrengthMpa", () => {
  it("pozzolanic is strongest", () => {
    expect(compressiveStrengthMpa("pozzolanic")).toBeGreaterThan(
      compressiveStrengthMpa("lime_putty")
    );
  });
});

describe("breathability", () => {
  it("lime putty is most breathable", () => {
    expect(breathability("lime_putty")).toBeGreaterThan(
      breathability("tadelakt")
    );
  });
});

describe("waterResistance", () => {
  it("tadelakt is most water resistant", () => {
    expect(waterResistance("tadelakt")).toBeGreaterThan(
      waterResistance("lime_putty")
    );
  });
});

describe("coatsRequired", () => {
  it("tadelakt needs most coats", () => {
    expect(coatsRequired("tadelakt")).toBeGreaterThan(
      coatsRequired("hydraulic")
    );
  });
});

describe("polishable", () => {
  it("tadelakt is polishable", () => {
    expect(polishable("tadelakt")).toBe(true);
  });
  it("hydraulic is not", () => {
    expect(polishable("hydraulic")).toBe(false);
  });
});

describe("frostResistance", () => {
  it("pozzolanic resists frost best", () => {
    expect(frostResistance("pozzolanic")).toBeGreaterThan(
      frostResistance("tadelakt")
    );
  });
});

describe("skillLevel", () => {
  it("tadelakt needs most skill", () => {
    expect(skillLevel("tadelakt")).toBeGreaterThan(
      skillLevel("hydraulic")
    );
  });
});

describe("costPerM2", () => {
  it("tadelakt is most expensive", () => {
    expect(costPerM2("tadelakt")).toBeGreaterThan(
      costPerM2("hot_mixed")
    );
  });
});

describe("limePlasterTypes", () => {
  it("returns 5 types", () => {
    expect(limePlasterTypes()).toHaveLength(5);
  });
});
