import { describe, it, expect } from "vitest";
import {
  etchDepth, creamAmount, acidConcentration, canEtch,
  sandblastPressure, gritSize, maskingTape, stencilArea,
  safetyGear, processingTime, costPerPiece, etchMethods,
} from "../glass-etching.js";

describe("etchDepth", () => {
  it("sandblast deepest per minute", () => {
    expect(etchDepth("sandblast", 1)).toBeGreaterThan(etchDepth("cream", 1));
  });
  it("longer = deeper", () => {
    expect(etchDepth("acid", 10)).toBeGreaterThan(etchDepth("acid", 1));
  });
});

describe("creamAmount", () => {
  it("positive ml", () => {
    expect(creamAmount(100)).toBeGreaterThan(0);
  });
});

describe("acidConcentration", () => {
  it("tempered = 0% (cannot etch)", () => {
    expect(acidConcentration("tempered")).toBe(0);
  });
  it("borosilicate needs higher concentration", () => {
    expect(acidConcentration("borosilicate")).toBeGreaterThan(acidConcentration("soda_lime"));
  });
});

describe("canEtch", () => {
  it("tempered = false", () => {
    expect(canEtch("tempered")).toBe(false);
  });
  it("soda lime = true", () => {
    expect(canEtch("soda_lime")).toBe(true);
  });
});

describe("sandblastPressure", () => {
  it("positive psi", () => {
    expect(sandblastPressure("soda_lime")).toBeGreaterThan(0);
  });
});

describe("gritSize", () => {
  it("fine is highest mesh", () => {
    expect(gritSize("fine")).toBeGreaterThan(gritSize("coarse"));
  });
});

describe("maskingTape", () => {
  it("positive meters", () => {
    expect(maskingTape(100)).toBeGreaterThan(0);
  });
});

describe("stencilArea", () => {
  it("positive cm2", () => {
    expect(stencilArea(10, 15)).toBe(150);
  });
});

describe("safetyGear", () => {
  it("always includes gloves", () => {
    expect(safetyGear("cream")).toContain("gloves");
  });
  it("acid needs fume hood", () => {
    expect(safetyGear("acid")).toContain("fume hood");
  });
  it("sandblast needs respirator", () => {
    expect(safetyGear("sandblast")).toContain("respirator");
  });
});

describe("processingTime", () => {
  it("positive minutes", () => {
    expect(processingTime(100, "cream")).toBeGreaterThan(0);
  });
});

describe("costPerPiece", () => {
  it("laser most expensive", () => {
    expect(costPerPiece("laser", 100)).toBeGreaterThan(costPerPiece("sandblast", 100));
  });
});

describe("etchMethods", () => {
  it("returns 5 methods", () => {
    expect(etchMethods()).toHaveLength(5);
  });
});
