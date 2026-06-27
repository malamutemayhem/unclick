import { describe, it, expect } from "vitest";
import {
  stitchesPerCm, threadLengthCm, needleSizeMm, holeDiameterMm,
  holeSpacingMm, threadThicknessMm, stitchingTimeMins, strengthRating,
  waxRequired, costPerMeter, stitchTypes,
} from "../leather-stitch-calc.js";

describe("stitchesPerCm", () => {
  it("converts spi to per cm", () => {
    expect(stitchesPerCm(7)).toBeCloseTo(2.8, 0);
  });
});

describe("threadLengthCm", () => {
  it("cross stitch uses most thread", () => {
    expect(threadLengthCm(10, "cross")).toBeGreaterThan(threadLengthCm(10, "running"));
  });
});

describe("needleSizeMm", () => {
  it("thicker leather = larger needle", () => {
    expect(needleSizeMm(3)).toBeGreaterThan(needleSizeMm(1));
  });
});

describe("holeDiameterMm", () => {
  it("slightly smaller than needle", () => {
    expect(holeDiameterMm(2)).toBeLessThan(2);
  });
});

describe("holeSpacingMm", () => {
  it("cross stitch widest spacing", () => {
    expect(holeSpacingMm("cross")).toBeGreaterThan(holeSpacingMm("running"));
  });
});

describe("threadThicknessMm", () => {
  it("proportional to leather", () => {
    expect(threadThicknessMm(3)).toBeGreaterThan(threadThicknessMm(1));
  });
});

describe("stitchingTimeMins", () => {
  it("beginner takes longest", () => {
    expect(stitchingTimeMins(20, "beginner")).toBeGreaterThan(stitchingTimeMins(20, "expert"));
  });
});

describe("strengthRating", () => {
  it("saddle stitch strongest", () => {
    expect(strengthRating("saddle")).toBeGreaterThan(strengthRating("running"));
  });
});

describe("waxRequired", () => {
  it("always required for positive thread", () => {
    expect(waxRequired(10)).toBe(true);
  });
});

describe("costPerMeter", () => {
  it("saddle most expensive", () => {
    expect(costPerMeter("saddle", 5)).toBeGreaterThan(costPerMeter("running", 5));
  });
});

describe("stitchTypes", () => {
  it("returns 5 types", () => {
    expect(stitchTypes()).toHaveLength(5);
  });
});
