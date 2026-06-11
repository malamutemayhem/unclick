import { describe, it, expect } from "vitest";
import {
  conformality, purity, temperature, rate,
  cvCost, lowTemp, forSemiconductor, precursor,
  bestUse, cvdCoatingTypes,
} from "../cvd-coating-calc.js";

describe("conformality", () => {
  it("ALD most conformal", () => {
    expect(conformality("atomic_layer_ald")).toBeGreaterThan(conformality("thermal_cvd_atmospheric"));
  });
});

describe("purity", () => {
  it("ALD highest purity", () => {
    expect(purity("atomic_layer_ald")).toBeGreaterThan(purity("thermal_cvd_atmospheric"));
  });
});

describe("temperature", () => {
  it("ALD best low temperature capability", () => {
    expect(temperature("atomic_layer_ald")).toBeGreaterThan(temperature("thermal_cvd_atmospheric"));
  });
});

describe("rate", () => {
  it("thermal CVD fastest rate", () => {
    expect(rate("thermal_cvd_atmospheric")).toBeGreaterThan(rate("atomic_layer_ald"));
  });
});

describe("cvCost", () => {
  it("ALD most expensive", () => {
    expect(cvCost("atomic_layer_ald")).toBeGreaterThan(cvCost("thermal_cvd_atmospheric"));
  });
});

describe("lowTemp", () => {
  it("PECVD is low temp", () => {
    expect(lowTemp("plasma_enhanced_pecvd")).toBe(true);
  });
  it("thermal CVD not low temp", () => {
    expect(lowTemp("thermal_cvd_atmospheric")).toBe(false);
  });
});

describe("forSemiconductor", () => {
  it("LPCVD for semiconductor", () => {
    expect(forSemiconductor("low_pressure_lpcvd")).toBe(true);
  });
  it("thermal CVD not for semiconductor", () => {
    expect(forSemiconductor("thermal_cvd_atmospheric")).toBe(false);
  });
});

describe("precursor", () => {
  it("MOCVD uses trimethyl gallium", () => {
    expect(precursor("metal_organic_mocvd")).toBe("trimethyl_gallium_arsine_vapor");
  });
});

describe("bestUse", () => {
  it("ALD for high-k gate oxide", () => {
    expect(bestUse("atomic_layer_ald")).toBe("high_k_gate_oxide_nano_barrier");
  });
});

describe("cvdCoatingTypes", () => {
  it("returns 5 types", () => {
    expect(cvdCoatingTypes()).toHaveLength(5);
  });
});
