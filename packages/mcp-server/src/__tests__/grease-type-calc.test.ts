import { describe, it, expect } from "vitest";
import {
  loadCapacity, tempRange, waterResist, life,
  gtCost, foodGrade, forHighTemp, thickener,
  bestUse, greaseTypeCalcTypes,
} from "../grease-type-calc.js";

describe("loadCapacity", () => {
  it("calcium sulfonate highest load", () => {
    expect(loadCapacity("calcium_sulfonate_heavy")).toBeGreaterThan(loadCapacity("biodegradable_ester"));
  });
});

describe("tempRange", () => {
  it("perfluorinated widest temp range", () => {
    expect(tempRange("perfluorinated_extreme")).toBeGreaterThan(tempRange("lithium_complex_general"));
  });
});

describe("waterResist", () => {
  it("calcium sulfonate best water resist", () => {
    expect(waterResist("calcium_sulfonate_heavy")).toBeGreaterThan(waterResist("biodegradable_ester"));
  });
});

describe("life", () => {
  it("polyurea longest life", () => {
    expect(life("polyurea_electric_motor")).toBeGreaterThan(life("biodegradable_ester"));
  });
});

describe("gtCost", () => {
  it("perfluorinated most expensive", () => {
    expect(gtCost("perfluorinated_extreme")).toBeGreaterThan(gtCost("lithium_complex_general"));
  });
});

describe("foodGrade", () => {
  it("biodegradable ester is food grade", () => {
    expect(foodGrade("biodegradable_ester")).toBe(true);
  });
  it("lithium complex not food grade", () => {
    expect(foodGrade("lithium_complex_general")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("perfluorinated for high temp", () => {
    expect(forHighTemp("perfluorinated_extreme")).toBe(true);
  });
  it("lithium complex not for high temp", () => {
    expect(forHighTemp("lithium_complex_general")).toBe(false);
  });
});

describe("thickener", () => {
  it("polyurea uses diurea synthetic base", () => {
    expect(thickener("polyurea_electric_motor")).toBe("diurea_polyurea_synthetic_base");
  });
});

describe("bestUse", () => {
  it("calcium sulfonate for mining steel mill", () => {
    expect(bestUse("calcium_sulfonate_heavy")).toBe("mining_steel_mill_marine_wet_heavy");
  });
});

describe("greaseTypeCalcTypes", () => {
  it("returns 5 types", () => {
    expect(greaseTypeCalcTypes()).toHaveLength(5);
  });
});
