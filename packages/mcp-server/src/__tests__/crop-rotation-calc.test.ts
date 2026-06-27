import { describe, it, expect } from "vitest";
import {
  rotationYears, nitrogenEffect, soilStructureImpact,
  pestBreakBenefit, followsWell, heavyFeeder,
  diseaseRiskWithout, yieldBoostPercent, coverCropCompat, cropGroups,
} from "../crop-rotation-calc.js";

describe("rotationYears", () => {
  it("brassicas need longest rotation", () => {
    expect(rotationYears("brassicas")).toBeGreaterThan(
      rotationYears("alliums")
    );
  });
});

describe("nitrogenEffect", () => {
  it("legumes add nitrogen", () => {
    expect(nitrogenEffect("legumes")).toBeGreaterThan(0);
  });
  it("solanaceae depletes nitrogen", () => {
    expect(nitrogenEffect("solanaceae")).toBeLessThan(0);
  });
});

describe("soilStructureImpact", () => {
  it("legumes best for soil structure", () => {
    expect(soilStructureImpact("legumes")).toBeGreaterThan(
      soilStructureImpact("solanaceae")
    );
  });
});

describe("pestBreakBenefit", () => {
  it("solanaceae benefits most from pest break", () => {
    expect(pestBreakBenefit("solanaceae")).toBeGreaterThan(
      pestBreakBenefit("legumes")
    );
  });
});

describe("followsWell", () => {
  it("solanaceae follows legumes well", () => {
    expect(followsWell("solanaceae")).toBe("legumes");
  });
});

describe("heavyFeeder", () => {
  it("brassicas are heavy feeders", () => {
    expect(heavyFeeder("brassicas")).toBe(true);
  });
  it("legumes are not", () => {
    expect(heavyFeeder("legumes")).toBe(false);
  });
});

describe("diseaseRiskWithout", () => {
  it("solanaceae has highest disease risk without rotation", () => {
    expect(diseaseRiskWithout("solanaceae")).toBeGreaterThan(
      diseaseRiskWithout("legumes")
    );
  });
});

describe("yieldBoostPercent", () => {
  it("solanaceae gains most from rotation", () => {
    expect(yieldBoostPercent("solanaceae")).toBeGreaterThan(
      yieldBoostPercent("legumes")
    );
  });
});

describe("coverCropCompat", () => {
  it("legumes are most compatible with cover crops", () => {
    expect(coverCropCompat("legumes")).toBeGreaterThan(
      coverCropCompat("cucurbits")
    );
  });
});

describe("cropGroups", () => {
  it("returns 5 groups", () => {
    expect(cropGroups()).toHaveLength(5);
  });
});
