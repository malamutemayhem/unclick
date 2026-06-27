import { describe, it, expect } from "vitest";
import {
  revenueContribution, administrativeComplexity, complianceCost,
  economicDistortion, progressivity, progressive,
  collectedAtPoint, taxBase, collectionFrequency, taxTypes,
} from "../tax-type-calc.js";

describe("revenueContribution", () => {
  it("income tax highest revenue", () => {
    expect(revenueContribution("income")).toBeGreaterThan(
      revenueContribution("excise")
    );
  });
});

describe("administrativeComplexity", () => {
  it("income tax most complex", () => {
    expect(administrativeComplexity("income")).toBeGreaterThan(
      administrativeComplexity("excise")
    );
  });
});

describe("complianceCost", () => {
  it("income tax highest compliance cost", () => {
    expect(complianceCost("income")).toBeGreaterThan(
      complianceCost("sales")
    );
  });
});

describe("economicDistortion", () => {
  it("capital gains most distortionary", () => {
    expect(economicDistortion("capital_gains")).toBeGreaterThan(
      economicDistortion("property")
    );
  });
});

describe("progressivity", () => {
  it("income tax most progressive", () => {
    expect(progressivity("income")).toBeGreaterThan(
      progressivity("excise")
    );
  });
});

describe("progressive", () => {
  it("income is progressive", () => {
    expect(progressive("income")).toBe(true);
  });
  it("sales is not", () => {
    expect(progressive("sales")).toBe(false);
  });
});

describe("collectedAtPoint", () => {
  it("sales collected at point of sale", () => {
    expect(collectedAtPoint("sales")).toBe(true);
  });
  it("income is not", () => {
    expect(collectedAtPoint("income")).toBe(false);
  });
});

describe("taxBase", () => {
  it("property based on real estate value", () => {
    expect(taxBase("property")).toBe("real_estate_value");
  });
});

describe("collectionFrequency", () => {
  it("sales per transaction", () => {
    expect(collectionFrequency("sales")).toBe("per_transaction");
  });
});

describe("taxTypes", () => {
  it("returns 5 types", () => {
    expect(taxTypes()).toHaveLength(5);
  });
});
