import { describe, it, expect } from "vitest";
import {
  grindRateKgPerHour, stoneWeightKg, flourFineness,
  operatorsNeeded, portability, dressingIntervalHours,
  grainTypes, effortRating, costEstimate, quernTypes,
} from "../quern-stone-calc.js";

describe("grindRateKgPerHour", () => {
  it("pompeian grinds fastest", () => {
    expect(grindRateKgPerHour("pompeian")).toBeGreaterThan(
      grindRateKgPerHour("saddle")
    );
  });
});

describe("stoneWeightKg", () => {
  it("pompeian is heaviest", () => {
    expect(stoneWeightKg("pompeian")).toBeGreaterThan(
      stoneWeightKg("saddle")
    );
  });
});

describe("flourFineness", () => {
  it("pompeian produces finest flour", () => {
    expect(flourFineness("pompeian")).toBeGreaterThan(
      flourFineness("saddle")
    );
  });
});

describe("operatorsNeeded", () => {
  it("pompeian needs most operators", () => {
    expect(operatorsNeeded("pompeian")).toBeGreaterThan(
      operatorsNeeded("saddle")
    );
  });
});

describe("portability", () => {
  it("saddle is portable", () => {
    expect(portability("saddle")).toBe(true);
  });
  it("pompeian is not", () => {
    expect(portability("pompeian")).toBe(false);
  });
});

describe("dressingIntervalHours", () => {
  it("pompeian has longest dressing interval", () => {
    expect(dressingIntervalHours("pompeian")).toBeGreaterThan(
      dressingIntervalHours("saddle")
    );
  });
});

describe("grainTypes", () => {
  it("pompeian handles most grain types", () => {
    expect(grainTypes("pompeian")).toBeGreaterThan(
      grainTypes("saddle")
    );
  });
});

describe("effortRating", () => {
  it("saddle requires most effort", () => {
    expect(effortRating("saddle")).toBeGreaterThan(
      effortRating("pompeian")
    );
  });
});

describe("costEstimate", () => {
  it("pompeian is most expensive", () => {
    expect(costEstimate("pompeian")).toBeGreaterThan(
      costEstimate("saddle")
    );
  });
});

describe("quernTypes", () => {
  it("returns 5 types", () => {
    expect(quernTypes()).toHaveLength(5);
  });
});
