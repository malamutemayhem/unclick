import { describe, it, expect } from "vitest";
import {
  anisotropy, selectivity, uniformity, damage,
  etchCost, isotropic, forMems, mechanism,
  bestUse, etchMethods,
} from "../etch-method-calc.js";

describe("anisotropy", () => {
  it("drie bosch highest anisotropy", () => {
    expect(anisotropy("drie_bosch")).toBeGreaterThan(anisotropy("wet_chemical"));
  });
});

describe("selectivity", () => {
  it("ald atomic layer best selectivity", () => {
    expect(selectivity("ald_atomic_layer")).toBeGreaterThan(selectivity("rie_reactive_ion"));
  });
});

describe("uniformity", () => {
  it("ald atomic layer best uniformity", () => {
    expect(uniformity("ald_atomic_layer")).toBeGreaterThan(uniformity("wet_chemical"));
  });
});

describe("damage", () => {
  it("wet chemical least damage", () => {
    expect(damage("wet_chemical")).toBeGreaterThan(damage("icp_high_density"));
  });
});

describe("etchCost", () => {
  it("ald atomic layer most expensive", () => {
    expect(etchCost("ald_atomic_layer")).toBeGreaterThan(etchCost("wet_chemical"));
  });
});

describe("isotropic", () => {
  it("wet chemical is isotropic", () => {
    expect(isotropic("wet_chemical")).toBe(true);
  });
  it("rie reactive ion not isotropic", () => {
    expect(isotropic("rie_reactive_ion")).toBe(false);
  });
});

describe("forMems", () => {
  it("drie bosch is for mems", () => {
    expect(forMems("drie_bosch")).toBe(true);
  });
  it("rie reactive ion not for mems", () => {
    expect(forMems("rie_reactive_ion")).toBe(false);
  });
});

describe("mechanism", () => {
  it("drie bosch uses passivate etch cycle", () => {
    expect(mechanism("drie_bosch")).toBe("passivate_etch_cycle");
  });
});

describe("bestUse", () => {
  it("ald atomic layer best for gaa inner spacer", () => {
    expect(bestUse("ald_atomic_layer")).toBe("gaa_inner_spacer");
  });
});

describe("etchMethods", () => {
  it("returns 5 types", () => {
    expect(etchMethods()).toHaveLength(5);
  });
});
