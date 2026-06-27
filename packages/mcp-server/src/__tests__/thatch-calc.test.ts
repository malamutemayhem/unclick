import { describe, it, expect } from "vitest";
import {
  bundleCount, thicknessCm, weightKgPerM2, totalWeightKg,
  lifespanYears, ridgeRollLength, fixingWireMeter, installDays,
  fireRetardantLiters, insulationRValue, thatchMaterials,
} from "../thatch-calc.js";

describe("bundleCount", () => {
  it("positive count", () => {
    expect(bundleCount(60, 8)).toBeGreaterThan(0);
  });
});

describe("thicknessCm", () => {
  it("rye thickest", () => {
    expect(thicknessCm("rye")).toBeGreaterThan(thicknessCm("water-reed"));
  });
});

describe("weightKgPerM2", () => {
  it("water-reed heaviest", () => {
    expect(weightKgPerM2("water-reed")).toBeGreaterThan(weightKgPerM2("wheat"));
  });
});

describe("totalWeightKg", () => {
  it("positive kg", () => {
    expect(totalWeightKg(60, "wheat")).toBeGreaterThan(0);
  });
});

describe("lifespanYears", () => {
  it("water-reed longest", () => {
    expect(lifespanYears("water-reed")).toBeGreaterThan(lifespanYears("palm"));
  });
});

describe("ridgeRollLength", () => {
  it("longer than roof", () => {
    expect(ridgeRollLength(10, 10)).toBeGreaterThan(10);
  });
});

describe("fixingWireMeter", () => {
  it("positive meters", () => {
    expect(fixingWireMeter(60)).toBeGreaterThan(0);
  });
});

describe("installDays", () => {
  it("positive days", () => {
    expect(installDays(60, 3)).toBeGreaterThan(0);
  });
  it("zero crew = 0", () => {
    expect(installDays(60, 0)).toBe(0);
  });
});

describe("fireRetardantLiters", () => {
  it("positive liters", () => {
    expect(fireRetardantLiters(60, 2)).toBeGreaterThan(0);
  });
});

describe("insulationRValue", () => {
  it("positive R-value", () => {
    expect(insulationRValue(30)).toBeGreaterThan(0);
  });
});

describe("thatchMaterials", () => {
  it("returns 5 materials", () => {
    expect(thatchMaterials()).toHaveLength(5);
  });
});
