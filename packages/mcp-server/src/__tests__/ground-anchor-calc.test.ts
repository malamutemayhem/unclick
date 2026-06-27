import { describe, it, expect } from "vitest";
import {
  capacity, depth, reliability, corrosionProt,
  gaCost, removable, forPermanent, tendon,
  bestUse, groundAnchorTypes,
} from "../ground-anchor-calc.js";

describe("capacity", () => {
  it("post grouted highest capacity", () => {
    expect(capacity("post_grouted_pressure")).toBeGreaterThan(capacity("straight_shaft_gravity"));
  });
});

describe("depth", () => {
  it("micropile deepest", () => {
    expect(depth("micropile_hollow_bar")).toBeGreaterThan(depth("straight_shaft_gravity"));
  });
});

describe("reliability", () => {
  it("post grouted most reliable", () => {
    expect(reliability("post_grouted_pressure")).toBeGreaterThan(reliability("underreamed_bell_shape"));
  });
});

describe("corrosionProt", () => {
  it("post grouted best corrosion protection", () => {
    expect(corrosionProt("post_grouted_pressure")).toBeGreaterThan(corrosionProt("removable_temporary_strand"));
  });
});

describe("gaCost", () => {
  it("post grouted most expensive", () => {
    expect(gaCost("post_grouted_pressure")).toBeGreaterThan(gaCost("straight_shaft_gravity"));
  });
});

describe("removable", () => {
  it("temporary strand is removable", () => {
    expect(removable("removable_temporary_strand")).toBe(true);
  });
  it("post grouted not removable", () => {
    expect(removable("post_grouted_pressure")).toBe(false);
  });
});

describe("forPermanent", () => {
  it("post grouted for permanent", () => {
    expect(forPermanent("post_grouted_pressure")).toBe(true);
  });
  it("temporary strand not for permanent", () => {
    expect(forPermanent("removable_temporary_strand")).toBe(false);
  });
});

describe("tendon", () => {
  it("micropile uses hollow bar", () => {
    expect(tendon("micropile_hollow_bar")).toBe("hollow_bar_self_drill_grout");
  });
});

describe("bestUse", () => {
  it("compaction for sinkhole fill", () => {
    expect(bestUse("straight_shaft_gravity")).toBe("moderate_load_cohesive_soil");
  });
});

describe("groundAnchorTypes", () => {
  it("returns 5 types", () => {
    expect(groundAnchorTypes()).toHaveLength(5);
  });
});
