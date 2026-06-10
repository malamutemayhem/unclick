import { describe, it, expect } from "vitest";
import {
  panelArea, panelCount, recessDepthCm, ribWidthCm,
  rosetteCount, weightReductionPercent, gildingGrams, paintArea,
  acousticAbsorption, installTimeHours, cofferShapes,
} from "../coffer-calc.js";

describe("panelArea", () => {
  it("positive area", () => {
    expect(panelArea(60, 60)).toBeGreaterThan(0);
  });
});

describe("panelCount", () => {
  it("positive count", () => {
    expect(panelCount(50, 0.36)).toBeGreaterThan(0);
  });
  it("zero panel = 0", () => {
    expect(panelCount(50, 0)).toBe(0);
  });
});

describe("recessDepthCm", () => {
  it("40% of thickness", () => {
    expect(recessDepthCm(20)).toBe(8);
  });
});

describe("ribWidthCm", () => {
  it("15% of panel", () => {
    expect(ribWidthCm(60)).toBe(9);
  });
});

describe("rosetteCount", () => {
  it("one per panel", () => {
    expect(rosetteCount(50)).toBe(50);
  });
});

describe("weightReductionPercent", () => {
  it("between 0 and 100", () => {
    const pct = weightReductionPercent(8, 20);
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(100);
  });
  it("zero thickness = 0", () => {
    expect(weightReductionPercent(8, 0)).toBe(0);
  });
});

describe("gildingGrams", () => {
  it("positive grams", () => {
    expect(gildingGrams(50, 100)).toBeGreaterThan(0);
  });
});

describe("paintArea", () => {
  it("positive area", () => {
    expect(paintArea(50, 240, 8, 3600)).toBeGreaterThan(0);
  });
});

describe("acousticAbsorption", () => {
  it("positive value", () => {
    expect(acousticAbsorption(8, 50)).toBeGreaterThan(0);
  });
});

describe("installTimeHours", () => {
  it("circular slowest", () => {
    expect(installTimeHours(10, "circular")).toBeGreaterThan(installTimeHours(10, "square"));
  });
});

describe("cofferShapes", () => {
  it("returns 5 shapes", () => {
    expect(cofferShapes()).toHaveLength(5);
  });
});
