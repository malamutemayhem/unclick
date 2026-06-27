import { describe, it, expect } from "vitest";
import {
  loopArea, highFreq, safety, simplicity,
  gndCost, galvanic, forMixedSignal, technique,
  bestUse, groundingMethods,
} from "../grounding-method-calc.js";

describe("loopArea", () => {
  it("single point star smallest loop area", () => {
    expect(loopArea("single_point_star")).toBeGreaterThan(loopArea("multi_point_mesh"));
  });
});

describe("highFreq", () => {
  it("multi point mesh best high frequency", () => {
    expect(highFreq("multi_point_mesh")).toBeGreaterThan(highFreq("single_point_star"));
  });
});

describe("safety", () => {
  it("chassis bond strap safest", () => {
    expect(safety("chassis_bond_strap")).toBeGreaterThan(safety("isolated_float"));
  });
});

describe("simplicity", () => {
  it("chassis bond strap simplest", () => {
    expect(simplicity("chassis_bond_strap")).toBeGreaterThan(simplicity("hybrid_frequency"));
  });
});

describe("gndCost", () => {
  it("isolated float most expensive", () => {
    expect(gndCost("isolated_float")).toBeGreaterThan(gndCost("single_point_star"));
  });
});

describe("galvanic", () => {
  it("multi point mesh is galvanic", () => {
    expect(galvanic("multi_point_mesh")).toBe(true);
  });
  it("isolated float not galvanic", () => {
    expect(galvanic("isolated_float")).toBe(false);
  });
});

describe("forMixedSignal", () => {
  it("hybrid frequency for mixed signal", () => {
    expect(forMixedSignal("hybrid_frequency")).toBe(true);
  });
  it("multi point mesh not for mixed signal", () => {
    expect(forMixedSignal("multi_point_mesh")).toBe(false);
  });
});

describe("technique", () => {
  it("isolated float uses transformer optocoupler isolate", () => {
    expect(technique("isolated_float")).toBe("transformer_optocoupler_isolate");
  });
});

describe("bestUse", () => {
  it("chassis bond strap best for equipment safety earth", () => {
    expect(bestUse("chassis_bond_strap")).toBe("equipment_safety_earth");
  });
});

describe("groundingMethods", () => {
  it("returns 5 types", () => {
    expect(groundingMethods()).toHaveLength(5);
  });
});
