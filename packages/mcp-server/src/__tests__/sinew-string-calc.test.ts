import { describe, it, expect } from "vitest";
import {
  tensileStrengthKg, fiberLengthCm, splittability,
  dryingHours, elasticity, bestUse,
  waterResistance, availabilityRating, costPerBundle, sinewSources,
} from "../sinew-string-calc.js";

describe("tensileStrengthKg", () => {
  it("bison is strongest", () => {
    expect(tensileStrengthKg("bison")).toBeGreaterThan(
      tensileStrengthKg("deer")
    );
  });
});

describe("fiberLengthCm", () => {
  it("moose has longest fibers", () => {
    expect(fiberLengthCm("moose")).toBeGreaterThan(
      fiberLengthCm("deer")
    );
  });
});

describe("splittability", () => {
  it("caribou splits best", () => {
    expect(splittability("caribou")).toBeGreaterThan(
      splittability("bison")
    );
  });
});

describe("dryingHours", () => {
  it("moose takes longest to dry", () => {
    expect(dryingHours("moose")).toBeGreaterThan(
      dryingHours("deer")
    );
  });
});

describe("elasticity", () => {
  it("caribou is most elastic", () => {
    expect(elasticity("caribou")).toBeGreaterThan(
      elasticity("bison")
    );
  });
});

describe("bestUse", () => {
  it("deer is best for bow string", () => {
    expect(bestUse("deer")).toBe("bow_string");
  });
});

describe("waterResistance", () => {
  it("bison resists water best", () => {
    expect(waterResistance("bison")).toBeGreaterThan(
      waterResistance("deer")
    );
  });
});

describe("availabilityRating", () => {
  it("deer is most available", () => {
    expect(availabilityRating("deer")).toBeGreaterThan(
      availabilityRating("caribou")
    );
  });
});

describe("costPerBundle", () => {
  it("caribou is most expensive", () => {
    expect(costPerBundle("caribou")).toBeGreaterThan(
      costPerBundle("deer")
    );
  });
});

describe("sinewSources", () => {
  it("returns 5 sources", () => {
    expect(sinewSources()).toHaveLength(5);
  });
});
