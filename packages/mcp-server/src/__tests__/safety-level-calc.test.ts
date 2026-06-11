import { describe, it, expect } from "vitest";
import {
  riskReduction, diagnosticCoverage, redundancy, proofTestInterval,
  slCost, faultTolerant, forProcess, architecture,
  bestUse, safetyLevels,
} from "../safety-level-calc.js";

describe("riskReduction", () => {
  it("sil 4 highest risk reduction", () => {
    expect(riskReduction("sil_4_critical")).toBeGreaterThan(riskReduction("sil_1_basic"));
  });
});

describe("diagnosticCoverage", () => {
  it("sil 4 highest diagnostic coverage", () => {
    expect(diagnosticCoverage("sil_4_critical")).toBeGreaterThan(diagnosticCoverage("sil_2_standard"));
  });
});

describe("redundancy", () => {
  it("sil 4 most redundancy", () => {
    expect(redundancy("sil_4_critical")).toBeGreaterThan(redundancy("sil_1_basic"));
  });
});

describe("proofTestInterval", () => {
  it("sil 1 longest proof test interval", () => {
    expect(proofTestInterval("sil_1_basic")).toBeGreaterThan(proofTestInterval("sil_4_critical"));
  });
});

describe("slCost", () => {
  it("sil 4 most expensive", () => {
    expect(slCost("sil_4_critical")).toBeGreaterThan(slCost("sil_1_basic"));
  });
});

describe("faultTolerant", () => {
  it("sil 3 is fault tolerant", () => {
    expect(faultTolerant("sil_3_high")).toBe(true);
  });
  it("sil 1 not fault tolerant", () => {
    expect(faultTolerant("sil_1_basic")).toBe(false);
  });
});

describe("forProcess", () => {
  it("sil 3 for process", () => {
    expect(forProcess("sil_3_high")).toBe(true);
  });
  it("sil 4 not for process", () => {
    expect(forProcess("sil_4_critical")).toBe(false);
  });
});

describe("architecture", () => {
  it("sil 4 uses triple modular 2oo3", () => {
    expect(architecture("sil_4_critical")).toBe("triple_modular_2oo3");
  });
});

describe("bestUse", () => {
  it("sil 3 best for emergency shutdown", () => {
    expect(bestUse("sil_3_high")).toBe("emergency_shutdown_esd");
  });
});

describe("safetyLevels", () => {
  it("returns 5 types", () => {
    expect(safetyLevels()).toHaveLength(5);
  });
});
