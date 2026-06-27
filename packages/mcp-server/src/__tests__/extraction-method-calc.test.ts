import { describe, it, expect } from "vitest";
import {
  yieldRate, oilPurity, processingCost, scentFidelity,
  scalability, chemicalFree, heatApplied, bestMaterial,
  outputForm, extractionMethods,
} from "../extraction-method-calc.js";

describe("yieldRate", () => {
  it("solvent highest yield", () => {
    expect(yieldRate("solvent")).toBeGreaterThan(yieldRate("enfleurage"));
  });
});

describe("oilPurity", () => {
  it("co2 highest purity", () => {
    expect(oilPurity("co2")).toBeGreaterThan(oilPurity("solvent"));
  });
});

describe("processingCost", () => {
  it("enfleurage most expensive", () => {
    expect(processingCost("enfleurage")).toBeGreaterThan(processingCost("cold_press"));
  });
});

describe("scentFidelity", () => {
  it("enfleurage best scent fidelity", () => {
    expect(scentFidelity("enfleurage")).toBeGreaterThan(scentFidelity("solvent"));
  });
});

describe("scalability", () => {
  it("solvent most scalable", () => {
    expect(scalability("solvent")).toBeGreaterThan(scalability("enfleurage"));
  });
});

describe("chemicalFree", () => {
  it("steam distillation is chemical free", () => {
    expect(chemicalFree("steam_distillation")).toBe(true);
  });
  it("solvent is not", () => {
    expect(chemicalFree("solvent")).toBe(false);
  });
});

describe("heatApplied", () => {
  it("steam distillation applies heat", () => {
    expect(heatApplied("steam_distillation")).toBe(true);
  });
  it("cold press does not", () => {
    expect(heatApplied("cold_press")).toBe(false);
  });
});

describe("bestMaterial", () => {
  it("cold press for citrus peels", () => {
    expect(bestMaterial("cold_press")).toBe("citrus_peels");
  });
});

describe("outputForm", () => {
  it("enfleurage produces pomade absolute", () => {
    expect(outputForm("enfleurage")).toBe("pomade_absolute");
  });
});

describe("extractionMethods", () => {
  it("returns 5 methods", () => {
    expect(extractionMethods()).toHaveLength(5);
  });
});
