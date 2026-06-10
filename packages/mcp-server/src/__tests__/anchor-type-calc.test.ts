import { describe, it, expect } from "vitest";
import {
  holdingPower, setReliability, weightKg,
  storageEase, bottomSuitability, resetCapable,
  foldable, bestBoatSize, costEstimate, anchorTypes,
} from "../anchor-type-calc.js";

describe("holdingPower", () => {
  it("plow has most holding power", () => {
    expect(holdingPower("plow")).toBeGreaterThan(
      holdingPower("grapnel")
    );
  });
});

describe("setReliability", () => {
  it("plow sets most reliably", () => {
    expect(setReliability("plow")).toBeGreaterThan(
      setReliability("grapnel")
    );
  });
});

describe("weightKg", () => {
  it("mushroom is heaviest", () => {
    expect(weightKg("mushroom")).toBeGreaterThan(
      weightKg("grapnel")
    );
  });
});

describe("storageEase", () => {
  it("fluke is easiest to store", () => {
    expect(storageEase("fluke")).toBeGreaterThan(
      storageEase("mushroom")
    );
  });
});

describe("bottomSuitability", () => {
  it("grapnel best for rocky bottom", () => {
    expect(bottomSuitability("grapnel")).toBe("rocky");
  });
});

describe("resetCapable", () => {
  it("plow can reset", () => {
    expect(resetCapable("plow")).toBe(true);
  });
  it("fluke cannot", () => {
    expect(resetCapable("fluke")).toBe(false);
  });
});

describe("foldable", () => {
  it("fluke is foldable", () => {
    expect(foldable("fluke")).toBe(true);
  });
  it("plow is not", () => {
    expect(foldable("plow")).toBe(false);
  });
});

describe("bestBoatSize", () => {
  it("plow best for cruiser", () => {
    expect(bestBoatSize("plow")).toBe("cruiser");
  });
});

describe("costEstimate", () => {
  it("plow costs most", () => {
    expect(costEstimate("plow")).toBeGreaterThan(
      costEstimate("grapnel")
    );
  });
});

describe("anchorTypes", () => {
  it("returns 5 types", () => {
    expect(anchorTypes()).toHaveLength(5);
  });
});
