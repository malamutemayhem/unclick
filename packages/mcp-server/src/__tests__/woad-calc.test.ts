import { describe, it, expect } from "vitest";
import {
  harvestKgPerM2, crushTimeMinutes, ballDiameterCm, couchingWeeks,
  couchingTempCelsius, turnsPerDay, dyeYieldGPerKgLeaf, dipsNeeded,
  costPerKgPigment, processStages,
} from "../woad-calc.js";

describe("harvestKgPerM2", () => {
  it("returns 0.8", () => {
    expect(harvestKgPerM2()).toBe(0.8);
  });
});

describe("crushTimeMinutes", () => {
  it("more kg = more time", () => {
    expect(crushTimeMinutes(5)).toBeGreaterThan(crushTimeMinutes(2));
  });
});

describe("ballDiameterCm", () => {
  it("larger batch = larger ball", () => {
    expect(ballDiameterCm(5)).toBeGreaterThan(ballDiameterCm(1));
  });
});

describe("couchingWeeks", () => {
  it("returns 9", () => {
    expect(couchingWeeks()).toBe(9);
  });
});

describe("couchingTempCelsius", () => {
  it("returns 55", () => {
    expect(couchingTempCelsius()).toBe(55);
  });
});

describe("turnsPerDay", () => {
  it("returns 3", () => {
    expect(turnsPerDay()).toBe(3);
  });
});

describe("dyeYieldGPerKgLeaf", () => {
  it("returns 3", () => {
    expect(dyeYieldGPerKgLeaf()).toBe(3);
  });
});

describe("dipsNeeded", () => {
  it("deeper color = more dips", () => {
    expect(dipsNeeded(5)).toBeGreaterThan(dipsNeeded(1));
  });
  it("minimum 1 dip", () => {
    expect(dipsNeeded(0)).toBeGreaterThanOrEqual(1);
  });
});

describe("costPerKgPigment", () => {
  it("returns 200", () => {
    expect(costPerKgPigment()).toBe(200);
  });
});

describe("processStages", () => {
  it("returns 5 stages", () => {
    expect(processStages()).toHaveLength(5);
  });
});
