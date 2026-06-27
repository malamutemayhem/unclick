import { describe, it, expect } from "vitest";
import {
  rangeM, boltWeightKg, rateOfFirePerMin, crewCount,
  frameWeightKg, torsionBundleDiameterCm, accuracyAtRangePercent,
  setupTimeMinutes, cordLifeShots, costEstimate, ballistaSizes,
} from "../ballista-calc.js";

describe("rangeM", () => {
  it("positive range", () => {
    expect(rangeM(100, 5)).toBeGreaterThan(0);
  });
});

describe("boltWeightKg", () => {
  it("positive weight", () => {
    expect(boltWeightKg(60, 3)).toBeGreaterThan(0);
  });
});

describe("rateOfFirePerMin", () => {
  it("polybolos fastest", () => {
    expect(rateOfFirePerMin("polybolos")).toBeGreaterThan(rateOfFirePerMin("oxybeles"));
  });
});

describe("crewCount", () => {
  it("cheiroballistra needs 1", () => {
    expect(crewCount("cheiroballistra")).toBe(1);
  });
});

describe("frameWeightKg", () => {
  it("positive weight", () => {
    expect(frameWeightKg(100)).toBeGreaterThan(0);
  });
});

describe("torsionBundleDiameterCm", () => {
  it("positive diameter", () => {
    expect(torsionBundleDiameterCm(5)).toBeGreaterThan(0);
  });
});

describe("accuracyAtRangePercent", () => {
  it("decreases with range", () => {
    expect(accuracyAtRangePercent(100, 400)).toBeGreaterThan(
      accuracyAtRangePercent(300, 400)
    );
  });
  it("zero max range = 0", () => {
    expect(accuracyAtRangePercent(100, 0)).toBe(0);
  });
});

describe("setupTimeMinutes", () => {
  it("cheiroballistra fastest", () => {
    expect(setupTimeMinutes("cheiroballistra")).toBeLessThan(setupTimeMinutes("oxybeles"));
  });
});

describe("cordLifeShots", () => {
  it("at least 50", () => {
    expect(cordLifeShots(20)).toBeGreaterThanOrEqual(50);
  });
});

describe("costEstimate", () => {
  it("polybolos most expensive", () => {
    expect(costEstimate("polybolos", 1000)).toBeGreaterThan(costEstimate("scorpio", 1000));
  });
});

describe("ballistaSizes", () => {
  it("returns 5 sizes", () => {
    expect(ballistaSizes()).toHaveLength(5);
  });
});
