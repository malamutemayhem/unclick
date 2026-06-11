import { describe, it, expect } from "vitest";
import {
  accuracy, lowPressRange, overloadProtect, corrosionResist,
  dpCost_, flushMount, forCorrosive, diaphragm,
  bestUse, diaphragmPressTypes,
} from "../diaphragm-press-calc.js";

describe("accuracy", () => {
  it("capsule most accurate", () => {
    expect(accuracy("capsule_low_pressure")).toBeGreaterThan(accuracy("chemical_seal_isolate"));
  });
});

describe("lowPressRange", () => {
  it("capsule best low pressure range", () => {
    expect(lowPressRange("capsule_low_pressure")).toBeGreaterThan(lowPressRange("chemical_seal_isolate"));
  });
});

describe("overloadProtect", () => {
  it("chemical seal best overload protection", () => {
    expect(overloadProtect("chemical_seal_isolate")).toBeGreaterThan(overloadProtect("capsule_low_pressure"));
  });
});

describe("corrosionResist", () => {
  it("chemical seal best corrosion resistance", () => {
    expect(corrosionResist("chemical_seal_isolate")).toBeGreaterThan(corrosionResist("corrugated_diaphragm_range"));
  });
});

describe("dpCost_", () => {
  it("sealed system most expensive", () => {
    expect(dpCost_("sealed_system_remote")).toBeGreaterThan(dpCost_("corrugated_diaphragm_range"));
  });
});

describe("flushMount", () => {
  it("flat diaphragm is flush mount", () => {
    expect(flushMount("flat_diaphragm_flush")).toBe(true);
  });
  it("corrugated not flush mount", () => {
    expect(flushMount("corrugated_diaphragm_range")).toBe(false);
  });
});

describe("forCorrosive", () => {
  it("chemical seal for corrosive", () => {
    expect(forCorrosive("chemical_seal_isolate")).toBe(true);
  });
  it("corrugated not for corrosive", () => {
    expect(forCorrosive("corrugated_diaphragm_range")).toBe(false);
  });
});

describe("diaphragm", () => {
  it("sealed system uses remote capillary fill", () => {
    expect(diaphragm("sealed_system_remote")).toBe("remote_seal_capillary_fill_fluid_link");
  });
});

describe("bestUse", () => {
  it("capsule for very low pressure", () => {
    expect(bestUse("capsule_low_pressure")).toBe("very_low_pressure_inches_water_column");
  });
});

describe("diaphragmPressTypes", () => {
  it("returns 5 types", () => {
    expect(diaphragmPressTypes()).toHaveLength(5);
  });
});
