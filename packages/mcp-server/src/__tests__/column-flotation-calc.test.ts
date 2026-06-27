import { describe, it, expect } from "vitest";
import {
  grade, recovery, selectivity, waterUse,
  cfCost, continuous, forFine, sparger,
  bestUse, columnFlotationTypes,
} from "../column-flotation-calc.js";

describe("grade", () => {
  it("packed column highest grade", () => {
    expect(grade("packed_column_structured")).toBeGreaterThan(grade("cavitation_tube_micro"));
  });
});

describe("recovery", () => {
  it("cavitation tube highest recovery", () => {
    expect(recovery("cavitation_tube_micro")).toBeGreaterThan(recovery("reflux_flotation_inclined"));
  });
});

describe("selectivity", () => {
  it("packed column best selectivity", () => {
    expect(selectivity("packed_column_structured")).toBeGreaterThan(selectivity("cavitation_tube_micro"));
  });
});

describe("waterUse", () => {
  it("cavitation tube highest water use", () => {
    expect(waterUse("cavitation_tube_micro")).toBeGreaterThan(waterUse("reflux_flotation_inclined"));
  });
});

describe("cfCost", () => {
  it("reflux flotation most expensive", () => {
    expect(cfCost("reflux_flotation_inclined")).toBeGreaterThan(cfCost("cavitation_tube_micro"));
  });
});

describe("continuous", () => {
  it("all column flotation is continuous", () => {
    expect(continuous("conventional_column_sparger")).toBe(true);
    expect(continuous("jameson_cell_downcomer")).toBe(true);
  });
});

describe("forFine", () => {
  it("conventional column for fine particles", () => {
    expect(forFine("conventional_column_sparger")).toBe(true);
  });
  it("jameson cell not for fine", () => {
    expect(forFine("jameson_cell_downcomer")).toBe(false);
  });
});

describe("sparger", () => {
  it("jameson cell uses plunging jet downcomer", () => {
    expect(sparger("jameson_cell_downcomer")).toBe("plunging_jet_downcomer_self_aspirate");
  });
});

describe("bestUse", () => {
  it("packed column for ultra fine graphite", () => {
    expect(bestUse("packed_column_structured")).toBe("ultra_fine_graphite_talc_high_grade");
  });
});

describe("columnFlotationTypes", () => {
  it("returns 5 types", () => {
    expect(columnFlotationTypes()).toHaveLength(5);
  });
});
