import { describe, it, expect } from "vitest";
import {
  flowRate, pressure, efficiency, maintenance,
  cmCost, oilFree, forHvac, mechanism,
  bestUse, compressorTypes,
} from "../compressor-type-calc.js";

describe("flowRate", () => {
  it("centrifugal highest flow rate", () => {
    expect(flowRate("centrifugal_radial")).toBeGreaterThan(flowRate("diaphragm_hermetic"));
  });
});

describe("pressure", () => {
  it("reciprocating highest pressure", () => {
    expect(pressure("reciprocating_piston")).toBeGreaterThan(pressure("scroll_orbital_wrap"));
  });
});

describe("efficiency", () => {
  it("centrifugal most efficient", () => {
    expect(efficiency("centrifugal_radial")).toBeGreaterThan(efficiency("reciprocating_piston"));
  });
});

describe("maintenance", () => {
  it("scroll lowest maintenance", () => {
    expect(maintenance("scroll_orbital_wrap")).toBeGreaterThan(maintenance("reciprocating_piston"));
  });
});

describe("cmCost", () => {
  it("centrifugal most expensive", () => {
    expect(cmCost("centrifugal_radial")).toBeGreaterThan(cmCost("reciprocating_piston"));
  });
});

describe("oilFree", () => {
  it("centrifugal is oil free", () => {
    expect(oilFree("centrifugal_radial")).toBe(true);
  });
  it("reciprocating not oil free", () => {
    expect(oilFree("reciprocating_piston")).toBe(false);
  });
});

describe("forHvac", () => {
  it("scroll for hvac", () => {
    expect(forHvac("scroll_orbital_wrap")).toBe(true);
  });
  it("reciprocating not for hvac", () => {
    expect(forHvac("reciprocating_piston")).toBe(false);
  });
});

describe("mechanism", () => {
  it("diaphragm uses flexing metal diaphragm", () => {
    expect(mechanism("diaphragm_hermetic")).toBe("flexing_metal_diaphragm");
  });
});

describe("bestUse", () => {
  it("rotary screw best for factory compressed air", () => {
    expect(bestUse("rotary_screw_helical")).toBe("factory_compressed_air_24_7");
  });
});

describe("compressorTypes", () => {
  it("returns 5 types", () => {
    expect(compressorTypes()).toHaveLength(5);
  });
});
