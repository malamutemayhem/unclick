import { describe, it, expect } from "vitest";
import {
  pathogenRemovalPercent, operatingCostPerML, energyConsumption,
  maintenanceComplexity, tasteImprovement, chemicalFree,
  removesDissolvedSolids, primaryTarget, scaleSuitability, waterTreatments,
} from "../water-treatment-calc.js";

describe("pathogenRemovalPercent", () => {
  it("reverse osmosis highest removal", () => {
    expect(pathogenRemovalPercent("reverse_osmosis")).toBeGreaterThan(
      pathogenRemovalPercent("activated_carbon")
    );
  });
});

describe("operatingCostPerML", () => {
  it("reverse osmosis most expensive", () => {
    expect(operatingCostPerML("reverse_osmosis")).toBeGreaterThan(
      operatingCostPerML("chlorination")
    );
  });
});

describe("energyConsumption", () => {
  it("reverse osmosis most energy", () => {
    expect(energyConsumption("reverse_osmosis")).toBeGreaterThan(
      energyConsumption("uv_disinfection")
    );
  });
});

describe("maintenanceComplexity", () => {
  it("reverse osmosis most complex maintenance", () => {
    expect(maintenanceComplexity("reverse_osmosis")).toBeGreaterThan(
      maintenanceComplexity("chlorination")
    );
  });
});

describe("tasteImprovement", () => {
  it("activated carbon best taste", () => {
    expect(tasteImprovement("activated_carbon")).toBeGreaterThan(
      tasteImprovement("chlorination")
    );
  });
});

describe("chemicalFree", () => {
  it("uv disinfection is chemical free", () => {
    expect(chemicalFree("uv_disinfection")).toBe(true);
  });
  it("chlorination is not", () => {
    expect(chemicalFree("chlorination")).toBe(false);
  });
});

describe("removesDissolvedSolids", () => {
  it("reverse osmosis removes dissolved solids", () => {
    expect(removesDissolvedSolids("reverse_osmosis")).toBe(true);
  });
  it("uv does not", () => {
    expect(removesDissolvedSolids("uv_disinfection")).toBe(false);
  });
});

describe("primaryTarget", () => {
  it("activated carbon targets organics", () => {
    expect(primaryTarget("activated_carbon")).toBe("organic_compounds");
  });
});

describe("scaleSuitability", () => {
  it("chlorination is municipal scale", () => {
    expect(scaleSuitability("chlorination")).toBe("municipal");
  });
});

describe("waterTreatments", () => {
  it("returns 5 treatments", () => {
    expect(waterTreatments()).toHaveLength(5);
  });
});
