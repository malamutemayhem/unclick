import { describe, it, expect } from "vitest";
import {
  weightKg, flukeAreaCm2, chainLengthM, chainLinkSizeMm,
  holdingPowerKn, scopeRatio, rodeLength, swingRadiusM,
  retrievalForceKn, costEstimate, anchorTypes,
} from "../anchor-calc.js";

describe("weightKg", () => {
  it("mushroom heaviest", () => {
    expect(weightKg(10, "mushroom")).toBeGreaterThan(weightKg(10, "grapnel"));
  });
});

describe("flukeAreaCm2", () => {
  it("positive area", () => {
    expect(flukeAreaCm2(15)).toBeGreaterThan(0);
  });
});

describe("chainLengthM", () => {
  it("5x depth", () => {
    expect(chainLengthM(10)).toBe(50);
  });
});

describe("chainLinkSizeMm", () => {
  it("positive size", () => {
    expect(chainLinkSizeMm(50)).toBeGreaterThan(10);
  });
});

describe("holdingPowerKn", () => {
  it("danforth best holding", () => {
    expect(holdingPowerKn(15, "danforth")).toBeGreaterThan(holdingPowerKn(15, "grapnel"));
  });
});

describe("scopeRatio", () => {
  it("severe conditions = 7", () => {
    expect(scopeRatio(10, true)).toBe(7);
  });
  it("normal conditions = 5", () => {
    expect(scopeRatio(10, false)).toBe(5);
  });
});

describe("rodeLength", () => {
  it("depth times scope", () => {
    expect(rodeLength(10, 5)).toBe(50);
  });
});

describe("swingRadiusM", () => {
  it("rode plus boat", () => {
    expect(swingRadiusM(50, 10)).toBe(60);
  });
});

describe("retrievalForceKn", () => {
  it("positive force", () => {
    expect(retrievalForceKn(15, 10)).toBeGreaterThan(0);
  });
});

describe("costEstimate", () => {
  it("grapnel most per kg", () => {
    expect(costEstimate("grapnel", 10, 10)).toBeGreaterThan(costEstimate("mushroom", 10, 10));
  });
});

describe("anchorTypes", () => {
  it("returns 5 types", () => {
    expect(anchorTypes()).toHaveLength(5);
  });
});
