import { describe, it, expect } from "vitest";
import {
  liquidDistribution, gasLiquidContact, pressureDrop, catalystWetting,
  tbCost, cocurrent, forHydrotreating, flow,
  bestUse, trickleBedReactorTypes,
} from "../trickle-bed-reactor-calc.js";

describe("liquidDistribution", () => {
  it("structured packing best distribution", () => {
    expect(liquidDistribution("structured_packing_bed")).toBeGreaterThan(liquidDistribution("cocurrent_downflow_std"));
  });
});

describe("gasLiquidContact", () => {
  it("countercurrent best gas liquid contact", () => {
    expect(gasLiquidContact("countercurrent_upflow")).toBeGreaterThan(gasLiquidContact("cocurrent_downflow_std"));
  });
});

describe("pressureDrop", () => {
  it("structured packing lowest pressure drop", () => {
    expect(pressureDrop("structured_packing_bed")).toBeGreaterThan(pressureDrop("countercurrent_upflow"));
  });
});

describe("catalystWetting", () => {
  it("flooded bed best wetting", () => {
    expect(catalystWetting("flooded_bed_upflow")).toBeGreaterThan(catalystWetting("cocurrent_downflow_std"));
  });
});

describe("tbCost", () => {
  it("structured packing most expensive", () => {
    expect(tbCost("structured_packing_bed")).toBeGreaterThan(tbCost("cocurrent_downflow_std"));
  });
});

describe("cocurrent", () => {
  it("cocurrent downflow is cocurrent", () => {
    expect(cocurrent("cocurrent_downflow_std")).toBe(true);
  });
  it("countercurrent upflow not cocurrent", () => {
    expect(cocurrent("countercurrent_upflow")).toBe(false);
  });
});

describe("forHydrotreating", () => {
  it("cocurrent downflow for hydrotreating", () => {
    expect(forHydrotreating("cocurrent_downflow_std")).toBe(true);
  });
  it("flooded bed not for hydrotreating", () => {
    expect(forHydrotreating("flooded_bed_upflow")).toBe(false);
  });
});

describe("flow", () => {
  it("periodic operation uses liquid pulse", () => {
    expect(flow("periodic_operation_pulse")).toBe("periodic_liquid_pulse_enhanced_mass_transfer");
  });
});

describe("bestUse", () => {
  it("structured packing for automotive catalytic", () => {
    expect(bestUse("structured_packing_bed")).toBe("automotive_exhaust_monolith_catalytic_converter");
  });
});

describe("trickleBedReactorTypes", () => {
  it("returns 5 types", () => {
    expect(trickleBedReactorTypes()).toHaveLength(5);
  });
});
