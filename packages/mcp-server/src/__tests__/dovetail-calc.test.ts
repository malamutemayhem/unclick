import { describe, it, expect } from "vitest";
import {
  pinCount, tailAngleDeg, pinWidthMm, tailWidthMm, cuttingDepthMm,
  glueSurfaceAreaCm2, cuttingTimeMinutes, jointStrengthRating,
  chiselSizesMm, wastewoodPercent, dovetailTypes,
} from "../dovetail-calc.js";

describe("pinCount", () => {
  it("wider board = more pins", () => {
    expect(pinCount(200, 25)).toBeGreaterThan(pinCount(100, 25));
  });
  it("zero spacing returns zero", () => {
    expect(pinCount(200, 0)).toBe(0);
  });
});

describe("tailAngleDeg", () => {
  it("softwood has wider angle", () => {
    expect(tailAngleDeg("softwood")).toBeGreaterThan(tailAngleDeg("hardwood"));
  });
});

describe("pinWidthMm", () => {
  it("half of board thickness", () => {
    expect(pinWidthMm(20)).toBe(10);
  });
});

describe("tailWidthMm", () => {
  it("1.5x board thickness", () => {
    expect(tailWidthMm(20)).toBe(30);
  });
});

describe("cuttingDepthMm", () => {
  it("through = full thickness", () => {
    expect(cuttingDepthMm(20, "through")).toBe(20);
  });
  it("half blind is shallower", () => {
    expect(cuttingDepthMm(20, "half_blind")).toBeLessThan(20);
  });
  it("sliding is shallowest", () => {
    expect(cuttingDepthMm(20, "sliding")).toBeLessThan(cuttingDepthMm(20, "half_blind"));
  });
});

describe("glueSurfaceAreaCm2", () => {
  it("positive area", () => {
    expect(glueSurfaceAreaCm2(5, 10, 20)).toBeGreaterThan(0);
  });
});

describe("cuttingTimeMinutes", () => {
  it("beginner takes longest", () => {
    expect(cuttingTimeMinutes(5, "beginner")).toBeGreaterThan(cuttingTimeMinutes(5, "expert"));
  });
});

describe("jointStrengthRating", () => {
  it("french strongest", () => {
    expect(jointStrengthRating("french")).toBeGreaterThan(jointStrengthRating("sliding"));
  });
});

describe("chiselSizesMm", () => {
  it("returns two sizes", () => {
    expect(chiselSizesMm(20)).toHaveLength(2);
  });
});

describe("wastewoodPercent", () => {
  it("french has most waste", () => {
    expect(wastewoodPercent("french")).toBeGreaterThan(wastewoodPercent("sliding"));
  });
});

describe("dovetailTypes", () => {
  it("returns 5 types", () => {
    expect(dovetailTypes()).toHaveLength(5);
  });
});
