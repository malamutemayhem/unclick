import { describe, it, expect } from "vitest";
import {
  panelArea, openingPercent, latCount, totalLatLength,
  jointCount, weightKg, windLoadN, plantCoverageYears,
  lifespanYears, costEstimate, trellisMaterials,
} from "../trellis-calc.js";

describe("panelArea", () => {
  it("correct area", () => {
    expect(panelArea(100, 200)).toBe(2);
  });
});

describe("openingPercent", () => {
  it("between 0 and 100", () => {
    const pct = openingPercent(2, 8);
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(100);
  });
  it("zero = 0", () => {
    expect(openingPercent(0, 0)).toBe(0);
  });
});

describe("latCount", () => {
  it("positive count", () => {
    expect(latCount(200, 10)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(latCount(200, 0)).toBe(0);
  });
});

describe("totalLatLength", () => {
  it("positive length", () => {
    expect(totalLatLength(10, 20, 100, 200)).toBeGreaterThan(0);
  });
});

describe("jointCount", () => {
  it("product of lats", () => {
    expect(jointCount(5, 8)).toBe(40);
  });
});

describe("weightKg", () => {
  it("metal heaviest", () => {
    expect(weightKg(10, "metal")).toBeGreaterThan(weightKg(10, "bamboo"));
  });
});

describe("windLoadN", () => {
  it("positive force", () => {
    expect(windLoadN(20000, 50)).toBeGreaterThan(0);
  });
});

describe("plantCoverageYears", () => {
  it("positive years", () => {
    expect(plantCoverageYears(30, 200)).toBeGreaterThan(0);
  });
  it("zero growth = 0", () => {
    expect(plantCoverageYears(0, 200)).toBe(0);
  });
});

describe("lifespanYears", () => {
  it("metal longest", () => {
    expect(lifespanYears("metal")).toBeGreaterThan(lifespanYears("bamboo"));
  });
});

describe("costEstimate", () => {
  it("positive cost", () => {
    expect(costEstimate(10, 5, 40, 0.5)).toBeGreaterThan(0);
  });
});

describe("trellisMaterials", () => {
  it("returns 5 materials", () => {
    expect(trellisMaterials()).toHaveLength(5);
  });
});
