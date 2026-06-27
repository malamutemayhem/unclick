import { describe, it, expect } from "vitest";
import {
  hempShivRatio, wallThicknessCm, settingTimeDays, densityKgPerM3,
  compressiveStrengthMpa, thermalRValuePerCm, moistureBufferRating,
  carbonSequestrationKgPerM3, costPerM3, hempBinders,
} from "../hempcrete-calc.js";

describe("hempShivRatio", () => {
  it("clay has highest shiv ratio", () => {
    expect(hempShivRatio("clay")).toBeGreaterThan(
      hempShivRatio("cement_blend")
    );
  });
});

describe("wallThicknessCm", () => {
  it("higher R-value needs thicker wall", () => {
    expect(wallThicknessCm(10)).toBeGreaterThan(wallThicknessCm(5));
  });
});

describe("settingTimeDays", () => {
  it("lime putty takes longest", () => {
    expect(settingTimeDays("lime_putty")).toBeGreaterThan(
      settingTimeDays("cement_blend")
    );
  });
});

describe("densityKgPerM3", () => {
  it("cement blend is densest", () => {
    expect(densityKgPerM3("cement_blend")).toBeGreaterThan(
      densityKgPerM3("clay")
    );
  });
});

describe("compressiveStrengthMpa", () => {
  it("cement blend is strongest", () => {
    expect(compressiveStrengthMpa("cement_blend")).toBeGreaterThan(
      compressiveStrengthMpa("clay")
    );
  });
});

describe("thermalRValuePerCm", () => {
  it("returns 0.28", () => {
    expect(thermalRValuePerCm()).toBe(0.28);
  });
});

describe("moistureBufferRating", () => {
  it("lime putty buffers best", () => {
    expect(moistureBufferRating("lime_putty")).toBeGreaterThan(
      moistureBufferRating("cement_blend")
    );
  });
});

describe("carbonSequestrationKgPerM3", () => {
  it("lime putty sequesters most carbon", () => {
    expect(carbonSequestrationKgPerM3("lime_putty")).toBeGreaterThan(
      carbonSequestrationKgPerM3("cement_blend")
    );
  });
});

describe("costPerM3", () => {
  it("magnesium oxide is most expensive", () => {
    expect(costPerM3("magnesium_oxide")).toBeGreaterThan(
      costPerM3("clay")
    );
  });
});

describe("hempBinders", () => {
  it("returns 5 binders", () => {
    expect(hempBinders()).toHaveLength(5);
  });
});
