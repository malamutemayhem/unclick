import { describe, it, expect } from "vitest";
import {
  peakTempCelsius, rampRateCelsiusPerHour, soakMinutes, totalFiringHours,
  coolingHours, candlingRequired, reductionAtmosphere, energyCostRating,
  costPerFiring, firingTypes,
} from "../kiln-schedule-calc.js";

describe("peakTempCelsius", () => {
  it("glaze high reaches highest temp", () => {
    expect(peakTempCelsius("glaze_high")).toBeGreaterThan(
      peakTempCelsius("bisque")
    );
  });
});

describe("rampRateCelsiusPerHour", () => {
  it("raku ramps fastest", () => {
    expect(rampRateCelsiusPerHour("raku")).toBeGreaterThan(
      rampRateCelsiusPerHour("bisque")
    );
  });
});

describe("soakMinutes", () => {
  it("glaze high soaks longest", () => {
    expect(soakMinutes("glaze_high")).toBeGreaterThan(
      soakMinutes("raku")
    );
  });
});

describe("totalFiringHours", () => {
  it("glaze high takes longest", () => {
    expect(totalFiringHours("glaze_high")).toBeGreaterThan(
      totalFiringHours("raku")
    );
  });
});

describe("coolingHours", () => {
  it("raku has no cooling time", () => {
    expect(coolingHours("raku")).toBe(0);
  });
});

describe("candlingRequired", () => {
  it("bisque needs candling", () => {
    expect(candlingRequired("bisque")).toBe(true);
  });
  it("raku does not need candling", () => {
    expect(candlingRequired("raku")).toBe(false);
  });
});

describe("reductionAtmosphere", () => {
  it("raku uses reduction", () => {
    expect(reductionAtmosphere("raku")).toBe(true);
  });
  it("bisque does not use reduction", () => {
    expect(reductionAtmosphere("bisque")).toBe(false);
  });
});

describe("energyCostRating", () => {
  it("glaze high costs most energy", () => {
    expect(energyCostRating("glaze_high")).toBeGreaterThan(
      energyCostRating("bisque")
    );
  });
});

describe("costPerFiring", () => {
  it("glaze high is most expensive", () => {
    expect(costPerFiring("glaze_high")).toBeGreaterThan(
      costPerFiring("raku")
    );
  });
});

describe("firingTypes", () => {
  it("returns 5 types", () => {
    expect(firingTypes()).toHaveLength(5);
  });
});
