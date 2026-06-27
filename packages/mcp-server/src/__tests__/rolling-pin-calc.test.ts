import { describe, it, expect } from "vitest";
import {
  doughControl, rollWeight, thicknessUniform, cleanability,
  pinCost, staysCool, nonStickSurface, bodyMaterial,
  bestDough, rollingPins,
} from "../rolling-pin-calc.js";

describe("doughControl", () => {
  it("french tapered best dough control", () => {
    expect(doughControl("french_tapered")).toBeGreaterThan(doughControl("silicone_nonstick"));
  });
});

describe("rollWeight", () => {
  it("marble heavy heaviest", () => {
    expect(rollWeight("marble_heavy")).toBeGreaterThan(rollWeight("silicone_nonstick"));
  });
});

describe("thicknessUniform", () => {
  it("adjustable ring most uniform thickness", () => {
    expect(thicknessUniform("adjustable_ring")).toBeGreaterThan(thicknessUniform("french_tapered"));
  });
});

describe("cleanability", () => {
  it("silicone nonstick easiest to clean", () => {
    expect(cleanability("silicone_nonstick")).toBeGreaterThan(cleanability("american_handle"));
  });
});

describe("pinCost", () => {
  it("marble heavy most expensive", () => {
    expect(pinCost("marble_heavy")).toBeGreaterThan(pinCost("american_handle"));
  });
});

describe("staysCool", () => {
  it("marble heavy stays cool", () => {
    expect(staysCool("marble_heavy")).toBe(true);
  });
  it("french tapered does not", () => {
    expect(staysCool("french_tapered")).toBe(false);
  });
});

describe("nonStickSurface", () => {
  it("silicone nonstick has non stick surface", () => {
    expect(nonStickSurface("silicone_nonstick")).toBe(true);
  });
  it("french tapered does not", () => {
    expect(nonStickSurface("french_tapered")).toBe(false);
  });
});

describe("bodyMaterial", () => {
  it("marble heavy uses polished marble stone", () => {
    expect(bodyMaterial("marble_heavy")).toBe("polished_marble_stone");
  });
});

describe("bestDough", () => {
  it("adjustable ring for uniform pasta precise", () => {
    expect(bestDough("adjustable_ring")).toBe("uniform_pasta_precise");
  });
});

describe("rollingPins", () => {
  it("returns 5 types", () => {
    expect(rollingPins()).toHaveLength(5);
  });
});
