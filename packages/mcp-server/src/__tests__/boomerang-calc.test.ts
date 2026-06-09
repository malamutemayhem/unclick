import { describe, it, expect } from "vitest";
import {
  wingSpan, throwAngle, tiltAngle, spinRate, flightRadius,
  flightTime, liftForce, airfoilThickness, materialWeight,
  tuningClips, safetyRadius, boomerangTypes,
} from "../boomerang-calc.js";

describe("wingSpan", () => {
  it("hunting largest", () => {
    expect(wingSpan("hunting")).toBeGreaterThan(wingSpan("indoor"));
  });
});

describe("throwAngle", () => {
  it("increases with wind", () => {
    expect(throwAngle(20)).toBeGreaterThan(throwAngle(0));
  });
  it("caps at 60", () => {
    expect(throwAngle(100)).toBeLessThanOrEqual(60);
  });
});

describe("tiltAngle", () => {
  it("indoor steepest", () => {
    expect(tiltAngle("indoor")).toBeGreaterThan(tiltAngle("hunting"));
  });
});

describe("spinRate", () => {
  it("positive rpm", () => {
    expect(spinRate(60, 30)).toBeGreaterThan(0);
  });
  it("zero wingspan = 0", () => {
    expect(spinRate(60, 0)).toBe(0);
  });
});

describe("flightRadius", () => {
  it("positive meters", () => {
    expect(flightRadius(30, 60)).toBeGreaterThan(0);
  });
});

describe("flightTime", () => {
  it("positive seconds", () => {
    expect(flightTime(20)).toBeGreaterThan(0);
  });
});

describe("liftForce", () => {
  it("positive newtons", () => {
    expect(liftForce(15, 200)).toBeGreaterThan(0);
  });
});

describe("airfoilThickness", () => {
  it("8% of chord", () => {
    expect(airfoilThickness(50)).toBe(4);
  });
});

describe("materialWeight", () => {
  it("carbon heavier than foam", () => {
    expect(materialWeight("carbon_fiber", 100)).toBeGreaterThan(materialWeight("foam", 100));
  });
});

describe("tuningClips", () => {
  it("2 per wing", () => {
    expect(tuningClips(3)).toBe(6);
  });
});

describe("safetyRadius", () => {
  it("hunting farthest", () => {
    expect(safetyRadius("hunting")).toBeGreaterThan(safetyRadius("indoor"));
  });
});

describe("boomerangTypes", () => {
  it("returns 5 types", () => {
    expect(boomerangTypes()).toHaveLength(5);
  });
});
