import { describe, it, expect } from "vitest";
import {
  footprint, safetyRating, aestheticScore,
  buildComplexity, accessibilityScore, hasLanding,
  openRiser, bestSetting, costPerStep, stairTypes,
} from "../stair-type-calc.js";

describe("footprint", () => {
  it("spiral has smallest footprint", () => {
    expect(footprint("spiral")).toBeLessThan(
      footprint("straight")
    );
  });
});

describe("safetyRating", () => {
  it("straight is safest", () => {
    expect(safetyRating("straight")).toBeGreaterThan(
      safetyRating("spiral")
    );
  });
});

describe("aestheticScore", () => {
  it("floating is most aesthetic", () => {
    expect(aestheticScore("floating")).toBeGreaterThan(
      aestheticScore("straight")
    );
  });
});

describe("buildComplexity", () => {
  it("floating is most complex", () => {
    expect(buildComplexity("floating")).toBeGreaterThan(
      buildComplexity("straight")
    );
  });
});

describe("accessibilityScore", () => {
  it("straight is most accessible", () => {
    expect(accessibilityScore("straight")).toBeGreaterThan(
      accessibilityScore("spiral")
    );
  });
});

describe("hasLanding", () => {
  it("l shaped has landing", () => {
    expect(hasLanding("l_shaped")).toBe(true);
  });
  it("straight does not", () => {
    expect(hasLanding("straight")).toBe(false);
  });
});

describe("openRiser", () => {
  it("floating has open risers", () => {
    expect(openRiser("floating")).toBe(true);
  });
  it("spiral does not", () => {
    expect(openRiser("spiral")).toBe(false);
  });
});

describe("bestSetting", () => {
  it("spiral for loft", () => {
    expect(bestSetting("spiral")).toBe("loft");
  });
});

describe("costPerStep", () => {
  it("floating costs most per step", () => {
    expect(costPerStep("floating")).toBeGreaterThan(
      costPerStep("straight")
    );
  });
});

describe("stairTypes", () => {
  it("returns 5 types", () => {
    expect(stairTypes()).toHaveLength(5);
  });
});
