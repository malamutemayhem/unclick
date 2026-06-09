import { describe, it, expect } from "vitest";
import {
  drawWeight, arrowSpine, arrowSpeed, kineticEnergy,
  momentum, foc, dropAtDistance, sightMarks, arrowWeight,
  grainsPerPound, letoffPercent, bowEnergy, maxEffectiveRange,
  bowTypes,
} from "../archery-calc.js";

describe("drawWeight", () => {
  it("compound has letoff", () => {
    expect(drawWeight(60, "compound")).toBeLessThan(60);
  });

  it("recurve is full draw", () => {
    expect(drawWeight(40, "recurve")).toBe(40);
  });
});

describe("arrowSpine", () => {
  it("positive value", () => {
    expect(arrowSpine(50, 28)).toBeGreaterThan(0);
  });
});

describe("arrowSpeed", () => {
  it("compound faster than longbow", () => {
    expect(arrowSpeed(60, 400, "compound")).toBeGreaterThan(arrowSpeed(60, 400, "longbow"));
  });
});

describe("kineticEnergy", () => {
  it("positive ft-lbs", () => {
    expect(kineticEnergy(400, 280)).toBeGreaterThan(0);
  });
});

describe("momentum", () => {
  it("positive slug-ft/s", () => {
    expect(momentum(400, 280)).toBeGreaterThan(0);
  });
});

describe("foc", () => {
  it("positive for front-heavy", () => {
    expect(foc(28, 17)).toBeGreaterThan(0);
  });
});

describe("dropAtDistance", () => {
  it("more drop at farther distance", () => {
    expect(dropAtDistance(280, 40)).toBeGreaterThan(dropAtDistance(280, 20));
  });
});

describe("sightMarks", () => {
  it("returns map of distances", () => {
    const marks = sightMarks(280, [20, 30, 40]);
    expect(marks.size).toBe(3);
    expect(marks.get(40)!).toBeGreaterThan(marks.get(20)!);
  });
});

describe("arrowWeight", () => {
  it("sums components", () => {
    expect(arrowWeight(250, 100, 10, 20, 20)).toBe(400);
  });
});

describe("grainsPerPound", () => {
  it("positive ratio", () => {
    expect(grainsPerPound(400, 60)).toBeGreaterThan(0);
  });
});

describe("letoffPercent", () => {
  it("around 80% for compound", () => {
    expect(letoffPercent(60, 12)).toBeCloseTo(80, 0);
  });
});

describe("bowEnergy", () => {
  it("positive", () => {
    expect(bowEnergy(60, 29)).toBeGreaterThan(0);
  });
});

describe("maxEffectiveRange", () => {
  it("short for slow bow", () => {
    expect(maxEffectiveRange(200, 20)).toBe(20);
  });

  it("longer for fast bow", () => {
    expect(maxEffectiveRange(310, 60)).toBe(60);
  });
});

describe("bowTypes", () => {
  it("returns 4 types", () => {
    expect(bowTypes()).toHaveLength(4);
  });
});
