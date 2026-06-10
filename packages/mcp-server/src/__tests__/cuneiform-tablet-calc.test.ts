import { describe, it, expect } from "vitest";
import {
  tabletThicknessCm, impressionDepthMm, dryingDays,
  signsPerTablet, reusable, archivalYears,
  stylusType, weightGrams, costEstimate, cuneiformClays,
} from "../cuneiform-tablet-calc.js";

describe("tabletThicknessCm", () => {
  it("mixed chaff is thickest", () => {
    expect(tabletThicknessCm("mixed_chaff")).toBeGreaterThan(
      tabletThicknessCm("fired_ceramic")
    );
  });
});

describe("impressionDepthMm", () => {
  it("mixed chaff has deepest impressions", () => {
    expect(impressionDepthMm("mixed_chaff")).toBeGreaterThan(
      impressionDepthMm("fired_ceramic")
    );
  });
});

describe("dryingDays", () => {
  it("mixed chaff takes longest to dry", () => {
    expect(dryingDays("mixed_chaff")).toBeGreaterThan(
      dryingDays("fine_alluvial")
    );
  });
});

describe("signsPerTablet", () => {
  it("fired ceramic holds most signs", () => {
    expect(signsPerTablet("fired_ceramic")).toBeGreaterThan(
      signsPerTablet("mixed_chaff")
    );
  });
});

describe("reusable", () => {
  it("river silt is reusable", () => {
    expect(reusable("river_silt")).toBe(true);
  });
  it("fired ceramic is not", () => {
    expect(reusable("fired_ceramic")).toBe(false);
  });
});

describe("archivalYears", () => {
  it("fired ceramic lasts longest", () => {
    expect(archivalYears("fired_ceramic")).toBeGreaterThan(
      archivalYears("mixed_chaff")
    );
  });
});

describe("stylusType", () => {
  it("fired ceramic uses metal stylus", () => {
    expect(stylusType("fired_ceramic")).toBe("metal_stylus");
  });
});

describe("weightGrams", () => {
  it("mixed chaff is heaviest", () => {
    expect(weightGrams("mixed_chaff")).toBeGreaterThan(
      weightGrams("fine_alluvial")
    );
  });
});

describe("costEstimate", () => {
  it("fired ceramic is most expensive", () => {
    expect(costEstimate("fired_ceramic")).toBeGreaterThan(
      costEstimate("river_silt")
    );
  });
});

describe("cuneiformClays", () => {
  it("returns 5 clays", () => {
    expect(cuneiformClays()).toHaveLength(5);
  });
});
