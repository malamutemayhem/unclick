import { describe, it, expect } from "vitest";
import {
  filtrationGrade, pressureAccuracy, flowCapacity, compactness,
  frlCost, autoCondensate, forPrecision, filterMedia,
  bestUse, frlUnitTypes,
} from "../frl-unit-calc.js";

describe("filtrationGrade", () => {
  it("coalescing filter best filtration grade", () => {
    expect(filtrationGrade("coalescing_filter")).toBeGreaterThan(filtrationGrade("micro_fog_lubricator"));
  });
});

describe("pressureAccuracy", () => {
  it("precision regulator best pressure accuracy", () => {
    expect(pressureAccuracy("precision_regulator")).toBeGreaterThan(pressureAccuracy("standard_combination"));
  });
});

describe("flowCapacity", () => {
  it("modular manifold highest flow capacity", () => {
    expect(flowCapacity("modular_manifold")).toBeGreaterThan(flowCapacity("precision_regulator"));
  });
});

describe("compactness", () => {
  it("modular manifold most compact", () => {
    expect(compactness("modular_manifold")).toBeGreaterThan(compactness("coalescing_filter"));
  });
});

describe("frlCost", () => {
  it("precision regulator most expensive", () => {
    expect(frlCost("precision_regulator")).toBeGreaterThan(frlCost("micro_fog_lubricator"));
  });
});

describe("autoCondensate", () => {
  it("standard combination has auto condensate", () => {
    expect(autoCondensate("standard_combination")).toBe(true);
  });
  it("micro fog lubricator no auto condensate", () => {
    expect(autoCondensate("micro_fog_lubricator")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("precision regulator for precision use", () => {
    expect(forPrecision("precision_regulator")).toBe(true);
  });
  it("standard combination not for precision", () => {
    expect(forPrecision("standard_combination")).toBe(false);
  });
});

describe("filterMedia", () => {
  it("coalescing filter uses borosilicate glass fiber", () => {
    expect(filterMedia("coalescing_filter")).toBe("borosilicate_glass_fiber_0_01um_coalesce_oil_aerosol_remove");
  });
});

describe("bestUse", () => {
  it("modular manifold for automated machine", () => {
    expect(bestUse("modular_manifold")).toBe("automated_machine_multi_circuit_compact_panel_mount_clean");
  });
});

describe("frlUnitTypes", () => {
  it("returns 5 types", () => {
    expect(frlUnitTypes()).toHaveLength(5);
  });
});
