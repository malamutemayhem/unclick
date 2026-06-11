import { describe, it, expect } from "vitest";
import {
  accuracy, range, reliability, dustTolerance,
  rlCost, nonContact, forSolids, frequency,
  bestUse, radarLevelTypes,
} from "../radar-level-calc.js";

describe("accuracy", () => {
  it("guided wave most accurate", () => {
    expect(accuracy("guided_wave_tdr")).toBeGreaterThan(accuracy("pulse_non_contact"));
  });
});

describe("range", () => {
  it("phased array longest range", () => {
    expect(range("phased_array_tank_gauge")).toBeGreaterThan(range("guided_wave_tdr"));
  });
});

describe("reliability", () => {
  it("phased array most reliable", () => {
    expect(reliability("phased_array_tank_gauge")).toBeGreaterThan(reliability("pulse_non_contact"));
  });
});

describe("dustTolerance", () => {
  it("guided wave best dust tolerance", () => {
    expect(dustTolerance("guided_wave_tdr")).toBeGreaterThan(dustTolerance("pulse_non_contact"));
  });
});

describe("rlCost", () => {
  it("phased array most expensive", () => {
    expect(rlCost("phased_array_tank_gauge")).toBeGreaterThan(rlCost("pulse_non_contact"));
  });
});

describe("nonContact", () => {
  it("fmcw is non contact", () => {
    expect(nonContact("fmcw_non_contact")).toBe(true);
  });
  it("guided wave is contact", () => {
    expect(nonContact("guided_wave_tdr")).toBe(false);
  });
});

describe("forSolids", () => {
  it("80ghz for solids", () => {
    expect(forSolids("frequency_modulated_80ghz")).toBe(true);
  });
  it("phased array not solids", () => {
    expect(forSolids("phased_array_tank_gauge")).toBe(false);
  });
});

describe("frequency", () => {
  it("80ghz uses narrow beam", () => {
    expect(frequency("frequency_modulated_80ghz")).toBe("80ghz_narrow_beam_focused");
  });
});

describe("bestUse", () => {
  it("phased array for custody transfer", () => {
    expect(bestUse("phased_array_tank_gauge")).toBe("custody_transfer_tank_farm");
  });
});

describe("radarLevelTypes", () => {
  it("returns 5 types", () => {
    expect(radarLevelTypes()).toHaveLength(5);
  });
});
