import { describe, it, expect } from "vitest";
import {
  thermal, safety, acoustic, solar,
  glCost, safetyGlass, forExterior, interlayer,
  bestUse, glazingTypeTypes,
} from "../glazing-type-calc.js";

describe("thermal", () => {
  it("triple pane best thermal", () => {
    expect(thermal("triple_pane_argon")).toBeGreaterThan(thermal("single_pane_annealed"));
  });
});

describe("safety", () => {
  it("laminated safest", () => {
    expect(safety("laminated_safety_pvb")).toBeGreaterThan(safety("single_pane_annealed"));
  });
});

describe("acoustic", () => {
  it("triple pane best acoustic", () => {
    expect(acoustic("triple_pane_argon")).toBeGreaterThan(acoustic("single_pane_annealed"));
  });
});

describe("solar", () => {
  it("low e best solar control", () => {
    expect(solar("low_e_coated_solar")).toBeGreaterThan(solar("single_pane_annealed"));
  });
});

describe("glCost", () => {
  it("triple pane most expensive", () => {
    expect(glCost("triple_pane_argon")).toBeGreaterThan(glCost("single_pane_annealed"));
  });
});

describe("safetyGlass", () => {
  it("laminated is safety glass", () => {
    expect(safetyGlass("laminated_safety_pvb")).toBe(true);
  });
  it("single pane not safety glass", () => {
    expect(safetyGlass("single_pane_annealed")).toBe(false);
  });
});

describe("forExterior", () => {
  it("double pane for exterior", () => {
    expect(forExterior("double_pane_insulated")).toBe(true);
  });
  it("single pane not for exterior", () => {
    expect(forExterior("single_pane_annealed")).toBe(false);
  });
});

describe("interlayer", () => {
  it("triple pane uses argon", () => {
    expect(interlayer("triple_pane_argon")).toBe("argon_krypton_dual_spacer");
  });
});

describe("bestUse", () => {
  it("laminated for hurricane zone", () => {
    expect(bestUse("laminated_safety_pvb")).toBe("hurricane_zone_overhead_safety");
  });
});

describe("glazingTypeTypes", () => {
  it("returns 5 types", () => {
    expect(glazingTypeTypes()).toHaveLength(5);
  });
});
