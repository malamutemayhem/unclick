import { describe, it, expect } from "vitest";
import {
  stereographicX, stereographicY, tropicRadius, equatorRadius,
  almucantarRadius, reteStars, plateCount, ruleLength,
  alidade, timeToDegrees, degreesToTime, astrolabeTypes,
} from "../astrolabe-calc.js";

describe("stereographicX", () => {
  it("zero at azimuth 0", () => {
    expect(stereographicX(0, 45, 100)).toBe(0);
  });
});

describe("stereographicY", () => {
  it("finite value", () => {
    expect(Number.isFinite(stereographicY(90, 45, 100))).toBe(true);
  });
});

describe("tropicRadius", () => {
  it("positive radius", () => {
    expect(tropicRadius(23.44, 100)).toBeGreaterThan(0);
  });
});

describe("equatorRadius", () => {
  it("equals plate radius at tan(45)", () => {
    expect(equatorRadius(100)).toBeCloseTo(100, 0);
  });
});

describe("almucantarRadius", () => {
  it("decreases with altitude", () => {
    expect(almucantarRadius(60, 100)).toBeLessThan(almucantarRadius(30, 100));
  });
});

describe("reteStars", () => {
  it("is 30", () => {
    expect(reteStars()).toBe(30);
  });
});

describe("plateCount", () => {
  it("planispheric = 5", () => {
    expect(plateCount("planispheric")).toBe(5);
  });
});

describe("ruleLength", () => {
  it("2x radius", () => {
    expect(ruleLength(50)).toBe(100);
  });
});

describe("alidade", () => {
  it("1.8x radius", () => {
    expect(alidade(50)).toBe(90);
  });
});

describe("timeToDegrees", () => {
  it("1 hour = 15 degrees", () => {
    expect(timeToDegrees(1)).toBe(15);
  });
});

describe("degreesToTime", () => {
  it("15 degrees = 1 hour", () => {
    expect(degreesToTime(15)).toBe(1);
  });
});

describe("astrolabeTypes", () => {
  it("returns 4 types", () => {
    expect(astrolabeTypes()).toHaveLength(4);
  });
});
