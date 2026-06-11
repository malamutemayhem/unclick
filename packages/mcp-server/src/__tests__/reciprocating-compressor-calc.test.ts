import { describe, it, expect } from "vitest";
import {
  pressureRatio, efficiency, flowRange, maintenance,
  rcCost, oilFree, forHighPressure, piston,
  bestUse, reciprocatingCompressorTypes,
} from "../reciprocating-compressor-calc.js";

describe("pressureRatio", () => {
  it("hyper compressor highest pressure ratio", () => {
    expect(pressureRatio("hyper_compressor_ldpe")).toBeGreaterThan(pressureRatio("single_acting_trunk"));
  });
});

describe("efficiency", () => {
  it("double acting most efficient", () => {
    expect(efficiency("double_acting_crosshead")).toBeGreaterThan(efficiency("hyper_compressor_ldpe"));
  });
});

describe("flowRange", () => {
  it("double acting widest flow range", () => {
    expect(flowRange("double_acting_crosshead")).toBeGreaterThan(flowRange("diaphragm_hermetic"));
  });
});

describe("maintenance", () => {
  it("diaphragm lowest maintenance", () => {
    expect(maintenance("diaphragm_hermetic")).toBeGreaterThan(maintenance("hyper_compressor_ldpe"));
  });
});

describe("rcCost", () => {
  it("hyper compressor most expensive", () => {
    expect(rcCost("hyper_compressor_ldpe")).toBeGreaterThan(rcCost("single_acting_trunk"));
  });
});

describe("oilFree", () => {
  it("labyrinth piston is oil free", () => {
    expect(oilFree("labyrinth_piston_seal")).toBe(true);
  });
  it("single acting trunk not oil free", () => {
    expect(oilFree("single_acting_trunk")).toBe(false);
  });
});

describe("forHighPressure", () => {
  it("hyper compressor for high pressure", () => {
    expect(forHighPressure("hyper_compressor_ldpe")).toBe(true);
  });
  it("single acting not for high pressure", () => {
    expect(forHighPressure("single_acting_trunk")).toBe(false);
  });
});

describe("piston", () => {
  it("diaphragm uses metal diaphragm", () => {
    expect(piston("diaphragm_hermetic")).toBe("metal_diaphragm_hydraulic_drive_zero_leak");
  });
});

describe("bestUse", () => {
  it("hyper compressor for ldpe production", () => {
    expect(bestUse("hyper_compressor_ldpe")).toBe("ldpe_polyethylene_production_3500_bar_ethylene");
  });
});

describe("reciprocatingCompressorTypes", () => {
  it("returns 5 types", () => {
    expect(reciprocatingCompressorTypes()).toHaveLength(5);
  });
});
