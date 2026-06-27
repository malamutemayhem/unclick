import { describe, it, expect } from "vitest";
import {
  weightG, pointAngleDeg, stringLengthM, windDeflectionMm,
  settlingTimeSeconds, pendulumPeriodSeconds, verticalAccuracyMm,
  bodyDiameterMm, corrosionResistance, bobMaterials,
} from "../plumb-bob-calc.js";

describe("weightG", () => {
  it("lead is heaviest", () => {
    expect(weightG("lead")).toBeGreaterThan(weightG("brass"));
  });
});

describe("pointAngleDeg", () => {
  it("precision has sharpest point", () => {
    expect(pointAngleDeg("precision")).toBeLessThan(pointAngleDeg("rough"));
  });
});

describe("stringLengthM", () => {
  it("adds 0.3m to height", () => {
    expect(stringLengthM(3)).toBe(3.3);
  });
});

describe("windDeflectionMm", () => {
  it("stronger wind = more deflection", () => {
    expect(windDeflectionMm(5, 3, 400)).toBeGreaterThan(
      windDeflectionMm(2, 3, 400)
    );
  });
  it("zero weight returns zero", () => {
    expect(windDeflectionMm(5, 3, 0)).toBe(0);
  });
});

describe("settlingTimeSeconds", () => {
  it("longer string = longer settling", () => {
    expect(settlingTimeSeconds(5)).toBeGreaterThan(settlingTimeSeconds(2));
  });
});

describe("pendulumPeriodSeconds", () => {
  it("longer string = longer period", () => {
    expect(pendulumPeriodSeconds(5)).toBeGreaterThan(pendulumPeriodSeconds(2));
  });
});

describe("verticalAccuracyMm", () => {
  it("precision is most accurate", () => {
    expect(verticalAccuracyMm(3, "precision")).toBeLessThan(
      verticalAccuracyMm(3, "rough")
    );
  });
});

describe("bodyDiameterMm", () => {
  it("lead is widest", () => {
    expect(bodyDiameterMm("lead")).toBeGreaterThan(bodyDiameterMm("steel"));
  });
});

describe("corrosionResistance", () => {
  it("bronze has best corrosion resistance", () => {
    expect(corrosionResistance("bronze")).toBeGreaterThan(corrosionResistance("iron"));
  });
});

describe("bobMaterials", () => {
  it("returns 5 materials", () => {
    expect(bobMaterials()).toHaveLength(5);
  });
});
