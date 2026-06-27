import { describe, it, expect } from "vitest";
import {
  cuttingSpeed, layerCapacity, cutAccuracy, materialRange,
  fcCost, automated, forPattern, bladeType,
  bestUse, fabricCutterTypes,
} from "../fabric-cutter-calc.js";

describe("cuttingSpeed", () => {
  it("cnc auto cutter fastest cutting", () => {
    expect(cuttingSpeed("cnc_auto_cutter")).toBeGreaterThan(cuttingSpeed("band_knife"));
  });
});

describe("layerCapacity", () => {
  it("straight knife highest layer capacity", () => {
    expect(layerCapacity("straight_knife")).toBeGreaterThan(layerCapacity("round_knife"));
  });
});

describe("cutAccuracy", () => {
  it("cnc auto cutter best cut accuracy", () => {
    expect(cutAccuracy("cnc_auto_cutter")).toBeGreaterThan(cutAccuracy("round_knife"));
  });
});

describe("materialRange", () => {
  it("cnc auto cutter widest material range", () => {
    expect(materialRange("cnc_auto_cutter")).toBeGreaterThan(materialRange("die_press"));
  });
});

describe("fcCost", () => {
  it("cnc auto cutter most expensive", () => {
    expect(fcCost("cnc_auto_cutter")).toBeGreaterThan(fcCost("round_knife"));
  });
});

describe("automated", () => {
  it("cnc auto cutter is automated", () => {
    expect(automated("cnc_auto_cutter")).toBe(true);
  });
  it("straight knife not automated", () => {
    expect(automated("straight_knife")).toBe(false);
  });
});

describe("forPattern", () => {
  it("die press for pattern cutting", () => {
    expect(forPattern("die_press")).toBe(true);
  });
  it("straight knife not for pattern", () => {
    expect(forPattern("straight_knife")).toBe(false);
  });
});

describe("bladeType", () => {
  it("band knife uses continuous loop blade", () => {
    expect(bladeType("band_knife")).toBe("continuous_loop_blade_fixed_table_guide_fabric_to_blade");
  });
});

describe("bestUse", () => {
  it("cnc auto cutter for automotive aerospace composite", () => {
    expect(bestUse("cnc_auto_cutter")).toBe("automotive_interior_aerospace_composite_cad_cam_nesting");
  });
});

describe("fabricCutterTypes", () => {
  it("returns 5 types", () => {
    expect(fabricCutterTypes()).toHaveLength(5);
  });
});
