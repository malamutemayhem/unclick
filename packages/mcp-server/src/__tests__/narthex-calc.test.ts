import { describe, it, expect } from "vitest";
import {
  depthM, widthM, floorAreaM2, ceilingHeightM, columnCount,
  doorCount, seatingCapacity, fontPosition, lightLevel,
  acousticSeparation, narthexTypes,
} from "../narthex-calc.js";

describe("depthM", () => {
  it("25% of nave", () => {
    expect(depthM(12)).toBe(3);
  });
});

describe("widthM", () => {
  it("equals facade", () => {
    expect(widthM(15)).toBe(15);
  });
});

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(15, 3)).toBe(45);
  });
});

describe("ceilingHeightM", () => {
  it("galilee tallest", () => {
    expect(ceilingHeightM(12, "galilee")).toBeGreaterThan(ceilingHeightM(12, "lateral"));
  });
});

describe("columnCount", () => {
  it("positive count", () => {
    expect(columnCount(15, 3)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(columnCount(15, 0)).toBe(0);
  });
});

describe("doorCount", () => {
  it("outer has 3", () => {
    expect(doorCount("outer")).toBe(3);
  });
  it("inner has 1", () => {
    expect(doorCount("inner")).toBe(1);
  });
});

describe("seatingCapacity", () => {
  it("positive capacity", () => {
    expect(seatingCapacity(45)).toBeGreaterThan(0);
  });
});

describe("fontPosition", () => {
  it("center of narthex", () => {
    expect(fontPosition(3)).toBe(1.5);
  });
});

describe("lightLevel", () => {
  it("positive percent", () => {
    expect(lightLevel(5, 45)).toBeGreaterThan(0);
  });
  it("zero floor = 0", () => {
    expect(lightLevel(5, 0)).toBe(0);
  });
});

describe("acousticSeparation", () => {
  it("positive dB", () => {
    expect(acousticSeparation(0.6)).toBeGreaterThan(0);
  });
});

describe("narthexTypes", () => {
  it("returns 5 types", () => {
    expect(narthexTypes()).toHaveLength(5);
  });
});
