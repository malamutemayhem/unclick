import { describe, it, expect } from "vitest";
import {
  workingWidthM, depthCm, tineCount, draftForceKn,
  areaPerHourHectares, passesNeeded, weightKg, soilBreakupRating,
  weedControlRating, costEstimate, harrowTypes,
} from "../harrow-calc.js";

describe("workingWidthM", () => {
  it("chain widest", () => {
    expect(workingWidthM("chain")).toBeGreaterThan(workingWidthM("spike"));
  });
});

describe("depthCm", () => {
  it("power deepest", () => {
    expect(depthCm("power")).toBeGreaterThan(depthCm("chain"));
  });
});

describe("tineCount", () => {
  it("positive count", () => {
    expect(tineCount(2.0, 15)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(tineCount(2.0, 0)).toBe(0);
  });
});

describe("draftForceKn", () => {
  it("power highest force", () => {
    expect(draftForceKn("power", 3.5)).toBeGreaterThan(draftForceKn("chain", 4.0));
  });
});

describe("areaPerHourHectares", () => {
  it("positive area", () => {
    expect(areaPerHourHectares(3.0, 5)).toBeGreaterThan(0);
  });
});

describe("passesNeeded", () => {
  it("power fewest passes", () => {
    expect(passesNeeded("power")).toBeLessThan(passesNeeded("chain"));
  });
});

describe("weightKg", () => {
  it("power heaviest", () => {
    expect(weightKg("power")).toBeGreaterThan(weightKg("chain"));
  });
});

describe("soilBreakupRating", () => {
  it("power best", () => {
    expect(soilBreakupRating("power")).toBeGreaterThan(soilBreakupRating("chain"));
  });
});

describe("weedControlRating", () => {
  it("power best", () => {
    expect(weedControlRating("power")).toBeGreaterThan(weedControlRating("spike"));
  });
});

describe("costEstimate", () => {
  it("power most expensive", () => {
    expect(costEstimate("power", 100)).toBeGreaterThan(costEstimate("chain", 100));
  });
});

describe("harrowTypes", () => {
  it("returns 5 types", () => {
    expect(harrowTypes()).toHaveLength(5);
  });
});
