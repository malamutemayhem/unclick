import { describe, it, expect } from "vitest";
import {
  endsPerCm, totalEnds, warpLengthM, yarnWeightG, tensionGramsPerEnd,
  beamWindingTimeMinutes, threadingTimeMinutes, tieUpCount, takeUpPercent,
  warpPatterns,
} from "../warp-calc.js";

describe("endsPerCm", () => {
  it("satin has more ends than plain", () => {
    expect(endsPerCm("satin")).toBeGreaterThan(endsPerCm("plain"));
  });
});

describe("totalEnds", () => {
  it("calculates width times epc plus selvage", () => {
    expect(totalEnds(50, 12, 8)).toBe(608);
  });
});

describe("warpLengthM", () => {
  it("adds loom waste after take-up adjustment", () => {
    expect(warpLengthM(3, 0.5, 10)).toBeGreaterThan(3.5);
  });
});

describe("yarnWeightG", () => {
  it("lower count = heavier yarn", () => {
    expect(yarnWeightG(100, 10)).toBeGreaterThan(yarnWeightG(100, 20));
  });
  it("zero count returns 0", () => {
    expect(yarnWeightG(100, 0)).toBe(0);
  });
});

describe("tensionGramsPerEnd", () => {
  it("leno needs highest tension", () => {
    expect(tensionGramsPerEnd("leno")).toBeGreaterThan(tensionGramsPerEnd("satin"));
  });
});

describe("beamWindingTimeMinutes", () => {
  it("more ends = more time", () => {
    expect(beamWindingTimeMinutes(500)).toBeGreaterThan(beamWindingTimeMinutes(200));
  });
});

describe("threadingTimeMinutes", () => {
  it("scales with end count", () => {
    expect(threadingTimeMinutes(400)).toBe(80);
  });
});

describe("tieUpCount", () => {
  it("satin has most tie-ups", () => {
    expect(tieUpCount("satin")).toBeGreaterThan(tieUpCount("plain"));
  });
});

describe("takeUpPercent", () => {
  it("leno has highest take-up", () => {
    expect(takeUpPercent("leno")).toBeGreaterThan(takeUpPercent("satin"));
  });
});

describe("warpPatterns", () => {
  it("returns 5 patterns", () => {
    expect(warpPatterns()).toHaveLength(5);
  });
});
