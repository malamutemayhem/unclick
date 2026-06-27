import { describe, it, expect } from "vitest";
import {
  coolingRateRating, crackRisk, distortionRisk, hardnessAchievable,
  tempRangeCelsius, reusable, fireHazard, environmentalImpact,
  costPerLiter, quenchMedia,
} from "../quenching-calc.js";

describe("coolingRateRating", () => {
  it("brine cools fastest", () => {
    expect(coolingRateRating("brine")).toBeGreaterThan(
      coolingRateRating("oil")
    );
  });
});

describe("crackRisk", () => {
  it("brine has highest crack risk", () => {
    expect(crackRisk("brine")).toBeGreaterThan(crackRisk("air"));
  });
});

describe("distortionRisk", () => {
  it("air has lowest distortion risk", () => {
    expect(distortionRisk("air")).toBeLessThan(distortionRisk("water"));
  });
});

describe("hardnessAchievable", () => {
  it("brine achieves highest hardness", () => {
    expect(hardnessAchievable("brine")).toBeGreaterThan(
      hardnessAchievable("air")
    );
  });
});

describe("tempRangeCelsius", () => {
  it("oil runs hotter", () => {
    expect(tempRangeCelsius("oil").min).toBeGreaterThan(
      tempRangeCelsius("water").min
    );
  });
});

describe("reusable", () => {
  it("water is reusable", () => {
    expect(reusable("water")).toBe(true);
  });
});

describe("fireHazard", () => {
  it("oil is a fire hazard", () => {
    expect(fireHazard("oil")).toBe(true);
  });
  it("water is not a fire hazard", () => {
    expect(fireHazard("water")).toBe(false);
  });
});

describe("environmentalImpact", () => {
  it("air has zero impact", () => {
    expect(environmentalImpact("air")).toBe(0);
  });
});

describe("costPerLiter", () => {
  it("polymer is most expensive", () => {
    expect(costPerLiter("polymer")).toBeGreaterThan(costPerLiter("water"));
  });
});

describe("quenchMedia", () => {
  it("returns 5 media", () => {
    expect(quenchMedia()).toHaveLength(5);
  });
});
