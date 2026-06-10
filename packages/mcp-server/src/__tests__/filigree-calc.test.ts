import { describe, it, expect } from "vitest";
import {
  wireGauge, wireLengthM, wireWeightG, solderJoints,
  annealingTemp, toolCount, workTimeHours, granulesCount,
  polishGrit, metalTypes,
} from "../filigree-calc.js";

describe("wireGauge", () => {
  it("finer for ultra_fine", () => {
    expect(wireGauge("ultra_fine")).toBeGreaterThan(wireGauge("coarse"));
  });
});

describe("wireLengthM", () => {
  it("positive meters", () => {
    expect(wireLengthM(0.01, 5)).toBeGreaterThan(0);
  });
});

describe("wireWeightG", () => {
  it("gold heaviest", () => {
    expect(wireWeightG(10, 22, "gold")).toBeGreaterThan(wireWeightG(10, 22, "copper"));
  });
});

describe("solderJoints", () => {
  it("segments minus 1", () => {
    expect(solderJoints(10)).toBe(9);
  });
});

describe("annealingTemp", () => {
  it("platinum highest", () => {
    expect(annealingTemp("platinum")).toBeGreaterThan(annealingTemp("silver"));
  });
});

describe("toolCount", () => {
  it("advanced most tools", () => {
    expect(toolCount("advanced")).toBeGreaterThan(toolCount("basic"));
  });
});

describe("workTimeHours", () => {
  it("more for fine detail", () => {
    expect(workTimeHours(50, "ultra_fine")).toBeGreaterThan(workTimeHours(50, "coarse"));
  });
});

describe("granulesCount", () => {
  it("positive count", () => {
    expect(granulesCount(10, 0.5)).toBeGreaterThan(0);
  });
  it("zero size = 0", () => {
    expect(granulesCount(10, 0)).toBe(0);
  });
});

describe("polishGrit", () => {
  it("finer each stage", () => {
    expect(polishGrit(2)).toBeGreaterThan(polishGrit(1));
  });
});

describe("metalTypes", () => {
  it("returns 4 types", () => {
    expect(metalTypes()).toHaveLength(4);
  });
});
