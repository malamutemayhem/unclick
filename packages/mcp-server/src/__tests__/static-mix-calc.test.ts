import { describe, it, expect } from "vitest";
import {
  mixQuality, pressureDrop, versatility, selfClean,
  smCost, lowViscosity, forLaminar, geometry,
  bestUse, staticMixTypes,
} from "../static-mix-calc.js";

describe("mixQuality", () => {
  it("printed circuit micro best mix quality", () => {
    expect(mixQuality("printed_circuit_micro")).toBeGreaterThan(mixQuality("vortex_tab_insert"));
  });
});

describe("pressureDrop", () => {
  it("vortex tab highest pressure drop", () => {
    expect(pressureDrop("vortex_tab_insert")).toBeGreaterThan(pressureDrop("printed_circuit_micro"));
  });
});

describe("versatility", () => {
  it("helical element most versatile", () => {
    expect(versatility("helical_element_kenics")).toBeGreaterThan(versatility("printed_circuit_micro"));
  });
});

describe("selfClean", () => {
  it("vortex tab best self cleaning", () => {
    expect(selfClean("vortex_tab_insert")).toBeGreaterThan(selfClean("printed_circuit_micro"));
  });
});

describe("smCost", () => {
  it("printed circuit micro most expensive", () => {
    expect(smCost("printed_circuit_micro")).toBeGreaterThan(smCost("vortex_tab_insert"));
  });
});

describe("lowViscosity", () => {
  it("corrugated plate for low viscosity", () => {
    expect(lowViscosity("corrugated_plate_smv")).toBe(true);
  });
  it("helical element not low viscosity", () => {
    expect(lowViscosity("helical_element_kenics")).toBe(false);
  });
});

describe("forLaminar", () => {
  it("helical element for laminar", () => {
    expect(forLaminar("helical_element_kenics")).toBe(true);
  });
  it("corrugated plate not for laminar", () => {
    expect(forLaminar("corrugated_plate_smv")).toBe(false);
  });
});

describe("geometry", () => {
  it("printed circuit uses etched channel micro", () => {
    expect(geometry("printed_circuit_micro")).toBe("etched_channel_micro_split_merge");
  });
});

describe("bestUse", () => {
  it("helical element for polymer resin laminar", () => {
    expect(bestUse("helical_element_kenics")).toBe("polymer_resin_laminar_viscous_blend");
  });
});

describe("staticMixTypes", () => {
  it("returns 5 types", () => {
    expect(staticMixTypes()).toHaveLength(5);
  });
});
