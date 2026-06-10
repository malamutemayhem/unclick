import { describe, it, expect } from "vitest";
import {
  altitudeCorrection, hourAngleDeg, magnitude, bestObservationTime,
  visibleFromLatitude, sextantRequired, accuracyNauticalMiles,
  sightReductionSteps, almanacRequired, celestialBodies,
} from "../celestial-nav-calc.js";

describe("altitudeCorrection", () => {
  it("higher input gives higher correction", () => {
    expect(altitudeCorrection(60)).toBeGreaterThan(altitudeCorrection(30));
  });
});

describe("hourAngleDeg", () => {
  it("wraps correctly", () => {
    expect(hourAngleDeg(300, 70)).toBe(10);
  });
});

describe("magnitude", () => {
  it("sun is brightest", () => {
    expect(magnitude("sun")).toBeLessThan(magnitude("polaris"));
  });
});

describe("bestObservationTime", () => {
  it("sun is best at noon", () => {
    expect(bestObservationTime("sun")).toBe("noon");
  });
});

describe("visibleFromLatitude", () => {
  it("polaris only visible in northern hemisphere", () => {
    expect(visibleFromLatitude("polaris").min).toBe(0);
  });
});

describe("sextantRequired", () => {
  it("returns true", () => {
    expect(sextantRequired()).toBe(true);
  });
});

describe("accuracyNauticalMiles", () => {
  it("returns 1", () => {
    expect(accuracyNauticalMiles()).toBe(1);
  });
});

describe("sightReductionSteps", () => {
  it("returns 7", () => {
    expect(sightReductionSteps()).toBe(7);
  });
});

describe("almanacRequired", () => {
  it("returns true", () => {
    expect(almanacRequired()).toBe(true);
  });
});

describe("celestialBodies", () => {
  it("returns 5 bodies", () => {
    expect(celestialBodies()).toHaveLength(5);
  });
});
