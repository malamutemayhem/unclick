import { describe, it, expect } from "vitest";
import {
  damageRate, detectability, predictability,
  structuralRisk, preventionCost, requiresMechanicalStress,
  localized, commonEnvironment, preventionMethod, corrosionTypes,
} from "../corrosion-type-calc.js";

describe("damageRate", () => {
  it("stress_corrosion most damaging", () => {
    expect(damageRate("stress_corrosion")).toBeGreaterThan(
      damageRate("uniform")
    );
  });
});

describe("detectability", () => {
  it("uniform most detectable", () => {
    expect(detectability("uniform")).toBeGreaterThan(
      detectability("pitting")
    );
  });
});

describe("predictability", () => {
  it("uniform most predictable", () => {
    expect(predictability("uniform")).toBeGreaterThan(
      predictability("stress_corrosion")
    );
  });
});

describe("structuralRisk", () => {
  it("stress_corrosion highest structural risk", () => {
    expect(structuralRisk("stress_corrosion")).toBeGreaterThan(
      structuralRisk("uniform")
    );
  });
});

describe("preventionCost", () => {
  it("stress_corrosion most costly to prevent", () => {
    expect(preventionCost("stress_corrosion")).toBeGreaterThan(
      preventionCost("uniform")
    );
  });
});

describe("requiresMechanicalStress", () => {
  it("stress_corrosion requires mechanical stress", () => {
    expect(requiresMechanicalStress("stress_corrosion")).toBe(true);
  });
  it("pitting does not", () => {
    expect(requiresMechanicalStress("pitting")).toBe(false);
  });
});

describe("localized", () => {
  it("pitting is localized", () => {
    expect(localized("pitting")).toBe(true);
  });
  it("uniform is not", () => {
    expect(localized("uniform")).toBe(false);
  });
});

describe("commonEnvironment", () => {
  it("galvanic at dissimilar metal joints", () => {
    expect(commonEnvironment("galvanic")).toBe("dissimilar_metal_joints");
  });
});

describe("preventionMethod", () => {
  it("galvanic prevented by insulating metals", () => {
    expect(preventionMethod("galvanic")).toBe("insulate_metals");
  });
});

describe("corrosionTypes", () => {
  it("returns 5 types", () => {
    expect(corrosionTypes()).toHaveLength(5);
  });
});
