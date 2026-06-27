import { describe, it, expect } from "vitest";
import {
  bladeLength, bladeWeight, balancePointCm, edgeAngle,
  fullerDepthMm, tangLength, hardnessHrc, temperingTemp,
  quenchTime, grindingPasses, bladesteelTypes,
} from "../claymore-calc.js";

describe("bladeLength", () => {
  it("total minus hilt", () => {
    expect(bladeLength(130, 30)).toBe(100);
  });
});

describe("bladeWeight", () => {
  it("positive kg", () => {
    expect(bladeWeight(100, 5, 5, "carbon")).toBeGreaterThan(0);
  });
});

describe("balancePointCm", () => {
  it("positive cm", () => {
    expect(balancePointCm(100, 500, 1500)).toBeGreaterThan(0);
  });
  it("zero weight = 0", () => {
    expect(balancePointCm(100, 0, 0)).toBe(0);
  });
});

describe("edgeAngle", () => {
  it("cutting sharpest", () => {
    expect(edgeAngle("cutting")).toBeLessThan(edgeAngle("display"));
  });
});

describe("fullerDepthMm", () => {
  it("quarter of thickness", () => {
    expect(fullerDepthMm(8)).toBe(2);
  });
});

describe("tangLength", () => {
  it("90% of hilt", () => {
    expect(tangLength(30)).toBeCloseTo(27, 0);
  });
});

describe("hardnessHrc", () => {
  it("tool steel hardest", () => {
    expect(hardnessHrc("tool")).toBeGreaterThan(hardnessHrc("spring"));
  });
});

describe("temperingTemp", () => {
  it("positive temp", () => {
    expect(temperingTemp(58)).toBeGreaterThan(0);
  });
});

describe("quenchTime", () => {
  it("positive seconds", () => {
    expect(quenchTime(5)).toBeGreaterThan(0);
  });
});

describe("grindingPasses", () => {
  it("positive passes", () => {
    expect(grindingPasses(20, 30)).toBeGreaterThan(0);
  });
});

describe("bladesteelTypes", () => {
  it("returns 5 types", () => {
    expect(bladesteelTypes()).toHaveLength(5);
  });
});
