import { describe, it, expect } from "vitest";
import {
  moistureTargetPercent, extractionMethod, crystallizationDays, colorGradeRating,
  antioxidantLevel, yieldKgPerHive, storageYears, uncappingTempCelsius,
  costPerKg, honeyTypes,
} from "../honey-harvest-calc.js";

describe("moistureTargetPercent", () => {
  it("returns 18", () => {
    expect(moistureTargetPercent()).toBe(18);
  });
});

describe("extractionMethod", () => {
  it("manuka uses crush and strain", () => {
    expect(extractionMethod("manuka")).toBe("crush_strain");
  });
  it("clover uses centrifuge", () => {
    expect(extractionMethod("clover")).toBe("centrifuge");
  });
});

describe("crystallizationDays", () => {
  it("acacia crystallizes slowest", () => {
    expect(crystallizationDays("acacia")).toBeGreaterThan(
      crystallizationDays("clover")
    );
  });
});

describe("colorGradeRating", () => {
  it("buckwheat is darkest", () => {
    expect(colorGradeRating("buckwheat")).toBeGreaterThan(
      colorGradeRating("clover")
    );
  });
});

describe("antioxidantLevel", () => {
  it("manuka has highest antioxidants", () => {
    expect(antioxidantLevel("manuka")).toBeGreaterThan(
      antioxidantLevel("clover")
    );
  });
});

describe("yieldKgPerHive", () => {
  it("clover yields most", () => {
    expect(yieldKgPerHive("clover")).toBeGreaterThan(
      yieldKgPerHive("manuka")
    );
  });
});

describe("storageYears", () => {
  it("returns 999 (effectively indefinite)", () => {
    expect(storageYears()).toBe(999);
  });
});

describe("uncappingTempCelsius", () => {
  it("returns 32", () => {
    expect(uncappingTempCelsius()).toBe(32);
  });
});

describe("costPerKg", () => {
  it("manuka is most expensive", () => {
    expect(costPerKg("manuka")).toBeGreaterThan(costPerKg("clover"));
  });
});

describe("honeyTypes", () => {
  it("returns 5 types", () => {
    expect(honeyTypes()).toHaveLength(5);
  });
});
