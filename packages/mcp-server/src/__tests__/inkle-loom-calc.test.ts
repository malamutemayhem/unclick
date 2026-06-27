import { describe, it, expect } from "vitest";
import {
  maxBandWidthCm, warpThreadCount, warpLengthM, heddles,
  beatsPerCm, difficultyRating, speedCmPerHour, weftVisible,
  costEstimateLoom, inklePatterns,
} from "../inkle-loom-calc.js";

describe("maxBandWidthCm", () => {
  it("larger loom makes wider band", () => {
    expect(maxBandWidthCm(60)).toBeGreaterThan(maxBandWidthCm(40));
  });
});

describe("warpThreadCount", () => {
  it("wider band needs more threads", () => {
    expect(warpThreadCount(10, 8)).toBeGreaterThan(
      warpThreadCount(5, 8)
    );
  });
});

describe("warpLengthM", () => {
  it("larger loom gives longer warp", () => {
    expect(warpLengthM(80)).toBeGreaterThan(warpLengthM(40));
  });
});

describe("heddles", () => {
  it("half the thread count", () => {
    expect(heddles(40)).toBe(20);
  });
});

describe("beatsPerCm", () => {
  it("plain weave beats most per cm", () => {
    expect(beatsPerCm("plain_weave")).toBeGreaterThan(
      beatsPerCm("andean")
    );
  });
});

describe("difficultyRating", () => {
  it("andean is hardest", () => {
    expect(difficultyRating("andean")).toBeGreaterThan(
      difficultyRating("plain_weave")
    );
  });
});

describe("speedCmPerHour", () => {
  it("plain weave is fastest", () => {
    expect(speedCmPerHour("plain_weave")).toBeGreaterThan(
      speedCmPerHour("andean")
    );
  });
});

describe("weftVisible", () => {
  it("plain weave shows weft", () => {
    expect(weftVisible("plain_weave")).toBe(true);
  });
  it("pickup hides weft", () => {
    expect(weftVisible("pickup")).toBe(false);
  });
});

describe("costEstimateLoom", () => {
  it("returns 45", () => {
    expect(costEstimateLoom()).toBe(45);
  });
});

describe("inklePatterns", () => {
  it("returns 5 patterns", () => {
    expect(inklePatterns()).toHaveLength(5);
  });
});
