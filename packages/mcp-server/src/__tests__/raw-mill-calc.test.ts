import { describe, it, expect } from "vitest";
import {
  grindFineness, throughput, energyEfficiency, dryingCapability,
  rmCost_, integrated, forCement, millConfig,
  bestUse, rawMillTypes,
} from "../raw-mill-calc.js";

describe("grindFineness", () => {
  it("attritor mill finest grind", () => {
    expect(grindFineness("attritor_mill")).toBeGreaterThan(grindFineness("ring_roller"));
  });
});

describe("throughput", () => {
  it("vertical roller highest throughput", () => {
    expect(throughput("vertical_roller")).toBeGreaterThan(throughput("attritor_mill"));
  });
});

describe("energyEfficiency", () => {
  it("vertical roller best energy efficiency", () => {
    expect(energyEfficiency("vertical_roller")).toBeGreaterThan(energyEfficiency("ball_mill"));
  });
});

describe("dryingCapability", () => {
  it("vertical roller best drying capability", () => {
    expect(dryingCapability("vertical_roller")).toBeGreaterThan(dryingCapability("attritor_mill"));
  });
});

describe("rmCost_", () => {
  it("vertical roller most expensive", () => {
    expect(rmCost_("vertical_roller")).toBeGreaterThan(rmCost_("ball_mill"));
  });
});

describe("integrated", () => {
  it("vertical roller is integrated", () => {
    expect(integrated("vertical_roller")).toBe(true);
  });
  it("ball mill not integrated", () => {
    expect(integrated("ball_mill")).toBe(false);
  });
});

describe("forCement", () => {
  it("ball mill for cement", () => {
    expect(forCement("ball_mill")).toBe(true);
  });
  it("attritor mill not for cement", () => {
    expect(forCement("attritor_mill")).toBe(false);
  });
});

describe("millConfig", () => {
  it("horizontal roller uses press roller bed high pressure", () => {
    expect(millConfig("horizontal_roller")).toBe("horizontal_roller_mill_raw_press_roller_bed_high_pressure_grind");
  });
});

describe("bestUse", () => {
  it("ring roller for mineral processing moderate fineness", () => {
    expect(bestUse("ring_roller")).toBe("mineral_processing_ring_roller_mill_moderate_fineness_dry_grind");
  });
});

describe("rawMillTypes", () => {
  it("returns 5 types", () => {
    expect(rawMillTypes()).toHaveLength(5);
  });
});
