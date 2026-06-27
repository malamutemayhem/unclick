import { describe, it, expect } from "vitest";
import {
  wireSpacingCm, maxTiersCount, treesPerMeter, pruningFrequencyPerYear,
  yearsToFullForm, difficultyRating, yieldComparedToFreestanding,
  wallRequired, costPerMeter, espalierForms,
} from "../espalier-calc.js";

describe("wireSpacingCm", () => {
  it("cordon has widest spacing", () => {
    expect(wireSpacingCm("cordon")).toBeGreaterThan(
      wireSpacingCm("fan")
    );
  });
});

describe("maxTiersCount", () => {
  it("fan has most tiers", () => {
    expect(maxTiersCount("fan")).toBeGreaterThan(
      maxTiersCount("cordon")
    );
  });
});

describe("treesPerMeter", () => {
  it("cordon is densest", () => {
    expect(treesPerMeter("cordon")).toBeGreaterThan(
      treesPerMeter("fan")
    );
  });
});

describe("pruningFrequencyPerYear", () => {
  it("candelabra needs most pruning", () => {
    expect(pruningFrequencyPerYear("candelabra")).toBeGreaterThan(
      pruningFrequencyPerYear("cordon")
    );
  });
});

describe("yearsToFullForm", () => {
  it("candelabra takes longest", () => {
    expect(yearsToFullForm("candelabra")).toBeGreaterThan(
      yearsToFullForm("cordon")
    );
  });
});

describe("difficultyRating", () => {
  it("candelabra is hardest", () => {
    expect(difficultyRating("candelabra")).toBeGreaterThan(
      difficultyRating("cordon")
    );
  });
});

describe("yieldComparedToFreestanding", () => {
  it("palmette yields most", () => {
    expect(yieldComparedToFreestanding("palmette")).toBeGreaterThan(
      yieldComparedToFreestanding("cordon")
    );
  });
});

describe("wallRequired", () => {
  it("belgian fence does not need wall", () => {
    expect(wallRequired("belgian_fence")).toBe(false);
  });
  it("cordon needs wall", () => {
    expect(wallRequired("cordon")).toBe(true);
  });
});

describe("costPerMeter", () => {
  it("candelabra is most expensive", () => {
    expect(costPerMeter("candelabra")).toBeGreaterThan(
      costPerMeter("cordon")
    );
  });
});

describe("espalierForms", () => {
  it("returns 5 forms", () => {
    expect(espalierForms()).toHaveLength(5);
  });
});
