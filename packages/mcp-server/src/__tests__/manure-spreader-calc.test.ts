import { describe, it, expect } from "vitest";
import {
  spreadUniformity, fieldCapacity, nutrientRetention, loadCapacity,
  msCost, liquid, forPrecision, spreaderConfig,
  bestUse, manureSpreaderTypes,
} from "../manure-spreader-calc.js";

describe("spreadUniformity", () => {
  it("drag hose best spread uniformity", () => {
    expect(spreadUniformity("drag_hose")).toBeGreaterThan(spreadUniformity("spinner_broadcast"));
  });
});

describe("fieldCapacity", () => {
  it("drag hose highest field capacity", () => {
    expect(fieldCapacity("drag_hose")).toBeGreaterThan(fieldCapacity("spinner_broadcast"));
  });
});

describe("nutrientRetention", () => {
  it("drag hose best nutrient retention", () => {
    expect(nutrientRetention("drag_hose")).toBeGreaterThan(nutrientRetention("spinner_broadcast"));
  });
});

describe("loadCapacity", () => {
  it("slurry tanker largest load capacity", () => {
    expect(loadCapacity("slurry_tanker")).toBeGreaterThan(loadCapacity("spinner_broadcast"));
  });
});

describe("msCost", () => {
  it("drag hose most expensive", () => {
    expect(msCost("drag_hose")).toBeGreaterThan(msCost("spinner_broadcast"));
  });
});

describe("liquid", () => {
  it("slurry tanker is liquid", () => {
    expect(liquid("slurry_tanker")).toBe(true);
  });
  it("box spreader not liquid", () => {
    expect(liquid("box_spreader")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("drag hose for precision", () => {
    expect(forPrecision("drag_hose")).toBe(true);
  });
  it("box spreader not for precision", () => {
    expect(forPrecision("box_spreader")).toBe(false);
  });
});

describe("spreaderConfig", () => {
  it("side discharge uses vertical beater", () => {
    expect(spreaderConfig("side_discharge")).toBe("vertical_beater_side_discharge_wide_spread_pattern_even_cover");
  });
});

describe("bestUse", () => {
  it("spinner broadcast for compost lime spreading", () => {
    expect(bestUse("spinner_broadcast")).toBe("compost_lime_gypsum_broadcast_spreading_small_farm_simple_unit");
  });
});

describe("manureSpreaderTypes", () => {
  it("returns 5 types", () => {
    expect(manureSpreaderTypes()).toHaveLength(5);
  });
});
