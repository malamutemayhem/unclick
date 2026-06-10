import { describe, it, expect } from "vitest";
import {
  spanM, bearingLengthCm, depthCm, widthCm, weightKg,
  bendingMomentKnm, shearForceKn, deflectionMm,
  fireResistanceMinutes, costEstimate, lintelMaterials,
} from "../lintel-calc.js";

describe("spanM", () => {
  it("wider than opening", () => {
    expect(spanM(1.2, 0.15)).toBeGreaterThan(1.2);
  });
});

describe("bearingLengthCm", () => {
  it("10% of opening", () => {
    expect(bearingLengthCm(120)).toBe(12);
  });
});

describe("depthCm", () => {
  it("stone deeper than steel", () => {
    expect(depthCm(150, "stone")).toBeGreaterThan(depthCm(150, "steel"));
  });
});

describe("widthCm", () => {
  it("equals wall thickness", () => {
    expect(widthCm(30)).toBe(30);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(150, 30, 18, 2400)).toBeGreaterThan(0);
  });
});

describe("bendingMomentKnm", () => {
  it("positive moment", () => {
    expect(bendingMomentKnm(10, 1.5)).toBeGreaterThan(0);
  });
});

describe("shearForceKn", () => {
  it("positive force", () => {
    expect(shearForceKn(10, 1.5)).toBeGreaterThan(0);
  });
});

describe("deflectionMm", () => {
  it("positive deflection", () => {
    expect(deflectionMm(10, 1.5, 5000)).toBeGreaterThan(0);
  });
  it("zero EI = 0", () => {
    expect(deflectionMm(10, 1.5, 0)).toBe(0);
  });
});

describe("fireResistanceMinutes", () => {
  it("stone best", () => {
    expect(fireResistanceMinutes("stone")).toBeGreaterThan(fireResistanceMinutes("steel"));
  });
});

describe("costEstimate", () => {
  it("positive cost", () => {
    expect(costEstimate(1.5, "stone")).toBeGreaterThan(0);
  });
});

describe("lintelMaterials", () => {
  it("returns 5 materials", () => {
    expect(lintelMaterials()).toHaveLength(5);
  });
});
