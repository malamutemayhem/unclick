import { describe, it, expect } from "vitest";
import {
  corbelSpacingCm, corbelCount, projectionCm, heightCm,
  loadCapacityKn, archletSpan, totalWeightKg, carvingHoursEach,
  shadowAngle, repairCostTotal, corbelProfiles,
} from "../corbel-table.js";

describe("corbelSpacingCm", () => {
  it("positive spacing", () => {
    expect(corbelSpacingCm(300, 7)).toBeGreaterThan(0);
  });
  it("single corbel = wall length", () => {
    expect(corbelSpacingCm(300, 1)).toBe(300);
  });
});

describe("corbelCount", () => {
  it("positive count", () => {
    expect(corbelCount(300, 50)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(corbelCount(300, 0)).toBe(0);
  });
});

describe("projectionCm", () => {
  it("25% of wall thickness", () => {
    expect(projectionCm(40)).toBe(10);
  });
});

describe("heightCm", () => {
  it("simple ratio", () => {
    expect(heightCm(10, "simple")).toBe(15);
  });
  it("grotesque tallest", () => {
    expect(heightCm(10, "grotesque")).toBeGreaterThan(heightCm(10, "simple"));
  });
});

describe("loadCapacityKn", () => {
  it("positive capacity", () => {
    expect(loadCapacityKn(10, 15, 30)).toBeGreaterThan(0);
  });
});

describe("archletSpan", () => {
  it("positive span", () => {
    expect(archletSpan(50, 20)).toBe(30);
  });
});

describe("totalWeightKg", () => {
  it("positive weight", () => {
    expect(totalWeightKg(7, 2000, 2.5)).toBeGreaterThan(0);
  });
});

describe("carvingHoursEach", () => {
  it("grotesque longest", () => {
    expect(carvingHoursEach("grotesque")).toBeGreaterThan(carvingHoursEach("simple"));
  });
});

describe("shadowAngle", () => {
  it("positive shadow", () => {
    expect(shadowAngle(10, 45)).toBeGreaterThan(0);
  });
  it("zero sun angle = 0", () => {
    expect(shadowAngle(10, 0)).toBe(0);
  });
});

describe("repairCostTotal", () => {
  it("positive cost", () => {
    expect(repairCostTotal(7, "scrolled", 50)).toBeGreaterThan(0);
  });
});

describe("corbelProfiles", () => {
  it("returns 5 profiles", () => {
    expect(corbelProfiles()).toHaveLength(5);
  });
});
