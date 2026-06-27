import { describe, it, expect } from "vitest";
import {
  cakeDryness, containment, washability, versatility,
  nfCost, agitated, forPharma, vessel,
  bestUse, nutscheFilterTypes,
} from "../nutsche-filter-calc.js";

describe("cakeDryness", () => {
  it("filter dryer combo driest cake", () => {
    expect(cakeDryness("filter_dryer_combo")).toBeGreaterThan(cakeDryness("open_top_gravity"));
  });
});

describe("containment", () => {
  it("pressure nutsche best containment", () => {
    expect(containment("pressure_nutsche_jacketed")).toBeGreaterThan(containment("open_top_gravity"));
  });
});

describe("washability", () => {
  it("filter dryer combo best washability", () => {
    expect(washability("filter_dryer_combo")).toBeGreaterThan(washability("open_top_gravity"));
  });
});

describe("versatility", () => {
  it("filter dryer combo most versatile", () => {
    expect(versatility("filter_dryer_combo")).toBeGreaterThan(versatility("open_top_gravity"));
  });
});

describe("nfCost", () => {
  it("filter dryer combo most expensive", () => {
    expect(nfCost("filter_dryer_combo")).toBeGreaterThan(nfCost("open_top_gravity"));
  });
});

describe("agitated", () => {
  it("agitated nutsche is agitated", () => {
    expect(agitated("agitated_nutsche_closed")).toBe(true);
  });
  it("open top not agitated", () => {
    expect(agitated("open_top_gravity")).toBe(false);
  });
});

describe("forPharma", () => {
  it("pressure nutsche for pharma", () => {
    expect(forPharma("pressure_nutsche_jacketed")).toBe(true);
  });
  it("open top not for pharma", () => {
    expect(forPharma("open_top_gravity")).toBe(false);
  });
});

describe("vessel", () => {
  it("vacuum nutsche uses glass lined", () => {
    expect(vessel("vacuum_nutsche_glass_lined")).toBe("glass_lined_vessel_corrosion_resist");
  });
});

describe("bestUse", () => {
  it("filter dryer combo for single vessel pharma", () => {
    expect(bestUse("filter_dryer_combo")).toBe("single_vessel_filter_wash_dry_pharma");
  });
});

describe("nutscheFilterTypes", () => {
  it("returns 5 types", () => {
    expect(nutscheFilterTypes()).toHaveLength(5);
  });
});
