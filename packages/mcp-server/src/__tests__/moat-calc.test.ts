import { describe, it, expect } from "vitest";
import {
  widthM, depthM, crossSectionAreaM2, perimeterLengthM,
  volumeM3, waterSourceFlowLps, excavationDays, retainingWallLengthM,
  defenseRating, maintenanceCostPerYear, moatTypes,
} from "../moat-calc.js";

describe("widthM", () => {
  it("1.5x wall height", () => {
    expect(widthM(10)).toBe(15);
  });
});

describe("depthM", () => {
  it("40% of width", () => {
    expect(depthM(15)).toBe(6);
  });
});

describe("crossSectionAreaM2", () => {
  it("positive area", () => {
    expect(crossSectionAreaM2(15, 6)).toBeGreaterThan(0);
  });
});

describe("perimeterLengthM", () => {
  it("curtain plus 20", () => {
    expect(perimeterLengthM(200)).toBe(220);
  });
});

describe("volumeM3", () => {
  it("positive volume", () => {
    expect(volumeM3(72, 220)).toBeGreaterThan(0);
  });
});

describe("waterSourceFlowLps", () => {
  it("positive flow", () => {
    expect(waterSourceFlowLps(15840, 30)).toBeGreaterThan(0);
  });
  it("zero days = 0", () => {
    expect(waterSourceFlowLps(15840, 0)).toBe(0);
  });
});

describe("excavationDays", () => {
  it("positive days", () => {
    expect(excavationDays(15840, 50)).toBeGreaterThan(0);
  });
  it("zero workers = 0", () => {
    expect(excavationDays(15840, 0)).toBe(0);
  });
});

describe("retainingWallLengthM", () => {
  it("perimeter times sides", () => {
    expect(retainingWallLengthM(220, 2)).toBe(440);
  });
});

describe("defenseRating", () => {
  it("double highest", () => {
    expect(defenseRating("double")).toBeGreaterThan(defenseRating("partial"));
  });
});

describe("maintenanceCostPerYear", () => {
  it("double most expensive", () => {
    expect(maintenanceCostPerYear(15840, "double", 10)).toBeGreaterThan(
      maintenanceCostPerYear(15840, "dry", 10)
    );
  });
});

describe("moatTypes", () => {
  it("returns 5 types", () => {
    expect(moatTypes()).toHaveLength(5);
  });
});
