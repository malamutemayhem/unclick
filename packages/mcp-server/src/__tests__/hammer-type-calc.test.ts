import { describe, it, expect } from "vitest";
import {
  weightKg, strikePrecision, drawingAbility,
  spreadingAbility, surfaceFinish, twoHanded,
  bestTask, fatigueRating, costEstimate, hammerTypes,
} from "../hammer-type-calc.js";

describe("weightKg", () => {
  it("sledge is heaviest", () => {
    expect(weightKg("sledge")).toBeGreaterThan(
      weightKg("planishing")
    );
  });
});

describe("strikePrecision", () => {
  it("planishing has best precision", () => {
    expect(strikePrecision("planishing")).toBeGreaterThan(
      strikePrecision("sledge")
    );
  });
});

describe("drawingAbility", () => {
  it("cross peen draws best", () => {
    expect(drawingAbility("cross_peen")).toBeGreaterThan(
      drawingAbility("planishing")
    );
  });
});

describe("spreadingAbility", () => {
  it("ball peen spreads best", () => {
    expect(spreadingAbility("ball_peen")).toBeGreaterThan(
      spreadingAbility("planishing")
    );
  });
});

describe("surfaceFinish", () => {
  it("planishing gives best finish", () => {
    expect(surfaceFinish("planishing")).toBeGreaterThan(
      surfaceFinish("sledge")
    );
  });
});

describe("twoHanded", () => {
  it("sledge is two handed", () => {
    expect(twoHanded("sledge")).toBe(true);
  });
  it("cross peen is not two handed", () => {
    expect(twoHanded("cross_peen")).toBe(false);
  });
});

describe("bestTask", () => {
  it("planishing best for finishing", () => {
    expect(bestTask("planishing")).toBe("finishing");
  });
});

describe("fatigueRating", () => {
  it("sledge causes most fatigue", () => {
    expect(fatigueRating("sledge")).toBeGreaterThan(
      fatigueRating("planishing")
    );
  });
});

describe("costEstimate", () => {
  it("rounding hammer costs most", () => {
    expect(costEstimate("rounding")).toBeGreaterThan(
      costEstimate("ball_peen")
    );
  });
});

describe("hammerTypes", () => {
  it("returns 5 types", () => {
    expect(hammerTypes()).toHaveLength(5);
  });
});
