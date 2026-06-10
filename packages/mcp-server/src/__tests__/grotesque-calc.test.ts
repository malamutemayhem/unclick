import { describe, it, expect } from "vitest";
import {
  motifDensity, symmetryAxes, repeatUnit, gildingLeaves,
  reliefDepthMm, carvingComplexity, plasterLayers,
  paintColors, restorationHours, grotesqueStyles,
} from "../grotesque-calc.js";

describe("motifDensity", () => {
  it("positive density", () => {
    expect(motifDensity(10, 50)).toBe(5);
  });
  it("zero area = 0", () => {
    expect(motifDensity(0, 50)).toBe(0);
  });
});

describe("symmetryAxes", () => {
  it("arabesque = 2", () => {
    expect(symmetryAxes("arabesque")).toBe(2);
  });
});

describe("repeatUnit", () => {
  it("positive units", () => {
    expect(repeatUnit(100, 20)).toBe(5);
  });
  it("zero motif = 0", () => {
    expect(repeatUnit(100, 0)).toBe(0);
  });
});

describe("gildingLeaves", () => {
  it("positive leaves", () => {
    expect(gildingLeaves(5, 30)).toBeGreaterThan(0);
  });
});

describe("reliefDepthMm", () => {
  it("trophy deepest", () => {
    expect(reliefDepthMm("trophy")).toBeGreaterThan(reliefDepthMm("arabesque"));
  });
});

describe("carvingComplexity", () => {
  it("positive score", () => {
    expect(carvingComplexity(10, 20)).toBe(80);
  });
});

describe("plasterLayers", () => {
  it("more for deeper relief", () => {
    expect(plasterLayers(9)).toBeGreaterThan(plasterLayers(2));
  });
});

describe("paintColors", () => {
  it("trophy most colors", () => {
    expect(paintColors("trophy")).toBeGreaterThan(paintColors("scrollwork"));
  });
});

describe("restorationHours", () => {
  it("increases with age", () => {
    expect(restorationHours(200, 10)).toBeGreaterThan(restorationHours(10, 10));
  });
});

describe("grotesqueStyles", () => {
  it("returns 5 styles", () => {
    expect(grotesqueStyles()).toHaveLength(5);
  });
});
