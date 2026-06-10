import { describe, it, expect } from "vitest";
import {
  wallWidthCm, batterAngleDeg, throughStonesPerM, copingStonesPerM,
  tonnesPerMLength, buildTimeHoursPerM, stabilityRating, maxHeightM,
  costPerMeterLength, wallStyles,
} from "../dry-stone-calc.js";

describe("wallWidthCm", () => {
  it("taller wall is wider", () => {
    expect(wallWidthCm(2)).toBeGreaterThan(wallWidthCm(1));
  });
});

describe("batterAngleDeg", () => {
  it("galloway has steepest batter", () => {
    expect(batterAngleDeg("galloway")).toBeGreaterThan(
      batterAngleDeg("chequer")
    );
  });
});

describe("throughStonesPerM", () => {
  it("taller wall needs more through stones", () => {
    expect(throughStonesPerM(2)).toBeGreaterThan(throughStonesPerM(1));
  });
});

describe("copingStonesPerM", () => {
  it("returns 5", () => {
    expect(copingStonesPerM()).toBe(5);
  });
});

describe("tonnesPerMLength", () => {
  it("taller = heavier", () => {
    expect(tonnesPerMLength(2, 60)).toBeGreaterThan(tonnesPerMLength(1, 60));
  });
});

describe("buildTimeHoursPerM", () => {
  it("chequer takes longest", () => {
    expect(buildTimeHoursPerM("chequer")).toBeGreaterThan(
      buildTimeHoursPerM("random_rubble")
    );
  });
});

describe("stabilityRating", () => {
  it("chequer is most stable", () => {
    expect(stabilityRating("chequer")).toBeGreaterThan(
      stabilityRating("random_rubble")
    );
  });
});

describe("maxHeightM", () => {
  it("chequer can go tallest", () => {
    expect(maxHeightM("chequer")).toBeGreaterThan(maxHeightM("galloway"));
  });
});

describe("costPerMeterLength", () => {
  it("chequer is most expensive", () => {
    expect(costPerMeterLength("chequer")).toBeGreaterThan(
      costPerMeterLength("random_rubble")
    );
  });
});

describe("wallStyles", () => {
  it("returns 5 styles", () => {
    expect(wallStyles()).toHaveLength(5);
  });
});
