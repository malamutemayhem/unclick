import { describe, it, expect } from "vitest";
import {
  minimumRadiusMm, steamTimeMinutesPerCm, springbackPercent, overBendDeg,
  clampCount, dryingTimeHours, bestWoodSpecies, breakageRiskPercent,
  costRating, bendMethods,
} from "../plank-bend-calc.js";

describe("minimumRadiusMm", () => {
  it("laminate allows tightest bend", () => {
    expect(minimumRadiusMm(10, "laminate")).toBeLessThan(minimumRadiusMm(10, "steam"));
  });
});

describe("steamTimeMinutesPerCm", () => {
  it("thicker = longer steaming", () => {
    expect(steamTimeMinutesPerCm(3)).toBeGreaterThan(steamTimeMinutesPerCm(1));
  });
});

describe("springbackPercent", () => {
  it("green wood has most springback", () => {
    expect(springbackPercent("green_wood")).toBeGreaterThan(springbackPercent("laminate"));
  });
});

describe("overBendDeg", () => {
  it("compensates for springback", () => {
    expect(overBendDeg(90, 10)).toBeGreaterThan(90);
  });
});

describe("clampCount", () => {
  it("longer bend = more clamps", () => {
    expect(clampCount(50)).toBeGreaterThan(clampCount(20));
  });
  it("minimum 2 clamps", () => {
    expect(clampCount(5)).toBe(2);
  });
});

describe("dryingTimeHours", () => {
  it("green wood takes longest", () => {
    expect(dryingTimeHours("green_wood")).toBeGreaterThan(dryingTimeHours("steam"));
  });
});

describe("bestWoodSpecies", () => {
  it("steam bending uses white oak", () => {
    expect(bestWoodSpecies("steam")).toBe("white_oak");
  });
});

describe("breakageRiskPercent", () => {
  it("green wood has highest risk", () => {
    expect(breakageRiskPercent("green_wood")).toBeGreaterThan(
      breakageRiskPercent("laminate")
    );
  });
});

describe("costRating", () => {
  it("laminate is most expensive", () => {
    expect(costRating("laminate")).toBeGreaterThan(costRating("green_wood"));
  });
});

describe("bendMethods", () => {
  it("returns 5 methods", () => {
    expect(bendMethods()).toHaveLength(5);
  });
});
