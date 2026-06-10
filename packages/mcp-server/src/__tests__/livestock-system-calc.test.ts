import { describe, it, expect } from "vitest";
import {
  productionPerHectare, animalWelfare, environmentalFootprint,
  laborIntensity, landRequirement, antibioticUse,
  carbonSequestering, typicalAnimal, marketPremium, livestockSystems,
} from "../livestock-system-calc.js";

describe("productionPerHectare", () => {
  it("intensive highest production", () => {
    expect(productionPerHectare("intensive")).toBeGreaterThan(
      productionPerHectare("extensive")
    );
  });
});

describe("animalWelfare", () => {
  it("silvopasture best welfare", () => {
    expect(animalWelfare("silvopasture")).toBeGreaterThan(
      animalWelfare("intensive")
    );
  });
});

describe("environmentalFootprint", () => {
  it("intensive highest footprint", () => {
    expect(environmentalFootprint("intensive")).toBeGreaterThan(
      environmentalFootprint("silvopasture")
    );
  });
});

describe("laborIntensity", () => {
  it("organic most labor intensive", () => {
    expect(laborIntensity("organic")).toBeGreaterThan(
      laborIntensity("extensive")
    );
  });
});

describe("landRequirement", () => {
  it("extensive needs most land", () => {
    expect(landRequirement("extensive")).toBeGreaterThan(
      landRequirement("intensive")
    );
  });
});

describe("antibioticUse", () => {
  it("intensive uses antibiotics", () => {
    expect(antibioticUse("intensive")).toBe(true);
  });
  it("organic does not", () => {
    expect(antibioticUse("organic")).toBe(false);
  });
});

describe("carbonSequestering", () => {
  it("silvopasture sequesters carbon", () => {
    expect(carbonSequestering("silvopasture")).toBe(true);
  });
  it("intensive does not", () => {
    expect(carbonSequestering("intensive")).toBe(false);
  });
});

describe("typicalAnimal", () => {
  it("extensive for beef cattle", () => {
    expect(typicalAnimal("extensive")).toBe("beef_cattle");
  });
});

describe("marketPremium", () => {
  it("organic commands high premium", () => {
    expect(marketPremium("organic")).toBe("high_premium");
  });
});

describe("livestockSystems", () => {
  it("returns 5 systems", () => {
    expect(livestockSystems()).toHaveLength(5);
  });
});
