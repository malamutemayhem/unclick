import { describe, it, expect } from "vitest";
import {
  tensile, weldability, corrosionResist, ductility,
  sgCost, paintFree, forBridge, composition,
  bestUse, steelGrades,
} from "../steel-grade-calc.js";

describe("tensile", () => {
  it("quenched tempered highest tensile", () => {
    expect(tensile("quenched_tempered_a514")).toBeGreaterThan(tensile("mild_a36_structural"));
  });
});

describe("weldability", () => {
  it("mild a36 best weldability", () => {
    expect(weldability("mild_a36_structural")).toBeGreaterThan(weldability("quenched_tempered_a514"));
  });
});

describe("corrosionResist", () => {
  it("stainless 304 best corrosion resistance", () => {
    expect(corrosionResist("stainless_304_austenitic")).toBeGreaterThan(corrosionResist("mild_a36_structural"));
  });
});

describe("ductility", () => {
  it("mild a36 most ductile", () => {
    expect(ductility("mild_a36_structural")).toBeGreaterThan(ductility("quenched_tempered_a514"));
  });
});

describe("sgCost", () => {
  it("stainless 304 most expensive", () => {
    expect(sgCost("stainless_304_austenitic")).toBeGreaterThan(sgCost("mild_a36_structural"));
  });
});

describe("paintFree", () => {
  it("stainless is paint free", () => {
    expect(paintFree("stainless_304_austenitic")).toBe(true);
  });
  it("mild a36 not paint free", () => {
    expect(paintFree("mild_a36_structural")).toBe(false);
  });
});

describe("forBridge", () => {
  it("high strength for bridge", () => {
    expect(forBridge("high_strength_a572_gr50")).toBe(true);
  });
  it("mild a36 not for bridge", () => {
    expect(forBridge("mild_a36_structural")).toBe(false);
  });
});

describe("composition", () => {
  it("weathering uses copper chromium nickel alloy", () => {
    expect(composition("weathering_a588_corten")).toBe("copper_chromium_nickel_alloy");
  });
});

describe("bestUse", () => {
  it("clt best for mass timber high rise", () => {
    expect(bestUse("stainless_304_austenitic")).toBe("food_plant_chemical_tank");
  });
});

describe("steelGrades", () => {
  it("returns 5 types", () => {
    expect(steelGrades()).toHaveLength(5);
  });
});
