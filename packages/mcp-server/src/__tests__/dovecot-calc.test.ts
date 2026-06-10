import { describe, it, expect } from "vitest";
import {
  nestBoxes, boxSpacingCm, floorAreaM2, ventilationOpenings,
  feedKgPerWeek, waterLitersPerDay, cleaningFrequencyDays,
  predatorMesh, breedingPairsCapacity, annualEggProduction, dovecotStyles,
} from "../dovecot-calc.js";

describe("nestBoxes", () => {
  it("more than pairs", () => {
    expect(nestBoxes(10)).toBeGreaterThan(10);
  });
});

describe("boxSpacingCm", () => {
  it("positive cm", () => {
    expect(boxSpacingCm("pigeon")).toBe(30);
  });
});

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(20, 30)).toBeGreaterThan(0);
  });
});

describe("ventilationOpenings", () => {
  it("positive count", () => {
    expect(ventilationOpenings(5)).toBeGreaterThan(0);
  });
});

describe("feedKgPerWeek", () => {
  it("positive kg", () => {
    expect(feedKgPerWeek(20)).toBeGreaterThan(0);
  });
});

describe("waterLitersPerDay", () => {
  it("positive liters", () => {
    expect(waterLitersPerDay(20)).toBeGreaterThan(0);
  });
});

describe("cleaningFrequencyDays", () => {
  it("good ventilation less frequent", () => {
    expect(cleaningFrequencyDays(10, "good")).toBeGreaterThan(cleaningFrequencyDays(10, "poor"));
  });
});

describe("predatorMesh", () => {
  it("positive cm", () => {
    expect(predatorMesh(5)).toBeGreaterThan(0);
  });
});

describe("breedingPairsCapacity", () => {
  it("less than boxes", () => {
    expect(breedingPairsCapacity(12)).toBeLessThan(12);
  });
});

describe("annualEggProduction", () => {
  it("positive eggs", () => {
    expect(annualEggProduction(10, 5)).toBeGreaterThan(0);
  });
});

describe("dovecotStyles", () => {
  it("returns 5 styles", () => {
    expect(dovecotStyles()).toHaveLength(5);
  });
});
