import { describe, it, expect } from "vitest";
import {
  soakingDays, limeVatDays, tanLiquorLiters, tanningDuration,
  leatherThicknessMm, wasteWaterLiters, dryingDays, durabilityRating,
  waterResistance, costPerSqM, tanningMethods,
} from "../tanning-calc.js";

describe("soakingDays", () => {
  it("at least 1", () => {
    expect(soakingDays(1)).toBe(1);
  });
});

describe("limeVatDays", () => {
  it("at least 3", () => {
    expect(limeVatDays(1)).toBe(3);
  });
});

describe("tanLiquorLiters", () => {
  it("bark uses most liquor", () => {
    expect(tanLiquorLiters(2, "bark")).toBeGreaterThan(tanLiquorLiters(2, "chrome"));
  });
  it("smoke uses zero", () => {
    expect(tanLiquorLiters(2, "smoke")).toBe(0);
  });
});

describe("tanningDuration", () => {
  it("bark longest", () => {
    expect(tanningDuration("bark")).toBeGreaterThan(tanningDuration("chrome"));
  });
});

describe("leatherThicknessMm", () => {
  it("thinner than hide", () => {
    expect(leatherThicknessMm(5, "bark")).toBeLessThan(5);
  });
});

describe("wasteWaterLiters", () => {
  it("positive waste", () => {
    expect(wasteWaterLiters(2)).toBeGreaterThan(0);
  });
});

describe("dryingDays", () => {
  it("bark longest drying", () => {
    expect(dryingDays("bark")).toBeGreaterThan(dryingDays("smoke"));
  });
});

describe("durabilityRating", () => {
  it("bark most durable", () => {
    expect(durabilityRating("bark")).toBeGreaterThan(durabilityRating("alum"));
  });
});

describe("waterResistance", () => {
  it("smoke most water resistant", () => {
    expect(waterResistance("smoke")).toBeGreaterThan(waterResistance("alum"));
  });
});

describe("costPerSqM", () => {
  it("chrome most expensive", () => {
    expect(costPerSqM("chrome", 100)).toBeGreaterThan(costPerSqM("brain", 100));
  });
});

describe("tanningMethods", () => {
  it("returns 5 methods", () => {
    expect(tanningMethods()).toHaveLength(5);
  });
});
