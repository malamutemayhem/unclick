import { describe, it, expect } from "vitest";
import {
  facetCount, brilliance, fireDispersion,
  weightRetentionPercent, cuttingDifficulty, showsInclusions,
  bestGemstone, symmetryImportance, costMultiplier, gemstoneCuts,
} from "../gemstone-cut-calc.js";

describe("facetCount", () => {
  it("brilliant has most facets", () => {
    expect(facetCount("brilliant")).toBeGreaterThan(
      facetCount("step")
    );
  });
});

describe("brilliance", () => {
  it("brilliant cut is most brilliant", () => {
    expect(brilliance("brilliant")).toBeGreaterThan(
      brilliance("cabochon")
    );
  });
});

describe("fireDispersion", () => {
  it("brilliant has most fire", () => {
    expect(fireDispersion("brilliant")).toBeGreaterThan(
      fireDispersion("step")
    );
  });
});

describe("weightRetentionPercent", () => {
  it("cabochon retains most weight", () => {
    expect(weightRetentionPercent("cabochon")).toBeGreaterThan(
      weightRetentionPercent("brilliant")
    );
  });
});

describe("cuttingDifficulty", () => {
  it("mixed cut is most difficult", () => {
    expect(cuttingDifficulty("mixed")).toBeGreaterThan(
      cuttingDifficulty("cabochon")
    );
  });
});

describe("showsInclusions", () => {
  it("step cut shows inclusions", () => {
    expect(showsInclusions("step")).toBe(true);
  });
  it("brilliant hides inclusions", () => {
    expect(showsInclusions("brilliant")).toBe(false);
  });
});

describe("bestGemstone", () => {
  it("cabochon best for opal", () => {
    expect(bestGemstone("cabochon")).toBe("opal");
  });
});

describe("symmetryImportance", () => {
  it("brilliant needs most symmetry", () => {
    expect(symmetryImportance("brilliant")).toBeGreaterThan(
      symmetryImportance("cabochon")
    );
  });
});

describe("costMultiplier", () => {
  it("brilliant costs most", () => {
    expect(costMultiplier("brilliant")).toBeGreaterThan(
      costMultiplier("cabochon")
    );
  });
});

describe("gemstoneCuts", () => {
  it("returns 5 cuts", () => {
    expect(gemstoneCuts()).toHaveLength(5);
  });
});
