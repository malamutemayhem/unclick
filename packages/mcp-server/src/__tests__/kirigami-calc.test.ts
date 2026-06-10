import { describe, it, expect } from "vitest";
import {
  cutCount, foldCount, paperSize, paperWeightGsm, bladeAngle,
  symmetryAxes, layerCount, cuttingTime, popUpAngle, difficulty,
  foldPatterns,
} from "../kirigami-calc.js";

describe("cutCount", () => {
  it("8 per level", () => {
    expect(cutCount(5)).toBe(40);
  });
});

describe("foldCount", () => {
  it("60% of cuts", () => {
    expect(foldCount(10)).toBe(6);
  });
});

describe("paperSize", () => {
  it("2.2x finished size", () => {
    const s = paperSize(10, 15);
    expect(s.width).toBe(22);
    expect(s.height).toBe(33);
  });
});

describe("paperWeightGsm", () => {
  it("positive gsm", () => {
    expect(paperWeightGsm(0.2)).toBe(160);
  });
});

describe("bladeAngle", () => {
  it("steeper for thick paper", () => {
    expect(bladeAngle(200)).toBeGreaterThan(bladeAngle(60));
  });
});

describe("symmetryAxes", () => {
  it("modular = 4", () => {
    expect(symmetryAxes("modular")).toBe(4);
  });
});

describe("layerCount", () => {
  it("2^folds", () => {
    expect(layerCount(3)).toBe(8);
  });
});

describe("cuttingTime", () => {
  it("positive minutes", () => {
    expect(cuttingTime(20, 100)).toBeGreaterThan(0);
  });
  it("slower for thick paper", () => {
    expect(cuttingTime(20, 200)).toBeGreaterThan(cuttingTime(20, 100));
  });
});

describe("popUpAngle", () => {
  it("positive angle", () => {
    expect(popUpAngle(90, 5, 3)).toBeGreaterThan(0);
  });
  it("zero depth = 0", () => {
    expect(popUpAngle(90, 5, 0)).toBe(0);
  });
});

describe("difficulty", () => {
  it("beginner for simple", () => {
    expect(difficulty(5, 3)).toBe("beginner");
  });
  it("advanced for complex", () => {
    expect(difficulty(40, 10)).toBe("advanced");
  });
});

describe("foldPatterns", () => {
  it("returns 5 patterns", () => {
    expect(foldPatterns()).toHaveLength(5);
  });
});
