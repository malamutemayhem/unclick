import { describe, it, expect } from "vitest";
import {
  caneWidthMm, caneLengthMm, thicknessMm, hardnessGrade,
  soakingTimeMinutes, lifespanWeeks, scrapingTimeMinutes,
  doubleReed, breakInPlayingMinutes, costPerReed, reedTypes,
} from "../reed-calc.js";

describe("caneWidthMm", () => {
  it("saxophone is widest", () => {
    expect(caneWidthMm("saxophone")).toBeGreaterThan(caneWidthMm("oboe"));
  });
});

describe("caneLengthMm", () => {
  it("saxophone is longest", () => {
    expect(caneLengthMm("saxophone")).toBeGreaterThan(caneLengthMm("oboe"));
  });
});

describe("thicknessMm", () => {
  it("bassoon is thickest", () => {
    expect(thicknessMm("bassoon")).toBeGreaterThan(thicknessMm("saxophone"));
  });
});

describe("hardnessGrade", () => {
  it("bagpipe has hardest grade", () => {
    expect(hardnessGrade("bagpipe")).toBeGreaterThan(hardnessGrade("saxophone"));
  });
});

describe("soakingTimeMinutes", () => {
  it("bagpipe soaks longest", () => {
    expect(soakingTimeMinutes("bagpipe")).toBeGreaterThan(soakingTimeMinutes("clarinet"));
  });
});

describe("lifespanWeeks", () => {
  it("heavy practice = shorter lifespan", () => {
    expect(lifespanWeeks(4)).toBeLessThan(lifespanWeeks(1));
  });
  it("zero practice = max lifespan", () => {
    expect(lifespanWeeks(0)).toBe(8);
  });
});

describe("scrapingTimeMinutes", () => {
  it("bassoon takes longest to scrape", () => {
    expect(scrapingTimeMinutes("bassoon")).toBeGreaterThan(scrapingTimeMinutes("oboe"));
  });
  it("clarinet needs no scraping", () => {
    expect(scrapingTimeMinutes("clarinet")).toBe(0);
  });
});

describe("doubleReed", () => {
  it("oboe is double reed", () => {
    expect(doubleReed("oboe")).toBe(true);
  });
  it("clarinet is single reed", () => {
    expect(doubleReed("clarinet")).toBe(false);
  });
});

describe("breakInPlayingMinutes", () => {
  it("bagpipe needs longest break-in", () => {
    expect(breakInPlayingMinutes("bagpipe")).toBeGreaterThan(
      breakInPlayingMinutes("clarinet")
    );
  });
});

describe("costPerReed", () => {
  it("bassoon most expensive", () => {
    expect(costPerReed("bassoon", 5)).toBeGreaterThan(costPerReed("clarinet", 5));
  });
});

describe("reedTypes", () => {
  it("returns 5 types", () => {
    expect(reedTypes()).toHaveLength(5);
  });
});
