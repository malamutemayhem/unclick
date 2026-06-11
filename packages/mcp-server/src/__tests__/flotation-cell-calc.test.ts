import { describe, it, expect } from "vitest";
import {
  recovery, selectivity, capacity, airControl,
  fcCost, columnType, forRougher, aeration,
  bestUse, flotationCellTypes,
} from "../flotation-cell-calc.js";

describe("recovery", () => {
  it("flash flotation highest recovery", () => {
    expect(recovery("flash_flotation_skimair")).toBeGreaterThan(recovery("dissolved_air_daf"));
  });
});

describe("selectivity", () => {
  it("column cell best selectivity", () => {
    expect(selectivity("column_cell_sparger")).toBeGreaterThan(selectivity("flash_flotation_skimair"));
  });
});

describe("capacity", () => {
  it("mechanical impeller highest capacity", () => {
    expect(capacity("mechanical_impeller_tank")).toBeGreaterThan(capacity("jameson_downcomer_jet"));
  });
});

describe("airControl", () => {
  it("column cell best air control", () => {
    expect(airControl("column_cell_sparger")).toBeGreaterThan(airControl("flash_flotation_skimair"));
  });
});

describe("fcCost", () => {
  it("jameson most expensive", () => {
    expect(fcCost("jameson_downcomer_jet")).toBeGreaterThan(fcCost("mechanical_impeller_tank"));
  });
});

describe("columnType", () => {
  it("column cell is column type", () => {
    expect(columnType("column_cell_sparger")).toBe(true);
  });
  it("mechanical not column type", () => {
    expect(columnType("mechanical_impeller_tank")).toBe(false);
  });
});

describe("forRougher", () => {
  it("mechanical for rougher", () => {
    expect(forRougher("mechanical_impeller_tank")).toBe(true);
  });
  it("column cell not for rougher", () => {
    expect(forRougher("column_cell_sparger")).toBe(false);
  });
});

describe("aeration", () => {
  it("dissolved air uses pressurized micro", () => {
    expect(aeration("dissolved_air_daf")).toBe("pressurized_dissolved_micro");
  });
});

describe("bestUse", () => {
  it("jameson best for coal fines", () => {
    expect(bestUse("jameson_downcomer_jet")).toBe("coal_fines_phosphate_cleaning");
  });
});

describe("flotationCellTypes", () => {
  it("returns 5 types", () => {
    expect(flotationCellTypes()).toHaveLength(5);
  });
});
