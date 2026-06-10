import { describe, it, expect } from "vitest";
import {
  wallThicknessCm, liftHeightCm, dryingDaysPerLift, strawRatioPercent,
  waterContentPercent, compressiveStrengthMpa, thermalMassKjPerM3K,
  volumePerMeterM3, costPerM3, cobMixes,
} from "../cob-wall-calc.js";

describe("wallThicknessCm", () => {
  it("more storeys = thicker walls", () => {
    expect(wallThicknessCm(2)).toBeGreaterThan(wallThicknessCm(1));
  });
});

describe("liftHeightCm", () => {
  it("returns 30cm", () => {
    expect(liftHeightCm()).toBe(30);
  });
});

describe("dryingDaysPerLift", () => {
  it("high humidity = longer drying", () => {
    expect(dryingDaysPerLift("high")).toBeGreaterThan(dryingDaysPerLift("low"));
  });
});

describe("strawRatioPercent", () => {
  it("heavy clay needs most straw", () => {
    expect(strawRatioPercent("heavy_clay")).toBeGreaterThan(strawRatioPercent("chalky"));
  });
});

describe("waterContentPercent", () => {
  it("heavy clay has most water", () => {
    expect(waterContentPercent("heavy_clay")).toBeGreaterThan(
      waterContentPercent("gravelly")
    );
  });
});

describe("compressiveStrengthMpa", () => {
  it("gravelly is strongest", () => {
    expect(compressiveStrengthMpa("gravelly")).toBeGreaterThan(
      compressiveStrengthMpa("heavy_clay")
    );
  });
});

describe("thermalMassKjPerM3K", () => {
  it("returns 1300", () => {
    expect(thermalMassKjPerM3K()).toBe(1300);
  });
});

describe("volumePerMeterM3", () => {
  it("thicker wall = more volume", () => {
    expect(volumePerMeterM3(60, 3)).toBeGreaterThan(volumePerMeterM3(40, 3));
  });
});

describe("costPerM3", () => {
  it("chalky is most expensive", () => {
    expect(costPerM3("chalky")).toBeGreaterThan(costPerM3("heavy_clay"));
  });
});

describe("cobMixes", () => {
  it("returns 5 mixes", () => {
    expect(cobMixes()).toHaveLength(5);
  });
});
