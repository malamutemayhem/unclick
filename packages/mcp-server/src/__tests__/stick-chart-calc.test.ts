import { describe, it, expect } from "vitest";
import {
  islandsCovered, swellPatternsShown, stickCount,
  shellMarkers, constructionHours, readingDifficulty,
  personalToNavigator, rangeNauticalMiles, culturalOrigin, stickChartTypes,
} from "../stick-chart-calc.js";

describe("islandsCovered", () => {
  it("rebbelib covers most islands", () => {
    expect(islandsCovered("rebbelib")).toBeGreaterThan(
      islandsCovered("mattang")
    );
  });
});

describe("swellPatternsShown", () => {
  it("rebbelib shows most swell patterns", () => {
    expect(swellPatternsShown("rebbelib")).toBeGreaterThan(
      swellPatternsShown("mattang")
    );
  });
});

describe("stickCount", () => {
  it("rebbelib uses most sticks", () => {
    expect(stickCount("rebbelib")).toBeGreaterThan(
      stickCount("mattang")
    );
  });
});

describe("shellMarkers", () => {
  it("rebbelib has most shell markers", () => {
    expect(shellMarkers("rebbelib")).toBeGreaterThan(
      shellMarkers("tutorial")
    );
  });
});

describe("constructionHours", () => {
  it("rebbelib takes longest", () => {
    expect(constructionHours("rebbelib")).toBeGreaterThan(
      constructionHours("mattang")
    );
  });
});

describe("readingDifficulty", () => {
  it("rebbelib is hardest to read", () => {
    expect(readingDifficulty("rebbelib")).toBeGreaterThan(
      readingDifficulty("tutorial")
    );
  });
});

describe("personalToNavigator", () => {
  it("meddo is personal", () => {
    expect(personalToNavigator("meddo")).toBe(true);
  });
  it("tutorial is not", () => {
    expect(personalToNavigator("tutorial")).toBe(false);
  });
});

describe("rangeNauticalMiles", () => {
  it("rebbelib has greatest range", () => {
    expect(rangeNauticalMiles("rebbelib")).toBeGreaterThan(
      rangeNauticalMiles("mattang")
    );
  });
});

describe("culturalOrigin", () => {
  it("origin is marshallese", () => {
    expect(culturalOrigin()).toBe("marshallese");
  });
});

describe("stickChartTypes", () => {
  it("returns 5 types", () => {
    expect(stickChartTypes()).toHaveLength(5);
  });
});
