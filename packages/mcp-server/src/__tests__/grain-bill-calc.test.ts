import { describe, it, expect } from "vitest";
import {
  baseGrainPercent, mashTempCelsius, fermentationDays,
  flavorComplexity, bodyRating, spiciness,
  sweetness, agingYearsMin, costPerBushel, grainBills,
} from "../grain-bill-calc.js";

describe("baseGrainPercent", () => {
  it("single malt is 100% base grain", () => {
    expect(baseGrainPercent("single_malt")).toBe(100);
  });
});

describe("mashTempCelsius", () => {
  it("corn whiskey mashes at highest temp", () => {
    expect(mashTempCelsius("corn_whiskey")).toBeGreaterThan(
      mashTempCelsius("rye_whiskey")
    );
  });
});

describe("fermentationDays", () => {
  it("single malt ferments longest", () => {
    expect(fermentationDays("single_malt")).toBeGreaterThan(
      fermentationDays("corn_whiskey")
    );
  });
});

describe("flavorComplexity", () => {
  it("single malt is most complex", () => {
    expect(flavorComplexity("single_malt")).toBeGreaterThan(
      flavorComplexity("corn_whiskey")
    );
  });
});

describe("bodyRating", () => {
  it("single malt has most body", () => {
    expect(bodyRating("single_malt")).toBeGreaterThan(
      bodyRating("wheat_whiskey")
    );
  });
});

describe("spiciness", () => {
  it("rye whiskey is spiciest", () => {
    expect(spiciness("rye_whiskey")).toBeGreaterThan(
      spiciness("corn_whiskey")
    );
  });
});

describe("sweetness", () => {
  it("corn whiskey is sweetest", () => {
    expect(sweetness("corn_whiskey")).toBeGreaterThan(
      sweetness("rye_whiskey")
    );
  });
});

describe("agingYearsMin", () => {
  it("single malt ages longest minimum", () => {
    expect(agingYearsMin("single_malt")).toBeGreaterThan(
      agingYearsMin("corn_whiskey")
    );
  });
});

describe("costPerBushel", () => {
  it("single malt costs most", () => {
    expect(costPerBushel("single_malt")).toBeGreaterThan(
      costPerBushel("corn_whiskey")
    );
  });
});

describe("grainBills", () => {
  it("returns 5 bills", () => {
    expect(grainBills()).toHaveLength(5);
  });
});
