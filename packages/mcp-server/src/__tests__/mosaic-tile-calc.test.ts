import { describe, it, expect } from "vitest";
import {
  tesseraePerM2, groutWeightKgPerM2, adhesiveLitersPerM2, weightKgPerM2,
  cuttingWastePercent, layingHoursPerM2, designComplexityMultiplier,
  sealerCoats, lifespanYears, costPerM2, tesseraeMaterials,
} from "../mosaic-tile-calc.js";

describe("tesseraePerM2", () => {
  it("smaller tiles = more per m2", () => {
    expect(tesseraePerM2(10)).toBeGreaterThan(tesseraePerM2(20));
  });
  it("zero size returns zero", () => {
    expect(tesseraePerM2(0)).toBe(0);
  });
});

describe("groutWeightKgPerM2", () => {
  it("larger gap = more grout", () => {
    expect(groutWeightKgPerM2(10, 3)).toBeGreaterThan(groutWeightKgPerM2(10, 1));
  });
});

describe("adhesiveLitersPerM2", () => {
  it("gold leaf needs most adhesive", () => {
    expect(adhesiveLitersPerM2("gold_leaf")).toBeGreaterThan(adhesiveLitersPerM2("ceramic"));
  });
});

describe("weightKgPerM2", () => {
  it("thicker = heavier", () => {
    expect(weightKgPerM2("marble", 10)).toBeGreaterThan(weightKgPerM2("marble", 5));
  });
  it("gold leaf densest", () => {
    expect(weightKgPerM2("gold_leaf", 5)).toBeGreaterThan(weightKgPerM2("ceramic", 5));
  });
});

describe("cuttingWastePercent", () => {
  it("smalti has most waste", () => {
    expect(cuttingWastePercent("smalti")).toBeGreaterThan(cuttingWastePercent("gold_leaf"));
  });
});

describe("layingHoursPerM2", () => {
  it("gold leaf takes longest", () => {
    expect(layingHoursPerM2("gold_leaf")).toBeGreaterThan(layingHoursPerM2("ceramic"));
  });
});

describe("designComplexityMultiplier", () => {
  it("figurative is 2.5x", () => {
    expect(designComplexityMultiplier(true)).toBe(2.5);
  });
  it("non-figurative is 1.0x", () => {
    expect(designComplexityMultiplier(false)).toBe(1.0);
  });
});

describe("sealerCoats", () => {
  it("exterior needs more coats", () => {
    expect(sealerCoats("exterior")).toBeGreaterThan(sealerCoats("interior"));
  });
});

describe("lifespanYears", () => {
  it("gold leaf lasts longest", () => {
    expect(lifespanYears("gold_leaf")).toBeGreaterThan(lifespanYears("ceramic"));
  });
});

describe("costPerM2", () => {
  it("gold leaf most expensive", () => {
    expect(costPerM2("gold_leaf", 10)).toBeGreaterThan(costPerM2("ceramic", 10));
  });
});

describe("tesseraeMaterials", () => {
  it("returns 5 materials", () => {
    expect(tesseraeMaterials()).toHaveLength(5);
  });
});
