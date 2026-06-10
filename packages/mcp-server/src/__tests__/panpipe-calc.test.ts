import { describe, it, expect } from "vitest";
import {
  pipeLength, pipeCount, boreDiameter, tuningWax,
  bindingLength, airPressureKpa, harmonicFrequencies,
  weightG, craftingHours, moistureEffect, pipeMaterials,
} from "../panpipe-calc.js";

describe("pipeLength", () => {
  it("positive cm", () => {
    expect(pipeLength(440)).toBeGreaterThan(0);
  });
  it("zero freq = 0", () => {
    expect(pipeLength(0)).toBe(0);
  });
});

describe("pipeCount", () => {
  it("octave = 13 pipes", () => {
    expect(pipeCount(261, 523)).toBe(13);
  });
});

describe("boreDiameter", () => {
  it("positive diameter", () => {
    expect(boreDiameter(20)).toBeGreaterThan(0);
  });
});

describe("tuningWax", () => {
  it("positive grams", () => {
    expect(tuningWax(15, 10)).toBeGreaterThan(0);
  });
});

describe("bindingLength", () => {
  it("positive length", () => {
    expect(bindingLength(8, 1.5)).toBeGreaterThan(0);
  });
});

describe("airPressureKpa", () => {
  it("positive kpa", () => {
    expect(airPressureKpa(1, 2)).toBeGreaterThan(0);
  });
  it("zero bore = 0", () => {
    expect(airPressureKpa(0, 2)).toBe(0);
  });
});

describe("harmonicFrequencies", () => {
  it("odd harmonics only", () => {
    const h = harmonicFrequencies(100, 3);
    expect(h).toHaveLength(3);
    expect(h[0]).toBe(100);
    expect(h[1]).toBe(300);
    expect(h[2]).toBe(500);
  });
});

describe("weightG", () => {
  it("metal heaviest", () => {
    expect(weightG(8, 15, "metal")).toBeGreaterThan(weightG(8, 15, "bamboo"));
  });
});

describe("craftingHours", () => {
  it("positive hours", () => {
    expect(craftingHours(8, "bamboo")).toBeGreaterThan(0);
  });
});

describe("moistureEffect", () => {
  it("positive effect", () => {
    expect(moistureEffect(60)).toBeGreaterThan(0);
  });
});

describe("pipeMaterials", () => {
  it("returns 5 materials", () => {
    expect(pipeMaterials()).toHaveLength(5);
  });
});
