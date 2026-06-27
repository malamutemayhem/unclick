import { describe, it, expect } from "vitest";
import {
  rangeMeters, accuracyRating, powerRating,
  reloadTimeSeconds, depthRatingMeters, silentOperation,
  maintenanceLevel, beginnerFriendly, costEstimate, spearfishMethods,
} from "../spearfishing-calc.js";

describe("rangeMeters", () => {
  it("band gun has longest range", () => {
    expect(rangeMeters("band_gun")).toBeGreaterThan(
      rangeMeters("polespear")
    );
  });
});

describe("accuracyRating", () => {
  it("band gun is most accurate", () => {
    expect(accuracyRating("band_gun")).toBeGreaterThan(
      accuracyRating("free_dive_knife")
    );
  });
});

describe("powerRating", () => {
  it("pneumatic gun is most powerful", () => {
    expect(powerRating("pneumatic_gun")).toBeGreaterThan(
      powerRating("polespear")
    );
  });
});

describe("reloadTimeSeconds", () => {
  it("band gun takes longest to reload", () => {
    expect(reloadTimeSeconds("band_gun")).toBeGreaterThan(
      reloadTimeSeconds("polespear")
    );
  });
});

describe("depthRatingMeters", () => {
  it("band gun works deepest", () => {
    expect(depthRatingMeters("band_gun")).toBeGreaterThan(
      depthRatingMeters("free_dive_knife")
    );
  });
});

describe("silentOperation", () => {
  it("polespear is silent", () => {
    expect(silentOperation("polespear")).toBe(true);
  });
  it("band gun is not", () => {
    expect(silentOperation("band_gun")).toBe(false);
  });
});

describe("maintenanceLevel", () => {
  it("pneumatic gun needs most maintenance", () => {
    expect(maintenanceLevel("pneumatic_gun")).toBeGreaterThan(
      maintenanceLevel("polespear")
    );
  });
});

describe("beginnerFriendly", () => {
  it("polespear is beginner friendly", () => {
    expect(beginnerFriendly("polespear")).toBe(true);
  });
  it("band gun is not", () => {
    expect(beginnerFriendly("band_gun")).toBe(false);
  });
});

describe("costEstimate", () => {
  it("pneumatic gun is most expensive", () => {
    expect(costEstimate("pneumatic_gun")).toBeGreaterThan(
      costEstimate("polespear")
    );
  });
});

describe("spearfishMethods", () => {
  it("returns 5 methods", () => {
    expect(spearfishMethods()).toHaveLength(5);
  });
});
