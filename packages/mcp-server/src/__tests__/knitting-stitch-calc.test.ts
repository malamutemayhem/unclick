import { describe, it, expect } from "vitest";
import {
  difficulty, elasticity, yarnUsageMultiplier,
  textureDepth, speedRowsPerHour, reversible,
  curls, bestProject, warmthRating, knittingStitches,
} from "../knitting-stitch-calc.js";

describe("difficulty", () => {
  it("cable is most difficult", () => {
    expect(difficulty("cable")).toBeGreaterThan(difficulty("garter"));
  });
});

describe("elasticity", () => {
  it("ribbing is most elastic", () => {
    expect(elasticity("ribbing")).toBeGreaterThan(
      elasticity("cable")
    );
  });
});

describe("yarnUsageMultiplier", () => {
  it("cable uses most yarn", () => {
    expect(yarnUsageMultiplier("cable")).toBeGreaterThan(
      yarnUsageMultiplier("stockinette")
    );
  });
});

describe("textureDepth", () => {
  it("cable has deepest texture", () => {
    expect(textureDepth("cable")).toBeGreaterThan(
      textureDepth("stockinette")
    );
  });
});

describe("speedRowsPerHour", () => {
  it("stockinette is fastest", () => {
    expect(speedRowsPerHour("stockinette")).toBeGreaterThan(
      speedRowsPerHour("cable")
    );
  });
});

describe("reversible", () => {
  it("garter is reversible", () => {
    expect(reversible("garter")).toBe(true);
  });
  it("stockinette is not", () => {
    expect(reversible("stockinette")).toBe(false);
  });
});

describe("curls", () => {
  it("stockinette curls", () => {
    expect(curls("stockinette")).toBe(true);
  });
  it("garter does not", () => {
    expect(curls("garter")).toBe(false);
  });
});

describe("bestProject", () => {
  it("ribbing for cuffs", () => {
    expect(bestProject("ribbing")).toBe("cuffs");
  });
});

describe("warmthRating", () => {
  it("cable is warmest", () => {
    expect(warmthRating("cable")).toBeGreaterThan(
      warmthRating("stockinette")
    );
  });
});

describe("knittingStitches", () => {
  it("returns 5 types", () => {
    expect(knittingStitches()).toHaveLength(5);
  });
});
