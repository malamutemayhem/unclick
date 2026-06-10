import { describe, it, expect } from "vitest";
import {
  bladeCount, freeAreaPercent, airflowCfm, rainPenetrationAngle,
  pressureDropPa, noiseReductionDb, weightKg, motorSizeWatts,
  cleaningIntervalDays, louverMaterials,
} from "../louver-calc.js";

describe("bladeCount", () => {
  it("positive count", () => {
    expect(bladeCount(120, 10)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(bladeCount(120, 0)).toBe(0);
  });
});

describe("freeAreaPercent", () => {
  it("between 0 and 100", () => {
    const pct = freeAreaPercent(45, 10, 8);
    expect(pct).toBeGreaterThanOrEqual(0);
    expect(pct).toBeLessThanOrEqual(100);
  });
});

describe("airflowCfm", () => {
  it("positive cfm", () => {
    expect(airflowCfm(0.5, 3)).toBeGreaterThan(0);
  });
});

describe("rainPenetrationAngle", () => {
  it("positive angle", () => {
    expect(rainPenetrationAngle(45, 3)).toBeGreaterThan(45);
  });
});

describe("pressureDropPa", () => {
  it("positive drop", () => {
    expect(pressureDropPa(3, 50)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(pressureDropPa(3, 0)).toBe(0);
  });
});

describe("noiseReductionDb", () => {
  it("glass best", () => {
    expect(noiseReductionDb(12, "glass")).toBeGreaterThan(noiseReductionDb(12, "aluminum"));
  });
});

describe("weightKg", () => {
  it("steel heaviest", () => {
    expect(weightKg(12, 100, "steel")).toBeGreaterThan(weightKg(12, 100, "composite"));
  });
});

describe("motorSizeWatts", () => {
  it("positive watts", () => {
    expect(motorSizeWatts(12, 100)).toBeGreaterThan(0);
  });
});

describe("cleaningIntervalDays", () => {
  it("dusty more frequent", () => {
    expect(cleaningIntervalDays("aluminum", true)).toBeLessThan(cleaningIntervalDays("aluminum", false));
  });
});

describe("louverMaterials", () => {
  it("returns 5 materials", () => {
    expect(louverMaterials()).toHaveLength(5);
  });
});
