import { describe, it, expect } from "vitest";
import {
  insertionLoss, isolation, selectivity, powerHandling,
  filterCost, temperatureStable, forHandset, technology,
  bestUse, duplexerFilters,
} from "../duplexer-filter-calc.js";

describe("insertionLoss", () => {
  it("baw fbar lowest insertion loss", () => {
    expect(insertionLoss("baw_fbar")).toBeGreaterThan(insertionLoss("ceramic_dielectric"));
  });
});

describe("isolation", () => {
  it("cavity combline best isolation", () => {
    expect(isolation("cavity_combline")).toBeGreaterThan(isolation("ceramic_dielectric"));
  });
});

describe("selectivity", () => {
  it("cavity combline best selectivity", () => {
    expect(selectivity("cavity_combline")).toBeGreaterThan(selectivity("ceramic_dielectric"));
  });
});

describe("powerHandling", () => {
  it("cavity combline best power handling", () => {
    expect(powerHandling("cavity_combline")).toBeGreaterThan(powerHandling("saw_surface_acoustic"));
  });
});

describe("filterCost", () => {
  it("cavity combline most expensive", () => {
    expect(filterCost("cavity_combline")).toBeGreaterThan(filterCost("saw_surface_acoustic"));
  });
});

describe("temperatureStable", () => {
  it("baw fbar is temperature stable", () => {
    expect(temperatureStable("baw_fbar")).toBe(true);
  });
  it("saw surface acoustic not temperature stable", () => {
    expect(temperatureStable("saw_surface_acoustic")).toBe(false);
  });
});

describe("forHandset", () => {
  it("saw surface acoustic is for handset", () => {
    expect(forHandset("saw_surface_acoustic")).toBe(true);
  });
  it("cavity combline not for handset", () => {
    expect(forHandset("cavity_combline")).toBe(false);
  });
});

describe("technology", () => {
  it("baw fbar uses thin film bulk acoustic", () => {
    expect(technology("baw_fbar")).toBe("thin_film_bulk_acoustic");
  });
});

describe("bestUse", () => {
  it("baw fbar best for 5g sub6 n77 n78", () => {
    expect(bestUse("baw_fbar")).toBe("5g_sub6_n77_n78");
  });
});

describe("duplexerFilters", () => {
  it("returns 5 types", () => {
    expect(duplexerFilters()).toHaveLength(5);
  });
});
