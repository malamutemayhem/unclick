import { describe, it, expect } from "vitest";
import {
  strokeLength, crankAngle, journalDiameter, bearingLoad,
  counterweightMass, torsionalVibrationHz, oilFlowLpm,
  firingOrder, balanceFactor, shaftMaterials,
} from "../crankshaft-calc.js";

describe("strokeLength", () => {
  it("double the crank radius", () => {
    expect(strokeLength(50)).toBe(100);
  });
});

describe("crankAngle", () => {
  it("4 cyl spacing", () => {
    expect(crankAngle(2, 4)).toBe(180);
  });
  it("zero cylinders = 0", () => {
    expect(crankAngle(1, 0)).toBe(0);
  });
});

describe("journalDiameter", () => {
  it("positive mm", () => {
    expect(journalDiameter(500, "forged_steel")).toBeGreaterThan(0);
  });
});

describe("bearingLoad", () => {
  it("positive N", () => {
    expect(bearingLoad(3000, 50, 0.5)).toBeGreaterThan(0);
  });
});

describe("counterweightMass", () => {
  it("positive kg", () => {
    expect(counterweightMass(2, 50, 80)).toBeGreaterThan(0);
  });
  it("zero radius = 0", () => {
    expect(counterweightMass(2, 50, 0)).toBe(0);
  });
});

describe("torsionalVibrationHz", () => {
  it("positive Hz", () => {
    expect(torsionalVibrationHz(500, 60)).toBeGreaterThan(0);
  });
  it("zero length = 0", () => {
    expect(torsionalVibrationHz(0, 60)).toBe(0);
  });
});

describe("oilFlowLpm", () => {
  it("positive flow", () => {
    expect(oilFlowLpm(5, 3000)).toBeGreaterThan(0);
  });
});

describe("firingOrder", () => {
  it("4 cyl = 1-3-4-2", () => {
    expect(firingOrder(4)).toEqual([1, 3, 4, 2]);
  });
});

describe("balanceFactor", () => {
  it("90%+ = fully balanced", () => {
    expect(balanceFactor(95)).toBe("fully_balanced");
  });
});

describe("shaftMaterials", () => {
  it("returns 4 materials", () => {
    expect(shaftMaterials()).toHaveLength(4);
  });
});
