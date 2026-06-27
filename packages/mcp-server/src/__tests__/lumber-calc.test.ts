import { describe, it, expect } from "vitest";
import {
  actualDimension, boardFeet, linearFeetToBoardFeet,
  boardFeetToLinearFeet, lumberCost, wasteAllowance,
  cutList, optimizeCuts, sheetsNeeded,
  woodWeight, screwsNeeded, glueCoverage, finishCoverage,
  WOOD_DENSITIES,
} from "../lumber-calc.js";

describe("actualDimension", () => {
  it("2x4 actual is 1.5x3.5", () => {
    const dim = actualDimension(4, 2);
    expect(dim).not.toBeNull();
    expect(dim!.actualWidth).toBe(3.5);
    expect(dim!.actualThickness).toBe(1.5);
  });

  it("null for unknown", () => {
    expect(actualDimension(99, 99)).toBeNull();
  });
});

describe("boardFeet", () => {
  it("1x12x12 = 1 BF", () => {
    expect(boardFeet(1, 12, 1)).toBe(1);
  });

  it("2x4x8 = 5.33 BF", () => {
    expect(boardFeet(2, 4, 8)).toBeCloseTo(5.33, 1);
  });
});

describe("linearFeetToBoardFeet / boardFeetToLinearFeet", () => {
  it("round trips", () => {
    const bf = linearFeetToBoardFeet(10, 4, 2);
    const lf = boardFeetToLinearFeet(bf, 4, 2);
    expect(lf).toBeCloseTo(10, 0);
  });
});

describe("lumberCost", () => {
  it("computes total cost", () => {
    expect(lumberCost(10, 5)).toBe(50);
  });
});

describe("wasteAllowance", () => {
  it("adds 10% by default", () => {
    expect(wasteAllowance(100)).toBe(110);
  });
});

describe("cutList", () => {
  it("computes pieces and waste", () => {
    const result = cutList(100, 96);
    expect(result.pieces).toBe(2);
    expect(result.waste).toBeCloseTo(92);
  });
});

describe("optimizeCuts", () => {
  it("minimizes stock usage", () => {
    const result = optimizeCuts([40, 30, 20, 50, 10], 96);
    expect(result.bins.length).toBeLessThanOrEqual(3);
    expect(result.waste).toBeGreaterThanOrEqual(0);
  });
});

describe("sheetsNeeded", () => {
  it("computes sheets for pieces", () => {
    expect(sheetsNeeded(10, 12, 12)).toBeGreaterThan(0);
  });
});

describe("woodWeight", () => {
  it("oak is heavier than pine", () => {
    expect(woodWeight(10, "oak")).toBeGreaterThan(woodWeight(10, "pine"));
  });
});

describe("screwsNeeded", () => {
  it("computes screw count", () => {
    expect(screwsNeeded(10)).toBe(20);
  });
});

describe("glueCoverage / finishCoverage", () => {
  it("positive coverage", () => {
    expect(glueCoverage(1000)).toBeGreaterThan(0);
    expect(finishCoverage(100, 2)).toBeGreaterThan(0);
  });
});

describe("WOOD_DENSITIES", () => {
  it("has multiple species", () => {
    expect(Object.keys(WOOD_DENSITIES).length).toBeGreaterThan(10);
  });
});
