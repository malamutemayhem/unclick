import { describe, it, expect } from "vitest";
import {
  heightM, baseWidthCm, spireAngle, surfaceAreaM2,
  sheetingWeight, windForceKn, crossCount, weathercockArea,
  lightningRodHeight, maintenanceIntervalYears, flecheMaterials,
} from "../fleche-calc.js";

describe("heightM", () => {
  it("15% of ridge", () => {
    expect(heightM(20)).toBe(3);
  });
});

describe("baseWidthCm", () => {
  it("30% of height in cm", () => {
    expect(baseWidthCm(3)).toBe(90);
  });
});

describe("spireAngle", () => {
  it("positive angle", () => {
    expect(spireAngle(3, 90)).toBeGreaterThan(0);
  });
  it("zero base = 0", () => {
    expect(spireAngle(3, 0)).toBe(0);
  });
});

describe("surfaceAreaM2", () => {
  it("positive area", () => {
    expect(surfaceAreaM2(3, 90, 4)).toBeGreaterThan(0);
  });
});

describe("sheetingWeight", () => {
  it("lead heaviest", () => {
    expect(sheetingWeight(5, "lead")).toBeGreaterThan(sheetingWeight(5, "copper"));
  });
});

describe("windForceKn", () => {
  it("positive force", () => {
    expect(windForceKn(3, 90, 80)).toBeGreaterThan(0);
  });
});

describe("crossCount", () => {
  it("always 1", () => {
    expect(crossCount()).toBe(1);
  });
});

describe("weathercockArea", () => {
  it("positive area", () => {
    expect(weathercockArea(3)).toBeGreaterThan(0);
  });
});

describe("lightningRodHeight", () => {
  it("30% of fleche", () => {
    expect(lightningRodHeight(3)).toBe(0.9);
  });
});

describe("maintenanceIntervalYears", () => {
  it("lead longest", () => {
    expect(maintenanceIntervalYears("lead")).toBeGreaterThan(maintenanceIntervalYears("timber"));
  });
});

describe("flecheMaterials", () => {
  it("returns 5 materials", () => {
    expect(flecheMaterials()).toHaveLength(5);
  });
});
