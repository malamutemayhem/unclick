import { describe, it, expect } from "vitest";
import {
  barWidthCm, barHeightCm, upperPaneArea, lowerPaneArea,
  structuralLoadKn, ventilationGap, glazingBarsCount,
  weatherSealLengthM, thermalBreakMm, costPerWindow, transomStyles,
} from "../transom-calc.js";

describe("barWidthCm", () => {
  it("5% of window", () => {
    expect(barWidthCm(100)).toBe(5);
  });
});

describe("barHeightCm", () => {
  it("positive height", () => {
    expect(barHeightCm(200, 0.65)).toBeGreaterThan(0);
  });
});

describe("upperPaneArea", () => {
  it("positive area", () => {
    expect(upperPaneArea(100, 200, 0.65)).toBeGreaterThan(0);
  });
});

describe("lowerPaneArea", () => {
  it("positive area", () => {
    expect(lowerPaneArea(100, 200, 0.65)).toBeGreaterThan(0);
  });
});

describe("structuralLoadKn", () => {
  it("positive load", () => {
    expect(structuralLoadKn(1, 300)).toBeGreaterThan(0);
  });
});

describe("ventilationGap", () => {
  it("operable has gap", () => {
    expect(ventilationGap("operable")).toBeGreaterThan(0);
  });
  it("fixed = 0", () => {
    expect(ventilationGap("fixed")).toBe(0);
  });
});

describe("glazingBarsCount", () => {
  it("positive count", () => {
    expect(glazingBarsCount(3, 2)).toBeGreaterThan(0);
  });
});

describe("weatherSealLengthM", () => {
  it("positive length", () => {
    expect(weatherSealLengthM(100, 5)).toBeGreaterThan(0);
  });
});

describe("thermalBreakMm", () => {
  it("structural thickest", () => {
    expect(thermalBreakMm("structural")).toBeGreaterThan(thermalBreakMm("decorative"));
  });
});

describe("costPerWindow", () => {
  it("decorative most expensive", () => {
    expect(costPerWindow("decorative", 100)).toBeGreaterThan(costPerWindow("fixed", 100));
  });
});

describe("transomStyles", () => {
  it("returns 5 styles", () => {
    expect(transomStyles()).toHaveLength(5);
  });
});
