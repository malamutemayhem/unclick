import { describe, it, expect } from "vitest";
import {
  visibilityKm, floorArea, wallThicknessCm, stairCount,
  beaconRange, garrisonSize, waterStorageLiters, arrowSlits,
  windLoad, towerShapes,
} from "../watchtower-calc.js";

describe("visibilityKm", () => {
  it("positive km", () => {
    expect(visibilityKm(30)).toBeGreaterThan(0);
  });
  it("higher tower = farther", () => {
    expect(visibilityKm(50)).toBeGreaterThan(visibilityKm(20));
  });
});

describe("floorArea", () => {
  it("round positive", () => {
    expect(floorArea("round", 5)).toBeGreaterThan(0);
  });
  it("square = side^2", () => {
    expect(floorArea("square", 4)).toBe(16);
  });
});

describe("wallThicknessCm", () => {
  it("stone thickest", () => {
    expect(wallThicknessCm(20, "stone")).toBeGreaterThan(wallThicknessCm(20, "timber"));
  });
});

describe("stairCount", () => {
  it("positive count", () => {
    expect(stairCount(20, 20)).toBeGreaterThan(0);
  });
  it("zero riser = 0", () => {
    expect(stairCount(20, 0)).toBe(0);
  });
});

describe("beaconRange", () => {
  it("positive km", () => {
    expect(beaconRange(50, 30)).toBeGreaterThan(0);
  });
});

describe("garrisonSize", () => {
  it("positive people", () => {
    expect(garrisonSize(3, 20)).toBeGreaterThan(0);
  });
});

describe("waterStorageLiters", () => {
  it("3L per person per day", () => {
    expect(waterStorageLiters(10, 30)).toBe(900);
  });
});

describe("arrowSlits", () => {
  it("positive count", () => {
    expect(arrowSlits(20, 2)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(arrowSlits(20, 0)).toBe(0);
  });
});

describe("windLoad", () => {
  it("positive newtons", () => {
    expect(windLoad(20, 5, 100)).toBeGreaterThan(0);
  });
});

describe("towerShapes", () => {
  it("returns 4 shapes", () => {
    expect(towerShapes()).toHaveLength(4);
  });
});
