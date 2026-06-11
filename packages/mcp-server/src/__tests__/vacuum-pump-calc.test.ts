import { describe, it, expect } from "vitest";
import {
  ultimateVacuum, pumpingSpeed, oilFree, reliability,
  vpCost, dryOperation, forCleanroom, principle,
  bestUse, vacuumPumpTypes,
} from "../vacuum-pump-calc.js";

describe("ultimateVacuum", () => {
  it("turbo molecular best ultimate vacuum", () => {
    expect(ultimateVacuum("turbo_molecular_uhv")).toBeGreaterThan(ultimateVacuum("liquid_ring_seal"));
  });
});

describe("pumpingSpeed", () => {
  it("roots booster highest pumping speed", () => {
    expect(pumpingSpeed("roots_booster_lobe")).toBeGreaterThan(pumpingSpeed("dry_scroll_clean"));
  });
});

describe("oilFree", () => {
  it("turbo molecular best oil free", () => {
    expect(oilFree("turbo_molecular_uhv")).toBeGreaterThan(oilFree("rotary_vane_oil"));
  });
});

describe("reliability", () => {
  it("rotary vane most reliable", () => {
    expect(reliability("rotary_vane_oil")).toBeGreaterThanOrEqual(reliability("liquid_ring_seal"));
  });
});

describe("vpCost", () => {
  it("turbo molecular most expensive", () => {
    expect(vpCost("turbo_molecular_uhv")).toBeGreaterThan(vpCost("rotary_vane_oil"));
  });
});

describe("dryOperation", () => {
  it("dry scroll is dry operation", () => {
    expect(dryOperation("dry_scroll_clean")).toBe(true);
  });
  it("rotary vane not dry operation", () => {
    expect(dryOperation("rotary_vane_oil")).toBe(false);
  });
});

describe("forCleanroom", () => {
  it("turbo molecular for cleanroom", () => {
    expect(forCleanroom("turbo_molecular_uhv")).toBe(true);
  });
  it("roots booster not for cleanroom", () => {
    expect(forCleanroom("roots_booster_lobe")).toBe(false);
  });
});

describe("principle", () => {
  it("liquid ring uses isothermal compression", () => {
    expect(principle("liquid_ring_seal")).toBe("liquid_ring_sealant_isothermal_compression");
  });
});

describe("bestUse", () => {
  it("rotary vane for general industrial", () => {
    expect(bestUse("rotary_vane_oil")).toBe("general_industrial_vacuum_packaging_degassing");
  });
});

describe("vacuumPumpTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumPumpTypes()).toHaveLength(5);
  });
});
