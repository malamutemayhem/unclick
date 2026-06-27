import { describe, it, expect } from "vitest";
import {
  courseCount, fretCount, stringLengthCm,
  toneWarmth, bassRange, fretted,
  tuningComplexity, historicalPeriod, costEstimate, luteTypes,
} from "../lute-fret-calc.js";

describe("courseCount", () => {
  it("theorbo has most courses", () => {
    expect(courseCount("theorbo")).toBeGreaterThan(
      courseCount("renaissance")
    );
  });
});

describe("fretCount", () => {
  it("baroque has most frets", () => {
    expect(fretCount("baroque")).toBeGreaterThan(
      fretCount("oud")
    );
  });
});

describe("stringLengthCm", () => {
  it("theorbo has longest strings", () => {
    expect(stringLengthCm("theorbo")).toBeGreaterThan(
      stringLengthCm("renaissance")
    );
  });
});

describe("toneWarmth", () => {
  it("oud is warmest", () => {
    expect(toneWarmth("oud")).toBeGreaterThan(
      toneWarmth("theorbo")
    );
  });
});

describe("bassRange", () => {
  it("theorbo has deepest bass", () => {
    expect(bassRange("theorbo")).toBeGreaterThan(
      bassRange("renaissance")
    );
  });
});

describe("fretted", () => {
  it("renaissance is fretted", () => {
    expect(fretted("renaissance")).toBe(true);
  });
  it("oud is not", () => {
    expect(fretted("oud")).toBe(false);
  });
});

describe("tuningComplexity", () => {
  it("theorbo is most complex to tune", () => {
    expect(tuningComplexity("theorbo")).toBeGreaterThan(
      tuningComplexity("oud")
    );
  });
});

describe("historicalPeriod", () => {
  it("oud is ancient", () => {
    expect(historicalPeriod("oud")).toBe("ancient");
  });
});

describe("costEstimate", () => {
  it("theorbo costs most", () => {
    expect(costEstimate("theorbo")).toBeGreaterThan(
      costEstimate("oud")
    );
  });
});

describe("luteTypes", () => {
  it("returns 5 types", () => {
    expect(luteTypes()).toHaveLength(5);
  });
});
