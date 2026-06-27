import { describe, it, expect } from "vitest";
import {
  fermentationHours, idealTempCelsius, probioticStrains,
  tanginess, carbonation, grainGrowthRate,
  dairyFree, proteinGPerServing, costPerLiter, kefirTypes,
} from "../kefir-calc.js";

describe("fermentationHours", () => {
  it("water kefir ferments longest", () => {
    expect(fermentationHours("water_kefir")).toBeGreaterThan(
      fermentationHours("milk_kefir")
    );
  });
});

describe("idealTempCelsius", () => {
  it("coconut kefir is warmest", () => {
    expect(idealTempCelsius("coconut_kefir")).toBeGreaterThan(
      idealTempCelsius("milk_kefir")
    );
  });
});

describe("probioticStrains", () => {
  it("milk kefir has most strains", () => {
    expect(probioticStrains("milk_kefir")).toBeGreaterThan(
      probioticStrains("water_kefir")
    );
  });
});

describe("tanginess", () => {
  it("goat kefir is tangiest", () => {
    expect(tanginess("goat_kefir")).toBeGreaterThan(
      tanginess("water_kefir")
    );
  });
});

describe("carbonation", () => {
  it("water kefir is most carbonated", () => {
    expect(carbonation("water_kefir")).toBeGreaterThan(
      carbonation("milk_kefir")
    );
  });
});

describe("grainGrowthRate", () => {
  it("milk kefir grains grow fastest", () => {
    expect(grainGrowthRate("milk_kefir")).toBeGreaterThan(
      grainGrowthRate("coconut_kefir")
    );
  });
});

describe("dairyFree", () => {
  it("water kefir is dairy free", () => {
    expect(dairyFree("water_kefir")).toBe(true);
  });
  it("milk kefir is not", () => {
    expect(dairyFree("milk_kefir")).toBe(false);
  });
});

describe("proteinGPerServing", () => {
  it("milk kefir has most protein", () => {
    expect(proteinGPerServing("milk_kefir")).toBeGreaterThan(
      proteinGPerServing("coconut_kefir")
    );
  });
});

describe("costPerLiter", () => {
  it("cream kefir is most expensive", () => {
    expect(costPerLiter("cream_kefir")).toBeGreaterThan(
      costPerLiter("water_kefir")
    );
  });
});

describe("kefirTypes", () => {
  it("returns 5 types", () => {
    expect(kefirTypes()).toHaveLength(5);
  });
});
