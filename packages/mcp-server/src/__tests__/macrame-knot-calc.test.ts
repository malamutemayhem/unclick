import { describe, it, expect } from "vitest";
import {
  cordUsageCm, difficultyRating, textureRating,
  densityResult, speedPerKnot, reversible,
  structural, bestProject, costPerMeter, macrameKnots,
} from "../macrame-knot-calc.js";

describe("cordUsageCm", () => {
  it("berry knot uses most cord", () => {
    expect(cordUsageCm("berry_knot")).toBeGreaterThan(
      cordUsageCm("half_hitch")
    );
  });
});

describe("difficultyRating", () => {
  it("berry knot is hardest", () => {
    expect(difficultyRating("berry_knot")).toBeGreaterThan(
      difficultyRating("half_hitch")
    );
  });
});

describe("textureRating", () => {
  it("berry knot has most texture", () => {
    expect(textureRating("berry_knot")).toBeGreaterThan(
      textureRating("half_hitch")
    );
  });
});

describe("densityResult", () => {
  it("berry knot is densest", () => {
    expect(densityResult("berry_knot")).toBeGreaterThan(
      densityResult("half_hitch")
    );
  });
});

describe("speedPerKnot", () => {
  it("half hitch is fastest", () => {
    expect(speedPerKnot("half_hitch")).toBeGreaterThan(
      speedPerKnot("berry_knot")
    );
  });
});

describe("reversible", () => {
  it("square knot is reversible", () => {
    expect(reversible("square_knot")).toBe(true);
  });
  it("berry knot is not", () => {
    expect(reversible("berry_knot")).toBe(false);
  });
});

describe("structural", () => {
  it("square knot is structural", () => {
    expect(structural("square_knot")).toBe(true);
  });
  it("spiral knot is not", () => {
    expect(structural("spiral_knot")).toBe(false);
  });
});

describe("bestProject", () => {
  it("spiral knot best for plant hanger", () => {
    expect(bestProject("spiral_knot")).toBe("plant_hanger");
  });
});

describe("costPerMeter", () => {
  it("berry knot costs most", () => {
    expect(costPerMeter("berry_knot")).toBeGreaterThan(
      costPerMeter("half_hitch")
    );
  });
});

describe("macrameKnots", () => {
  it("returns 5 knots", () => {
    expect(macrameKnots()).toHaveLength(5);
  });
});
