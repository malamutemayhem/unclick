import { describe, it, expect } from "vitest";
import {
  cutClean, speedTrim, controlAngle, edgeRetain,
  shearingCost, powered, forRidge, bladeStyle,
  bestUse, shearingHooks,
} from "../shearing-hook-calc.js";

describe("cutClean", () => {
  it("curved blade sweep cleanest cut", () => {
    expect(cutClean("curved_blade_sweep")).toBeGreaterThan(cutClean("serrated_edge_saw"));
  });
});

describe("speedTrim", () => {
  it("electric trim motor fastest trim", () => {
    expect(speedTrim("electric_trim_motor")).toBeGreaterThan(speedTrim("curved_blade_sweep"));
  });
});

describe("controlAngle", () => {
  it("curved blade sweep best angle control", () => {
    expect(controlAngle("curved_blade_sweep")).toBeGreaterThan(controlAngle("electric_trim_motor"));
  });
});

describe("edgeRetain", () => {
  it("serrated edge saw best edge retention", () => {
    expect(edgeRetain("serrated_edge_saw")).toBeGreaterThan(edgeRetain("electric_trim_motor"));
  });
});

describe("shearingCost", () => {
  it("electric trim motor most expensive", () => {
    expect(shearingCost("electric_trim_motor")).toBeGreaterThan(shearingCost("straight_blade_chop"));
  });
});

describe("powered", () => {
  it("electric trim motor is powered", () => {
    expect(powered("electric_trim_motor")).toBe(true);
  });
  it("curved blade sweep not powered", () => {
    expect(powered("curved_blade_sweep")).toBe(false);
  });
});

describe("forRidge", () => {
  it("serrated edge saw is for ridge", () => {
    expect(forRidge("serrated_edge_saw")).toBe(true);
  });
  it("curved blade sweep not for ridge", () => {
    expect(forRidge("curved_blade_sweep")).toBe(false);
  });
});

describe("bladeStyle", () => {
  it("double handle shear uses scissor double grip", () => {
    expect(bladeStyle("double_handle_shear")).toBe("scissor_double_grip");
  });
});

describe("bestUse", () => {
  it("electric trim motor best for large roof rapid", () => {
    expect(bestUse("electric_trim_motor")).toBe("large_roof_rapid");
  });
});

describe("shearingHooks", () => {
  it("returns 5 types", () => {
    expect(shearingHooks()).toHaveLength(5);
  });
});
