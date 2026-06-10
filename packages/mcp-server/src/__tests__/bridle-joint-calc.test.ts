import { describe, it, expect } from "vitest";
import {
  cheekLengthRatio, glueAreaMultiplier, strengthRating, rackResistance,
  sawCutsRequired, cuttingTimeMinutes, pinRequired, bestApplication,
  difficultyRating, bridleTypes,
} from "../bridle-joint-calc.js";

describe("cheekLengthRatio", () => {
  it("mitered has longest cheeks", () => {
    expect(cheekLengthRatio("mitered")).toBeGreaterThan(
      cheekLengthRatio("haunched")
    );
  });
});

describe("glueAreaMultiplier", () => {
  it("haunched has most glue area", () => {
    expect(glueAreaMultiplier("haunched")).toBeGreaterThan(
      glueAreaMultiplier("corner")
    );
  });
});

describe("strengthRating", () => {
  it("haunched is strongest", () => {
    expect(strengthRating("haunched")).toBeGreaterThan(
      strengthRating("mitered")
    );
  });
});

describe("rackResistance", () => {
  it("haunched resists racking best", () => {
    expect(rackResistance("haunched")).toBeGreaterThan(
      rackResistance("mitered")
    );
  });
});

describe("sawCutsRequired", () => {
  it("mitered needs most cuts", () => {
    expect(sawCutsRequired("mitered")).toBeGreaterThanOrEqual(
      sawCutsRequired("corner")
    );
  });
});

describe("cuttingTimeMinutes", () => {
  it("haunched takes longest to cut", () => {
    expect(cuttingTimeMinutes("haunched")).toBeGreaterThan(
      cuttingTimeMinutes("corner")
    );
  });
});

describe("pinRequired", () => {
  it("haunched needs a pin", () => {
    expect(pinRequired("haunched")).toBe(true);
  });
  it("corner does not", () => {
    expect(pinRequired("corner")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("corner is best for frames", () => {
    expect(bestApplication("corner")).toBe("frame");
  });
});

describe("difficultyRating", () => {
  it("oblique is hardest", () => {
    expect(difficultyRating("oblique")).toBeGreaterThan(
      difficultyRating("corner")
    );
  });
});

describe("bridleTypes", () => {
  it("returns 5 types", () => {
    expect(bridleTypes()).toHaveLength(5);
  });
});
