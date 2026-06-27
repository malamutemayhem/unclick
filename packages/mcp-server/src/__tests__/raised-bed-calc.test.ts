import { describe, it, expect } from "vitest";
import {
  soilVolumeLiters, compostPercent, lifespanYears, maxDepthCm,
  drainageRequired, warmingSoilBonus, aestheticRating, weightKgPerMeter,
  costPerMeter, bedMaterials,
} from "../raised-bed-calc.js";

describe("soilVolumeLiters", () => {
  it("larger bed needs more soil", () => {
    expect(soilVolumeLiters(2, 1, 30)).toBeGreaterThan(
      soilVolumeLiters(1, 1, 30)
    );
  });
});

describe("compostPercent", () => {
  it("shallow beds need more compost", () => {
    expect(compostPercent(10)).toBeGreaterThan(compostPercent(40));
  });
});

describe("lifespanYears", () => {
  it("stone lasts longest", () => {
    expect(lifespanYears("stone")).toBeGreaterThan(
      lifespanYears("cedar")
    );
  });
});

describe("maxDepthCm", () => {
  it("concrete block is deepest", () => {
    expect(maxDepthCm("concrete_block")).toBeGreaterThan(
      maxDepthCm("galvanized_steel")
    );
  });
});

describe("drainageRequired", () => {
  it("concrete block needs drainage", () => {
    expect(drainageRequired("concrete_block")).toBe(true);
  });
  it("cedar does not need drainage", () => {
    expect(drainageRequired("cedar")).toBe(false);
  });
});

describe("warmingSoilBonus", () => {
  it("galvanized steel warms most", () => {
    expect(warmingSoilBonus("galvanized_steel")).toBeGreaterThan(
      warmingSoilBonus("cedar")
    );
  });
});

describe("aestheticRating", () => {
  it("cedar is most aesthetic", () => {
    expect(aestheticRating("cedar")).toBeGreaterThan(
      aestheticRating("concrete_block")
    );
  });
});

describe("weightKgPerMeter", () => {
  it("stone is heaviest", () => {
    expect(weightKgPerMeter("stone")).toBeGreaterThan(
      weightKgPerMeter("recycled_plastic")
    );
  });
});

describe("costPerMeter", () => {
  it("stone is most expensive", () => {
    expect(costPerMeter("stone")).toBeGreaterThan(
      costPerMeter("concrete_block")
    );
  });
});

describe("bedMaterials", () => {
  it("returns 5 materials", () => {
    expect(bedMaterials()).toHaveLength(5);
  });
});
