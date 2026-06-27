import { describe, it, expect } from "vitest";
import {
  maxWidthCm, shaftCount, portability,
  setupTimeMinutes, patternComplexity, speedMetersPerHour,
  skillLevel, bestFor, costEstimate, loomTypes,
} from "../loom-type-calc.js";

describe("maxWidthCm", () => {
  it("tapestry loom is widest", () => {
    expect(maxWidthCm("tapestry")).toBeGreaterThan(
      maxWidthCm("inkle")
    );
  });
});

describe("shaftCount", () => {
  it("floor loom has most shafts", () => {
    expect(shaftCount("floor")).toBeGreaterThan(
      shaftCount("rigid_heddle")
    );
  });
});

describe("portability", () => {
  it("backstrap is most portable", () => {
    expect(portability("backstrap")).toBeGreaterThan(
      portability("floor")
    );
  });
});

describe("setupTimeMinutes", () => {
  it("floor loom takes longest setup", () => {
    expect(setupTimeMinutes("floor")).toBeGreaterThan(
      setupTimeMinutes("inkle")
    );
  });
});

describe("patternComplexity", () => {
  it("tapestry has highest complexity", () => {
    expect(patternComplexity("tapestry")).toBeGreaterThan(
      patternComplexity("inkle")
    );
  });
});

describe("speedMetersPerHour", () => {
  it("floor loom is fastest", () => {
    expect(speedMetersPerHour("floor")).toBeGreaterThan(
      speedMetersPerHour("tapestry")
    );
  });
});

describe("skillLevel", () => {
  it("tapestry needs highest skill", () => {
    expect(skillLevel("tapestry")).toBeGreaterThan(
      skillLevel("inkle")
    );
  });
});

describe("bestFor", () => {
  it("floor loom is best for yardage", () => {
    expect(bestFor("floor")).toBe("yardage");
  });
});

describe("costEstimate", () => {
  it("floor loom costs most", () => {
    expect(costEstimate("floor")).toBeGreaterThan(
      costEstimate("backstrap")
    );
  });
});

describe("loomTypes", () => {
  it("returns 5 types", () => {
    expect(loomTypes()).toHaveLength(5);
  });
});
