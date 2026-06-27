import { describe, it, expect } from "vitest";
import {
  accuracyDegrees, reliabilityRating, powerRequired,
  weatherDependence, polarUsable, portability,
  learningCurve, bestUseCase, costEstimate, compassTypes,
} from "../compass-bearing-calc.js";

describe("accuracyDegrees", () => {
  it("gyroscopic is most accurate", () => {
    expect(accuracyDegrees("gyroscopic")).toBeLessThan(
      accuracyDegrees("solar")
    );
  });
});

describe("reliabilityRating", () => {
  it("gyroscopic is most reliable", () => {
    expect(reliabilityRating("gyroscopic")).toBeGreaterThan(
      reliabilityRating("solar")
    );
  });
});

describe("powerRequired", () => {
  it("magnetic needs no power", () => {
    expect(powerRequired("magnetic")).toBe(false);
  });
  it("digital needs power", () => {
    expect(powerRequired("digital")).toBe(true);
  });
});

describe("weatherDependence", () => {
  it("solar is most weather dependent", () => {
    expect(weatherDependence("solar")).toBeGreaterThan(
      weatherDependence("magnetic")
    );
  });
});

describe("polarUsable", () => {
  it("gyroscopic works at poles", () => {
    expect(polarUsable("gyroscopic")).toBe(true);
  });
  it("magnetic does not work at poles", () => {
    expect(polarUsable("magnetic")).toBe(false);
  });
});

describe("portability", () => {
  it("magnetic is most portable", () => {
    expect(portability("magnetic")).toBeGreaterThan(
      portability("gyroscopic")
    );
  });
});

describe("learningCurve", () => {
  it("astro navigation has steepest learning curve", () => {
    expect(learningCurve("astro")).toBeGreaterThan(
      learningCurve("digital")
    );
  });
});

describe("bestUseCase", () => {
  it("magnetic best for hiking", () => {
    expect(bestUseCase("magnetic")).toBe("hiking");
  });
});

describe("costEstimate", () => {
  it("gyroscopic costs most", () => {
    expect(costEstimate("gyroscopic")).toBeGreaterThan(
      costEstimate("magnetic")
    );
  });
});

describe("compassTypes", () => {
  it("returns 5 types", () => {
    expect(compassTypes()).toHaveLength(5);
  });
});
