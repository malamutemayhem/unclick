import { describe, it, expect } from "vitest";
import {
  axial, moment, slenderness, fireRating,
  clCost, fireProof, forHighRise, section,
  bestUse, columnTypeTypes,
} from "../column-type-calc.js";

describe("axial", () => {
  it("composite highest axial", () => {
    expect(axial("composite_concrete_filled")).toBeGreaterThan(axial("timber_post_glulam"));
  });
});

describe("moment", () => {
  it("composite highest moment", () => {
    expect(moment("composite_concrete_filled")).toBeGreaterThan(moment("timber_post_glulam"));
  });
});

describe("slenderness", () => {
  it("steel most slender", () => {
    expect(slenderness("steel_wide_flange_h")).toBeGreaterThan(slenderness("timber_post_glulam"));
  });
});

describe("fireRating", () => {
  it("concrete best fire rating", () => {
    expect(fireRating("reinforced_concrete_rect")).toBeGreaterThan(fireRating("steel_wide_flange_h"));
  });
});

describe("clCost", () => {
  it("composite most expensive", () => {
    expect(clCost("composite_concrete_filled")).toBeGreaterThan(clCost("reinforced_concrete_rect"));
  });
});

describe("fireProof", () => {
  it("concrete is fireproof", () => {
    expect(fireProof("reinforced_concrete_rect")).toBe(true);
  });
  it("steel not fireproof", () => {
    expect(fireProof("steel_wide_flange_h")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("composite for high rise", () => {
    expect(forHighRise("composite_concrete_filled")).toBe(true);
  });
  it("timber not for high rise", () => {
    expect(forHighRise("timber_post_glulam")).toBe(false);
  });
});

describe("section", () => {
  it("precast round uses circular spiral", () => {
    expect(section("precast_concrete_round")).toBe("circular_spiral_reinforce");
  });
});

describe("bestUse", () => {
  it("timber for mass timber", () => {
    expect(bestUse("timber_post_glulam")).toBe("mass_timber_exposed_structure");
  });
});

describe("columnTypeTypes", () => {
  it("returns 5 types", () => {
    expect(columnTypeTypes()).toHaveLength(5);
  });
});
