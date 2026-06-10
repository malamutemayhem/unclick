import { describe, it, expect } from "vitest";
import {
  lifespanYears, thicknessMm, weightKgPerM2,
  frostResistance, installationDifficulty, naturalMaterial,
  bestClimate, repairDifficulty, costPerM2, slateGrades,
} from "../slate-roofing-calc.js";

describe("lifespanYears", () => {
  it("s1 standard lasts longest", () => {
    expect(lifespanYears("s1_standard")).toBeGreaterThan(
      lifespanYears("synthetic")
    );
  });
});

describe("thicknessMm", () => {
  it("s3 rough is thickest", () => {
    expect(thicknessMm("s3_rough")).toBeGreaterThan(
      thicknessMm("synthetic")
    );
  });
});

describe("weightKgPerM2", () => {
  it("s3 rough is heaviest", () => {
    expect(weightKgPerM2("s3_rough")).toBeGreaterThan(
      weightKgPerM2("synthetic")
    );
  });
});

describe("frostResistance", () => {
  it("s1 standard resists frost best", () => {
    expect(frostResistance("s1_standard")).toBeGreaterThan(
      frostResistance("salvaged")
    );
  });
});

describe("installationDifficulty", () => {
  it("salvaged is hardest to install", () => {
    expect(installationDifficulty("salvaged")).toBeGreaterThan(
      installationDifficulty("synthetic")
    );
  });
});

describe("naturalMaterial", () => {
  it("s1 standard is natural", () => {
    expect(naturalMaterial("s1_standard")).toBe(true);
  });
  it("synthetic is not natural", () => {
    expect(naturalMaterial("synthetic")).toBe(false);
  });
});

describe("bestClimate", () => {
  it("s1 standard works in any climate", () => {
    expect(bestClimate("s1_standard")).toBe("any");
  });
});

describe("repairDifficulty", () => {
  it("salvaged is hardest to repair", () => {
    expect(repairDifficulty("salvaged")).toBeGreaterThan(
      repairDifficulty("synthetic")
    );
  });
});

describe("costPerM2", () => {
  it("salvaged costs most", () => {
    expect(costPerM2("salvaged")).toBeGreaterThan(
      costPerM2("synthetic")
    );
  });
});

describe("slateGrades", () => {
  it("returns 5 grades", () => {
    expect(slateGrades()).toHaveLength(5);
  });
});
