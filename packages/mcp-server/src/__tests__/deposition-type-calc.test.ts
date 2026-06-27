import { describe, it, expect } from "vitest";
import {
  conformality, filmQuality, throughput, tempBudget,
  depCost, lowTemp, forGate, method,
  bestUse, depositionTypes,
} from "../deposition-type-calc.js";

describe("conformality", () => {
  it("ald atomic dep best conformality", () => {
    expect(conformality("ald_atomic_dep")).toBeGreaterThan(conformality("pvd_sputter"));
  });
});

describe("filmQuality", () => {
  it("ald atomic dep best film quality", () => {
    expect(filmQuality("ald_atomic_dep")).toBeGreaterThan(filmQuality("pecvd_plasma"));
  });
});

describe("throughput", () => {
  it("pvd sputter highest throughput", () => {
    expect(throughput("pvd_sputter")).toBeGreaterThan(throughput("ald_atomic_dep"));
  });
});

describe("tempBudget", () => {
  it("pvd sputter best temp budget", () => {
    expect(tempBudget("pvd_sputter")).toBeGreaterThan(tempBudget("epi_epitaxial"));
  });
});

describe("depCost", () => {
  it("ald atomic dep most expensive", () => {
    expect(depCost("ald_atomic_dep")).toBeGreaterThan(depCost("pecvd_plasma"));
  });
});

describe("lowTemp", () => {
  it("pecvd plasma is low temp", () => {
    expect(lowTemp("pecvd_plasma")).toBe(true);
  });
  it("lpcvd thermal not low temp", () => {
    expect(lowTemp("lpcvd_thermal")).toBe(false);
  });
});

describe("forGate", () => {
  it("ald atomic dep is for gate", () => {
    expect(forGate("ald_atomic_dep")).toBe(true);
  });
  it("pecvd plasma not for gate", () => {
    expect(forGate("pecvd_plasma")).toBe(false);
  });
});

describe("method", () => {
  it("ald atomic dep uses precursor pulse cycle", () => {
    expect(method("ald_atomic_dep")).toBe("precursor_pulse_cycle");
  });
});

describe("bestUse", () => {
  it("ald atomic dep best for high k gate oxide", () => {
    expect(bestUse("ald_atomic_dep")).toBe("high_k_gate_oxide");
  });
});

describe("depositionTypes", () => {
  it("returns 5 types", () => {
    expect(depositionTypes()).toHaveLength(5);
  });
});
