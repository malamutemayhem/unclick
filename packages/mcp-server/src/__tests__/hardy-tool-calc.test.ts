import { describe, it, expect } from "vitest";
import {
  shankSizeMm, workingEdgeAngleDeg, materialHardnessHrc, weightKg,
  forgeTimeMinutes, heatsRequired, tempered, versatilityRating,
  costEstimate, hardyTypes,
} from "../hardy-tool-calc.js";

describe("shankSizeMm", () => {
  it("1mm smaller than hardy hole", () => {
    expect(shankSizeMm(25)).toBe(24);
  });
});

describe("workingEdgeAngleDeg", () => {
  it("cold cut has steeper angle", () => {
    expect(workingEdgeAngleDeg("cold_cut")).toBeGreaterThan(
      workingEdgeAngleDeg("hot_cut")
    );
  });
  it("fuller has no edge angle", () => {
    expect(workingEdgeAngleDeg("fuller")).toBe(0);
  });
});

describe("materialHardnessHrc", () => {
  it("cold cut is hardest", () => {
    expect(materialHardnessHrc("cold_cut")).toBeGreaterThan(
      materialHardnessHrc("bending_fork")
    );
  });
});

describe("weightKg", () => {
  it("cold cut is heaviest", () => {
    expect(weightKg("cold_cut")).toBeGreaterThan(weightKg("bending_fork"));
  });
});

describe("forgeTimeMinutes", () => {
  it("cold cut takes longest", () => {
    expect(forgeTimeMinutes("cold_cut")).toBeGreaterThan(
      forgeTimeMinutes("bending_fork")
    );
  });
});

describe("heatsRequired", () => {
  it("cold cut needs most heats", () => {
    expect(heatsRequired("cold_cut")).toBeGreaterThan(
      heatsRequired("bending_fork")
    );
  });
});

describe("tempered", () => {
  it("hot cut is tempered", () => {
    expect(tempered("hot_cut")).toBe(true);
  });
  it("fuller is not tempered", () => {
    expect(tempered("fuller")).toBe(false);
  });
});

describe("versatilityRating", () => {
  it("hot cut is most versatile", () => {
    expect(versatilityRating("hot_cut")).toBeGreaterThan(
      versatilityRating("fuller")
    );
  });
});

describe("costEstimate", () => {
  it("cold cut is most expensive", () => {
    expect(costEstimate("cold_cut")).toBeGreaterThan(
      costEstimate("bending_fork")
    );
  });
});

describe("hardyTypes", () => {
  it("returns 5 types", () => {
    expect(hardyTypes()).toHaveLength(5);
  });
});
