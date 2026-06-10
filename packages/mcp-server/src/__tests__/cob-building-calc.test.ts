import { describe, it, expect } from "vitest";
import {
  clayPercent, sandPercent, strawPercent,
  compressiveStrengthPsi, dryingDaysPerLayer, shrinkagePercent,
  thermalMass, erosionResistance, costPerCubicMeter, cobMixRatios,
} from "../cob-building-calc.js";

describe("clayPercent", () => {
  it("clay heavy has most clay", () => {
    expect(clayPercent("clay_heavy")).toBeGreaterThan(
      clayPercent("sand_heavy")
    );
  });
});

describe("sandPercent", () => {
  it("sand heavy has most sand", () => {
    expect(sandPercent("sand_heavy")).toBeGreaterThan(
      sandPercent("clay_heavy")
    );
  });
});

describe("strawPercent", () => {
  it("straw rich has most straw", () => {
    expect(strawPercent("straw_rich")).toBeGreaterThan(
      strawPercent("clay_heavy")
    );
  });
});

describe("compressiveStrengthPsi", () => {
  it("gravel base is strongest", () => {
    expect(compressiveStrengthPsi("gravel_base")).toBeGreaterThan(
      compressiveStrengthPsi("straw_rich")
    );
  });
});

describe("dryingDaysPerLayer", () => {
  it("clay heavy dries slowest", () => {
    expect(dryingDaysPerLayer("clay_heavy")).toBeGreaterThan(
      dryingDaysPerLayer("sand_heavy")
    );
  });
});

describe("shrinkagePercent", () => {
  it("clay heavy shrinks most", () => {
    expect(shrinkagePercent("clay_heavy")).toBeGreaterThan(
      shrinkagePercent("sand_heavy")
    );
  });
});

describe("thermalMass", () => {
  it("clay heavy has most thermal mass", () => {
    expect(thermalMass("clay_heavy")).toBeGreaterThan(
      thermalMass("straw_rich")
    );
  });
});

describe("erosionResistance", () => {
  it("gravel base resists erosion best", () => {
    expect(erosionResistance("gravel_base")).toBeGreaterThan(
      erosionResistance("clay_heavy")
    );
  });
});

describe("costPerCubicMeter", () => {
  it("gravel base is most expensive", () => {
    expect(costPerCubicMeter("gravel_base")).toBeGreaterThan(
      costPerCubicMeter("clay_heavy")
    );
  });
});

describe("cobMixRatios", () => {
  it("returns 5 ratios", () => {
    expect(cobMixRatios()).toHaveLength(5);
  });
});
