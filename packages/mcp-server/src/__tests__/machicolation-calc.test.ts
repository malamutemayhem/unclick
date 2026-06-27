import { describe, it, expect } from "vitest";
import {
  openingWidthCm, openingLengthCm, projectionCm, openingCount,
  corbelCount, dropHeight, parapetheightCm, weightPerMeterKg,
  coverageAngleDeg, constructionDays, machicolationTypes,
} from "../machicolation-calc.js";

describe("openingWidthCm", () => {
  it("30% of wall", () => {
    expect(openingWidthCm(100)).toBe(30);
  });
});

describe("openingLengthCm", () => {
  it("positive length", () => {
    expect(openingLengthCm(80, 20)).toBe(60);
  });
});

describe("projectionCm", () => {
  it("60% of wall", () => {
    expect(projectionCm(100)).toBe(60);
  });
});

describe("openingCount", () => {
  it("positive count", () => {
    expect(openingCount(2000, 80)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(openingCount(2000, 0)).toBe(0);
  });
});

describe("corbelCount", () => {
  it("product", () => {
    expect(corbelCount(25, 3)).toBe(75);
  });
});

describe("dropHeight", () => {
  it("positive height", () => {
    expect(dropHeight(10, 5)).toBeGreaterThan(10);
  });
});

describe("parapetheightCm", () => {
  it("corbelled tallest", () => {
    expect(parapetheightCm("corbelled")).toBeGreaterThan(parapetheightCm("boxed"));
  });
});

describe("weightPerMeterKg", () => {
  it("corbelled heaviest", () => {
    expect(weightPerMeterKg("corbelled")).toBeGreaterThan(weightPerMeterKg("timber"));
  });
});

describe("coverageAngleDeg", () => {
  it("positive angle", () => {
    expect(coverageAngleDeg(60, 30)).toBeGreaterThan(0);
  });
  it("zero projection = 0", () => {
    expect(coverageAngleDeg(0, 30)).toBe(0);
  });
});

describe("constructionDays", () => {
  it("timber fastest", () => {
    expect(constructionDays(10, "timber")).toBeLessThan(constructionDays(10, "stone"));
  });
});

describe("machicolationTypes", () => {
  it("returns 5 types", () => {
    expect(machicolationTypes()).toHaveLength(5);
  });
});
