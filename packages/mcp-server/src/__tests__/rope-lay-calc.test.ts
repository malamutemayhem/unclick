import { describe, it, expect } from "vitest";
import {
  strandCount, breakingStrengthKn, twistAngleDeg, weightKgPerM,
  shrinkagePercent, uvResistanceYears, waterAbsorptionPercent,
  layingSpeedMPerHour, costPerM, ropeFibers,
} from "../rope-lay-calc.js";

describe("strandCount", () => {
  it("cable has most strands", () => {
    expect(strandCount("cable")).toBeGreaterThan(strandCount("hawser"));
  });
});

describe("breakingStrengthKn", () => {
  it("hemp is strongest", () => {
    expect(breakingStrengthKn(20, "hemp")).toBeGreaterThan(
      breakingStrengthKn(20, "cotton")
    );
  });
});

describe("twistAngleDeg", () => {
  it("hemp has tightest twist", () => {
    expect(twistAngleDeg("hemp")).toBeGreaterThan(twistAngleDeg("cotton"));
  });
});

describe("weightKgPerM", () => {
  it("thicker rope = heavier", () => {
    expect(weightKgPerM(20)).toBeGreaterThan(weightKgPerM(10));
  });
});

describe("shrinkagePercent", () => {
  it("cotton shrinks most", () => {
    expect(shrinkagePercent("cotton")).toBeGreaterThan(shrinkagePercent("sisal"));
  });
});

describe("uvResistanceYears", () => {
  it("hemp lasts longest in sun", () => {
    expect(uvResistanceYears("hemp")).toBeGreaterThan(uvResistanceYears("cotton"));
  });
});

describe("waterAbsorptionPercent", () => {
  it("cotton absorbs most", () => {
    expect(waterAbsorptionPercent("cotton")).toBeGreaterThan(
      waterAbsorptionPercent("hemp")
    );
  });
});

describe("layingSpeedMPerHour", () => {
  it("thinner rope is faster", () => {
    expect(layingSpeedMPerHour(10)).toBeGreaterThan(layingSpeedMPerHour(20));
  });
});

describe("costPerM", () => {
  it("hemp is most expensive", () => {
    expect(costPerM(20, "hemp")).toBeGreaterThan(costPerM(20, "jute"));
  });
});

describe("ropeFibers", () => {
  it("returns 5 fibers", () => {
    expect(ropeFibers()).toHaveLength(5);
  });
});
