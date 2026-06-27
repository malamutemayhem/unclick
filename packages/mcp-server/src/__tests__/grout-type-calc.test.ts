import { describe, it, expect } from "vitest";
import {
  strength, stainResist, chemical, flexibility,
  grCost, waterproof, forCommercial, binder,
  bestUse, groutTypes,
} from "../grout-type-calc.js";

describe("strength", () => {
  it("epoxy strongest", () => {
    expect(strength("epoxy_chemical_resistant")).toBeGreaterThan(strength("cement_sanded_standard"));
  });
});

describe("stainResist", () => {
  it("epoxy best stain resistance", () => {
    expect(stainResist("epoxy_chemical_resistant")).toBeGreaterThan(stainResist("cement_sanded_standard"));
  });
});

describe("chemical", () => {
  it("furan best chemical resistance", () => {
    expect(chemical("furan_resin_acid_proof")).toBeGreaterThan(chemical("cement_sanded_standard"));
  });
});

describe("flexibility", () => {
  it("urethane most flexible", () => {
    expect(flexibility("urethane_stain_proof")).toBeGreaterThan(flexibility("furan_resin_acid_proof"));
  });
});

describe("grCost", () => {
  it("furan most expensive", () => {
    expect(grCost("furan_resin_acid_proof")).toBeGreaterThan(grCost("cement_sanded_standard"));
  });
});

describe("waterproof", () => {
  it("epoxy is waterproof", () => {
    expect(waterproof("epoxy_chemical_resistant")).toBe(true);
  });
  it("cement sanded not waterproof", () => {
    expect(waterproof("cement_sanded_standard")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("epoxy for commercial", () => {
    expect(forCommercial("epoxy_chemical_resistant")).toBe(true);
  });
  it("cement unsanded not commercial", () => {
    expect(forCommercial("cement_unsanded_thin")).toBe(false);
  });
});

describe("binder", () => {
  it("furan uses furan resin", () => {
    expect(binder("furan_resin_acid_proof")).toBe("furan_resin_carbon_filler");
  });
});

describe("bestUse", () => {
  it("urethane for premium residential", () => {
    expect(bestUse("urethane_stain_proof")).toBe("residential_premium_stain_free");
  });
});

describe("groutTypes", () => {
  it("returns 5 types", () => {
    expect(groutTypes()).toHaveLength(5);
  });
});
