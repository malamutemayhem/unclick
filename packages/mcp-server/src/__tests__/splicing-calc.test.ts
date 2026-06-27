import { describe, it, expect } from "vitest";
import {
  tuckCount, strengthRetentionPercent, extraRopeLengthFactor, difficultyRating,
  marlineSpikeRequired, timeMinutes, weatherResistance, decorativeValue,
  costFactor, spliceTypes,
} from "../splicing-calc.js";

describe("tuckCount", () => {
  it("long splice has most tucks", () => {
    expect(tuckCount("long")).toBeGreaterThan(tuckCount("back"));
  });
});

describe("strengthRetentionPercent", () => {
  it("eye splice retains most strength", () => {
    expect(strengthRetentionPercent("eye")).toBeGreaterThan(
      strengthRetentionPercent("chain")
    );
  });
});

describe("extraRopeLengthFactor", () => {
  it("long splice needs most extra rope", () => {
    expect(extraRopeLengthFactor("long")).toBeGreaterThan(
      extraRopeLengthFactor("eye")
    );
  });
});

describe("difficultyRating", () => {
  it("long splice is hardest", () => {
    expect(difficultyRating("long")).toBeGreaterThan(
      difficultyRating("eye")
    );
  });
});

describe("marlineSpikeRequired", () => {
  it("eye splice needs marline spike", () => {
    expect(marlineSpikeRequired("eye")).toBe(true);
  });
  it("chain splice does not", () => {
    expect(marlineSpikeRequired("chain")).toBe(false);
  });
});

describe("timeMinutes", () => {
  it("thicker rope takes longer", () => {
    expect(timeMinutes("eye", 20)).toBeGreaterThan(timeMinutes("eye", 10));
  });
});

describe("weatherResistance", () => {
  it("eye splice resists weather best", () => {
    expect(weatherResistance("eye")).toBeGreaterThanOrEqual(
      weatherResistance("chain")
    );
  });
});

describe("decorativeValue", () => {
  it("chain splice is most decorative", () => {
    expect(decorativeValue("chain")).toBeGreaterThan(
      decorativeValue("short")
    );
  });
});

describe("costFactor", () => {
  it("long splice costs most", () => {
    expect(costFactor("long")).toBeGreaterThan(costFactor("back"));
  });
});

describe("spliceTypes", () => {
  it("returns 5 types", () => {
    expect(spliceTypes()).toHaveLength(5);
  });
});
