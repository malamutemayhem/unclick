import { describe, it, expect } from "vitest";
import {
  chamberVolume, bonesCapacity, skullNiches, arrangementTime,
  ventilationOpenings, humidity, lightingFixtures,
  preservationCostPerYear, visitorCapacity, boneArrangements,
} from "../ossuary-calc.js";

describe("chamberVolume", () => {
  it("positive m3", () => {
    expect(chamberVolume(5, 4, 3)).toBe(60);
  });
});

describe("bonesCapacity", () => {
  it("positive count", () => {
    expect(bonesCapacity(50)).toBeGreaterThan(0);
  });
});

describe("skullNiches", () => {
  it("positive count", () => {
    expect(skullNiches(20, 25)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(skullNiches(20, 0)).toBe(0);
  });
});

describe("arrangementTime", () => {
  it("chandelier takes longest", () => {
    expect(arrangementTime(1000, "chandelier")).toBeGreaterThan(arrangementTime(1000, "stacked"));
  });
});

describe("ventilationOpenings", () => {
  it("positive count", () => {
    expect(ventilationOpenings(50)).toBeGreaterThan(0);
  });
});

describe("humidity", () => {
  it("decreases with more ventilation", () => {
    expect(humidity(10, 50)).toBeLessThan(humidity(2, 50));
  });
});

describe("lightingFixtures", () => {
  it("positive count", () => {
    expect(lightingFixtures(20)).toBeGreaterThan(0);
  });
});

describe("preservationCostPerYear", () => {
  it("positive cost", () => {
    expect(preservationCostPerYear(5000, 70)).toBeGreaterThan(0);
  });
});

describe("visitorCapacity", () => {
  it("positive visitors", () => {
    expect(visitorCapacity(20, 1.5)).toBeGreaterThan(0);
  });
  it("zero path = 0", () => {
    expect(visitorCapacity(20, 0)).toBe(0);
  });
});

describe("boneArrangements", () => {
  it("returns 5 arrangements", () => {
    expect(boneArrangements()).toHaveLength(5);
  });
});
