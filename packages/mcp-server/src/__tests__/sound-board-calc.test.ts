import { describe, it, expect } from "vitest";
import {
  thicknessMm, stiffnessGpa, densityKgPerM3, soundVelocityMPerSec,
  bracingPattern, tapToneFrequencyHz, moistureContentPercent,
  grainLinesPer10mm, projectionRating, toneWoods,
} from "../sound-board-calc.js";

describe("thicknessMm", () => {
  it("paulownia is thickest", () => {
    expect(thicknessMm("paulownia")).toBeGreaterThan(thicknessMm("cedar"));
  });
});

describe("stiffnessGpa", () => {
  it("spruce is stiffest", () => {
    expect(stiffnessGpa("spruce")).toBeGreaterThan(stiffnessGpa("paulownia"));
  });
});

describe("densityKgPerM3", () => {
  it("koa is densest", () => {
    expect(densityKgPerM3("koa")).toBeGreaterThan(densityKgPerM3("paulownia"));
  });
});

describe("soundVelocityMPerSec", () => {
  it("positive for valid inputs", () => {
    expect(soundVelocityMPerSec(12, 400)).toBeGreaterThan(0);
  });
  it("zero density returns zero", () => {
    expect(soundVelocityMPerSec(12, 0)).toBe(0);
  });
});

describe("bracingPattern", () => {
  it("lattice has most braces", () => {
    expect(bracingPattern("lattice")).toBeGreaterThan(bracingPattern("x"));
  });
});

describe("tapToneFrequencyHz", () => {
  it("thinner = higher frequency", () => {
    expect(tapToneFrequencyHz(2, 0.05)).toBeGreaterThan(tapToneFrequencyHz(3, 0.05));
  });
  it("zero area returns zero", () => {
    expect(tapToneFrequencyHz(3, 0)).toBe(0);
  });
});

describe("moistureContentPercent", () => {
  it("kiln dried is drier", () => {
    expect(moistureContentPercent("kiln")).toBeLessThan(moistureContentPercent("air_dried"));
  });
});

describe("grainLinesPer10mm", () => {
  it("master grade is finer", () => {
    expect(grainLinesPer10mm("master")).toBeGreaterThan(grainLinesPer10mm("standard"));
  });
});

describe("projectionRating", () => {
  it("spruce has best projection", () => {
    expect(projectionRating("spruce")).toBeGreaterThan(projectionRating("paulownia"));
  });
});

describe("toneWoods", () => {
  it("returns 5 woods", () => {
    expect(toneWoods()).toHaveLength(5);
  });
});
