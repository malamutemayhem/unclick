import { describe, it, expect } from "vitest";
import {
  plantMaterialKg, yieldPercent, extractionTimeHours, purityPercent,
  shelfLifeMonths, dilutionPercent, dropsPerMl, flashPointCelsius,
  costPerMl, extractionMethods,
} from "../essential-oil-calc.js";

describe("plantMaterialKg", () => {
  it("lower yield = more material needed", () => {
    expect(plantMaterialKg(100, 0.5)).toBeGreaterThan(plantMaterialKg(100, 3));
  });
  it("zero yield returns 0", () => {
    expect(plantMaterialKg(100, 0)).toBe(0);
  });
});

describe("yieldPercent", () => {
  it("solvent yields most", () => {
    expect(yieldPercent("solvent")).toBeGreaterThan(yieldPercent("enfleurage"));
  });
});

describe("extractionTimeHours", () => {
  it("enfleurage takes longest", () => {
    expect(extractionTimeHours("enfleurage")).toBeGreaterThan(
      extractionTimeHours("steam_distill")
    );
  });
});

describe("purityPercent", () => {
  it("enfleurage is purest", () => {
    expect(purityPercent("enfleurage")).toBeGreaterThan(purityPercent("solvent"));
  });
});

describe("shelfLifeMonths", () => {
  it("enfleurage lasts longest", () => {
    expect(shelfLifeMonths("enfleurage")).toBeGreaterThan(shelfLifeMonths("cold_press"));
  });
});

describe("dilutionPercent", () => {
  it("bath uses highest dilution", () => {
    expect(dilutionPercent("bath")).toBeGreaterThan(dilutionPercent("massage"));
  });
});

describe("dropsPerMl", () => {
  it("returns 20", () => {
    expect(dropsPerMl()).toBe(20);
  });
});

describe("flashPointCelsius", () => {
  it("enfleurage has highest flash point", () => {
    expect(flashPointCelsius("enfleurage")).toBeGreaterThan(
      flashPointCelsius("solvent")
    );
  });
});

describe("costPerMl", () => {
  it("enfleurage is most expensive", () => {
    expect(costPerMl("enfleurage")).toBeGreaterThan(costPerMl("solvent"));
  });
});

describe("extractionMethods", () => {
  it("returns 5 methods", () => {
    expect(extractionMethods()).toHaveLength(5);
  });
});
