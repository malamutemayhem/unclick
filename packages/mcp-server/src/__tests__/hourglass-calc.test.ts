import { describe, it, expect } from "vitest";
import {
  sandWeightG, neckDiameterMm, bulbDiameterCm, bulbHeightCm,
  totalHeightCm, frameWidthCm, glassThicknessMm, accuracyVariancePercent,
  sandGrainSizeMm, costEstimate, hourglassDurations,
} from "../hourglass-calc.js";

describe("sandWeightG", () => {
  it("longer duration = more sand", () => {
    expect(sandWeightG(60)).toBeGreaterThan(sandWeightG(5));
  });
});

describe("neckDiameterMm", () => {
  it("longer duration = slightly wider neck", () => {
    expect(neckDiameterMm(60)).toBeGreaterThan(neckDiameterMm(1));
  });
});

describe("bulbDiameterCm", () => {
  it("heavier sand = larger bulb", () => {
    expect(bulbDiameterCm(500)).toBeGreaterThan(bulbDiameterCm(50));
  });
});

describe("bulbHeightCm", () => {
  it("larger diameter = taller bulb", () => {
    expect(bulbHeightCm(10)).toBeGreaterThan(bulbHeightCm(5));
  });
});

describe("totalHeightCm", () => {
  it("includes both bulbs plus gap", () => {
    expect(totalHeightCm(10)).toBe(22);
  });
});

describe("frameWidthCm", () => {
  it("slightly wider than bulb", () => {
    expect(frameWidthCm(8)).toBe(10);
  });
});

describe("glassThicknessMm", () => {
  it("larger bulb = thicker glass", () => {
    expect(glassThicknessMm(12)).toBeGreaterThan(glassThicknessMm(6));
  });
});

describe("accuracyVariancePercent", () => {
  it("fine sand most accurate", () => {
    expect(accuracyVariancePercent("fine")).toBeLessThan(accuracyVariancePercent("coarse"));
  });
});

describe("sandGrainSizeMm", () => {
  it("coarse is largest", () => {
    expect(sandGrainSizeMm("coarse")).toBeGreaterThan(sandGrainSizeMm("fine"));
  });
});

describe("costEstimate", () => {
  it("crystal most expensive", () => {
    expect(costEstimate("crystal", 50)).toBeGreaterThan(costEstimate("glass", 50));
  });
});

describe("hourglassDurations", () => {
  it("returns 5 durations", () => {
    expect(hourglassDurations()).toHaveLength(5);
  });
});
