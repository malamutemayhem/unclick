import { describe, it, expect } from "vitest";
import {
  lineCount, roseTeeth, eccentricDistance, spinSpeed, cutDepth,
  patternPeriod, overlapAngle, engraveTime, symmetryFold,
  antiCounterfeitRating, guillochePatterns,
} from "../guilloche-calc.js";

describe("lineCount", () => {
  it("positive count", () => {
    expect(lineCount(50, 1)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(lineCount(50, 0)).toBe(0);
  });
});

describe("roseTeeth", () => {
  it("2x lobes", () => {
    expect(roseTeeth(8)).toBe(16);
  });
});

describe("eccentricDistance", () => {
  it("positive mm", () => {
    expect(eccentricDistance(5, 3)).toBeGreaterThan(0);
  });
  it("zero freq = 0", () => {
    expect(eccentricDistance(5, 0)).toBe(0);
  });
});

describe("spinSpeed", () => {
  it("diamond fastest", () => {
    expect(spinSpeed("diamond")).toBeGreaterThan(spinSpeed("steel"));
  });
});

describe("cutDepth", () => {
  it("positive mm", () => {
    expect(cutDepth("gold")).toBeGreaterThan(0);
  });
});

describe("patternPeriod", () => {
  it("positive seconds", () => {
    expect(patternPeriod(6, 200)).toBeGreaterThan(0);
  });
});

describe("overlapAngle", () => {
  it("360/lines", () => {
    expect(overlapAngle(36)).toBe(10);
  });
});

describe("engraveTime", () => {
  it("positive minutes", () => {
    expect(engraveTime(100, 3, 200)).toBeGreaterThan(0);
  });
});

describe("symmetryFold", () => {
  it("equals lobes", () => {
    expect(symmetryFold(8)).toBe(8);
  });
});

describe("antiCounterfeitRating", () => {
  it("basket highest", () => {
    expect(antiCounterfeitRating("basket")).toBeGreaterThan(antiCounterfeitRating("wave"));
  });
});

describe("guillochePatterns", () => {
  it("returns 5 patterns", () => {
    expect(guillochePatterns()).toHaveLength(5);
  });
});
