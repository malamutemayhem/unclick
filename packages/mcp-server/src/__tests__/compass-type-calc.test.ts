import { describe, it, expect } from "vitest";
import {
  accuracyDegrees, reliabilityScore, portability,
  powerRequirement, costRating, worksAtPoles,
  needsBattery, bestApplication, inventionCentury, compassTypes,
} from "../compass-type-calc.js";

describe("accuracyDegrees", () => {
  it("gyroscopic is most accurate", () => {
    expect(accuracyDegrees("gyroscopic")).toBeLessThan(
      accuracyDegrees("solar")
    );
  });
});

describe("reliabilityScore", () => {
  it("gyroscopic is most reliable", () => {
    expect(reliabilityScore("gyroscopic")).toBeGreaterThan(
      reliabilityScore("solar")
    );
  });
});

describe("portability", () => {
  it("magnetic is most portable", () => {
    expect(portability("magnetic")).toBeGreaterThan(
      portability("gyroscopic")
    );
  });
});

describe("powerRequirement", () => {
  it("magnetic needs no power", () => {
    expect(powerRequirement("magnetic")).toBe(0);
  });
});

describe("costRating", () => {
  it("gyroscopic costs most", () => {
    expect(costRating("gyroscopic")).toBeGreaterThan(
      costRating("magnetic")
    );
  });
});

describe("worksAtPoles", () => {
  it("gyroscopic works at poles", () => {
    expect(worksAtPoles("gyroscopic")).toBe(true);
  });
  it("magnetic does not", () => {
    expect(worksAtPoles("magnetic")).toBe(false);
  });
});

describe("needsBattery", () => {
  it("digital needs battery", () => {
    expect(needsBattery("digital")).toBe(true);
  });
  it("magnetic does not", () => {
    expect(needsBattery("magnetic")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("magnetic for hiking", () => {
    expect(bestApplication("magnetic")).toBe("hiking");
  });
});

describe("inventionCentury", () => {
  it("digital invented in 20th century", () => {
    expect(inventionCentury("digital")).toBe(20);
  });
});

describe("compassTypes", () => {
  it("returns 5 types", () => {
    expect(compassTypes()).toHaveLength(5);
  });
});
