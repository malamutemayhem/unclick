import { describe, it, expect } from "vitest";
import {
  wingspanMeters, divingSpeedKmh, visionAcuity,
  talonStrengthPsi, huntingRange, nocturnal,
  fishSpecialist, primaryPrey, falconryValue, raptorTypes,
} from "../raptor-type-calc.js";

describe("wingspanMeters", () => {
  it("eagle has largest wingspan", () => {
    expect(wingspanMeters("eagle")).toBeGreaterThan(
      wingspanMeters("falcon")
    );
  });
});

describe("divingSpeedKmh", () => {
  it("falcon is fastest diver", () => {
    expect(divingSpeedKmh("falcon")).toBeGreaterThan(
      divingSpeedKmh("owl")
    );
  });
});

describe("visionAcuity", () => {
  it("eagle has best vision", () => {
    expect(visionAcuity("eagle")).toBeGreaterThan(
      visionAcuity("owl")
    );
  });
});

describe("talonStrengthPsi", () => {
  it("eagle has strongest talons", () => {
    expect(talonStrengthPsi("eagle")).toBeGreaterThan(
      talonStrengthPsi("falcon")
    );
  });
});

describe("huntingRange", () => {
  it("eagle has greatest range", () => {
    expect(huntingRange("eagle")).toBeGreaterThan(
      huntingRange("owl")
    );
  });
});

describe("nocturnal", () => {
  it("owl is nocturnal", () => {
    expect(nocturnal("owl")).toBe(true);
  });
  it("eagle is not", () => {
    expect(nocturnal("eagle")).toBe(false);
  });
});

describe("fishSpecialist", () => {
  it("osprey is a fish specialist", () => {
    expect(fishSpecialist("osprey")).toBe(true);
  });
  it("hawk is not", () => {
    expect(fishSpecialist("hawk")).toBe(false);
  });
});

describe("primaryPrey", () => {
  it("osprey hunts fish", () => {
    expect(primaryPrey("osprey")).toBe("fish");
  });
});

describe("falconryValue", () => {
  it("falcon has highest falconry value", () => {
    expect(falconryValue("falcon")).toBeGreaterThan(
      falconryValue("owl")
    );
  });
});

describe("raptorTypes", () => {
  it("returns 5 types", () => {
    expect(raptorTypes()).toHaveLength(5);
  });
});
