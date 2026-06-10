import { describe, it, expect } from "vitest";
import {
  pigmentWeightG, binderWeightG, waterMl, steepingDays, viscosity,
  lightfastnessRating, waterproofWhenDry, shelfLifeMonths, phLevel,
  costPerLiter, inkTypes,
} from "../ink-formula-calc.js";

describe("pigmentWeightG", () => {
  it("carbon ink has most pigment", () => {
    expect(pigmentWeightG(100, "carbon")).toBeGreaterThan(pigmentWeightG(100, "walnut"));
  });
});

describe("binderWeightG", () => {
  it("carbon needs most binder", () => {
    expect(binderWeightG(100, "carbon")).toBeGreaterThan(binderWeightG(100, "walnut"));
  });
});

describe("waterMl", () => {
  it("85% of total volume", () => {
    expect(waterMl(100)).toBe(85);
  });
});

describe("steepingDays", () => {
  it("walnut steeps longest", () => {
    expect(steepingDays("walnut")).toBeGreaterThan(steepingDays("carbon"));
  });
});

describe("viscosity", () => {
  it("carbon is thickest", () => {
    expect(viscosity("carbon")).toBeGreaterThan(viscosity("walnut"));
  });
});

describe("lightfastnessRating", () => {
  it("carbon is most lightfast", () => {
    expect(lightfastnessRating("carbon")).toBeGreaterThan(lightfastnessRating("walnut"));
  });
});

describe("waterproofWhenDry", () => {
  it("carbon is waterproof", () => {
    expect(waterproofWhenDry("carbon")).toBe(true);
  });
  it("sepia is not waterproof", () => {
    expect(waterproofWhenDry("sepia")).toBe(false);
  });
});

describe("shelfLifeMonths", () => {
  it("carbon lasts longest", () => {
    expect(shelfLifeMonths("carbon")).toBeGreaterThan(shelfLifeMonths("walnut"));
  });
});

describe("phLevel", () => {
  it("iron gall is most acidic", () => {
    expect(phLevel("iron_gall")).toBeLessThan(phLevel("carbon"));
  });
});

describe("costPerLiter", () => {
  it("sepia most expensive", () => {
    expect(costPerLiter("sepia", 10)).toBeGreaterThan(costPerLiter("walnut", 10));
  });
});

describe("inkTypes", () => {
  it("returns 5 types", () => {
    expect(inkTypes()).toHaveLength(5);
  });
});
