import { describe, it, expect } from "vitest";
import {
  accuracy, response, durability, maintenance,
  paCost, solidState, forHarsh, electrode,
  bestUse, phAnalyzerTypes,
} from "../ph-analyzer-calc.js";

describe("accuracy", () => {
  it("glass electrode most accurate", () => {
    expect(accuracy("glass_electrode_standard")).toBeGreaterThan(accuracy("antimony_electrode_hf"));
  });
});

describe("response", () => {
  it("isfet fastest response", () => {
    expect(response("isfet_solid_state")).toBeGreaterThan(response("enamel_electrode_abrasive"));
  });
});

describe("durability", () => {
  it("enamel most durable", () => {
    expect(durability("enamel_electrode_abrasive")).toBeGreaterThan(durability("glass_electrode_standard"));
  });
});

describe("maintenance", () => {
  it("enamel lowest maintenance", () => {
    expect(maintenance("enamel_electrode_abrasive")).toBeGreaterThan(maintenance("glass_electrode_standard"));
  });
});

describe("paCost", () => {
  it("enamel most expensive", () => {
    expect(paCost("enamel_electrode_abrasive")).toBeGreaterThan(paCost("glass_electrode_standard"));
  });
});

describe("solidState", () => {
  it("isfet is solid state", () => {
    expect(solidState("isfet_solid_state")).toBe(true);
  });
  it("glass electrode not solid state", () => {
    expect(solidState("glass_electrode_standard")).toBe(false);
  });
});

describe("forHarsh", () => {
  it("antimony for harsh environments", () => {
    expect(forHarsh("antimony_electrode_hf")).toBe(true);
  });
  it("glass electrode not for harsh", () => {
    expect(forHarsh("glass_electrode_standard")).toBe(false);
  });
});

describe("electrode", () => {
  it("glass uses ag agcl reference", () => {
    expect(electrode("glass_electrode_standard")).toBe("glass_bulb_ag_agcl_reference_kcl_fill");
  });
});

describe("bestUse", () => {
  it("antimony for hf applications", () => {
    expect(bestUse("antimony_electrode_hf")).toBe("hydrofluoric_acid_hf_etch_semiconductor");
  });
});

describe("phAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(phAnalyzerTypes()).toHaveLength(5);
  });
});
