import { describe, it, expect } from "vitest";
import {
  gearRatio, outputRpm, moduleFromTeeth, pitchDiameterMm,
  centerDistanceMm, toothDepthMm, backlashMm, wearResistance,
  costPerGear, gearMaterials,
} from "../gear-train-calc.js";

describe("gearRatio", () => {
  it("driven/driver teeth", () => {
    expect(gearRatio(10, 30)).toBe(3);
  });
  it("zero driver returns 0", () => {
    expect(gearRatio(0, 30)).toBe(0);
  });
});

describe("outputRpm", () => {
  it("higher ratio = lower output rpm", () => {
    expect(outputRpm(100, 4)).toBeLessThan(outputRpm(100, 2));
  });
  it("zero ratio returns 0", () => {
    expect(outputRpm(100, 0)).toBe(0);
  });
});

describe("moduleFromTeeth", () => {
  it("pitch diameter / teeth", () => {
    expect(moduleFromTeeth(30, 15)).toBe(2);
  });
});

describe("pitchDiameterMm", () => {
  it("module times teeth", () => {
    expect(pitchDiameterMm(2, 20)).toBe(40);
  });
});

describe("centerDistanceMm", () => {
  it("calculates center distance", () => {
    expect(centerDistanceMm(1, 20, 40)).toBe(30);
  });
});

describe("toothDepthMm", () => {
  it("2.25x module", () => {
    expect(toothDepthMm(2)).toBeCloseTo(4.5, 1);
  });
});

describe("backlashMm", () => {
  it("larger module = more backlash", () => {
    expect(backlashMm(2)).toBeGreaterThan(backlashMm(1));
  });
});

describe("wearResistance", () => {
  it("steel is most wear resistant", () => {
    expect(wearResistance("steel")).toBeGreaterThan(wearResistance("wood"));
  });
});

describe("costPerGear", () => {
  it("steel is most expensive", () => {
    expect(costPerGear("steel", 30)).toBeGreaterThan(costPerGear("wood", 30));
  });
});

describe("gearMaterials", () => {
  it("returns 5 materials", () => {
    expect(gearMaterials()).toHaveLength(5);
  });
});
