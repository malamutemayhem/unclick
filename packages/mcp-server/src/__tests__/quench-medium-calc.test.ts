import { describe, it, expect } from "vitest";
import {
  coolingRateIndex, crackRisk, distortionRisk,
  hardnessAchieved, flashPoint, reusability,
  bestSteelType, vaporBarrier, costPerLiter, quenchMedia,
} from "../quench-medium-calc.js";

describe("coolingRateIndex", () => {
  it("brine cools fastest", () => {
    expect(coolingRateIndex("brine")).toBeGreaterThan(
      coolingRateIndex("air")
    );
  });
});

describe("crackRisk", () => {
  it("brine has highest crack risk", () => {
    expect(crackRisk("brine")).toBeGreaterThan(
      crackRisk("air")
    );
  });
});

describe("distortionRisk", () => {
  it("brine has highest distortion risk", () => {
    expect(distortionRisk("brine")).toBeGreaterThan(
      distortionRisk("air")
    );
  });
});

describe("hardnessAchieved", () => {
  it("brine achieves highest hardness", () => {
    expect(hardnessAchieved("brine")).toBeGreaterThan(
      hardnessAchieved("air")
    );
  });
});

describe("flashPoint", () => {
  it("oil has flash point risk", () => {
    expect(flashPoint("oil")).toBe(true);
  });
  it("water has no flash point risk", () => {
    expect(flashPoint("water")).toBe(false);
  });
});

describe("reusability", () => {
  it("water is most reusable", () => {
    expect(reusability("water")).toBeGreaterThanOrEqual(
      reusability("polymer")
    );
  });
});

describe("bestSteelType", () => {
  it("oil best for high carbon", () => {
    expect(bestSteelType("oil")).toBe("high_carbon");
  });
});

describe("vaporBarrier", () => {
  it("water has highest vapor barrier", () => {
    expect(vaporBarrier("water")).toBeGreaterThan(
      vaporBarrier("air")
    );
  });
});

describe("costPerLiter", () => {
  it("polymer costs most", () => {
    expect(costPerLiter("polymer")).toBeGreaterThan(
      costPerLiter("water")
    );
  });
});

describe("quenchMedia", () => {
  it("returns 5 media", () => {
    expect(quenchMedia()).toHaveLength(5);
  });
});
