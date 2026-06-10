import { describe, it, expect } from "vitest";
import {
  projectionM, widthM, stageCount, offsetPerStageCm,
  volumeM3, weightKg, thrustResistanceKn, pinnacleWeightKg,
  flyingArchSpanM, constructionDays, buttressTypes,
} from "../buttress-calc.js";

describe("projectionM", () => {
  it("33% of wall height", () => {
    expect(projectionM(10)).toBe(3.3);
  });
});

describe("widthM", () => {
  it("60% of projection", () => {
    expect(widthM(3.3)).toBe(1.98);
  });
});

describe("stageCount", () => {
  it("at least 1", () => {
    expect(stageCount(2)).toBe(1);
  });
  it("more stages for taller walls", () => {
    expect(stageCount(12)).toBeGreaterThan(stageCount(3));
  });
});

describe("offsetPerStageCm", () => {
  it("zero for single stage", () => {
    expect(offsetPerStageCm(3.3, 1)).toBe(0);
  });
  it("positive for multiple stages", () => {
    expect(offsetPerStageCm(3.3, 3)).toBeGreaterThan(0);
  });
});

describe("volumeM3", () => {
  it("positive volume", () => {
    expect(volumeM3(3.3, 1.98, 10)).toBeGreaterThan(0);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(45, 2300)).toBeGreaterThan(0);
  });
});

describe("thrustResistanceKn", () => {
  it("positive resistance", () => {
    expect(thrustResistanceKn(100000, 0.6)).toBeGreaterThan(0);
  });
});

describe("pinnacleWeightKg", () => {
  it("positive weight", () => {
    expect(pinnacleWeightKg(1.98, 2300)).toBeGreaterThan(0);
  });
});

describe("flyingArchSpanM", () => {
  it("45% of nave width", () => {
    expect(flyingArchSpanM(10)).toBe(4.5);
  });
});

describe("constructionDays", () => {
  it("flying longest", () => {
    expect(constructionDays(10, "flying")).toBeGreaterThan(constructionDays(10, "clasping"));
  });
});

describe("buttressTypes", () => {
  it("returns 5 types", () => {
    expect(buttressTypes()).toHaveLength(5);
  });
});
