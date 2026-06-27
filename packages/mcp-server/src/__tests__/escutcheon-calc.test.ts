import { describe, it, expect } from "vitest";
import {
  shieldArea, fieldDivisions, tinctureLayers, gildingAreaCm2,
  carvingDepthMm, paintLayers, mantlingLength, crestHeight,
  blazonComplexity, restorationHours, shieldShapes,
} from "../escutcheon-calc.js";

describe("shieldArea", () => {
  it("positive area", () => {
    expect(shieldArea(60, 70, "heater")).toBeGreaterThan(0);
  });
});

describe("fieldDivisions", () => {
  it("minimum 1", () => {
    expect(fieldDivisions(0, 0)).toBe(1);
  });
  it("sums plus 1", () => {
    expect(fieldDivisions(2, 3)).toBe(6);
  });
});

describe("tinctureLayers", () => {
  it("positive layers", () => {
    expect(tinctureLayers(4)).toBeGreaterThan(0);
  });
});

describe("gildingAreaCm2", () => {
  it("positive area", () => {
    expect(gildingAreaCm2(3000, 20)).toBeGreaterThan(0);
  });
});

describe("carvingDepthMm", () => {
  it("wood deepest", () => {
    expect(carvingDepthMm("wood")).toBeGreaterThan(carvingDepthMm("metal"));
  });
});

describe("paintLayers", () => {
  it("outdoor more layers", () => {
    expect(paintLayers(true)).toBeGreaterThan(paintLayers(false));
  });
});

describe("mantlingLength", () => {
  it("2.5x shield height", () => {
    expect(mantlingLength(70)).toBe(175);
  });
});

describe("crestHeight", () => {
  it("60% of shield", () => {
    expect(crestHeight(70)).toBe(42);
  });
});

describe("blazonComplexity", () => {
  it("positive score", () => {
    expect(blazonComplexity(2, 3, 4)).toBeGreaterThan(0);
  });
});

describe("restorationHours", () => {
  it("positive hours", () => {
    expect(restorationHours(3000, 30)).toBeGreaterThan(0);
  });
});

describe("shieldShapes", () => {
  it("returns 5 shapes", () => {
    expect(shieldShapes()).toHaveLength(5);
  });
});
