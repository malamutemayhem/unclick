import { describe, it, expect } from "vitest";
import {
  seamWidthMm, oakumWeightGPerM, caulkingIronWidthMm, malletWeightKg,
  payingCompoundLitersPerM, waterResistanceRating, lifespanYears,
  applicationTimeMinPerM, costPerM, caulkingMaterials,
} from "../caulking-calc.js";

describe("seamWidthMm", () => {
  it("thicker planks = wider seam", () => {
    expect(seamWidthMm(40)).toBeGreaterThan(seamWidthMm(20));
  });
});

describe("oakumWeightGPerM", () => {
  it("wider seam = more oakum", () => {
    expect(oakumWeightGPerM(6)).toBeGreaterThan(oakumWeightGPerM(3));
  });
});

describe("caulkingIronWidthMm", () => {
  it("80% of seam width", () => {
    expect(caulkingIronWidthMm(10)).toBe(8);
  });
});

describe("malletWeightKg", () => {
  it("returns 1.5kg", () => {
    expect(malletWeightKg()).toBe(1.5);
  });
});

describe("payingCompoundLitersPerM", () => {
  it("oakum uses no paying compound", () => {
    expect(payingCompoundLitersPerM("oakum")).toBe(0);
  });
  it("tar pitch uses most", () => {
    expect(payingCompoundLitersPerM("tar_pitch")).toBeGreaterThan(
      payingCompoundLitersPerM("marine_sealant")
    );
  });
});

describe("waterResistanceRating", () => {
  it("marine sealant is most resistant", () => {
    expect(waterResistanceRating("marine_sealant")).toBeGreaterThan(
      waterResistanceRating("cotton")
    );
  });
});

describe("lifespanYears", () => {
  it("marine sealant lasts longest", () => {
    expect(lifespanYears("marine_sealant")).toBeGreaterThan(lifespanYears("cotton"));
  });
});

describe("applicationTimeMinPerM", () => {
  it("oakum takes longest", () => {
    expect(applicationTimeMinPerM("oakum")).toBeGreaterThan(
      applicationTimeMinPerM("marine_sealant")
    );
  });
});

describe("costPerM", () => {
  it("marine sealant is most expensive", () => {
    expect(costPerM("marine_sealant")).toBeGreaterThan(costPerM("cotton"));
  });
});

describe("caulkingMaterials", () => {
  it("returns 5 materials", () => {
    expect(caulkingMaterials()).toHaveLength(5);
  });
});
