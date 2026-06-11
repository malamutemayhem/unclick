import { describe, it, expect } from "vitest";
import {
  cfmOutput, maxPressure, energyEfficiency, noiseLevel,
  acCost, oilFree, forContinuous, compression,
  bestUse, airCompressorTypes,
} from "../air-compressor-calc.js";

describe("cfmOutput", () => {
  it("centrifugal turbo highest cfm output", () => {
    expect(cfmOutput("centrifugal_turbo")).toBeGreaterThan(cfmOutput("scroll_oil_free"));
  });
});

describe("maxPressure", () => {
  it("reciprocating piston highest max pressure", () => {
    expect(maxPressure("reciprocating_piston")).toBeGreaterThan(maxPressure("scroll_oil_free"));
  });
});

describe("energyEfficiency", () => {
  it("centrifugal turbo best energy efficiency", () => {
    expect(energyEfficiency("centrifugal_turbo")).toBeGreaterThan(energyEfficiency("reciprocating_piston"));
  });
});

describe("noiseLevel", () => {
  it("scroll oil free quietest", () => {
    expect(noiseLevel("scroll_oil_free")).toBeGreaterThan(noiseLevel("reciprocating_piston"));
  });
});

describe("acCost", () => {
  it("centrifugal turbo most expensive", () => {
    expect(acCost("centrifugal_turbo")).toBeGreaterThan(acCost("reciprocating_piston"));
  });
});

describe("oilFree", () => {
  it("scroll oil free is oil free", () => {
    expect(oilFree("scroll_oil_free")).toBe(true);
  });
  it("rotary screw not oil free", () => {
    expect(oilFree("rotary_screw")).toBe(false);
  });
});

describe("forContinuous", () => {
  it("rotary screw for continuous duty", () => {
    expect(forContinuous("rotary_screw")).toBe(true);
  });
  it("reciprocating piston not for continuous", () => {
    expect(forContinuous("reciprocating_piston")).toBe(false);
  });
});

describe("compression", () => {
  it("scroll oil free uses orbiting spiral", () => {
    expect(compression("scroll_oil_free")).toBe("orbiting_scroll_spiral_trap_compress_oil_free_quiet_clean");
  });
});

describe("bestUse", () => {
  it("centrifugal turbo for large manufacturing plant", () => {
    expect(bestUse("centrifugal_turbo")).toBe("large_manufacturing_plant_wastewater_aeration_high_volume");
  });
});

describe("airCompressorTypes", () => {
  it("returns 5 types", () => {
    expect(airCompressorTypes()).toHaveLength(5);
  });
});
