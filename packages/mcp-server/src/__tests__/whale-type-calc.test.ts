import { describe, it, expect } from "vitest";
import {
  lengthMeters, weightTonnes, divingDepthMeters,
  vocalizationComplexity, migrationDistanceKm, filterFeeder,
  arcticResident, conservationStatus, lifespanYears, whaleTypes,
} from "../whale-type-calc.js";

describe("lengthMeters", () => {
  it("blue whale is longest", () => {
    expect(lengthMeters("blue")).toBeGreaterThan(
      lengthMeters("beluga")
    );
  });
});

describe("weightTonnes", () => {
  it("blue whale is heaviest", () => {
    expect(weightTonnes("blue")).toBeGreaterThan(
      weightTonnes("orca")
    );
  });
});

describe("divingDepthMeters", () => {
  it("sperm whale dives deepest", () => {
    expect(divingDepthMeters("sperm")).toBeGreaterThan(
      divingDepthMeters("humpback")
    );
  });
});

describe("vocalizationComplexity", () => {
  it("humpback has most complex vocalizations", () => {
    expect(vocalizationComplexity("humpback")).toBeGreaterThan(
      vocalizationComplexity("blue")
    );
  });
});

describe("migrationDistanceKm", () => {
  it("humpback migrates farthest", () => {
    expect(migrationDistanceKm("humpback")).toBeGreaterThan(
      migrationDistanceKm("beluga")
    );
  });
});

describe("filterFeeder", () => {
  it("blue whale is a filter feeder", () => {
    expect(filterFeeder("blue")).toBe(true);
  });
  it("orca is not", () => {
    expect(filterFeeder("orca")).toBe(false);
  });
});

describe("arcticResident", () => {
  it("beluga is arctic resident", () => {
    expect(arcticResident("beluga")).toBe(true);
  });
  it("blue whale is not", () => {
    expect(arcticResident("blue")).toBe(false);
  });
});

describe("conservationStatus", () => {
  it("blue whale is endangered", () => {
    expect(conservationStatus("blue")).toBe("endangered");
  });
});

describe("lifespanYears", () => {
  it("blue whale lives longest", () => {
    expect(lifespanYears("blue")).toBeGreaterThan(
      lifespanYears("beluga")
    );
  });
});

describe("whaleTypes", () => {
  it("returns 5 types", () => {
    expect(whaleTypes()).toHaveLength(5);
  });
});
