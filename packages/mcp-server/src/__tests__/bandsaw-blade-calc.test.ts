import { describe, it, expect } from "vitest";
import {
  cutSpeed, bladeLife, finish_, versatility,
  bbCost, weldable, forMetal, tooth,
  bestUse, bandsawBladeTypes,
} from "../bandsaw-blade-calc.js";

describe("cutSpeed", () => {
  it("carbide tipped fastest", () => {
    expect(cutSpeed("carbide_tipped_brazed")).toBeGreaterThan(cutSpeed("carbon_steel_regular"));
  });
});

describe("bladeLife", () => {
  it("diamond longest life", () => {
    expect(bladeLife("diamond_grit_continuous")).toBeGreaterThan(bladeLife("carbon_steel_regular"));
  });
});

describe("finish_", () => {
  it("diamond best finish", () => {
    expect(finish_("diamond_grit_continuous")).toBeGreaterThan(finish_("carbon_steel_regular"));
  });
});

describe("versatility", () => {
  it("bimetal most versatile", () => {
    expect(versatility("bimetal_hss_edge")).toBeGreaterThan(versatility("diamond_grit_continuous"));
  });
});

describe("bbCost", () => {
  it("diamond most expensive", () => {
    expect(bbCost("diamond_grit_continuous")).toBeGreaterThan(bbCost("carbon_steel_regular"));
  });
});

describe("weldable", () => {
  it("bimetal is weldable", () => {
    expect(weldable("bimetal_hss_edge")).toBe(true);
  });
  it("carbide not weldable", () => {
    expect(weldable("carbide_tipped_brazed")).toBe(false);
  });
});

describe("forMetal", () => {
  it("bimetal for metal", () => {
    expect(forMetal("bimetal_hss_edge")).toBe(true);
  });
  it("carbon steel not for metal", () => {
    expect(forMetal("carbon_steel_regular")).toBe(false);
  });
});

describe("tooth", () => {
  it("variable pitch uses alternating", () => {
    expect(tooth("variable_pitch_vari_tooth")).toBe("alternating_pitch_reduced_vibration");
  });
});

describe("bestUse", () => {
  it("carbon steel for wood plastic", () => {
    expect(bestUse("carbon_steel_regular")).toBe("wood_plastic_soft_nonferrous");
  });
});

describe("bandsawBladeTypes", () => {
  it("returns 5 types", () => {
    expect(bandsawBladeTypes()).toHaveLength(5);
  });
});
