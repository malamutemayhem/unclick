import { describe, it, expect } from "vitest";
import {
  foldCount, wingSpan, aspectRatio, throwSpeed, flightDistance,
  flightTime, liftCoefficient, noseWeight, stabilizerArea,
  elevonAngle, bestLaunchAngle, competitionScore, planeDesigns,
} from "../paper-airplane.js";

describe("foldCount", () => {
  it("dart has 6 folds", () => {
    expect(foldCount("dart")).toBe(6);
  });
  it("biplane has most folds", () => {
    expect(foldCount("biplane")).toBeGreaterThan(foldCount("dart"));
  });
});

describe("wingSpan", () => {
  it("positive cm", () => {
    expect(wingSpan(21, "dart")).toBeGreaterThan(0);
  });
  it("glider wider than dart", () => {
    expect(wingSpan(21, "glider")).toBeGreaterThan(wingSpan(21, "dart"));
  });
});

describe("aspectRatio", () => {
  it("computes ratio", () => {
    expect(aspectRatio(20, 5)).toBe(4);
  });
});

describe("throwSpeed", () => {
  it("distance / time", () => {
    expect(throwSpeed(10, 2)).toBe(5);
  });
});

describe("flightDistance", () => {
  it("positive meters", () => {
    expect(flightDistance("dart", "copy")).toBeGreaterThan(0);
  });
  it("glider flies farther than stunt", () => {
    expect(flightDistance("glider", "copy")).toBeGreaterThan(flightDistance("stunt", "copy"));
  });
});

describe("flightTime", () => {
  it("glider has longest flight", () => {
    expect(flightTime("glider")).toBeGreaterThan(flightTime("dart"));
  });
});

describe("liftCoefficient", () => {
  it("positive for positive angle", () => {
    expect(liftCoefficient(5)).toBeGreaterThan(0);
  });
  it("zero at zero", () => {
    expect(liftCoefficient(0)).toBe(0);
  });
});

describe("noseWeight", () => {
  it("positive grams", () => {
    expect(noseWeight(80)).toBeGreaterThan(0);
  });
});

describe("stabilizerArea", () => {
  it("15% of wing area", () => {
    expect(stabilizerArea(100)).toBe(15);
  });
});

describe("elevonAngle", () => {
  it("up is positive", () => {
    expect(elevonAngle("up")).toBeGreaterThan(0);
  });
  it("neutral is zero", () => {
    expect(elevonAngle("neutral")).toBe(0);
  });
  it("down is negative", () => {
    expect(elevonAngle("down")).toBeLessThan(0);
  });
});

describe("bestLaunchAngle", () => {
  it("glider is 0 degrees", () => {
    expect(bestLaunchAngle("glider")).toBe(0);
  });
  it("stunt has steep angle", () => {
    expect(bestLaunchAngle("stunt")).toBeGreaterThan(bestLaunchAngle("dart"));
  });
});

describe("competitionScore", () => {
  it("returns a number", () => {
    expect(competitionScore(15, 5, 2)).toBeGreaterThan(0);
  });
});

describe("planeDesigns", () => {
  it("returns 6 designs", () => {
    expect(planeDesigns()).toHaveLength(6);
  });
});
