import { describe, it, expect } from "vitest";
import {
  furrowDepthCm, furrowWidthCm, draftForceKn, oxenRequired,
  areaPerDayHectares, turningRadiusM, shareWeightKg,
  sharpeningIntervalHours, seedbedQuality, costEstimate, plowTypes,
} from "../plow-calc.js";

describe("furrowDepthCm", () => {
  it("chisel deepest", () => {
    expect(furrowDepthCm("chisel")).toBeGreaterThan(furrowDepthCm("ard"));
  });
});

describe("furrowWidthCm", () => {
  it("moldboard widest", () => {
    expect(furrowWidthCm("moldboard")).toBeGreaterThan(furrowWidthCm("ard"));
  });
});

describe("draftForceKn", () => {
  it("positive force", () => {
    expect(draftForceKn("moldboard", 50)).toBeGreaterThan(0);
  });
});

describe("oxenRequired", () => {
  it("at least 1", () => {
    expect(oxenRequired(0.5)).toBe(1);
  });
});

describe("areaPerDayHectares", () => {
  it("disc fastest", () => {
    expect(areaPerDayHectares("disc", 8)).toBeGreaterThan(areaPerDayHectares("ard", 8));
  });
});

describe("turningRadiusM", () => {
  it("reversible smallest", () => {
    expect(turningRadiusM("reversible")).toBeLessThan(turningRadiusM("disc"));
  });
});

describe("shareWeightKg", () => {
  it("disc heaviest", () => {
    expect(shareWeightKg("disc")).toBeGreaterThan(shareWeightKg("ard"));
  });
});

describe("sharpeningIntervalHours", () => {
  it("disc longest", () => {
    expect(sharpeningIntervalHours("disc")).toBeGreaterThan(sharpeningIntervalHours("ard"));
  });
});

describe("seedbedQuality", () => {
  it("reversible best", () => {
    expect(seedbedQuality("reversible")).toBeGreaterThan(seedbedQuality("ard"));
  });
});

describe("costEstimate", () => {
  it("reversible most expensive", () => {
    expect(costEstimate("reversible", 100)).toBeGreaterThan(costEstimate("ard", 100));
  });
});

describe("plowTypes", () => {
  it("returns 5 types", () => {
    expect(plowTypes()).toHaveLength(5);
  });
});
