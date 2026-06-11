import { describe, it, expect } from "vitest";
import {
  outputRate, precision, flexibility, compression,
  tpCost, rotary, forProduction, tooling,
  bestUse, tabletPressTypes,
} from "../tablet-press-calc.js";

describe("outputRate", () => {
  it("rotary high speed highest output", () => {
    expect(outputRate("rotary_high_speed")).toBeGreaterThan(outputRate("single_punch"));
  });
});

describe("precision", () => {
  it("bilayer press most precise", () => {
    expect(precision("bilayer_press")).toBeGreaterThan(precision("single_punch"));
  });
});

describe("flexibility", () => {
  it("single punch most flexible", () => {
    expect(flexibility("single_punch")).toBeGreaterThan(flexibility("bilayer_press"));
  });
});

describe("compression", () => {
  it("rotary high speed highest compression", () => {
    expect(compression("rotary_high_speed")).toBeGreaterThan(compression("single_punch"));
  });
});

describe("tpCost", () => {
  it("bilayer press most expensive", () => {
    expect(tpCost("bilayer_press")).toBeGreaterThan(tpCost("single_punch"));
  });
});

describe("rotary", () => {
  it("rotary standard is rotary", () => {
    expect(rotary("rotary_standard")).toBe(true);
  });
  it("single punch not rotary", () => {
    expect(rotary("single_punch")).toBe(false);
  });
});

describe("forProduction", () => {
  it("rotary high speed for production", () => {
    expect(forProduction("rotary_high_speed")).toBe(true);
  });
  it("single punch not for production", () => {
    expect(forProduction("single_punch")).toBe(false);
  });
});

describe("tooling", () => {
  it("bilayer press uses dual hopper", () => {
    expect(tooling("bilayer_press")).toBe("dual_hopper_sequential_fill_compress_layer_check_reject");
  });
});

describe("bestUse", () => {
  it("mini tablet for pediatric dosage", () => {
    expect(bestUse("mini_tablet")).toBe("pediatric_dosage_capsule_fill_mini_tab_flexible_dosing");
  });
});

describe("tabletPressTypes", () => {
  it("returns 5 types", () => {
    expect(tabletPressTypes()).toHaveLength(5);
  });
});
