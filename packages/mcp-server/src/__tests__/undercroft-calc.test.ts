import { describe, it, expect } from "vitest";
import {
  floorAreaM2, ceilingHeightM, columnCount, vaultBayCount,
  wallThicknessCm, ventilationOpenings, moistureRiskPercent,
  lightingPoints, loadCapacityKgPerM2, constructionCost, undercroftUses,
} from "../undercroft-calc.js";

describe("floorAreaM2", () => {
  it("length times width", () => {
    expect(floorAreaM2(10, 8)).toBe(80);
  });
});

describe("ceilingHeightM", () => {
  it("positive height", () => {
    expect(ceilingHeightM(5)).toBeGreaterThan(2);
  });
});

describe("columnCount", () => {
  it("zero for small areas", () => {
    expect(columnCount(20, 10)).toBe(0);
  });
  it("positive for large areas", () => {
    expect(columnCount(200, 4)).toBeGreaterThan(0);
  });
});

describe("vaultBayCount", () => {
  it("positive count", () => {
    expect(vaultBayCount(10, 8, 3)).toBeGreaterThan(0);
  });
  it("zero span = 0", () => {
    expect(vaultBayCount(10, 8, 0)).toBe(0);
  });
});

describe("wallThicknessCm", () => {
  it("positive thickness", () => {
    expect(wallThicknessCm(4)).toBeGreaterThan(0);
  });
});

describe("ventilationOpenings", () => {
  it("at least 2", () => {
    expect(ventilationOpenings(5)).toBe(2);
  });
});

describe("moistureRiskPercent", () => {
  it("burial highest risk", () => {
    expect(moistureRiskPercent("burial")).toBeGreaterThan(moistureRiskPercent("treasury"));
  });
});

describe("lightingPoints", () => {
  it("at least 1", () => {
    expect(lightingPoints(5)).toBe(1);
  });
});

describe("loadCapacityKgPerM2", () => {
  it("treasury highest", () => {
    expect(loadCapacityKgPerM2("treasury")).toBeGreaterThan(loadCapacityKgPerM2("burial"));
  });
});

describe("constructionCost", () => {
  it("treasury most expensive", () => {
    expect(constructionCost(80, "treasury", 500)).toBeGreaterThan(
      constructionCost(80, "storage", 500)
    );
  });
});

describe("undercroftUses", () => {
  it("returns 5 uses", () => {
    expect(undercroftUses()).toHaveLength(5);
  });
});
