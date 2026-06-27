import { describe, it, expect } from "vitest";
import {
  speed, accuracy, depth, chipEvac,
  dbCost, coolantFed, forDeep, point,
  bestUse, drillBitTypes,
} from "../drill-bit-type-calc.js";

describe("speed", () => {
  it("carbide insert fastest", () => {
    expect(speed("carbide_insert_indexable")).toBeGreaterThan(speed("gun_drill_deep_hole"));
  });
});

describe("accuracy", () => {
  it("gun drill most accurate", () => {
    expect(accuracy("gun_drill_deep_hole")).toBeGreaterThan(accuracy("spade_flat_blade"));
  });
});

describe("depth", () => {
  it("gun drill deepest", () => {
    expect(depth("gun_drill_deep_hole")).toBeGreaterThan(depth("step_drill_cone_unibody"));
  });
});

describe("chipEvac", () => {
  it("gun drill best chip evac", () => {
    expect(chipEvac("gun_drill_deep_hole")).toBeGreaterThan(chipEvac("spade_flat_blade"));
  });
});

describe("dbCost", () => {
  it("gun drill most expensive", () => {
    expect(dbCost("gun_drill_deep_hole")).toBeGreaterThan(dbCost("twist_drill_hss_standard"));
  });
});

describe("coolantFed", () => {
  it("gun drill is coolant fed", () => {
    expect(coolantFed("gun_drill_deep_hole")).toBe(true);
  });
  it("twist drill not coolant fed", () => {
    expect(coolantFed("twist_drill_hss_standard")).toBe(false);
  });
});

describe("forDeep", () => {
  it("gun drill for deep holes", () => {
    expect(forDeep("gun_drill_deep_hole")).toBe(true);
  });
  it("twist drill not for deep", () => {
    expect(forDeep("twist_drill_hss_standard")).toBe(false);
  });
});

describe("point", () => {
  it("gun drill uses single lip", () => {
    expect(point("gun_drill_deep_hole")).toBe("single_lip_kidney_shape");
  });
});

describe("bestUse", () => {
  it("twist drill for general purpose", () => {
    expect(bestUse("twist_drill_hss_standard")).toBe("general_purpose_through_hole");
  });
});

describe("drillBitTypes", () => {
  it("returns 5 types", () => {
    expect(drillBitTypes()).toHaveLength(5);
  });
});
