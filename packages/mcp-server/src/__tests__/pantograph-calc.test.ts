import { describe, it, expect } from "vitest";
import {
  scaleFactor, outputSize, armLength, pivotPosition,
  parallelogramArea, jointCount, accuracy, materialThicknessMm,
  workingArea, extensionRatio, penPressure, pantographTypes,
} from "../pantograph-calc.js";

describe("scaleFactor", () => {
  it("2:1 ratio", () => {
    expect(scaleFactor(10, 20)).toBe(2);
  });
  it("zero tracer = 0", () => {
    expect(scaleFactor(0, 20)).toBe(0);
  });
});

describe("outputSize", () => {
  it("doubles at 2x", () => {
    expect(outputSize(5, 2)).toBe(10);
  });
});

describe("armLength", () => {
  it("1.3x max input", () => {
    expect(armLength(30)).toBe(39);
  });
});

describe("pivotPosition", () => {
  it("positive position", () => {
    expect(pivotPosition(39, 2)).toBeGreaterThan(0);
  });
});

describe("parallelogramArea", () => {
  it("width x height", () => {
    expect(parallelogramArea(10, 5)).toBe(50);
  });
});

describe("jointCount", () => {
  it("lazy_tongs = 12", () => {
    expect(jointCount("lazy_tongs")).toBe(12);
  });
});

describe("accuracy", () => {
  it("better at higher scale", () => {
    expect(accuracy(3)).toBeLessThan(accuracy(1));
  });
});

describe("materialThicknessMm", () => {
  it("small = 3mm", () => {
    expect(materialThicknessMm(20)).toBe(3);
  });
  it("large = 8mm", () => {
    expect(materialThicknessMm(80)).toBe(8);
  });
});

describe("workingArea", () => {
  it("positive cm2", () => {
    expect(workingArea(39)).toBeGreaterThan(0);
  });
});

describe("extensionRatio", () => {
  it("lazy_tongs = 5", () => {
    expect(extensionRatio("lazy_tongs")).toBe(5);
  });
});

describe("penPressure", () => {
  it("small scale = light", () => {
    expect(penPressure(0.25)).toBe("light");
  });
  it("large scale = firm", () => {
    expect(penPressure(3)).toBe("firm");
  });
});

describe("pantographTypes", () => {
  it("returns 5 types", () => {
    expect(pantographTypes()).toHaveLength(5);
  });
});
