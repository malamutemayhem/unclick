import { describe, it, expect } from "vitest";
import {
  cooling, lubricity, life, cleanliness,
  cfCost, oilFree, forGrinding, base,
  bestUse, cuttingFluidTypes,
} from "../cutting-fluid-calc.js";

describe("cooling", () => {
  it("synthetic coolant best cooling", () => {
    expect(cooling("synthetic_coolant_clear")).toBeGreaterThan(cooling("straight_oil_neat"));
  });
});

describe("lubricity", () => {
  it("straight oil best lubricity", () => {
    expect(lubricity("straight_oil_neat")).toBeGreaterThan(lubricity("synthetic_coolant_clear"));
  });
});

describe("life", () => {
  it("MQL longest life", () => {
    expect(life("mql_minimum_quantity")).toBeGreaterThan(life("soluble_oil_emulsion"));
  });
});

describe("cleanliness", () => {
  it("synthetic coolant cleanest", () => {
    expect(cleanliness("synthetic_coolant_clear")).toBeGreaterThan(cleanliness("straight_oil_neat"));
  });
});

describe("cfCost", () => {
  it("MQL most expensive", () => {
    expect(cfCost("mql_minimum_quantity")).toBeGreaterThan(cfCost("soluble_oil_emulsion"));
  });
});

describe("oilFree", () => {
  it("synthetic coolant is oil free", () => {
    expect(oilFree("synthetic_coolant_clear")).toBe(true);
  });
  it("soluble oil not oil free", () => {
    expect(oilFree("soluble_oil_emulsion")).toBe(false);
  });
});

describe("forGrinding", () => {
  it("synthetic coolant for grinding", () => {
    expect(forGrinding("synthetic_coolant_clear")).toBe(true);
  });
  it("straight oil not for grinding", () => {
    expect(forGrinding("straight_oil_neat")).toBe(false);
  });
});

describe("base", () => {
  it("MQL uses ester fatty alcohol aerosol", () => {
    expect(base("mql_minimum_quantity")).toBe("ester_fatty_alcohol_aerosol_mist");
  });
});

describe("bestUse", () => {
  it("straight oil for deep hole broach", () => {
    expect(bestUse("straight_oil_neat")).toBe("deep_hole_broach_heavy_thread_cut");
  });
});

describe("cuttingFluidTypes", () => {
  it("returns 5 types", () => {
    expect(cuttingFluidTypes()).toHaveLength(5);
  });
});
