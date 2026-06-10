import { describe, it, expect } from "vitest";
import {
  vatTempCelsius, reductionTimeHours, phTarget, dipsForMediumBlue,
  oxidationTimeMinutes, indigoGPerLiter, vatLifeDays, ecoRating,
  costPerLiter, vatMethods,
} from "../indigo-vat-calc.js";

describe("vatTempCelsius", () => {
  it("zinc lime is hottest", () => {
    expect(vatTempCelsius("zinc_lime")).toBeGreaterThanOrEqual(
      vatTempCelsius("fermentation")
    );
  });
});

describe("reductionTimeHours", () => {
  it("fermentation takes longest", () => {
    expect(reductionTimeHours("fermentation")).toBeGreaterThan(
      reductionTimeHours("sodium_hydrosulfite")
    );
  });
});

describe("phTarget", () => {
  it("zinc lime has highest pH", () => {
    expect(phTarget("zinc_lime")).toBeGreaterThan(phTarget("fermentation"));
  });
});

describe("dipsForMediumBlue", () => {
  it("returns 6", () => {
    expect(dipsForMediumBlue()).toBe(6);
  });
});

describe("oxidationTimeMinutes", () => {
  it("returns 20", () => {
    expect(oxidationTimeMinutes()).toBe(20);
  });
});

describe("indigoGPerLiter", () => {
  it("zinc lime uses most indigo", () => {
    expect(indigoGPerLiter("zinc_lime")).toBeGreaterThanOrEqual(
      indigoGPerLiter("fermentation")
    );
  });
});

describe("vatLifeDays", () => {
  it("fermentation vat lasts longest", () => {
    expect(vatLifeDays("fermentation")).toBeGreaterThan(
      vatLifeDays("sodium_hydrosulfite")
    );
  });
});

describe("ecoRating", () => {
  it("fermentation is most eco-friendly", () => {
    expect(ecoRating("fermentation")).toBeGreaterThan(
      ecoRating("zinc_lime")
    );
  });
});

describe("costPerLiter", () => {
  it("fructose is most expensive", () => {
    expect(costPerLiter("fructose")).toBeGreaterThan(
      costPerLiter("fermentation")
    );
  });
});

describe("vatMethods", () => {
  it("returns 5 methods", () => {
    expect(vatMethods()).toHaveLength(5);
  });
});
