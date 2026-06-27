import { describe, it, expect } from "vitest";
import {
  conformality, purity, rate, temperature,
  dpCost, lowTemp, forGate, precursor,
  bestUse, depositions,
} from "../deposition-calc.js";

describe("conformality", () => {
  it("ald best conformality", () => {
    expect(conformality("ald_atomic_layer")).toBeGreaterThan(conformality("ebeam_evaporate"));
  });
});

describe("purity", () => {
  it("ald highest purity", () => {
    expect(purity("ald_atomic_layer")).toBeGreaterThan(purity("pecvd_plasma_enhanced"));
  });
});

describe("rate", () => {
  it("pecvd fastest rate", () => {
    expect(rate("pecvd_plasma_enhanced")).toBeGreaterThan(rate("ald_atomic_layer"));
  });
});

describe("temperature", () => {
  it("ebeam lowest temperature", () => {
    expect(temperature("ebeam_evaporate")).toBeGreaterThan(temperature("lpcvd_low_pressure"));
  });
});

describe("dpCost", () => {
  it("ald most expensive", () => {
    expect(dpCost("ald_atomic_layer")).toBeGreaterThan(dpCost("pecvd_plasma_enhanced"));
  });
});

describe("lowTemp", () => {
  it("pecvd is low temp", () => {
    expect(lowTemp("pecvd_plasma_enhanced")).toBe(true);
  });
  it("lpcvd not low temp", () => {
    expect(lowTemp("lpcvd_low_pressure")).toBe(false);
  });
});

describe("forGate", () => {
  it("ald for gate", () => {
    expect(forGate("ald_atomic_layer")).toBe(true);
  });
  it("pecvd not for gate", () => {
    expect(forGate("pecvd_plasma_enhanced")).toBe(false);
  });
});

describe("precursor", () => {
  it("ald uses tma h2o self limiting", () => {
    expect(precursor("ald_atomic_layer")).toBe("tma_h2o_self_limiting");
  });
});

describe("bestUse", () => {
  it("pvd sputter best for metal barrier seed", () => {
    expect(bestUse("pvd_sputter_dc")).toBe("metal_barrier_seed_layer");
  });
});

describe("depositions", () => {
  it("returns 5 types", () => {
    expect(depositions()).toHaveLength(5);
  });
});
