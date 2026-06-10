import { describe, it, expect } from "vitest";
import {
  constructionDays, materialComplexity, predatorProtection,
  weatherResistance, reusability, groundLevel,
  woven, exampleBird, clutchSize, nestTypes,
} from "../nest-type-calc.js";

describe("constructionDays", () => {
  it("burrow takes longest to build", () => {
    expect(constructionDays("burrow")).toBeGreaterThan(
      constructionDays("cup")
    );
  });
});

describe("materialComplexity", () => {
  it("pendant is most complex", () => {
    expect(materialComplexity("pendant")).toBeGreaterThan(
      materialComplexity("burrow")
    );
  });
});

describe("predatorProtection", () => {
  it("burrow has best predator protection", () => {
    expect(predatorProtection("burrow")).toBeGreaterThan(
      predatorProtection("platform")
    );
  });
});

describe("weatherResistance", () => {
  it("cavity is most weather resistant", () => {
    expect(weatherResistance("cavity")).toBeGreaterThan(
      weatherResistance("platform")
    );
  });
});

describe("reusability", () => {
  it("platform is most reusable", () => {
    expect(reusability("platform")).toBeGreaterThan(
      reusability("pendant")
    );
  });
});

describe("groundLevel", () => {
  it("burrow is ground level", () => {
    expect(groundLevel("burrow")).toBe(true);
  });
  it("cup is not", () => {
    expect(groundLevel("cup")).toBe(false);
  });
});

describe("woven", () => {
  it("pendant is woven", () => {
    expect(woven("pendant")).toBe(true);
  });
  it("cavity is not", () => {
    expect(woven("cavity")).toBe(false);
  });
});

describe("exampleBird", () => {
  it("pendant nest built by weaver bird", () => {
    expect(exampleBird("pendant")).toBe("weaver_bird");
  });
});

describe("clutchSize", () => {
  it("cavity has largest clutch", () => {
    expect(clutchSize("cavity")).toBeGreaterThan(
      clutchSize("burrow")
    );
  });
});

describe("nestTypes", () => {
  it("returns 5 types", () => {
    expect(nestTypes()).toHaveLength(5);
  });
});
