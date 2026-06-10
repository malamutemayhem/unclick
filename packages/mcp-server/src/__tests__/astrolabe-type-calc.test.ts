import { describe, it, expect } from "vitest";
import {
  starCount, latitudeRange, portability,
  craftComplexity, altitudeMeasurement, timekeeping,
  navigation, bestEra, craftCost, astrolabeTypes,
} from "../astrolabe-type-calc.js";

describe("starCount", () => {
  it("spherical tracks most stars", () => {
    expect(starCount("spherical")).toBeGreaterThan(
      starCount("quadrant")
    );
  });
});

describe("latitudeRange", () => {
  it("universal covers widest latitude range", () => {
    expect(latitudeRange("universal")).toBeGreaterThan(
      latitudeRange("planispheric")
    );
  });
});

describe("portability", () => {
  it("quadrant is most portable", () => {
    expect(portability("quadrant")).toBeGreaterThan(
      portability("spherical")
    );
  });
});

describe("craftComplexity", () => {
  it("spherical is most complex", () => {
    expect(craftComplexity("spherical")).toBeGreaterThan(
      craftComplexity("quadrant")
    );
  });
});

describe("altitudeMeasurement", () => {
  it("quadrant measures altitude best", () => {
    expect(altitudeMeasurement("quadrant")).toBeGreaterThan(
      altitudeMeasurement("spherical")
    );
  });
});

describe("timekeeping", () => {
  it("planispheric tells time", () => {
    expect(timekeeping("planispheric")).toBe(true);
  });
  it("mariner does not", () => {
    expect(timekeeping("mariner")).toBe(false);
  });
});

describe("navigation", () => {
  it("mariner is for navigation", () => {
    expect(navigation("mariner")).toBe(true);
  });
  it("planispheric is not", () => {
    expect(navigation("planispheric")).toBe(false);
  });
});

describe("bestEra", () => {
  it("mariner best in age of exploration", () => {
    expect(bestEra("mariner")).toBe("age_of_exploration");
  });
});

describe("craftCost", () => {
  it("spherical costs most", () => {
    expect(craftCost("spherical")).toBeGreaterThan(
      craftCost("quadrant")
    );
  });
});

describe("astrolabeTypes", () => {
  it("returns 5 types", () => {
    expect(astrolabeTypes()).toHaveLength(5);
  });
});
