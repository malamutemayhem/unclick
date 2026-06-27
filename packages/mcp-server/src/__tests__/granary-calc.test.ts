import { describe, it, expect } from "vitest";
import {
  storageVolumeM3, capacityKg, wallPressureKpa, ventilationOpenings,
  moistureCheckIntervalDays, ratGuardCount, dryingDays,
  spoilageLossPercent, turnoverIntervalDays, constructionCost, grainTypes,
} from "../granary-calc.js";

describe("storageVolumeM3", () => {
  it("positive volume", () => {
    expect(storageVolumeM3(10, 5, 3)).toBe(150);
  });
});

describe("capacityKg", () => {
  it("wheat heaviest", () => {
    expect(capacityKg(100, "wheat")).toBeGreaterThan(capacityKg(100, "oats"));
  });
});

describe("wallPressureKpa", () => {
  it("positive pressure", () => {
    expect(wallPressureKpa(3, "wheat")).toBeGreaterThan(0);
  });
});

describe("ventilationOpenings", () => {
  it("at least 2", () => {
    expect(ventilationOpenings(5)).toBe(2);
  });
});

describe("moistureCheckIntervalDays", () => {
  it("oats most frequent", () => {
    expect(moistureCheckIntervalDays("oats")).toBeLessThan(moistureCheckIntervalDays("wheat"));
  });
});

describe("ratGuardCount", () => {
  it("at least 2", () => {
    expect(ratGuardCount(3)).toBe(2);
  });
});

describe("dryingDays", () => {
  it("zero if already dry", () => {
    expect(dryingDays(12, 14)).toBe(0);
  });
  it("positive if too moist", () => {
    expect(dryingDays(20, 14)).toBeGreaterThan(0);
  });
});

describe("spoilageLossPercent", () => {
  it("positive loss for long storage", () => {
    expect(spoilageLossPercent(100, 5)).toBeGreaterThan(0);
  });
});

describe("turnoverIntervalDays", () => {
  it("millet longest", () => {
    expect(turnoverIntervalDays("millet")).toBeGreaterThan(turnoverIntervalDays("oats"));
  });
});

describe("constructionCost", () => {
  it("positive cost", () => {
    expect(constructionCost(50, 100)).toBeGreaterThan(0);
  });
});

describe("grainTypes", () => {
  it("returns 5 types", () => {
    expect(grainTypes()).toHaveLength(5);
  });
});
