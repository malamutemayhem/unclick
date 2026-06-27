import { describe, it, expect } from "vitest";
import {
  traySize, sizeConcentration, paintDropSize, rakeTeethSpacing,
  dropCount, dryingTimeMin, alumConcentration, patternRepeatability,
  colorLayers, costPerSheet, marblingStyles,
} from "../marbling-calc.js";

describe("traySize", () => {
  it("10cm larger each side", () => {
    const s = traySize(30, 40);
    expect(s.width).toBe(40);
    expect(s.height).toBe(50);
  });
});

describe("sizeConcentration", () => {
  it("higher in cold", () => {
    expect(sizeConcentration(10)).toBeGreaterThan(sizeConcentration(30));
  });
});

describe("paintDropSize", () => {
  it("grows with viscosity", () => {
    expect(paintDropSize(3)).toBeGreaterThan(paintDropSize(1));
  });
});

describe("rakeTeethSpacing", () => {
  it("10mm per scale unit", () => {
    expect(rakeTeethSpacing(2)).toBe(20);
  });
});

describe("dropCount", () => {
  it("positive drops", () => {
    expect(dropCount(1000, 50)).toBeGreaterThan(0);
  });
});

describe("dryingTimeMin", () => {
  it("positive minutes", () => {
    expect(dryingTimeMin(120, 60)).toBeGreaterThan(0);
  });
});

describe("alumConcentration", () => {
  it("15g per liter", () => {
    expect(alumConcentration(2)).toBe(30);
  });
});

describe("patternRepeatability", () => {
  it("gelgit most repeatable", () => {
    expect(patternRepeatability("gelgit")).toBeGreaterThan(patternRepeatability("suminagashi"));
  });
});

describe("colorLayers", () => {
  it("stone most layers", () => {
    expect(colorLayers("stone")).toBeGreaterThan(colorLayers("suminagashi"));
  });
});

describe("costPerSheet", () => {
  it("positive cost", () => {
    expect(costPerSheet(10, 120)).toBeGreaterThan(0);
  });
});

describe("marblingStyles", () => {
  it("returns 5 styles", () => {
    expect(marblingStyles()).toHaveLength(5);
  });
});
