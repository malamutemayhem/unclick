import { describe, it, expect } from "vitest";
import {
  cuttingPrecision, bladeLife, safety, curvedCutAbility,
  knifeCost, retractable, replaceBlade, bladeProfile,
  bestCraft, craftKnives,
} from "../craft-knife-calc.js";

describe("cuttingPrecision", () => {
  it("precision xacto fixed most precise", () => {
    expect(cuttingPrecision("precision_xacto_fixed")).toBeGreaterThan(cuttingPrecision("ceramic_safety_blade"));
  });
});

describe("bladeLife", () => {
  it("retractable snap blade longest blade life", () => {
    expect(bladeLife("retractable_snap_blade")).toBeGreaterThan(bladeLife("swivel_blade_curve"));
  });
});

describe("safety", () => {
  it("ceramic safety blade safest", () => {
    expect(safety("ceramic_safety_blade")).toBeGreaterThan(safety("precision_xacto_fixed"));
  });
});

describe("curvedCutAbility", () => {
  it("swivel blade curve best for curved cuts", () => {
    expect(curvedCutAbility("swivel_blade_curve")).toBeGreaterThan(curvedCutAbility("retractable_snap_blade"));
  });
});

describe("knifeCost", () => {
  it("swivel blade curve most expensive", () => {
    expect(knifeCost("swivel_blade_curve")).toBeGreaterThan(knifeCost("retractable_snap_blade"));
  });
});

describe("retractable", () => {
  it("retractable snap blade is retractable", () => {
    expect(retractable("retractable_snap_blade")).toBe(true);
  });
  it("precision xacto fixed is not", () => {
    expect(retractable("precision_xacto_fixed")).toBe(false);
  });
});

describe("replaceBlade", () => {
  it("precision xacto fixed has replaceable blade", () => {
    expect(replaceBlade("precision_xacto_fixed")).toBe(true);
  });
  it("ceramic safety blade does not", () => {
    expect(replaceBlade("ceramic_safety_blade")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("rotary cutter wheel uses circular tungsten carbide", () => {
    expect(bladeProfile("rotary_cutter_wheel")).toBe("circular_tungsten_carbide");
  });
});

describe("bestCraft", () => {
  it("precision xacto fixed best for model making fine detail", () => {
    expect(bestCraft("precision_xacto_fixed")).toBe("model_making_fine_detail");
  });
});

describe("craftKnives", () => {
  it("returns 5 types", () => {
    expect(craftKnives()).toHaveLength(5);
  });
});
