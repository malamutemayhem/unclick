import { describe, it, expect } from "vitest";
import {
  heightCm, divingDepthMeters, swimmingSpeedKmh,
  coldTolerance, colonySize, antarcticResident,
  crestedHead, breedingSeason, populationTrend, penguinTypes,
} from "../penguin-type-calc.js";

describe("heightCm", () => {
  it("emperor is tallest", () => {
    expect(heightCm("emperor")).toBeGreaterThan(
      heightCm("adelie")
    );
  });
});

describe("divingDepthMeters", () => {
  it("emperor dives deepest", () => {
    expect(divingDepthMeters("emperor")).toBeGreaterThan(
      divingDepthMeters("macaroni")
    );
  });
});

describe("swimmingSpeedKmh", () => {
  it("gentoo swims fastest", () => {
    expect(swimmingSpeedKmh("gentoo")).toBeGreaterThan(
      swimmingSpeedKmh("emperor")
    );
  });
});

describe("coldTolerance", () => {
  it("emperor is most cold tolerant", () => {
    expect(coldTolerance("emperor")).toBeGreaterThan(
      coldTolerance("macaroni")
    );
  });
});

describe("colonySize", () => {
  it("adelie has largest colonies", () => {
    expect(colonySize("adelie")).toBeGreaterThan(
      colonySize("emperor")
    );
  });
});

describe("antarcticResident", () => {
  it("emperor is antarctic resident", () => {
    expect(antarcticResident("emperor")).toBe(true);
  });
  it("king is not", () => {
    expect(antarcticResident("king")).toBe(false);
  });
});

describe("crestedHead", () => {
  it("macaroni has crested head", () => {
    expect(crestedHead("macaroni")).toBe(true);
  });
  it("emperor does not", () => {
    expect(crestedHead("emperor")).toBe(false);
  });
});

describe("breedingSeason", () => {
  it("emperor breeds in antarctic winter", () => {
    expect(breedingSeason("emperor")).toBe("antarctic_winter");
  });
});

describe("populationTrend", () => {
  it("gentoo trending best", () => {
    expect(populationTrend("gentoo")).toBeGreaterThan(
      populationTrend("macaroni")
    );
  });
});

describe("penguinTypes", () => {
  it("returns 5 types", () => {
    expect(penguinTypes()).toHaveLength(5);
  });
});
