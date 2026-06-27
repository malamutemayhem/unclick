import { describe, it, expect } from "vitest";
import {
  spacingCm, projectionCm, heightCm, countPerEdge,
  totalCount, weightPerCrocketKg, carvingHoursEach,
  totalCarvingHours, windExposureRating, repairCostEach, crocketForms,
} from "../crocket-calc.js";

describe("spacingCm", () => {
  it("positive spacing", () => {
    expect(spacingCm(200, 11)).toBeGreaterThan(0);
  });
  it("single crocket = edge length", () => {
    expect(spacingCm(200, 1)).toBe(200);
  });
});

describe("projectionCm", () => {
  it("1.5x edge width", () => {
    expect(projectionCm(10)).toBe(15);
  });
});

describe("heightCm", () => {
  it("80% of projection", () => {
    expect(heightCm(15)).toBe(12);
  });
});

describe("countPerEdge", () => {
  it("positive count", () => {
    expect(countPerEdge(200, 20)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(countPerEdge(200, 0)).toBe(0);
  });
});

describe("totalCount", () => {
  it("product", () => {
    expect(totalCount(4, 11)).toBe(44);
  });
});

describe("weightPerCrocketKg", () => {
  it("positive weight", () => {
    expect(weightPerCrocketKg(15, 12, 2.5)).toBeGreaterThan(0);
  });
});

describe("carvingHoursEach", () => {
  it("animal longest", () => {
    expect(carvingHoursEach("animal")).toBeGreaterThan(carvingHoursEach("abstract"));
  });
});

describe("totalCarvingHours", () => {
  it("positive hours", () => {
    expect(totalCarvingHours(44, "leaf")).toBeGreaterThan(0);
  });
});

describe("windExposureRating", () => {
  it("increases with height", () => {
    expect(windExposureRating(30)).toBeGreaterThan(windExposureRating(5));
  });
});

describe("repairCostEach", () => {
  it("positive cost", () => {
    expect(repairCostEach("flower", 5, 2)).toBeGreaterThan(0);
  });
});

describe("crocketForms", () => {
  it("returns 5 forms", () => {
    expect(crocketForms()).toHaveLength(5);
  });
});
