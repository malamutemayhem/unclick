import { describe, it, expect } from "vitest";
import {
  trunkTaperRequired, branchLevels, potDepthCm,
  wiringComplexity, pruningFrequencyPerYear, apexRequired,
  yearsToMature, difficultyRating, costEstimate, bonsaiStyles,
} from "../bonsai-style-calc.js";

describe("trunkTaperRequired", () => {
  it("formal upright needs most taper", () => {
    expect(trunkTaperRequired("formal_upright")).toBeGreaterThan(
      trunkTaperRequired("literati")
    );
  });
});

describe("branchLevels", () => {
  it("formal upright has most levels", () => {
    expect(branchLevels("formal_upright")).toBeGreaterThan(
      branchLevels("literati")
    );
  });
});

describe("potDepthCm", () => {
  it("cascade needs deepest pot", () => {
    expect(potDepthCm("cascade")).toBeGreaterThan(
      potDepthCm("literati")
    );
  });
});

describe("wiringComplexity", () => {
  it("cascade has most complex wiring", () => {
    expect(wiringComplexity("cascade")).toBeGreaterThan(
      wiringComplexity("literati")
    );
  });
});

describe("pruningFrequencyPerYear", () => {
  it("formal upright pruned most often", () => {
    expect(pruningFrequencyPerYear("formal_upright")).toBeGreaterThan(
      pruningFrequencyPerYear("literati")
    );
  });
});

describe("apexRequired", () => {
  it("formal upright needs apex", () => {
    expect(apexRequired("formal_upright")).toBe(true);
  });
  it("cascade does not", () => {
    expect(apexRequired("cascade")).toBe(false);
  });
});

describe("yearsToMature", () => {
  it("formal upright takes longest", () => {
    expect(yearsToMature("formal_upright")).toBeGreaterThan(
      yearsToMature("literati")
    );
  });
});

describe("difficultyRating", () => {
  it("formal upright is hardest", () => {
    expect(difficultyRating("formal_upright")).toBeGreaterThan(
      difficultyRating("informal_upright")
    );
  });
});

describe("costEstimate", () => {
  it("cascade is most expensive", () => {
    expect(costEstimate("cascade")).toBeGreaterThan(
      costEstimate("informal_upright")
    );
  });
});

describe("bonsaiStyles", () => {
  it("returns 5 styles", () => {
    expect(bonsaiStyles()).toHaveLength(5);
  });
});
