import { describe, it, expect } from "vitest";
import {
  conversion, selectivity, energySaving, complexity,
  rdCost, catalytic, forEquilib, internals,
  bestUse, reactiveDistillTypes,
} from "../reactive-distill-calc.js";

describe("conversion", () => {
  it("hybrid react extract highest conversion", () => {
    expect(conversion("hybrid_react_extract")).toBeGreaterThan(conversion("reactive_absorb_column"));
  });
});

describe("selectivity", () => {
  it("hybrid react extract best selectivity", () => {
    expect(selectivity("hybrid_react_extract")).toBeGreaterThan(selectivity("reactive_absorb_column"));
  });
});

describe("energySaving", () => {
  it("catalytic distill fixed best energy saving", () => {
    expect(energySaving("catalytic_distill_fixed")).toBeGreaterThan(energySaving("reactive_absorb_column"));
  });
});

describe("complexity", () => {
  it("hybrid react extract most complex", () => {
    expect(complexity("hybrid_react_extract")).toBeGreaterThan(complexity("reactive_absorb_column"));
  });
});

describe("rdCost", () => {
  it("hybrid react extract most expensive", () => {
    expect(rdCost("hybrid_react_extract")).toBeGreaterThan(rdCost("reactive_absorb_column"));
  });
});

describe("catalytic", () => {
  it("catalytic distill fixed is catalytic", () => {
    expect(catalytic("catalytic_distill_fixed")).toBe(true);
  });
  it("reactive absorb column not catalytic", () => {
    expect(catalytic("reactive_absorb_column")).toBe(false);
  });
});

describe("forEquilib", () => {
  it("catalytic distill structured for equilibrium", () => {
    expect(forEquilib("catalytic_distill_structured")).toBe(true);
  });
  it("reactive absorb column not for equilibrium", () => {
    expect(forEquilib("reactive_absorb_column")).toBe(false);
  });
});

describe("internals", () => {
  it("catalytic distill slurry uses suspended catalyst", () => {
    expect(internals("catalytic_distill_slurry")).toBe("suspended_catalyst_liquid_phase_react");
  });
});

describe("bestUse", () => {
  it("hybrid react extract for azeotrope break", () => {
    expect(bestUse("hybrid_react_extract")).toBe("azeotrope_break_react_extract_combine");
  });
});

describe("reactiveDistillTypes", () => {
  it("returns 5 types", () => {
    expect(reactiveDistillTypes()).toHaveLength(5);
  });
});
