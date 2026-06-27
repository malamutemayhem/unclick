import { describe, it, expect } from "vitest";
import {
  fermentationTempCelsius, fermentationHours, strainCount,
  tanginess, thickness, reusable,
  probioticDiversity, shelfStability, costPerDose, yogurtCultures,
} from "../yogurt-culture-calc.js";

describe("fermentationTempCelsius", () => {
  it("thermophilic is warmest", () => {
    expect(fermentationTempCelsius("thermophilic")).toBeGreaterThan(
      fermentationTempCelsius("mesophilic")
    );
  });
});

describe("fermentationHours", () => {
  it("heirloom takes longest", () => {
    expect(fermentationHours("heirloom")).toBeGreaterThan(
      fermentationHours("thermophilic")
    );
  });
});

describe("strainCount", () => {
  it("kefir grain has most strains", () => {
    expect(strainCount("kefir_grain")).toBeGreaterThan(
      strainCount("thermophilic")
    );
  });
});

describe("tanginess", () => {
  it("kefir grain is tangiest", () => {
    expect(tanginess("kefir_grain")).toBeGreaterThan(
      tanginess("bifido")
    );
  });
});

describe("thickness", () => {
  it("thermophilic is thickest", () => {
    expect(thickness("thermophilic")).toBeGreaterThan(
      thickness("kefir_grain")
    );
  });
});

describe("reusable", () => {
  it("heirloom is reusable", () => {
    expect(reusable("heirloom")).toBe(true);
  });
  it("thermophilic is not", () => {
    expect(reusable("thermophilic")).toBe(false);
  });
});

describe("probioticDiversity", () => {
  it("kefir grain has most diversity", () => {
    expect(probioticDiversity("kefir_grain")).toBeGreaterThan(
      probioticDiversity("thermophilic")
    );
  });
});

describe("shelfStability", () => {
  it("thermophilic is most shelf stable", () => {
    expect(shelfStability("thermophilic")).toBeGreaterThan(
      shelfStability("kefir_grain")
    );
  });
});

describe("costPerDose", () => {
  it("kefir grain is most expensive", () => {
    expect(costPerDose("kefir_grain")).toBeGreaterThan(
      costPerDose("thermophilic")
    );
  });
});

describe("yogurtCultures", () => {
  it("returns 5 cultures", () => {
    expect(yogurtCultures()).toHaveLength(5);
  });
});
