import { describe, it, expect } from "vitest";
import {
  molecularDetail, samplePrep, instrumentCost, analysisTime,
  quantitativeAbility, nonDestructive, requiresSolvent, principleOfOperation,
  bestApplication, spectroscopyMethods,
} from "../spectroscopy-method-calc.js";

describe("molecularDetail", () => {
  it("nmr highest molecular detail", () => {
    expect(molecularDetail("nmr")).toBeGreaterThan(molecularDetail("uv_vis"));
  });
});

describe("samplePrep", () => {
  it("mass spec most prep needed", () => {
    expect(samplePrep("mass_spec")).toBeGreaterThan(samplePrep("raman"));
  });
});

describe("instrumentCost", () => {
  it("nmr most expensive", () => {
    expect(instrumentCost("nmr")).toBeGreaterThan(instrumentCost("uv_vis"));
  });
});

describe("analysisTime", () => {
  it("nmr longest analysis", () => {
    expect(analysisTime("nmr")).toBeGreaterThan(analysisTime("uv_vis"));
  });
});

describe("quantitativeAbility", () => {
  it("mass spec best quantitative", () => {
    expect(quantitativeAbility("mass_spec")).toBeGreaterThan(quantitativeAbility("infrared"));
  });
});

describe("nonDestructive", () => {
  it("raman is non destructive", () => {
    expect(nonDestructive("raman")).toBe(true);
  });
  it("mass spec is not", () => {
    expect(nonDestructive("mass_spec")).toBe(false);
  });
});

describe("requiresSolvent", () => {
  it("uv vis requires solvent", () => {
    expect(requiresSolvent("uv_vis")).toBe(true);
  });
  it("raman does not", () => {
    expect(requiresSolvent("raman")).toBe(false);
  });
});

describe("principleOfOperation", () => {
  it("nmr is nuclear spin magnetic resonance", () => {
    expect(principleOfOperation("nmr")).toBe("nuclear_spin_magnetic_resonance");
  });
});

describe("bestApplication", () => {
  it("infrared for functional group identification", () => {
    expect(bestApplication("infrared")).toBe("functional_group_identification");
  });
});

describe("spectroscopyMethods", () => {
  it("returns 5 methods", () => {
    expect(spectroscopyMethods()).toHaveLength(5);
  });
});
