import { describe, it, expect } from "vitest";
import {
  tensile, shear, ductility, installEase,
  sbCost, highStrength, forSlipCritical, grade,
  bestUse, structuralBoltTypes,
} from "../structural-bolt-calc.js";

describe("tensile", () => {
  it("a490 highest tensile", () => {
    expect(tensile("a490_alloy_steel_heavy")).toBeGreaterThan(tensile("a307_low_carbon_common"));
  });
});

describe("shear", () => {
  it("a490 highest shear", () => {
    expect(shear("a490_alloy_steel_heavy")).toBeGreaterThan(shear("a307_low_carbon_common"));
  });
});

describe("ductility", () => {
  it("a307 most ductile", () => {
    expect(ductility("a307_low_carbon_common")).toBeGreaterThan(ductility("a490_alloy_steel_heavy"));
  });
});

describe("installEase", () => {
  it("a307 easiest install", () => {
    expect(installEase("a307_low_carbon_common")).toBeGreaterThan(installEase("a354_anchor_rod_grade_bd"));
  });
});

describe("sbCost", () => {
  it("a354 most expensive", () => {
    expect(sbCost("a354_anchor_rod_grade_bd")).toBeGreaterThan(sbCost("a307_low_carbon_common"));
  });
});

describe("highStrength", () => {
  it("a490 is high strength", () => {
    expect(highStrength("a490_alloy_steel_heavy")).toBe(true);
  });
  it("a307 not high strength", () => {
    expect(highStrength("a307_low_carbon_common")).toBe(false);
  });
});

describe("forSlipCritical", () => {
  it("a325 for slip critical", () => {
    expect(forSlipCritical("a325_high_strength_hex")).toBe(true);
  });
  it("a354 not for slip critical", () => {
    expect(forSlipCritical("a354_anchor_rod_grade_bd")).toBe(false);
  });
});

describe("grade", () => {
  it("tc bolt uses f1852 equivalent", () => {
    expect(grade("tension_control_tc_twist_off")).toBe("f1852_tc_a325_equivalent");
  });
});

describe("bestUse", () => {
  it("a490 for heavy moment frame", () => {
    expect(bestUse("a490_alloy_steel_heavy")).toBe("heavy_steel_moment_frame_flange");
  });
});

describe("structuralBoltTypes", () => {
  it("returns 5 types", () => {
    expect(structuralBoltTypes()).toHaveLength(5);
  });
});
