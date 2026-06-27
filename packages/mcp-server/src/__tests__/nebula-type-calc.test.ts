import { describe, it, expect } from "vitest";
import {
  brightnessRating, sizeParsercs, temperatureK,
  densityRating, starFormingPotential, selfLuminous,
  stellarEndProduct, exampleNebula, observabilityScore, nebulaTypes,
} from "../nebula-type-calc.js";

describe("brightnessRating", () => {
  it("emission is brightest", () => {
    expect(brightnessRating("emission")).toBeGreaterThan(
      brightnessRating("dark")
    );
  });
});

describe("sizeParsercs", () => {
  it("emission is largest", () => {
    expect(sizeParsercs("emission")).toBeGreaterThan(
      sizeParsercs("planetary")
    );
  });
});

describe("temperatureK", () => {
  it("supernova remnant is hottest", () => {
    expect(temperatureK("supernova_remnant")).toBeGreaterThan(
      temperatureK("dark")
    );
  });
});

describe("densityRating", () => {
  it("dark nebula is densest", () => {
    expect(densityRating("dark")).toBeGreaterThan(
      densityRating("supernova_remnant")
    );
  });
});

describe("starFormingPotential", () => {
  it("emission has highest star forming potential", () => {
    expect(starFormingPotential("emission")).toBeGreaterThan(
      starFormingPotential("planetary")
    );
  });
});

describe("selfLuminous", () => {
  it("emission is self luminous", () => {
    expect(selfLuminous("emission")).toBe(true);
  });
  it("reflection is not", () => {
    expect(selfLuminous("reflection")).toBe(false);
  });
});

describe("stellarEndProduct", () => {
  it("planetary is a stellar end product", () => {
    expect(stellarEndProduct("planetary")).toBe(true);
  });
  it("emission is not", () => {
    expect(stellarEndProduct("emission")).toBe(false);
  });
});

describe("exampleNebula", () => {
  it("emission example is orion nebula", () => {
    expect(exampleNebula("emission")).toBe("orion_nebula");
  });
});

describe("observabilityScore", () => {
  it("emission is most observable", () => {
    expect(observabilityScore("emission")).toBeGreaterThan(
      observabilityScore("dark")
    );
  });
});

describe("nebulaTypes", () => {
  it("returns 5 types", () => {
    expect(nebulaTypes()).toHaveLength(5);
  });
});
