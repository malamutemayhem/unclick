import { describe, it, expect } from "vitest";
import {
  stitchesPer10cm, rowsPer10cm, needleSizeMm, yarnMetersPerProject,
  yarnBallsNeeded, metersPerBall, knittingSpeedStitchesPerMin,
  projectTimeHours, costPerBall, yarnWeights,
} from "../knitting-gauge-calc.js";

describe("stitchesPer10cm", () => {
  it("lace has most stitches", () => {
    expect(stitchesPer10cm("lace")).toBeGreaterThan(stitchesPer10cm("bulky"));
  });
});

describe("rowsPer10cm", () => {
  it("lace has most rows", () => {
    expect(rowsPer10cm("lace")).toBeGreaterThan(rowsPer10cm("bulky"));
  });
});

describe("needleSizeMm", () => {
  it("bulky uses largest needles", () => {
    expect(needleSizeMm("bulky")).toBeGreaterThan(needleSizeMm("lace"));
  });
});

describe("yarnMetersPerProject", () => {
  it("larger project = more yarn", () => {
    expect(yarnMetersPerProject(100, 100, 20, 30)).toBeGreaterThan(
      yarnMetersPerProject(50, 50, 20, 30)
    );
  });
});

describe("yarnBallsNeeded", () => {
  it("more meters = more balls", () => {
    expect(yarnBallsNeeded(500, 200)).toBeGreaterThan(yarnBallsNeeded(200, 200));
  });
  it("zero meters per ball returns 0", () => {
    expect(yarnBallsNeeded(500, 0)).toBe(0);
  });
});

describe("metersPerBall", () => {
  it("lace has most meters per ball", () => {
    expect(metersPerBall("lace")).toBeGreaterThan(metersPerBall("bulky"));
  });
});

describe("knittingSpeedStitchesPerMin", () => {
  it("expert is fastest", () => {
    expect(knittingSpeedStitchesPerMin("expert")).toBeGreaterThan(
      knittingSpeedStitchesPerMin("beginner")
    );
  });
});

describe("projectTimeHours", () => {
  it("more stitches = more time", () => {
    expect(projectTimeHours(10000, 30)).toBeGreaterThan(projectTimeHours(5000, 30));
  });
  it("zero speed returns 0", () => {
    expect(projectTimeHours(10000, 0)).toBe(0);
  });
});

describe("costPerBall", () => {
  it("lace is most expensive per ball", () => {
    expect(costPerBall("lace")).toBeGreaterThan(costPerBall("worsted"));
  });
});

describe("yarnWeights", () => {
  it("returns 5 weights", () => {
    expect(yarnWeights()).toHaveLength(5);
  });
});
