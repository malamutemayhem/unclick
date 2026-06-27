import { describe, it, expect } from "vitest";
import {
  extraction, throughput, reagentEfficiency, capitalCost,
  lrCost, pressurized, forRefractory, vessel,
  bestUse, leachReactorTypes,
} from "../leach-reactor-calc.js";

describe("extraction", () => {
  it("autoclave pressure highest extraction", () => {
    expect(extraction("autoclave_pressure")).toBeGreaterThan(extraction("heap_leach"));
  });
});

describe("throughput", () => {
  it("heap leach highest throughput", () => {
    expect(throughput("heap_leach")).toBeGreaterThan(throughput("column_leach"));
  });
});

describe("reagentEfficiency", () => {
  it("autoclave pressure best reagent efficiency", () => {
    expect(reagentEfficiency("autoclave_pressure")).toBeGreaterThan(reagentEfficiency("heap_leach"));
  });
});

describe("capitalCost", () => {
  it("autoclave pressure highest capital cost", () => {
    expect(capitalCost("autoclave_pressure")).toBeGreaterThan(capitalCost("column_leach"));
  });
});

describe("lrCost", () => {
  it("autoclave pressure most expensive operating", () => {
    expect(lrCost("autoclave_pressure")).toBeGreaterThan(lrCost("heap_leach"));
  });
});

describe("pressurized", () => {
  it("autoclave pressure is pressurized", () => {
    expect(pressurized("autoclave_pressure")).toBe(true);
  });
  it("heap leach not pressurized", () => {
    expect(pressurized("heap_leach")).toBe(false);
  });
});

describe("forRefractory", () => {
  it("autoclave pressure for refractory ore", () => {
    expect(forRefractory("autoclave_pressure")).toBe(true);
  });
  it("agitated tank not for refractory ore", () => {
    expect(forRefractory("agitated_tank")).toBe(false);
  });
});

describe("vessel", () => {
  it("heap leach uses lined pad", () => {
    expect(vessel("heap_leach")).toBe("lined_pad_drip_emitter_heap_pile_percolation_leach_cycle");
  });
});

describe("bestUse", () => {
  it("autoclave pressure for refractory gold", () => {
    expect(bestUse("autoclave_pressure")).toBe("refractory_gold_nickel_laterite_pox_high_pressure_acid");
  });
});

describe("leachReactorTypes", () => {
  it("returns 5 types", () => {
    expect(leachReactorTypes()).toHaveLength(5);
  });
});
