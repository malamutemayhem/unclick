import { describe, it, expect } from "vitest";
import {
  efficiency, costPerWatt, degradation, tempCoeff,
  cellCost, flexible, forSpace, material,
  bestUse, solarCells,
} from "../solar-cell-calc.js";

describe("efficiency", () => {
  it("multi junction iii v highest efficiency", () => {
    expect(efficiency("multi_junction_iii_v")).toBeGreaterThan(efficiency("poly_multi_crystal"));
  });
});

describe("costPerWatt", () => {
  it("perovskite hybrid best cost per watt", () => {
    expect(costPerWatt("perovskite_hybrid")).toBeGreaterThan(costPerWatt("multi_junction_iii_v"));
  });
});

describe("degradation", () => {
  it("multi junction iii v lowest degradation", () => {
    expect(degradation("multi_junction_iii_v")).toBeGreaterThan(degradation("perovskite_hybrid"));
  });
});

describe("tempCoeff", () => {
  it("multi junction iii v best temp coeff", () => {
    expect(tempCoeff("multi_junction_iii_v")).toBeGreaterThan(tempCoeff("perovskite_hybrid"));
  });
});

describe("cellCost", () => {
  it("multi junction iii v most expensive", () => {
    expect(cellCost("multi_junction_iii_v")).toBeGreaterThan(cellCost("perovskite_hybrid"));
  });
});

describe("flexible", () => {
  it("thin film cdte is flexible", () => {
    expect(flexible("thin_film_cdte")).toBe(true);
  });
  it("mono perc silicon not flexible", () => {
    expect(flexible("mono_perc_silicon")).toBe(false);
  });
});

describe("forSpace", () => {
  it("multi junction iii v is for space", () => {
    expect(forSpace("multi_junction_iii_v")).toBe(true);
  });
  it("mono perc silicon not for space", () => {
    expect(forSpace("mono_perc_silicon")).toBe(false);
  });
});

describe("material", () => {
  it("perovskite hybrid uses organic metal halide", () => {
    expect(material("perovskite_hybrid")).toBe("organic_metal_halide");
  });
});

describe("bestUse", () => {
  it("mono perc silicon best for residential rooftop", () => {
    expect(bestUse("mono_perc_silicon")).toBe("residential_rooftop");
  });
});

describe("solarCells", () => {
  it("returns 5 types", () => {
    expect(solarCells()).toHaveLength(5);
  });
});
