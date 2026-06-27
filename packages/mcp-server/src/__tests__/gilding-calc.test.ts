import { describe, it, expect } from "vitest";
import {
  leafSheets, leafThicknessMicrons, sizeCoats, boleClay,
  burnishTime, goldWeightG, tackTime, skewings,
  durabilityYears, gildingMethods,
} from "../gilding-calc.js";

describe("leafSheets", () => {
  it("positive sheets", () => {
    expect(leafSheets(1, 10)).toBeGreaterThan(0);
  });
});

describe("leafThicknessMicrons", () => {
  it("thinnest at 23k", () => {
    expect(leafThicknessMicrons(23)).toBeLessThan(leafThicknessMicrons(18));
  });
});

describe("sizeCoats", () => {
  it("water gilding most coats", () => {
    expect(sizeCoats("water")).toBeGreaterThan(sizeCoats("oil"));
  });
});

describe("boleClay", () => {
  it("50g per m2", () => {
    expect(boleClay(2)).toBe(100);
  });
});

describe("burnishTime", () => {
  it("mirror longest", () => {
    expect(burnishTime(1, "mirror")).toBeGreaterThan(burnishTime(1, "rough"));
  });
});

describe("goldWeightG", () => {
  it("positive grams", () => {
    expect(goldWeightG(1, 0.1)).toBeGreaterThan(0);
  });
});

describe("tackTime", () => {
  it("oil longest", () => {
    expect(tackTime("oil", 20)).toBeGreaterThan(tackTime("mordant", 20));
  });
});

describe("skewings", () => {
  it("15% of area", () => {
    expect(skewings(2)).toBe(0.3);
  });
});

describe("durabilityYears", () => {
  it("fire gilding longest", () => {
    expect(durabilityYears("fire")).toBeGreaterThan(durabilityYears("oil"));
  });
});

describe("gildingMethods", () => {
  it("returns 5 methods", () => {
    expect(gildingMethods()).toHaveLength(5);
  });
});
