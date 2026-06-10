import { describe, it, expect } from "vitest";
import {
  accuracyRatio, maxDistanceM, reductionRequired, rodRequired,
  readingsPerSetup, computationComplexity, speedPointsPerHour,
  elevationDifference, costEstimate, stadiaMethods,
} from "../stadia-calc.js";

describe("accuracyRatio", () => {
  it("electronic is most accurate", () => {
    expect(accuracyRatio("electronic")).toBeGreaterThan(
      accuracyRatio("fixed_hair")
    );
  });
});

describe("maxDistanceM", () => {
  it("electronic has longest range", () => {
    expect(maxDistanceM("electronic")).toBeGreaterThan(
      maxDistanceM("fixed_hair")
    );
  });
});

describe("reductionRequired", () => {
  it("fixed hair needs reduction", () => {
    expect(reductionRequired("fixed_hair")).toBe(true);
  });
  it("self reducing does not", () => {
    expect(reductionRequired("self_reducing")).toBe(false);
  });
});

describe("rodRequired", () => {
  it("fixed hair needs a rod", () => {
    expect(rodRequired("fixed_hair")).toBe(true);
  });
  it("electronic does not", () => {
    expect(rodRequired("electronic")).toBe(false);
  });
});

describe("readingsPerSetup", () => {
  it("electronic takes fewest readings", () => {
    expect(readingsPerSetup("electronic")).toBeLessThan(
      readingsPerSetup("fixed_hair")
    );
  });
});

describe("computationComplexity", () => {
  it("electronic is simplest", () => {
    expect(computationComplexity("electronic")).toBeLessThan(
      computationComplexity("tacheometric")
    );
  });
});

describe("speedPointsPerHour", () => {
  it("electronic is fastest", () => {
    expect(speedPointsPerHour("electronic")).toBeGreaterThan(
      speedPointsPerHour("fixed_hair")
    );
  });
});

describe("elevationDifference", () => {
  it("fixed hair can measure elevation", () => {
    expect(elevationDifference("fixed_hair")).toBe(true);
  });
  it("subtense bar cannot", () => {
    expect(elevationDifference("subtense_bar")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("electronic is most expensive", () => {
    expect(costEstimate("electronic")).toBeGreaterThan(
      costEstimate("fixed_hair")
    );
  });
});

describe("stadiaMethods", () => {
  it("returns 5 methods", () => {
    expect(stadiaMethods()).toHaveLength(5);
  });
});
