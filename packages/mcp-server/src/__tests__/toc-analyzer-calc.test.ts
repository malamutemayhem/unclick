import { describe, it, expect } from "vitest";
import {
  accuracy, range, particulateHandle, maintenance,
  taCost, reagentFree, forHighToc, method,
  bestUse, tocAnalyzerTypes,
} from "../toc-analyzer-calc.js";

describe("accuracy", () => {
  it("supercritical water most accurate", () => {
    expect(accuracy("supercritical_water")).toBeGreaterThan(accuracy("uv_oxidation_direct"));
  });
});

describe("range", () => {
  it("high temp combustion widest range", () => {
    expect(range("high_temp_combustion")).toBeGreaterThan(range("uv_oxidation_direct"));
  });
});

describe("particulateHandle", () => {
  it("high temp combustion best particulate handling", () => {
    expect(particulateHandle("high_temp_combustion")).toBeGreaterThan(particulateHandle("uv_oxidation_direct"));
  });
});

describe("maintenance", () => {
  it("membrane conductometric lowest maintenance", () => {
    expect(maintenance("membrane_conductometric")).toBeGreaterThan(maintenance("uv_persulfate_oxidation"));
  });
});

describe("taCost", () => {
  it("supercritical water most expensive", () => {
    expect(taCost("supercritical_water")).toBeGreaterThan(taCost("uv_oxidation_direct"));
  });
});

describe("reagentFree", () => {
  it("high temp combustion is reagent free", () => {
    expect(reagentFree("high_temp_combustion")).toBe(true);
  });
  it("uv persulfate not reagent free", () => {
    expect(reagentFree("uv_persulfate_oxidation")).toBe(false);
  });
});

describe("forHighToc", () => {
  it("high temp combustion for high toc", () => {
    expect(forHighToc("high_temp_combustion")).toBe(true);
  });
  it("uv oxidation not for high toc", () => {
    expect(forHighToc("uv_oxidation_direct")).toBe(false);
  });
});

describe("method", () => {
  it("high temp uses catalytic combustion", () => {
    expect(method("high_temp_combustion")).toBe("catalytic_combustion_680c_co2_ndir");
  });
});

describe("bestUse", () => {
  it("uv persulfate for pharma pure water", () => {
    expect(bestUse("uv_persulfate_oxidation")).toBe("pure_water_pharma_semiconductor_ppb_toc");
  });
});

describe("tocAnalyzerTypes", () => {
  it("returns 5 types", () => {
    expect(tocAnalyzerTypes()).toHaveLength(5);
  });
});
