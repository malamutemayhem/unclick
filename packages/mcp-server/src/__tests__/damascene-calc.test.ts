import { describe, it, expect } from "vitest";
import {
  grooveDepthMm, wireGaugeMm, goldWeightG, silverWeightG,
  crosshatchLines, hammerBlows, annealingTemp, patternComplexity,
  polishStages, costEstimate, inlayMetals,
} from "../damascene-calc.js";

describe("grooveDepthMm", () => {
  it("steel depth", () => {
    expect(grooveDepthMm("steel")).toBe(0.5);
  });
});

describe("wireGaugeMm", () => {
  it("slightly larger than groove", () => {
    expect(wireGaugeMm(0.5)).toBeGreaterThan(0.5);
  });
});

describe("goldWeightG", () => {
  it("positive grams", () => {
    expect(goldWeightG(10, 0.1)).toBeGreaterThan(0);
  });
});

describe("silverWeightG", () => {
  it("lighter than gold", () => {
    expect(silverWeightG(10, 0.1)).toBeLessThan(goldWeightG(10, 0.1));
  });
});

describe("crosshatchLines", () => {
  it("positive count", () => {
    expect(crosshatchLines(4, 0.5)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(crosshatchLines(4, 0)).toBe(0);
  });
});

describe("hammerBlows", () => {
  it("positive blows", () => {
    expect(hammerBlows(5, 1)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(hammerBlows(5, 0)).toBe(0);
  });
});

describe("annealingTemp", () => {
  it("platinum hottest", () => {
    expect(annealingTemp("platinum")).toBeGreaterThan(annealingTemp("gold"));
  });
});

describe("patternComplexity", () => {
  it("positive score", () => {
    expect(patternComplexity(10, 3)).toBeGreaterThan(0);
  });
});

describe("polishStages", () => {
  it("mirror more than rough", () => {
    expect(polishStages("mirror")).toBeGreaterThan(polishStages("rough"));
  });
});

describe("costEstimate", () => {
  it("positive cost", () => {
    expect(costEstimate(5, 60, 10, 50)).toBeGreaterThan(0);
  });
});

describe("inlayMetals", () => {
  it("returns 4 metals", () => {
    expect(inlayMetals()).toHaveLength(4);
  });
});
