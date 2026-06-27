import { describe, it, expect } from "vitest";
import {
  basketVolume, basketCount, fillWeightKg, wireMeshM2,
  retainingForceKn, drainageRate, wireDiameterMm,
  erosionProtectionYears, installTimeHours, costPerM, fillMaterials,
} from "../gabion-calc.js";

describe("basketVolume", () => {
  it("positive m3", () => {
    expect(basketVolume(2, 1, 1)).toBe(2);
  });
});

describe("basketCount", () => {
  it("positive count", () => {
    expect(basketCount(10, 3, 2, 1)).toBeGreaterThan(0);
  });
  it("zero basket size = 0", () => {
    expect(basketCount(10, 3, 0, 1)).toBe(0);
  });
});

describe("fillWeightKg", () => {
  it("cobble heaviest", () => {
    expect(fillWeightKg(1, "cobble")).toBeGreaterThan(fillWeightKg(1, "brick"));
  });
});

describe("wireMeshM2", () => {
  it("positive area", () => {
    expect(wireMeshM2(10, 4.5)).toBeGreaterThan(0);
  });
});

describe("retainingForceKn", () => {
  it("positive kN", () => {
    expect(retainingForceKn(3, 2, 1800)).toBeGreaterThan(0);
  });
});

describe("drainageRate", () => {
  it("positive rate", () => {
    expect(drainageRate(35, 2)).toBeGreaterThan(0);
  });
});

describe("wireDiameterMm", () => {
  it("increases with load", () => {
    expect(wireDiameterMm(50)).toBeGreaterThan(wireDiameterMm(10));
  });
});

describe("erosionProtectionYears", () => {
  it("pvc longest", () => {
    expect(erosionProtectionYears("pvc_coated")).toBeGreaterThan(erosionProtectionYears("galvanized"));
  });
});

describe("installTimeHours", () => {
  it("positive hours", () => {
    expect(installTimeHours(10)).toBeGreaterThan(0);
  });
});

describe("costPerM", () => {
  it("taller costs more", () => {
    expect(costPerM("stone", 3)).toBeGreaterThan(costPerM("stone", 1));
  });
});

describe("fillMaterials", () => {
  it("returns 5 materials", () => {
    expect(fillMaterials()).toHaveLength(5);
  });
});
