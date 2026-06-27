import { describe, it, expect } from "vitest";
import {
  stapleLengthMm, softnessRating, strengthGPerTex,
  absorbencyPercent, pillResistance, luster,
  pesticidesUsed, bestProduct, costPerKg, cottonVarieties,
} from "../cotton-variety-calc.js";

describe("stapleLengthMm", () => {
  it("sea island has longest staple", () => {
    expect(stapleLengthMm("sea_island")).toBeGreaterThan(
      stapleLengthMm("upland")
    );
  });
});

describe("softnessRating", () => {
  it("sea island is softest", () => {
    expect(softnessRating("sea_island")).toBeGreaterThan(
      softnessRating("upland")
    );
  });
});

describe("strengthGPerTex", () => {
  it("sea island is strongest", () => {
    expect(strengthGPerTex("sea_island")).toBeGreaterThan(
      strengthGPerTex("upland")
    );
  });
});

describe("absorbencyPercent", () => {
  it("sea island absorbs most", () => {
    expect(absorbencyPercent("sea_island")).toBeGreaterThan(
      absorbencyPercent("upland")
    );
  });
});

describe("pillResistance", () => {
  it("sea island resists pilling best", () => {
    expect(pillResistance("sea_island")).toBeGreaterThan(
      pillResistance("upland")
    );
  });
});

describe("luster", () => {
  it("sea island has most luster", () => {
    expect(luster("sea_island")).toBeGreaterThan(
      luster("upland")
    );
  });
});

describe("pesticidesUsed", () => {
  it("organic uses no pesticides", () => {
    expect(pesticidesUsed("organic")).toBe(false);
  });
  it("upland uses pesticides", () => {
    expect(pesticidesUsed("upland")).toBe(true);
  });
});

describe("bestProduct", () => {
  it("organic best for baby clothing", () => {
    expect(bestProduct("organic")).toBe("baby_clothing");
  });
});

describe("costPerKg", () => {
  it("sea island costs most", () => {
    expect(costPerKg("sea_island")).toBeGreaterThan(
      costPerKg("upland")
    );
  });
});

describe("cottonVarieties", () => {
  it("returns 5 varieties", () => {
    expect(cottonVarieties()).toHaveLength(5);
  });
});
