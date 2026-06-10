import { describe, it, expect } from "vitest";
import {
  handleLengthCm, swipleLengthCm, swingCyclesPerMinute, threshingRateKgPerHour,
  separationEfficiencyPercent, threshingFloorAreaM2, swingForceNewtons,
  handleMaterial, costEstimate, grainTypes,
} from "../flail-calc.js";

describe("handleLengthCm", () => {
  it("taller person = longer handle", () => {
    expect(handleLengthCm(180)).toBeGreaterThan(handleLengthCm(160));
  });
});

describe("swipleLengthCm", () => {
  it("half the handle length", () => {
    expect(swipleLengthCm(120)).toBe(60);
  });
});

describe("swingCyclesPerMinute", () => {
  it("returns 40", () => {
    expect(swingCyclesPerMinute()).toBe(40);
  });
});

describe("threshingRateKgPerHour", () => {
  it("oats thresh fastest", () => {
    expect(threshingRateKgPerHour("oats")).toBeGreaterThan(threshingRateKgPerHour("rice"));
  });
});

describe("separationEfficiencyPercent", () => {
  it("wheat separates best", () => {
    expect(separationEfficiencyPercent("wheat")).toBeGreaterThan(
      separationEfficiencyPercent("rice")
    );
  });
});

describe("threshingFloorAreaM2", () => {
  it("more grain = more floor area", () => {
    expect(threshingFloorAreaM2(20)).toBeGreaterThan(threshingFloorAreaM2(10));
  });
});

describe("swingForceNewtons", () => {
  it("heavier swiple = more force", () => {
    expect(swingForceNewtons(2)).toBeGreaterThan(swingForceNewtons(1));
  });
});

describe("handleMaterial", () => {
  it("uses ash", () => {
    expect(handleMaterial()).toBe("ash");
  });
});

describe("costEstimate", () => {
  it("premium costs more", () => {
    expect(costEstimate("premium")).toBeGreaterThan(costEstimate("basic"));
  });
});

describe("grainTypes", () => {
  it("returns 5 types", () => {
    expect(grainTypes()).toHaveLength(5);
  });
});
