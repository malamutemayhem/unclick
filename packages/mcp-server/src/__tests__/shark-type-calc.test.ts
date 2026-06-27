import { describe, it, expect } from "vitest";
import {
  lengthMeters, speedKmh, biteForceNewtons,
  depthRangeMeters, electroreceptionRange, filterFeeder,
  freshwaterTolerant, conservationStatus, lifespanYears, sharkTypes,
} from "../shark-type-calc.js";

describe("lengthMeters", () => {
  it("whale shark is longest", () => {
    expect(lengthMeters("whale_shark")).toBeGreaterThan(
      lengthMeters("great_white")
    );
  });
});

describe("speedKmh", () => {
  it("mako is fastest", () => {
    expect(speedKmh("mako")).toBeGreaterThan(
      speedKmh("whale_shark")
    );
  });
});

describe("biteForceNewtons", () => {
  it("great white has strongest bite", () => {
    expect(biteForceNewtons("great_white")).toBeGreaterThan(
      biteForceNewtons("mako")
    );
  });
});

describe("depthRangeMeters", () => {
  it("whale shark goes deepest", () => {
    expect(depthRangeMeters("whale_shark")).toBeGreaterThan(
      depthRangeMeters("bull")
    );
  });
});

describe("electroreceptionRange", () => {
  it("hammerhead has best electroreception", () => {
    expect(electroreceptionRange("hammerhead")).toBeGreaterThan(
      electroreceptionRange("whale_shark")
    );
  });
});

describe("filterFeeder", () => {
  it("whale shark is a filter feeder", () => {
    expect(filterFeeder("whale_shark")).toBe(true);
  });
  it("great white is not", () => {
    expect(filterFeeder("great_white")).toBe(false);
  });
});

describe("freshwaterTolerant", () => {
  it("bull shark tolerates freshwater", () => {
    expect(freshwaterTolerant("bull")).toBe(true);
  });
  it("great white does not", () => {
    expect(freshwaterTolerant("great_white")).toBe(false);
  });
});

describe("conservationStatus", () => {
  it("hammerhead is critically endangered", () => {
    expect(conservationStatus("hammerhead")).toBe("critically_endangered");
  });
});

describe("lifespanYears", () => {
  it("whale shark lives longest", () => {
    expect(lifespanYears("whale_shark")).toBeGreaterThan(
      lifespanYears("bull")
    );
  });
});

describe("sharkTypes", () => {
  it("returns 5 types", () => {
    expect(sharkTypes()).toHaveLength(5);
  });
});
