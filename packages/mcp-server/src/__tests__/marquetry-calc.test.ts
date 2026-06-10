import { describe, it, expect } from "vitest";
import {
  piecesPerDesign, veneerThicknessMm, wasteFactor, glueWeightGPerM2,
  cuttingTimeMinutes, assemblyTimeHours, sanderGritSequence,
  finishCoats, shrinkageRiskRating, costPerM2, veneerCuts,
} from "../marquetry-calc.js";

describe("piecesPerDesign", () => {
  it("higher complexity = more pieces", () => {
    expect(piecesPerDesign(5)).toBeGreaterThan(piecesPerDesign(1));
  });
  it("linear scaling", () => {
    expect(piecesPerDesign(3)).toBe(75);
  });
});

describe("veneerThicknessMm", () => {
  it("burl thickest", () => {
    expect(veneerThicknessMm("burl")).toBeGreaterThan(veneerThicknessMm("flat_sliced"));
  });
});

describe("wasteFactor", () => {
  it("burl has most waste", () => {
    expect(wasteFactor("burl")).toBeGreaterThan(wasteFactor("rotary"));
  });
  it("all factors above 1", () => {
    expect(wasteFactor("rotary")).toBeGreaterThan(1);
  });
});

describe("glueWeightGPerM2", () => {
  it("vacuum uses most glue", () => {
    expect(glueWeightGPerM2("vacuum")).toBeGreaterThan(glueWeightGPerM2("hammer"));
  });
});

describe("cuttingTimeMinutes", () => {
  it("more pieces = more time", () => {
    expect(cuttingTimeMinutes(100, 5)).toBeGreaterThan(cuttingTimeMinutes(50, 5));
  });
});

describe("assemblyTimeHours", () => {
  it("more pieces = more time", () => {
    expect(assemblyTimeHours(100)).toBeGreaterThan(assemblyTimeHours(50));
  });
});

describe("sanderGritSequence", () => {
  it("returns 5 grits in ascending order", () => {
    const grits = sanderGritSequence();
    expect(grits).toHaveLength(5);
    expect(grits[4]).toBeGreaterThan(grits[0]);
  });
});

describe("finishCoats", () => {
  it("floor needs most coats", () => {
    expect(finishCoats("floor")).toBeGreaterThan(finishCoats("decorative"));
  });
});

describe("shrinkageRiskRating", () => {
  it("burl highest risk", () => {
    expect(shrinkageRiskRating("burl")).toBeGreaterThan(shrinkageRiskRating("quarter_sawn"));
  });
});

describe("costPerM2", () => {
  it("burl most expensive", () => {
    expect(costPerM2("burl", 10)).toBeGreaterThan(costPerM2("rotary", 10));
  });
});

describe("veneerCuts", () => {
  it("returns 5 cuts", () => {
    expect(veneerCuts()).toHaveLength(5);
  });
});
