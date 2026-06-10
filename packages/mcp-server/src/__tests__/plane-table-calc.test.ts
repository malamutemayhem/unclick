import { describe, it, expect } from "vitest";
import {
  accuracyRating, controlPointsNeeded, sightRaysPerPoint,
  fieldPlottingSpeed, alidadeRequired, orientationSteps,
  difficultyRating, bestForTerrain, costEstimate, planeTableMethods,
} from "../plane-table-calc.js";

describe("accuracyRating", () => {
  it("three point is most accurate", () => {
    expect(accuracyRating("three_point")).toBeGreaterThan(
      accuracyRating("radiation")
    );
  });
});

describe("controlPointsNeeded", () => {
  it("radiation needs fewest control points", () => {
    expect(controlPointsNeeded("radiation")).toBeLessThan(
      controlPointsNeeded("three_point")
    );
  });
});

describe("sightRaysPerPoint", () => {
  it("three point needs most rays", () => {
    expect(sightRaysPerPoint("three_point")).toBeGreaterThan(
      sightRaysPerPoint("radiation")
    );
  });
});

describe("fieldPlottingSpeed", () => {
  it("radiation is fastest", () => {
    expect(fieldPlottingSpeed("radiation")).toBeGreaterThan(
      fieldPlottingSpeed("three_point")
    );
  });
});

describe("alidadeRequired", () => {
  it("always required", () => {
    expect(alidadeRequired("radiation")).toBe(true);
    expect(alidadeRequired("three_point")).toBe(true);
  });
});

describe("orientationSteps", () => {
  it("three point has most steps", () => {
    expect(orientationSteps("three_point")).toBeGreaterThan(
      orientationSteps("radiation")
    );
  });
});

describe("difficultyRating", () => {
  it("three point is hardest", () => {
    expect(difficultyRating("three_point")).toBeGreaterThan(
      difficultyRating("radiation")
    );
  });
});

describe("bestForTerrain", () => {
  it("radiation is best for open flat", () => {
    expect(bestForTerrain("radiation")).toBe("open_flat");
  });
});

describe("costEstimate", () => {
  it("returns a positive value", () => {
    expect(costEstimate("radiation")).toBeGreaterThan(0);
  });
});

describe("planeTableMethods", () => {
  it("returns 5 methods", () => {
    expect(planeTableMethods()).toHaveLength(5);
  });
});
