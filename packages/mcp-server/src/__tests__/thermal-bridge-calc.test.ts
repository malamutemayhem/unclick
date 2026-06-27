import { describe, it, expect } from "vitest";
import {
  heatLossImpact, condensationRisk, mitigationDifficulty, prevalence,
  remediationCost, structuralElement, detectableByThermography, mitigationStrategy,
  psiValue, thermalBridges,
} from "../thermal-bridge-calc.js";

describe("heatLossImpact", () => {
  it("balcony highest heat loss", () => {
    expect(heatLossImpact("balcony")).toBeGreaterThan(heatLossImpact("fastener"));
  });
});

describe("condensationRisk", () => {
  it("balcony highest condensation risk", () => {
    expect(condensationRisk("balcony")).toBeGreaterThan(condensationRisk("fastener"));
  });
});

describe("mitigationDifficulty", () => {
  it("balcony hardest to mitigate", () => {
    expect(mitigationDifficulty("balcony")).toBeGreaterThan(mitigationDifficulty("fastener"));
  });
});

describe("prevalence", () => {
  it("window frame most prevalent", () => {
    expect(prevalence("window_frame")).toBeGreaterThan(prevalence("balcony"));
  });
});

describe("remediationCost", () => {
  it("balcony most expensive remediation", () => {
    expect(remediationCost("balcony")).toBeGreaterThan(remediationCost("fastener"));
  });
});

describe("structuralElement", () => {
  it("concrete slab is structural", () => {
    expect(structuralElement("concrete_slab")).toBe(true);
  });
  it("window frame is not", () => {
    expect(structuralElement("window_frame")).toBe(false);
  });
});

describe("detectableByThermography", () => {
  it("steel stud detectable", () => {
    expect(detectableByThermography("steel_stud")).toBe(true);
  });
  it("fastener is not", () => {
    expect(detectableByThermography("fastener")).toBe(false);
  });
});

describe("mitigationStrategy", () => {
  it("balcony uses structural thermal break", () => {
    expect(mitigationStrategy("balcony")).toBe("structural_thermal_break");
  });
});

describe("psiValue", () => {
  it("balcony is very high linear", () => {
    expect(psiValue("balcony")).toBe("very_high_linear");
  });
});

describe("thermalBridges", () => {
  it("returns 5 bridges", () => {
    expect(thermalBridges()).toHaveLength(5);
  });
});
