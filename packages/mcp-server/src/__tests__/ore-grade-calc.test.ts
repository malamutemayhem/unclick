import { describe, it, expect } from "vitest";
import {
  gradeGPerTonne, stripRatio, recoveryPercent, metalContentKg,
  concentrateRatio, crushingStagePasses, grindingEnergyKwhPerT,
  tailingsDensityKgPerM3, cutoffGrade, oreTypes,
} from "../ore-grade-calc.js";

describe("gradeGPerTonne", () => {
  it("iron highest grade", () => {
    expect(gradeGPerTonne("iron")).toBeGreaterThan(gradeGPerTonne("gold"));
  });
});

describe("stripRatio", () => {
  it("more overburden = higher ratio", () => {
    expect(stripRatio(20, 5)).toBeGreaterThan(stripRatio(10, 5));
  });
  it("zero ore thickness returns zero", () => {
    expect(stripRatio(20, 0)).toBe(0);
  });
});

describe("recoveryPercent", () => {
  it("iron highest recovery", () => {
    expect(recoveryPercent("iron")).toBeGreaterThan(recoveryPercent("tin"));
  });
});

describe("metalContentKg", () => {
  it("positive for valid inputs", () => {
    expect(metalContentKg(1000, 5, 92)).toBeGreaterThan(0);
  });
});

describe("concentrateRatio", () => {
  it("gold has highest ratio", () => {
    expect(concentrateRatio("gold")).toBeGreaterThan(concentrateRatio("iron"));
  });
});

describe("crushingStagePasses", () => {
  it("hard rock needs most passes", () => {
    expect(crushingStagePasses("hard")).toBeGreaterThan(crushingStagePasses("soft"));
  });
});

describe("grindingEnergyKwhPerT", () => {
  it("hard rock uses most energy", () => {
    expect(grindingEnergyKwhPerT("hard")).toBeGreaterThan(grindingEnergyKwhPerT("soft"));
  });
});

describe("tailingsDensityKgPerM3", () => {
  it("iron tailings densest", () => {
    expect(tailingsDensityKgPerM3("iron")).toBeGreaterThan(tailingsDensityKgPerM3("silver"));
  });
});

describe("cutoffGrade", () => {
  it("higher cost = higher cutoff", () => {
    expect(cutoffGrade("gold", 60000, 100)).toBeGreaterThan(cutoffGrade("gold", 60000, 50));
  });
  it("zero price returns zero", () => {
    expect(cutoffGrade("gold", 0, 100)).toBe(0);
  });
});

describe("oreTypes", () => {
  it("returns 5 types", () => {
    expect(oreTypes()).toHaveLength(5);
  });
});
