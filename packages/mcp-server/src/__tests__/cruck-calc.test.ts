import { describe, it, expect } from "vitest";
import {
  bladeLength, bladeThicknessCm, pairCount, spanM,
  tieBeamPosition, timberVolumeM3, naturalCurveRequired,
  treeAgeYears, assemblyDays, loadCapacityKn, cruckTypes,
} from "../cruck-calc.js";

describe("bladeLength", () => {
  it("longer than height", () => {
    expect(bladeLength(6)).toBeGreaterThan(6);
  });
});

describe("bladeThicknessCm", () => {
  it("positive cm", () => {
    expect(bladeThicknessCm(5)).toBeGreaterThan(0);
  });
});

describe("pairCount", () => {
  it("positive count", () => {
    expect(pairCount(12, 3)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(pairCount(12, 0)).toBe(0);
  });
});

describe("spanM", () => {
  it("positive span", () => {
    expect(spanM(120, 7)).toBeGreaterThan(0);
  });
});

describe("tieBeamPosition", () => {
  it("less than half blade", () => {
    expect(tieBeamPosition(7)).toBeLessThan(7 / 2);
  });
});

describe("timberVolumeM3", () => {
  it("positive volume", () => {
    expect(timberVolumeM3(7, 35, 25, 5)).toBeGreaterThan(0);
  });
});

describe("naturalCurveRequired", () => {
  it("full needs curve", () => {
    expect(naturalCurveRequired("full")).toBe(true);
  });
  it("jointed does not", () => {
    expect(naturalCurveRequired("jointed")).toBe(false);
  });
});

describe("treeAgeYears", () => {
  it("positive years", () => {
    expect(treeAgeYears(35)).toBeGreaterThan(0);
  });
});

describe("assemblyDays", () => {
  it("positive days", () => {
    expect(assemblyDays(5, 4)).toBeGreaterThan(0);
  });
  it("zero crew = 0", () => {
    expect(assemblyDays(5, 0)).toBe(0);
  });
});

describe("loadCapacityKn", () => {
  it("positive kn", () => {
    expect(loadCapacityKn(35, 25)).toBeGreaterThan(0);
  });
});

describe("cruckTypes", () => {
  it("returns 5 types", () => {
    expect(cruckTypes()).toHaveLength(5);
  });
});
