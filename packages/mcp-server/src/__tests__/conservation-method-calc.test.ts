import { describe, it, expect } from "vitest";
import {
  objectIntervention, costPerObject, reversibility, specialistRequired,
  longTermBenefit, touchesOriginal, requiresLab, primaryTechnique,
  bestApplication, conservationMethods,
} from "../conservation-method-calc.js";

describe("objectIntervention", () => {
  it("restoration most intervention", () => {
    expect(objectIntervention("restoration")).toBeGreaterThan(objectIntervention("preventive"));
  });
});

describe("costPerObject", () => {
  it("restoration most expensive", () => {
    expect(costPerObject("restoration")).toBeGreaterThan(costPerObject("preventive"));
  });
});

describe("reversibility", () => {
  it("preventive most reversible", () => {
    expect(reversibility("preventive")).toBeGreaterThan(reversibility("restoration"));
  });
});

describe("specialistRequired", () => {
  it("restoration needs most specialist", () => {
    expect(specialistRequired("restoration")).toBeGreaterThan(specialistRequired("preventive"));
  });
});

describe("longTermBenefit", () => {
  it("preventive best long term", () => {
    expect(longTermBenefit("preventive")).toBeGreaterThan(longTermBenefit("restoration"));
  });
});

describe("touchesOriginal", () => {
  it("stabilization touches original", () => {
    expect(touchesOriginal("stabilization")).toBe(true);
  });
  it("preventive does not", () => {
    expect(touchesOriginal("preventive")).toBe(false);
  });
});

describe("requiresLab", () => {
  it("restoration requires lab", () => {
    expect(requiresLab("restoration")).toBe(true);
  });
  it("digital preservation does not", () => {
    expect(requiresLab("digital_preservation")).toBe(false);
  });
});

describe("primaryTechnique", () => {
  it("restoration uses inpainting", () => {
    expect(primaryTechnique("restoration")).toBe("inpainting_retouching_reconstruction");
  });
});

describe("bestApplication", () => {
  it("preventive for entire collection care", () => {
    expect(bestApplication("preventive")).toBe("entire_collection_care");
  });
});

describe("conservationMethods", () => {
  it("returns 5 methods", () => {
    expect(conservationMethods()).toHaveLength(5);
  });
});
