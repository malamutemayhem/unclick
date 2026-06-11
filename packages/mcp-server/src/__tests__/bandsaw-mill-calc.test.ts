import { describe, it, expect } from "vitest";
import {
  cutAccuracy, throughput, kerf, logCapacity,
  bsCost, portable, forHardwood, millConfig,
  bestUse, bandsawMillTypes,
} from "../bandsaw-mill-calc.js";

describe("cutAccuracy", () => {
  it("resaw band best cut accuracy", () => {
    expect(cutAccuracy("resaw_band")).toBeGreaterThan(cutAccuracy("portable_swing"));
  });
});

describe("throughput", () => {
  it("double cut highest throughput", () => {
    expect(throughput("double_cut")).toBeGreaterThan(throughput("portable_swing"));
  });
});

describe("kerf", () => {
  it("resaw band thinnest kerf", () => {
    expect(kerf("resaw_band")).toBeGreaterThan(kerf("vertical_band"));
  });
});

describe("logCapacity", () => {
  it("double cut largest log capacity", () => {
    expect(logCapacity("double_cut")).toBeGreaterThan(logCapacity("resaw_band"));
  });
});

describe("bsCost", () => {
  it("double cut most expensive", () => {
    expect(bsCost("double_cut")).toBeGreaterThan(bsCost("portable_swing"));
  });
});

describe("portable", () => {
  it("portable swing is portable", () => {
    expect(portable("portable_swing")).toBe(true);
  });
  it("horizontal band not portable", () => {
    expect(portable("horizontal_band")).toBe(false);
  });
});

describe("forHardwood", () => {
  it("horizontal band for hardwood", () => {
    expect(forHardwood("horizontal_band")).toBe(true);
  });
  it("all types for hardwood", () => {
    expect(forHardwood("resaw_band")).toBe(true);
  });
});

describe("millConfig", () => {
  it("double cut uses twin blade both directions high production", () => {
    expect(millConfig("double_cut")).toBe("double_cut_band_mill_twin_blade_both_directions_high_production");
  });
});

describe("bestUse", () => {
  it("portable swing for farm forestry onsite custom milling", () => {
    expect(bestUse("portable_swing")).toBe("farm_forestry_portable_swing_band_mill_onsite_custom_milling");
  });
});

describe("bandsawMillTypes", () => {
  it("returns 5 types", () => {
    expect(bandsawMillTypes()).toHaveLength(5);
  });
});
