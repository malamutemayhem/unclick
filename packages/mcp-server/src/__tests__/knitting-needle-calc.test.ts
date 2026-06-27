import { describe, it, expect } from "vitest";
import {
  versatility, comfort, portability, stitchControl,
  needleCost, worksInRound, swappableTips, tipMaterial,
  bestProject, knittingNeedles,
} from "../knitting-needle-calc.js";

describe("versatility", () => {
  it("interchangeable tip cable most versatile", () => {
    expect(versatility("interchangeable_tip_cable")).toBeGreaterThan(versatility("straight_single_point"));
  });
});

describe("comfort", () => {
  it("square ergonomic grip most comfortable", () => {
    expect(comfort("square_ergonomic_grip")).toBeGreaterThan(comfort("double_point_dpn_set"));
  });
});

describe("portability", () => {
  it("circular cable loop most portable", () => {
    expect(portability("circular_cable_loop")).toBeGreaterThan(portability("straight_single_point"));
  });
});

describe("stitchControl", () => {
  it("interchangeable tip cable best stitch control", () => {
    expect(stitchControl("interchangeable_tip_cable")).toBeGreaterThan(stitchControl("double_point_dpn_set"));
  });
});

describe("needleCost", () => {
  it("interchangeable tip cable most expensive", () => {
    expect(needleCost("interchangeable_tip_cable")).toBeGreaterThan(needleCost("straight_single_point"));
  });
});

describe("worksInRound", () => {
  it("circular cable loop works in round", () => {
    expect(worksInRound("circular_cable_loop")).toBe(true);
  });
  it("straight single point does not work in round", () => {
    expect(worksInRound("straight_single_point")).toBe(false);
  });
});

describe("swappableTips", () => {
  it("interchangeable tip cable has swappable tips", () => {
    expect(swappableTips("interchangeable_tip_cable")).toBe(true);
  });
  it("circular cable loop does not have swappable tips", () => {
    expect(swappableTips("circular_cable_loop")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("square ergonomic grip uses cubic birch walnut", () => {
    expect(tipMaterial("square_ergonomic_grip")).toBe("cubic_birch_walnut");
  });
});

describe("bestProject", () => {
  it("double point dpn set best for sock mitten small round", () => {
    expect(bestProject("double_point_dpn_set")).toBe("sock_mitten_small_round");
  });
});

describe("knittingNeedles", () => {
  it("returns 5 types", () => {
    expect(knittingNeedles()).toHaveLength(5);
  });
});
