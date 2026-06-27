import { describe, it, expect } from "vitest";
import {
  processingDays, fiberQuality, colorConsistency,
  waterUsageLiters, environmentalImpact, laborIntensity,
  scalable, bestLinenGrade, costPerTon, rettingMethods,
} from "../flax-retting-calc.js";

describe("processingDays", () => {
  it("dew retting takes longest", () => {
    expect(processingDays("dew")).toBeGreaterThan(
      processingDays("chemical")
    );
  });
});

describe("fiberQuality", () => {
  it("water retting gives best quality", () => {
    expect(fiberQuality("water")).toBeGreaterThan(
      fiberQuality("chemical")
    );
  });
});

describe("colorConsistency", () => {
  it("chemical gives most consistent color", () => {
    expect(colorConsistency("chemical")).toBeGreaterThan(
      colorConsistency("dew")
    );
  });
});

describe("waterUsageLiters", () => {
  it("water retting uses most water", () => {
    expect(waterUsageLiters("water")).toBeGreaterThan(
      waterUsageLiters("dew")
    );
  });
});

describe("environmentalImpact", () => {
  it("chemical has worst environmental impact", () => {
    expect(environmentalImpact("chemical")).toBeGreaterThan(
      environmentalImpact("dew")
    );
  });
});

describe("laborIntensity", () => {
  it("dew retting is most labor intensive", () => {
    expect(laborIntensity("dew")).toBeGreaterThan(
      laborIntensity("steam")
    );
  });
});

describe("scalable", () => {
  it("chemical is scalable", () => {
    expect(scalable("chemical")).toBe(true);
  });
  it("dew is not scalable", () => {
    expect(scalable("dew")).toBe(false);
  });
});

describe("bestLinenGrade", () => {
  it("water retting makes premium linen", () => {
    expect(bestLinenGrade("water")).toBe("premium_linen");
  });
});

describe("costPerTon", () => {
  it("enzymatic costs most", () => {
    expect(costPerTon("enzymatic")).toBeGreaterThan(
      costPerTon("dew")
    );
  });
});

describe("rettingMethods", () => {
  it("returns 5 methods", () => {
    expect(rettingMethods()).toHaveLength(5);
  });
});
