import { describe, it, expect } from "vitest";
import {
  accuracySecondsPerDay, periodStability, temperatureSensitivity,
  lengthMeters, spaceRequired, demonstratesRotation,
  enclosable, bestApplication, buildCost, pendulumTypes,
} from "../pendulum-type-calc.js";

describe("accuracySecondsPerDay", () => {
  it("compound is most accurate", () => {
    expect(accuracySecondsPerDay("compound")).toBeLessThan(
      accuracySecondsPerDay("foucault")
    );
  });
});

describe("periodStability", () => {
  it("compound is most stable", () => {
    expect(periodStability("compound")).toBeGreaterThan(
      periodStability("foucault")
    );
  });
});

describe("temperatureSensitivity", () => {
  it("foucault is most temperature sensitive", () => {
    expect(temperatureSensitivity("foucault")).toBeGreaterThan(
      temperatureSensitivity("compound")
    );
  });
});

describe("lengthMeters", () => {
  it("foucault is longest", () => {
    expect(lengthMeters("foucault")).toBeGreaterThan(
      lengthMeters("simple")
    );
  });
});

describe("spaceRequired", () => {
  it("foucault needs most space", () => {
    expect(spaceRequired("foucault")).toBeGreaterThan(
      spaceRequired("torsion")
    );
  });
});

describe("demonstratesRotation", () => {
  it("foucault demonstrates rotation", () => {
    expect(demonstratesRotation("foucault")).toBe(true);
  });
  it("simple does not", () => {
    expect(demonstratesRotation("simple")).toBe(false);
  });
});

describe("enclosable", () => {
  it("torsion is enclosable", () => {
    expect(enclosable("torsion")).toBe(true);
  });
  it("foucault is not", () => {
    expect(enclosable("foucault")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("foucault best for museum exhibit", () => {
    expect(bestApplication("foucault")).toBe("museum_exhibit");
  });
});

describe("buildCost", () => {
  it("foucault costs most", () => {
    expect(buildCost("foucault")).toBeGreaterThan(
      buildCost("simple")
    );
  });
});

describe("pendulumTypes", () => {
  it("returns 5 types", () => {
    expect(pendulumTypes()).toHaveLength(5);
  });
});
