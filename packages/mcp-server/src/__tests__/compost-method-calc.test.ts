import { describe, it, expect } from "vitest";
import {
  readyWeeks, tempPeakCelsius, turningRequired,
  spaceNeededM2, odorLevel, indoorSuitable,
  nutrientDensity, weedSeedKill, costRating, compostMethods,
} from "../compost-method-calc.js";

describe("readyWeeks", () => {
  it("bokashi is fastest", () => {
    expect(readyWeeks("bokashi")).toBeLessThan(
      readyWeeks("cold_pile")
    );
  });
});

describe("tempPeakCelsius", () => {
  it("hot pile reaches highest temp", () => {
    expect(tempPeakCelsius("hot_pile")).toBeGreaterThan(
      tempPeakCelsius("vermicompost")
    );
  });
});

describe("turningRequired", () => {
  it("hot pile needs turning", () => {
    expect(turningRequired("hot_pile")).toBe(true);
  });
  it("vermicompost does not", () => {
    expect(turningRequired("vermicompost")).toBe(false);
  });
});

describe("spaceNeededM2", () => {
  it("hot pile needs most space", () => {
    expect(spaceNeededM2("hot_pile")).toBeGreaterThan(
      spaceNeededM2("bokashi")
    );
  });
});

describe("odorLevel", () => {
  it("bokashi has highest odor", () => {
    expect(odorLevel("bokashi")).toBeGreaterThan(
      odorLevel("vermicompost")
    );
  });
});

describe("indoorSuitable", () => {
  it("vermicompost works indoors", () => {
    expect(indoorSuitable("vermicompost")).toBe(true);
  });
  it("hot pile does not", () => {
    expect(indoorSuitable("hot_pile")).toBe(false);
  });
});

describe("nutrientDensity", () => {
  it("vermicompost is most nutrient dense", () => {
    expect(nutrientDensity("vermicompost")).toBeGreaterThan(
      nutrientDensity("cold_pile")
    );
  });
});

describe("weedSeedKill", () => {
  it("hot pile kills weed seeds", () => {
    expect(weedSeedKill("hot_pile")).toBe(true);
  });
  it("cold pile does not", () => {
    expect(weedSeedKill("cold_pile")).toBe(false);
  });
});

describe("costRating", () => {
  it("bokashi costs most", () => {
    expect(costRating("bokashi")).toBeGreaterThan(
      costRating("cold_pile")
    );
  });
});

describe("compostMethods", () => {
  it("returns 5 methods", () => {
    expect(compostMethods()).toHaveLength(5);
  });
});
