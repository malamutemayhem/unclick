import { describe, it, expect } from "vitest";
import {
  columnCount, archSpanM, archHeightM, floorArea,
  ceilingHeight, shadePercent, balustradeLength,
  ventilationFactor, stoneVolumeM3, lightLevel, loggiaStyles,
} from "../loggia-calc.js";

describe("columnCount", () => {
  it("positive count", () => {
    expect(columnCount(20, 3)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(columnCount(20, 0)).toBe(0);
  });
});

describe("archSpanM", () => {
  it("positive span", () => {
    expect(archSpanM(3, 40)).toBeGreaterThan(0);
  });
});

describe("archHeightM", () => {
  it("gothic tallest", () => {
    expect(archHeightM(3, "gothic")).toBeGreaterThan(archHeightM(3, "neoclassical"));
  });
});

describe("floorArea", () => {
  it("positive area", () => {
    expect(floorArea(20, 4)).toBe(80);
  });
});

describe("ceilingHeight", () => {
  it("positive height", () => {
    expect(ceilingHeight(1.5, 4)).toBe(5.5);
  });
});

describe("shadePercent", () => {
  it("between 0 and 100", () => {
    const pct = shadePercent(4, 5, 45);
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThanOrEqual(100);
  });
});

describe("balustradeLength", () => {
  it("less than total", () => {
    expect(balustradeLength(20, 2, 3)).toBeLessThan(20);
  });
});

describe("ventilationFactor", () => {
  it("positive factor", () => {
    expect(ventilationFactor(80)).toBeGreaterThan(0);
  });
});

describe("stoneVolumeM3", () => {
  it("positive volume", () => {
    expect(stoneVolumeM3(8, 4, 40)).toBeGreaterThan(0);
  });
});

describe("lightLevel", () => {
  it("positive level", () => {
    expect(lightLevel(4, 80)).toBeGreaterThan(0);
  });
});

describe("loggiaStyles", () => {
  it("returns 5 styles", () => {
    expect(loggiaStyles()).toHaveLength(5);
  });
});
