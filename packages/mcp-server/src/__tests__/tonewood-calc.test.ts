import { describe, it, expect } from "vitest";
import {
  densityKgPerM3, speedOfSoundMPerS, dampingCoefficient, stiffnessGpa,
  bestUse, seasoningYears, workability, sustainRating,
  costPerBoardFoot, tonewoods,
} from "../tonewood-calc.js";

describe("densityKgPerM3", () => {
  it("ebony is densest", () => {
    expect(densityKgPerM3("ebony")).toBeGreaterThan(
      densityKgPerM3("spruce")
    );
  });
});

describe("speedOfSoundMPerS", () => {
  it("spruce transmits sound fastest", () => {
    expect(speedOfSoundMPerS("spruce")).toBeGreaterThan(
      speedOfSoundMPerS("ebony")
    );
  });
});

describe("dampingCoefficient", () => {
  it("ebony has lowest damping", () => {
    expect(dampingCoefficient("ebony")).toBeLessThan(
      dampingCoefficient("cedar")
    );
  });
});

describe("stiffnessGpa", () => {
  it("ebony is stiffest", () => {
    expect(stiffnessGpa("ebony")).toBeGreaterThan(stiffnessGpa("cedar"));
  });
});

describe("bestUse", () => {
  it("spruce is best for soundboards", () => {
    expect(bestUse("spruce")).toBe("soundboard");
  });
});

describe("seasoningYears", () => {
  it("ebony needs longest seasoning", () => {
    expect(seasoningYears("ebony")).toBeGreaterThan(
      seasoningYears("cedar")
    );
  });
});

describe("workability", () => {
  it("cedar is easiest to work", () => {
    expect(workability("cedar")).toBeGreaterThan(workability("ebony"));
  });
});

describe("sustainRating", () => {
  it("ebony has best sustain", () => {
    expect(sustainRating("ebony")).toBeGreaterThan(
      sustainRating("cedar")
    );
  });
});

describe("costPerBoardFoot", () => {
  it("ebony is most expensive", () => {
    expect(costPerBoardFoot("ebony")).toBeGreaterThan(
      costPerBoardFoot("spruce")
    );
  });
});

describe("tonewoods", () => {
  it("returns 5 woods", () => {
    expect(tonewoods()).toHaveLength(5);
  });
});
