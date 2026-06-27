import { describe, it, expect } from "vitest";
import {
  lobes, petals, rotationsToClose, penHoleRatio, patternRadius,
  innerRadius, lineLength, symmetryOrder, paperSize, penColors,
  drawingTime, gearTypes,
} from "../spirograph-calc.js";

describe("lobes", () => {
  it("96 ring, 56 wheel = 12", () => {
    expect(lobes(96, 56)).toBe(12);
  });
  it("zero wheel = 0", () => {
    expect(lobes(96, 0)).toBe(0);
  });
});

describe("petals", () => {
  it("96 ring, 56 wheel = 7", () => {
    expect(petals(96, 56)).toBe(7);
  });
});

describe("rotationsToClose", () => {
  it("96 ring, 56 wheel = 7", () => {
    expect(rotationsToClose(96, 56)).toBe(7);
  });
});

describe("penHoleRatio", () => {
  it("between 0 and 1", () => {
    expect(penHoleRatio(15, 28)).toBeGreaterThan(0);
    expect(penHoleRatio(15, 28)).toBeLessThan(1);
  });
});

describe("patternRadius", () => {
  it("positive radius", () => {
    expect(patternRadius(48, 28, 15)).toBeGreaterThan(0);
  });
});

describe("innerRadius", () => {
  it("non-negative", () => {
    expect(innerRadius(48, 28, 15)).toBeGreaterThanOrEqual(0);
  });
});

describe("lineLength", () => {
  it("positive length", () => {
    expect(lineLength(96, 56, 28, 15)).toBeGreaterThan(0);
  });
});

describe("symmetryOrder", () => {
  it("gcd of teeth", () => {
    expect(symmetryOrder(96, 56)).toBe(8);
  });
});

describe("paperSize", () => {
  it("ring + 20mm margin", () => {
    expect(paperSize(150)).toBe(170);
  });
});

describe("penColors", () => {
  it("simple = 1", () => {
    expect(penColors(2)).toBe(1);
  });
  it("complex = 3", () => {
    expect(penColors(12)).toBe(3);
  });
});

describe("drawingTime", () => {
  it("positive minutes", () => {
    expect(drawingTime(96, 56)).toBeGreaterThan(0);
  });
});

describe("gearTypes", () => {
  it("returns 3 types", () => {
    expect(gearTypes()).toHaveLength(3);
  });
});
