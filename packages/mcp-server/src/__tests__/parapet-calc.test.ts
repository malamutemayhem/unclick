import { describe, it, expect } from "vitest";
import {
  heightCm, thicknessCm, lengthM, volumeM3, weightKg,
  copingLengthM, drainageSlope, windLoadKpa,
  flashingLengthM, maintenanceCostPerYear, parapetTypes,
} from "../parapet-calc.js";

describe("heightCm", () => {
  it("at least 90cm", () => {
    expect(heightCm(3)).toBeGreaterThanOrEqual(90);
  });
});

describe("thicknessCm", () => {
  it("60% of wall", () => {
    expect(thicknessCm(40)).toBe(24);
  });
});

describe("lengthM", () => {
  it("less than perimeter", () => {
    expect(lengthM(50, 5)).toBeLessThan(50);
  });
});

describe("volumeM3", () => {
  it("positive volume", () => {
    expect(volumeM3(45, 90, 24)).toBeGreaterThan(0);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(10, 2400)).toBeGreaterThan(0);
  });
});

describe("copingLengthM", () => {
  it("longer than parapet", () => {
    expect(copingLengthM(45, 5)).toBeGreaterThan(45);
  });
});

describe("drainageSlope", () => {
  it("positive slope", () => {
    expect(drainageSlope(45)).toBeGreaterThan(0);
  });
});

describe("windLoadKpa", () => {
  it("positive load", () => {
    expect(windLoadKpa(1, 30)).toBeGreaterThan(0);
  });
});

describe("flashingLengthM", () => {
  it("longer than parapet", () => {
    expect(flashingLengthM(45)).toBeGreaterThan(45);
  });
});

describe("maintenanceCostPerYear", () => {
  it("balustraded most expensive", () => {
    expect(maintenanceCostPerYear("balustraded", 45)).toBeGreaterThan(maintenanceCostPerYear("solid", 45));
  });
});

describe("parapetTypes", () => {
  it("returns 5 types", () => {
    expect(parapetTypes()).toHaveLength(5);
  });
});
