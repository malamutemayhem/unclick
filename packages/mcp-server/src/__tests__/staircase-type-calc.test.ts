import { describe, it, expect } from "vitest";
import {
  spaceRequired, buildDifficulty, safetyRating,
  aestheticAppeal, maxFloors, wheelchairAccessible,
  openRiser, bestBuilding, costEstimate, staircaseTypes,
} from "../staircase-type-calc.js";

describe("spaceRequired", () => {
  it("spiral needs least space", () => {
    expect(spaceRequired("spiral")).toBeLessThan(
      spaceRequired("straight")
    );
  });
});

describe("buildDifficulty", () => {
  it("curved is hardest to build", () => {
    expect(buildDifficulty("curved")).toBeGreaterThan(
      buildDifficulty("straight")
    );
  });
});

describe("safetyRating", () => {
  it("straight is safest", () => {
    expect(safetyRating("straight")).toBeGreaterThan(
      safetyRating("spiral")
    );
  });
});

describe("aestheticAppeal", () => {
  it("curved has highest appeal", () => {
    expect(aestheticAppeal("curved")).toBeGreaterThan(
      aestheticAppeal("straight")
    );
  });
});

describe("maxFloors", () => {
  it("spiral serves most floors", () => {
    expect(maxFloors("spiral")).toBeGreaterThan(
      maxFloors("floating")
    );
  });
});

describe("wheelchairAccessible", () => {
  it("no staircase type is wheelchair accessible", () => {
    expect(wheelchairAccessible("straight")).toBe(false);
    expect(wheelchairAccessible("spiral")).toBe(false);
  });
});

describe("openRiser", () => {
  it("floating has open risers", () => {
    expect(openRiser("floating")).toBe(true);
  });
  it("straight does not", () => {
    expect(openRiser("straight")).toBe(false);
  });
});

describe("bestBuilding", () => {
  it("spiral best for tower", () => {
    expect(bestBuilding("spiral")).toBe("tower");
  });
});

describe("costEstimate", () => {
  it("curved costs most", () => {
    expect(costEstimate("curved")).toBeGreaterThan(
      costEstimate("straight")
    );
  });
});

describe("staircaseTypes", () => {
  it("returns 5 types", () => {
    expect(staircaseTypes()).toHaveLength(5);
  });
});
