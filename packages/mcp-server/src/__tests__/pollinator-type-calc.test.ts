import { describe, it, expect } from "vitest";
import {
  pollinationEfficiency, flightRange, coldTolerance, cropImportance,
  flowerSpecificity, socialInsect, producesHoney, preferredFlower,
  activeSeason, pollinatorTypes,
} from "../pollinator-type-calc.js";

describe("pollinationEfficiency", () => {
  it("honeybee most efficient pollinator", () => {
    expect(pollinationEfficiency("honeybee")).toBeGreaterThan(
      pollinationEfficiency("wasp")
    );
  });
});

describe("flightRange", () => {
  it("butterfly longest flight range", () => {
    expect(flightRange("butterfly")).toBeGreaterThan(flightRange("hoverfly"));
  });
});

describe("coldTolerance", () => {
  it("bumblebee most cold tolerant", () => {
    expect(coldTolerance("bumblebee")).toBeGreaterThan(coldTolerance("butterfly"));
  });
});

describe("cropImportance", () => {
  it("honeybee most important for crops", () => {
    expect(cropImportance("honeybee")).toBeGreaterThan(cropImportance("wasp"));
  });
});

describe("flowerSpecificity", () => {
  it("butterfly most flower specific", () => {
    expect(flowerSpecificity("butterfly")).toBeGreaterThan(flowerSpecificity("hoverfly"));
  });
});

describe("socialInsect", () => {
  it("honeybee is social", () => {
    expect(socialInsect("honeybee")).toBe(true);
  });
  it("butterfly is not", () => {
    expect(socialInsect("butterfly")).toBe(false);
  });
});

describe("producesHoney", () => {
  it("honeybee produces honey", () => {
    expect(producesHoney("honeybee")).toBe(true);
  });
  it("bumblebee does not", () => {
    expect(producesHoney("bumblebee")).toBe(false);
  });
});

describe("preferredFlower", () => {
  it("bumblebee prefers deep tubular flowers", () => {
    expect(preferredFlower("bumblebee")).toBe("deep_tubular_flowers");
  });
});

describe("activeSeason", () => {
  it("butterfly peaks in summer", () => {
    expect(activeSeason("butterfly")).toBe("summer_peak");
  });
});

describe("pollinatorTypes", () => {
  it("returns 5 types", () => {
    expect(pollinatorTypes()).toHaveLength(5);
  });
});
