import { describe, it, expect } from "vitest";
import {
  crossSectionAreaM2, timberSetSpacingM, timberSetsNeeded,
  ventilationCfm, hoistCapacityKg, pumpRateLpm, blastHolesPerRound,
  advancePerRoundM, excavationDaysPerM, costPerMeter, shaftTypes,
} from "../mine-shaft-calc.js";

describe("crossSectionAreaM2", () => {
  it("calculates area", () => {
    expect(crossSectionAreaM2(3, 4)).toBe(12);
  });
});

describe("timberSetSpacingM", () => {
  it("poor rock = tighter spacing", () => {
    expect(timberSetSpacingM("poor")).toBeLessThan(timberSetSpacingM("good"));
  });
});

describe("timberSetsNeeded", () => {
  it("longer shaft = more sets", () => {
    expect(timberSetsNeeded(100, 1.2)).toBeGreaterThan(timberSetsNeeded(50, 1.2));
  });
  it("zero spacing returns zero", () => {
    expect(timberSetsNeeded(100, 0)).toBe(0);
  });
});

describe("ventilationCfm", () => {
  it("more crew = more ventilation", () => {
    expect(ventilationCfm(10, 100)).toBeGreaterThan(ventilationCfm(5, 100));
  });
});

describe("hoistCapacityKg", () => {
  it("deeper = higher capacity", () => {
    expect(hoistCapacityKg(200)).toBeGreaterThan(hoistCapacityKg(100));
  });
});

describe("pumpRateLpm", () => {
  it("deeper = higher pump rate", () => {
    expect(pumpRateLpm(200, 1000)).toBeGreaterThan(pumpRateLpm(100, 1000));
  });
});

describe("blastHolesPerRound", () => {
  it("larger face = more holes", () => {
    expect(blastHolesPerRound(12)).toBeGreaterThan(blastHolesPerRound(6));
  });
});

describe("advancePerRoundM", () => {
  it("adit advances fastest", () => {
    expect(advancePerRoundM("adit")).toBeGreaterThan(advancePerRoundM("winze"));
  });
});

describe("excavationDaysPerM", () => {
  it("adit is fastest", () => {
    expect(excavationDaysPerM("adit")).toBeLessThan(excavationDaysPerM("winze"));
  });
});

describe("costPerMeter", () => {
  it("winze most expensive", () => {
    expect(costPerMeter("winze", 1000)).toBeGreaterThan(costPerMeter("adit", 1000));
  });
});

describe("shaftTypes", () => {
  it("returns 5 types", () => {
    expect(shaftTypes()).toHaveLength(5);
  });
});
