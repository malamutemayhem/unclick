import { describe, it, expect } from "vitest";
import {
  arcAccuracyMinutes, horizonRequired, weightGrams,
  learningCurve, nightUsable, durabilityRating,
  bestEnvironment, maintenanceLevel, costEstimate, sextantTypes,
} from "../sextant-use-calc.js";

describe("arcAccuracyMinutes", () => {
  it("drum micrometer is most accurate", () => {
    expect(arcAccuracyMinutes("drum_micrometer")).toBeLessThan(
      arcAccuracyMinutes("bubble")
    );
  });
});

describe("horizonRequired", () => {
  it("marine requires horizon", () => {
    expect(horizonRequired("marine")).toBe(true);
  });
  it("bubble does not require horizon", () => {
    expect(horizonRequired("bubble")).toBe(false);
  });
});

describe("weightGrams", () => {
  it("digital sextant is lightest", () => {
    expect(weightGrams("digital_sextant")).toBeLessThan(
      weightGrams("drum_micrometer")
    );
  });
});

describe("learningCurve", () => {
  it("drum micrometer has steepest learning curve", () => {
    expect(learningCurve("drum_micrometer")).toBeGreaterThan(
      learningCurve("digital_sextant")
    );
  });
});

describe("nightUsable", () => {
  it("marine is usable at night", () => {
    expect(nightUsable("marine")).toBe(true);
  });
  it("vernier is not usable at night", () => {
    expect(nightUsable("vernier")).toBe(false);
  });
});

describe("durabilityRating", () => {
  it("drum micrometer is most durable", () => {
    expect(durabilityRating("drum_micrometer")).toBeGreaterThan(
      durabilityRating("digital_sextant")
    );
  });
});

describe("bestEnvironment", () => {
  it("bubble best for aircraft", () => {
    expect(bestEnvironment("bubble")).toBe("aircraft");
  });
});

describe("maintenanceLevel", () => {
  it("drum micrometer needs most maintenance", () => {
    expect(maintenanceLevel("drum_micrometer")).toBeGreaterThan(
      maintenanceLevel("digital_sextant")
    );
  });
});

describe("costEstimate", () => {
  it("drum micrometer costs most", () => {
    expect(costEstimate("drum_micrometer")).toBeGreaterThan(
      costEstimate("vernier")
    );
  });
});

describe("sextantTypes", () => {
  it("returns 5 types", () => {
    expect(sextantTypes()).toHaveLength(5);
  });
});
