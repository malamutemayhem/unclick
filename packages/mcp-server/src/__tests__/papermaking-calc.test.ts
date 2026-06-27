import { describe, it, expect } from "vitest";
import {
  pulpWeightKgPerSheet, soakingHours, beatingMinutes, waterLitersPerSheet,
  pressTimeMinutes, dryingHours, sizingRequired, sheetStrengthRating,
  archivalQualityYears, costPerSheet, pulpSources,
} from "../papermaking-calc.js";

describe("pulpWeightKgPerSheet", () => {
  it("heavier gsm = more pulp", () => {
    expect(pulpWeightKgPerSheet(50, 70, 300)).toBeGreaterThan(
      pulpWeightKgPerSheet(50, 70, 100)
    );
  });
});

describe("soakingHours", () => {
  it("wood needs longest soaking", () => {
    expect(soakingHours("wood")).toBeGreaterThan(soakingHours("cotton"));
  });
});

describe("beatingMinutes", () => {
  it("wood needs most beating", () => {
    expect(beatingMinutes("wood")).toBeGreaterThan(beatingMinutes("cotton"));
  });
});

describe("waterLitersPerSheet", () => {
  it("heavier paper uses more water", () => {
    expect(waterLitersPerSheet(300)).toBeGreaterThan(waterLitersPerSheet(100));
  });
});

describe("pressTimeMinutes", () => {
  it("thicker paper needs longer pressing", () => {
    expect(pressTimeMinutes(2)).toBeGreaterThan(pressTimeMinutes(1));
  });
});

describe("dryingHours", () => {
  it("heated is fastest", () => {
    expect(dryingHours("heated")).toBeLessThan(dryingHours("air"));
  });
});

describe("sizingRequired", () => {
  it("writing needs sizing", () => {
    expect(sizingRequired("writing")).toBe(true);
  });
  it("art does not need sizing", () => {
    expect(sizingRequired("art")).toBe(false);
  });
});

describe("sheetStrengthRating", () => {
  it("kozo is strongest", () => {
    expect(sheetStrengthRating("kozo")).toBeGreaterThan(sheetStrengthRating("wood"));
  });
});

describe("archivalQualityYears", () => {
  it("kozo lasts longest", () => {
    expect(archivalQualityYears("kozo")).toBeGreaterThan(archivalQualityYears("wood"));
  });
});

describe("costPerSheet", () => {
  it("kozo most expensive", () => {
    expect(costPerSheet("kozo", 1)).toBeGreaterThan(costPerSheet("wood", 1));
  });
});

describe("pulpSources", () => {
  it("returns 5 sources", () => {
    expect(pulpSources()).toHaveLength(5);
  });
});
