import { describe, it, expect } from "vitest";
import {
  mullionCount, archCount, stoneBarWidthCm, curvatureRadius,
  glassPanelCount, leadCameWeightKg, windLoadCapacity,
  carvingComplexity, carvingHoursPerM, restorationDifficulty, traceryStyles,
} from "../tracery-calc.js";

describe("mullionCount", () => {
  it("positive count", () => {
    expect(mullionCount(200, 50)).toBeGreaterThan(0);
  });
  it("zero panel = 0", () => {
    expect(mullionCount(200, 0)).toBe(0);
  });
});

describe("archCount", () => {
  it("one more than mullions", () => {
    expect(archCount(3)).toBe(4);
  });
});

describe("stoneBarWidthCm", () => {
  it("plate widest", () => {
    expect(stoneBarWidthCm("plate")).toBeGreaterThan(stoneBarWidthCm("flamboyant"));
  });
});

describe("curvatureRadius", () => {
  it("flamboyant most curved", () => {
    expect(curvatureRadius(50, "flamboyant")).toBeGreaterThan(curvatureRadius(50, "bar"));
  });
});

describe("glassPanelCount", () => {
  it("positive count", () => {
    expect(glassPanelCount(4, 2)).toBeGreaterThan(0);
  });
});

describe("leadCameWeightKg", () => {
  it("positive weight", () => {
    expect(leadCameWeightKg(500)).toBeGreaterThan(0);
  });
});

describe("windLoadCapacity", () => {
  it("positive capacity", () => {
    expect(windLoadCapacity(8, 15)).toBeGreaterThan(0);
  });
});

describe("carvingComplexity", () => {
  it("flamboyant most complex", () => {
    expect(carvingComplexity("flamboyant")).toBeGreaterThan(carvingComplexity("plate"));
  });
});

describe("carvingHoursPerM", () => {
  it("flamboyant slowest", () => {
    expect(carvingHoursPerM("flamboyant")).toBeGreaterThan(carvingHoursPerM("plate"));
  });
});

describe("restorationDifficulty", () => {
  it("increases with age", () => {
    expect(restorationDifficulty("bar", 500)).toBeGreaterThan(restorationDifficulty("bar", 10));
  });
});

describe("traceryStyles", () => {
  it("returns 5 styles", () => {
    expect(traceryStyles()).toHaveLength(5);
  });
});
