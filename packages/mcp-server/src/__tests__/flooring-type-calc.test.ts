import { describe, it, expect } from "vitest";
import {
  durabilityYears, hardnessRating, moistureResistance,
  installComplexity, aestheticVersatility, underfloorHeatSafe,
  refinishable, bestApplication, costPerM2, flooringTypes,
} from "../flooring-type-calc.js";

describe("durabilityYears", () => {
  it("marble lasts longest", () => {
    expect(durabilityYears("marble")).toBeGreaterThan(
      durabilityYears("hardwood")
    );
  });
});

describe("hardnessRating", () => {
  it("terrazzo is hardest", () => {
    expect(hardnessRating("terrazzo")).toBeGreaterThan(
      hardnessRating("marble")
    );
  });
});

describe("moistureResistance", () => {
  it("terrazzo resists moisture best", () => {
    expect(moistureResistance("terrazzo")).toBeGreaterThan(
      moistureResistance("hardwood")
    );
  });
});

describe("installComplexity", () => {
  it("terrazzo is hardest to install", () => {
    expect(installComplexity("terrazzo")).toBeGreaterThan(
      installComplexity("hardwood")
    );
  });
});

describe("aestheticVersatility", () => {
  it("parquet is most versatile", () => {
    expect(aestheticVersatility("parquet")).toBeGreaterThan(
      aestheticVersatility("flagstone")
    );
  });
});

describe("underfloorHeatSafe", () => {
  it("marble is safe for underfloor heat", () => {
    expect(underfloorHeatSafe("marble")).toBe(true);
  });
  it("hardwood is not", () => {
    expect(underfloorHeatSafe("hardwood")).toBe(false);
  });
});

describe("refinishable", () => {
  it("hardwood is refinishable", () => {
    expect(refinishable("hardwood")).toBe(true);
  });
  it("flagstone is not", () => {
    expect(refinishable("flagstone")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("parquet best for ballroom", () => {
    expect(bestApplication("parquet")).toBe("ballroom");
  });
});

describe("costPerM2", () => {
  it("marble costs most", () => {
    expect(costPerM2("marble")).toBeGreaterThan(
      costPerM2("hardwood")
    );
  });
});

describe("flooringTypes", () => {
  it("returns 5 types", () => {
    expect(flooringTypes()).toHaveLength(5);
  });
});
