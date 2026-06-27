import { describe, it, expect } from "vitest";
import {
  mixRatio, settingTimeDays, compressiveStrengthMpa, waterRetentionPercent,
  volumePerM2AtDepthCm, slakingTimeHours, breathabilityRating,
  frostResistance, costPerKg, limeTypes,
} from "../lime-mortar-calc.js";

describe("mixRatio", () => {
  it("pozzolanic uses less sand", () => {
    expect(mixRatio("pozzolanic").sand).toBeLessThan(mixRatio("fat_lime").sand);
  });
});

describe("settingTimeDays", () => {
  it("lime putty takes longest", () => {
    expect(settingTimeDays("lime_putty")).toBeGreaterThan(settingTimeDays("hydraulic_lime"));
  });
});

describe("compressiveStrengthMpa", () => {
  it("pozzolanic is strongest", () => {
    expect(compressiveStrengthMpa("pozzolanic")).toBeGreaterThan(
      compressiveStrengthMpa("fat_lime")
    );
  });
});

describe("waterRetentionPercent", () => {
  it("lime putty retains most water", () => {
    expect(waterRetentionPercent("lime_putty")).toBeGreaterThan(
      waterRetentionPercent("hydraulic_lime")
    );
  });
});

describe("volumePerM2AtDepthCm", () => {
  it("deeper = more volume", () => {
    expect(volumePerM2AtDepthCm(3)).toBeGreaterThan(volumePerM2AtDepthCm(1));
  });
});

describe("slakingTimeHours", () => {
  it("lime putty takes longest", () => {
    expect(slakingTimeHours("lime_putty")).toBeGreaterThan(slakingTimeHours("fat_lime"));
  });
});

describe("breathabilityRating", () => {
  it("fat lime is most breathable", () => {
    expect(breathabilityRating("fat_lime")).toBeGreaterThan(
      breathabilityRating("pozzolanic")
    );
  });
});

describe("frostResistance", () => {
  it("hydraulic lime is frost resistant", () => {
    expect(frostResistance("hydraulic_lime")).toBe(true);
  });
  it("fat lime is not frost resistant", () => {
    expect(frostResistance("fat_lime")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("lime putty is most expensive", () => {
    expect(costPerKg("lime_putty")).toBeGreaterThan(costPerKg("hot_lime"));
  });
});

describe("limeTypes", () => {
  it("returns 5 types", () => {
    expect(limeTypes()).toHaveLength(5);
  });
});
