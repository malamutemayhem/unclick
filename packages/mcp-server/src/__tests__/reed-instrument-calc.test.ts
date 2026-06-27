import { describe, it, expect } from "vitest";
import {
  reedThicknessMm, tipOpeningMm, breakInMinutes, lifespanHours,
  humidityAffected, responseRating, toneWarmthRating, adjustabilityRating,
  costPerReed, caneMaterials,
} from "../reed-instrument-calc.js";

describe("reedThicknessMm", () => {
  it("higher strength = thicker reed", () => {
    expect(reedThicknessMm(5)).toBeGreaterThan(reedThicknessMm(2));
  });
});

describe("tipOpeningMm", () => {
  it("higher strength = narrower opening", () => {
    expect(tipOpeningMm(5)).toBeLessThan(tipOpeningMm(2));
  });
});

describe("breakInMinutes", () => {
  it("synthetic needs no break-in", () => {
    expect(breakInMinutes("synthetic")).toBe(0);
  });
  it("arundo donax takes longest", () => {
    expect(breakInMinutes("arundo_donax")).toBeGreaterThan(
      breakInMinutes("bamboo")
    );
  });
});

describe("lifespanHours", () => {
  it("synthetic lasts longest", () => {
    expect(lifespanHours("synthetic")).toBeGreaterThan(
      lifespanHours("arundo_donax")
    );
  });
});

describe("humidityAffected", () => {
  it("arundo donax is humidity affected", () => {
    expect(humidityAffected("arundo_donax")).toBe(true);
  });
  it("synthetic is not affected", () => {
    expect(humidityAffected("synthetic")).toBe(false);
  });
});

describe("responseRating", () => {
  it("arundo donax has best response", () => {
    expect(responseRating("arundo_donax")).toBeGreaterThan(
      responseRating("plastic")
    );
  });
});

describe("toneWarmthRating", () => {
  it("arundo donax is warmest", () => {
    expect(toneWarmthRating("arundo_donax")).toBeGreaterThan(
      toneWarmthRating("plastic")
    );
  });
});

describe("adjustabilityRating", () => {
  it("arundo donax is most adjustable", () => {
    expect(adjustabilityRating("arundo_donax")).toBeGreaterThan(
      adjustabilityRating("synthetic")
    );
  });
});

describe("costPerReed", () => {
  it("synthetic is most expensive", () => {
    expect(costPerReed("synthetic")).toBeGreaterThan(
      costPerReed("arundo_donax")
    );
  });
});

describe("caneMaterials", () => {
  it("returns 5 materials", () => {
    expect(caneMaterials()).toHaveLength(5);
  });
});
