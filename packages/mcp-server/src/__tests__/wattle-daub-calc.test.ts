import { describe, it, expect } from "vitest";
import {
  wattleSpacingCm, stakeDiameterMm, weaverDiameterMm, daubThicknessCm,
  daubVolumeLitersPerM2, strawKgPerM2, dryingTimeDays, thermalResistance,
  costPerM2, daubMixes,
} from "../wattle-daub-calc.js";

describe("wattleSpacingCm", () => {
  it("wider panel = wider spacing", () => {
    expect(wattleSpacingCm(100)).toBeGreaterThan(wattleSpacingCm(50));
  });
});

describe("stakeDiameterMm", () => {
  it("taller panel = thicker stakes", () => {
    expect(stakeDiameterMm(200)).toBeGreaterThan(stakeDiameterMm(100));
  });
});

describe("weaverDiameterMm", () => {
  it("returns 15mm", () => {
    expect(weaverDiameterMm()).toBe(15);
  });
});

describe("daubThicknessCm", () => {
  it("heavy insulation is thickest", () => {
    expect(daubThicknessCm("heavy")).toBeGreaterThan(daubThicknessCm("minimal"));
  });
});

describe("daubVolumeLitersPerM2", () => {
  it("thicker daub = more volume", () => {
    expect(daubVolumeLitersPerM2(8)).toBeGreaterThan(daubVolumeLitersPerM2(3));
  });
});

describe("strawKgPerM2", () => {
  it("cob uses most straw", () => {
    expect(strawKgPerM2("cob")).toBeGreaterThan(strawKgPerM2("clay_straw"));
  });
  it("lime sand uses no straw", () => {
    expect(strawKgPerM2("lime_sand")).toBe(0);
  });
});

describe("dryingTimeDays", () => {
  it("thicker = longer drying", () => {
    expect(dryingTimeDays(8)).toBeGreaterThan(dryingTimeDays(3));
  });
});

describe("thermalResistance", () => {
  it("thicker = better insulation", () => {
    expect(thermalResistance(10)).toBeGreaterThan(thermalResistance(5));
  });
});

describe("costPerM2", () => {
  it("earth dung is cheapest", () => {
    expect(costPerM2("earth_dung")).toBeLessThan(costPerM2("lime_sand"));
  });
});

describe("daubMixes", () => {
  it("returns 5 mixes", () => {
    expect(daubMixes()).toHaveLength(5);
  });
});
