import { describe, it, expect } from "vitest";
import {
  speedKmh, caloriesPerHour, learningDifficulty,
  shoulderStress, breathingEase, faceInWater,
  olympicEvent, bestApplication, muscleGroupsUsed, swimmingStrokes,
} from "../swimming-stroke-calc.js";

describe("speedKmh", () => {
  it("freestyle is fastest", () => {
    expect(speedKmh("freestyle")).toBeGreaterThan(
      speedKmh("sidestroke")
    );
  });
});

describe("caloriesPerHour", () => {
  it("butterfly burns most calories", () => {
    expect(caloriesPerHour("butterfly")).toBeGreaterThan(
      caloriesPerHour("sidestroke")
    );
  });
});

describe("learningDifficulty", () => {
  it("butterfly is hardest to learn", () => {
    expect(learningDifficulty("butterfly")).toBeGreaterThan(
      learningDifficulty("sidestroke")
    );
  });
});

describe("shoulderStress", () => {
  it("butterfly has most shoulder stress", () => {
    expect(shoulderStress("butterfly")).toBeGreaterThan(
      shoulderStress("sidestroke")
    );
  });
});

describe("breathingEase", () => {
  it("backstroke has easiest breathing", () => {
    expect(breathingEase("backstroke")).toBeGreaterThan(
      breathingEase("butterfly")
    );
  });
});

describe("faceInWater", () => {
  it("freestyle face is in water", () => {
    expect(faceInWater("freestyle")).toBe(true);
  });
  it("backstroke face is not", () => {
    expect(faceInWater("backstroke")).toBe(false);
  });
});

describe("olympicEvent", () => {
  it("butterfly is olympic", () => {
    expect(olympicEvent("butterfly")).toBe(true);
  });
  it("sidestroke is not", () => {
    expect(olympicEvent("sidestroke")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("sidestroke for lifesaving", () => {
    expect(bestApplication("sidestroke")).toBe("lifesaving");
  });
});

describe("muscleGroupsUsed", () => {
  it("butterfly uses most muscle groups", () => {
    expect(muscleGroupsUsed("butterfly")).toBeGreaterThan(
      muscleGroupsUsed("sidestroke")
    );
  });
});

describe("swimmingStrokes", () => {
  it("returns 5 types", () => {
    expect(swimmingStrokes()).toHaveLength(5);
  });
});
