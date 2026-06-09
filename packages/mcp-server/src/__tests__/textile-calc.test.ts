import { describe, it, expect } from "vitest";
import {
  yardsToCm, cmToYards, inchesToCm, cmToInches,
  fabricArea, fabricNeeded, threadLength, bobbinFills,
  stitchCount, seamAllowance, shrinkageAdjust,
  buttonSpacing, elasticLength, biasBinding,
  gatherRatio, curtainFabric, quiltSize, battingArea,
} from "../textile-calc.js";

describe("yardsToCm / cmToYards", () => {
  it("1 yard = 91.4cm", () => {
    expect(yardsToCm(1)).toBeCloseTo(91.4, 0);
  });

  it("round-trips", () => {
    expect(cmToYards(yardsToCm(3))).toBeCloseTo(3);
  });
});

describe("inchesToCm / cmToInches", () => {
  it("1 inch = 2.5cm", () => {
    expect(inchesToCm(1)).toBeCloseTo(2.5, 0);
  });
});

describe("fabricArea", () => {
  it("computes square meters", () => {
    expect(fabricArea(100, 100)).toBe(1);
  });
});

describe("fabricNeeded", () => {
  it("computes total length", () => {
    const pieces = [{ widthCm: 30, heightCm: 40, quantity: 4 }];
    const length = fabricNeeded(pieces, 150);
    expect(length).toBeGreaterThan(0);
  });
});

describe("threadLength", () => {
  it("positive length", () => {
    expect(threadLength(100)).toBeGreaterThan(0);
  });
});

describe("bobbinFills", () => {
  it("computes bobbin count", () => {
    expect(bobbinFills(10000)).toBe(2);
  });
});

describe("stitchCount", () => {
  it("3 per cm default", () => {
    expect(stitchCount(100)).toBe(300);
  });
});

describe("seamAllowance", () => {
  it("adds to dimensions", () => {
    const pieces = [{ widthCm: 30, heightCm: 40, quantity: 1 }];
    const adjusted = seamAllowance(pieces);
    expect(adjusted[0].widthCm).toBe(33);
    expect(adjusted[0].heightCm).toBe(43);
  });
});

describe("shrinkageAdjust", () => {
  it("increases measurement", () => {
    const adjusted = shrinkageAdjust(100, 5);
    expect(adjusted).toBeGreaterThan(100);
  });
});

describe("buttonSpacing", () => {
  it("evenly spaces buttons", () => {
    expect(buttonSpacing(60, 4)).toBe(20);
  });
});

describe("elasticLength", () => {
  it("shorter than measurement", () => {
    expect(elasticLength(100)).toBeLessThan(100);
  });
});

describe("biasBinding", () => {
  it("computes strip length and area", () => {
    const result = biasBinding(200);
    expect(result.stripLength).toBe(210);
    expect(result.fabricSqCm).toBeGreaterThan(0);
  });
});

describe("gatherRatio", () => {
  it("medium fullness doubles", () => {
    expect(gatherRatio(100, "medium")).toBe(200);
  });
});

describe("curtainFabric", () => {
  it("computes width and length", () => {
    const result = curtainFabric(100, 200);
    expect(result.widthCm).toBe(200);
    expect(result.lengthCm).toBe(225);
  });
});

describe("quiltSize", () => {
  it("computes quilt dimensions", () => {
    const result = quiltSize(20, 5, 6, 2, 5);
    expect(result.width).toBeGreaterThan(100);
    expect(result.height).toBeGreaterThan(100);
  });
});

describe("battingArea", () => {
  it("adds overlap", () => {
    expect(battingArea(100, 100)).toBeGreaterThan(1);
  });
});
