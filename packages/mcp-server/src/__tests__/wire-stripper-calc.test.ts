import { describe, it, expect } from "vitest";
import {
  stripClean, gaugeRange, speedWork, durability,
  stripperCost, automatic, forFine, stripMethod,
  bestUse, wireStrippers,
} from "../wire-stripper-calc.js";

describe("stripClean", () => {
  it("thermal strip cleanest strip", () => {
    expect(stripClean("thermal_strip_hot")).toBeGreaterThan(stripClean("manual_adjust_screw"));
  });
});

describe("gaugeRange", () => {
  it("rotary cable strip widest gauge range", () => {
    expect(gaugeRange("rotary_cable_strip")).toBeGreaterThan(gaugeRange("precision_micro_strip"));
  });
});

describe("speedWork", () => {
  it("auto strip fastest work speed", () => {
    expect(speedWork("auto_strip_spring")).toBeGreaterThan(speedWork("thermal_strip_hot"));
  });
});

describe("durability", () => {
  it("manual adjust most durable", () => {
    expect(durability("manual_adjust_screw")).toBeGreaterThan(durability("precision_micro_strip"));
  });
});

describe("stripperCost", () => {
  it("thermal strip most expensive", () => {
    expect(stripperCost("thermal_strip_hot")).toBeGreaterThan(stripperCost("manual_adjust_screw"));
  });
});

describe("automatic", () => {
  it("auto strip is automatic", () => {
    expect(automatic("auto_strip_spring")).toBe(true);
  });
  it("manual adjust not automatic", () => {
    expect(automatic("manual_adjust_screw")).toBe(false);
  });
});

describe("forFine", () => {
  it("precision micro is for fine", () => {
    expect(forFine("precision_micro_strip")).toBe(true);
  });
  it("manual adjust not for fine", () => {
    expect(forFine("manual_adjust_screw")).toBe(false);
  });
});

describe("stripMethod", () => {
  it("rotary cable uses rotary blade orbit", () => {
    expect(stripMethod("rotary_cable_strip")).toBe("rotary_blade_orbit");
  });
});

describe("bestUse", () => {
  it("thermal strip best for enamel magnet wire", () => {
    expect(bestUse("thermal_strip_hot")).toBe("enamel_magnet_wire");
  });
});

describe("wireStrippers", () => {
  it("returns 5 types", () => {
    expect(wireStrippers()).toHaveLength(5);
  });
});
