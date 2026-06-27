import { describe, it, expect } from "vitest";
import {
  strengthMultiplier, yardageReduction, roundnessRating,
  colorBlending, preservesColorOrder, twistDirectionChanges,
  elasticity, difficultyRating, bestForProject, plyStructures,
} from "../plying-calc.js";

describe("strengthMultiplier", () => {
  it("cable is strongest", () => {
    expect(strengthMultiplier("cable")).toBeGreaterThan(
      strengthMultiplier("crepe")
    );
  });
});

describe("yardageReduction", () => {
  it("cable reduces yardage most", () => {
    expect(yardageReduction("cable")).toBeGreaterThan(
      yardageReduction("navajo_ply")
    );
  });
});

describe("roundnessRating", () => {
  it("cable is roundest", () => {
    expect(roundnessRating("cable")).toBeGreaterThan(
      roundnessRating("crepe")
    );
  });
});

describe("colorBlending", () => {
  it("three ply blends colors most", () => {
    expect(colorBlending("three_ply")).toBeGreaterThan(
      colorBlending("navajo_ply")
    );
  });
});

describe("preservesColorOrder", () => {
  it("navajo ply preserves color order", () => {
    expect(preservesColorOrder("navajo_ply")).toBe(true);
  });
  it("two ply does not", () => {
    expect(preservesColorOrder("two_ply")).toBe(false);
  });
});

describe("twistDirectionChanges", () => {
  it("crepe has most direction changes", () => {
    expect(twistDirectionChanges("crepe")).toBeGreaterThan(
      twistDirectionChanges("two_ply")
    );
  });
});

describe("elasticity", () => {
  it("crepe is most elastic", () => {
    expect(elasticity("crepe")).toBeGreaterThan(
      elasticity("cable")
    );
  });
});

describe("difficultyRating", () => {
  it("cable is hardest", () => {
    expect(difficultyRating("cable")).toBeGreaterThan(
      difficultyRating("two_ply")
    );
  });
});

describe("bestForProject", () => {
  it("navajo ply is for color work", () => {
    expect(bestForProject("navajo_ply")).toBe("color_work");
  });
});

describe("plyStructures", () => {
  it("returns 5 structures", () => {
    expect(plyStructures()).toHaveLength(5);
  });
});
