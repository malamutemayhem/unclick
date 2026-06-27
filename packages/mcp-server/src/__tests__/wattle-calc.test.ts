import { describe, it, expect } from "vitest";
import {
  stakeCount, witbyLengthM, panelArea, daubThicknessCm,
  daubVolumeM3, weaveDensity, buildTimeHours, insulationRValue,
  lifespanYears, materialCost, wattleWeaves,
} from "../wattle-calc.js";

describe("stakeCount", () => {
  it("positive count", () => {
    expect(stakeCount(200, 15)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(stakeCount(200, 0)).toBe(0);
  });
});

describe("witbyLengthM", () => {
  it("positive length", () => {
    expect(witbyLengthM(120, 200)).toBeGreaterThan(0);
  });
});

describe("panelArea", () => {
  it("positive area", () => {
    expect(panelArea(200, 120)).toBeGreaterThan(0);
  });
});

describe("daubThicknessCm", () => {
  it("structural thicker", () => {
    expect(daubThicknessCm(true)).toBeGreaterThan(daubThicknessCm(false));
  });
});

describe("daubVolumeM3", () => {
  it("positive volume", () => {
    expect(daubVolumeM3(24000, 8)).toBeGreaterThan(0);
  });
});

describe("weaveDensity", () => {
  it("close densest", () => {
    expect(weaveDensity("close")).toBeGreaterThan(weaveDensity("random"));
  });
});

describe("buildTimeHours", () => {
  it("positive hours", () => {
    expect(buildTimeHours(24000, "horizontal")).toBeGreaterThan(0);
  });
});

describe("insulationRValue", () => {
  it("positive R-value", () => {
    expect(insulationRValue(8)).toBeGreaterThan(0);
  });
});

describe("lifespanYears", () => {
  it("sheltered longer", () => {
    expect(lifespanYears(true)).toBeGreaterThan(lifespanYears(false));
  });
});

describe("materialCost", () => {
  it("positive cost", () => {
    expect(materialCost(14, 2, 6, 1.5)).toBeGreaterThan(0);
  });
});

describe("wattleWeaves", () => {
  it("returns 5 weaves", () => {
    expect(wattleWeaves()).toHaveLength(5);
  });
});
