import { describe, it, expect } from "vitest";
import {
  strength, flexibility, abrasionResist, fatigue,
  wrCost, rotationResist, forCrane, construction,
  bestUse, wireRopeTypes,
} from "../wire-rope-calc.js";

describe("strength", () => {
  it("compacted strand strongest", () => {
    expect(strength("compacted_strand_swaged")).toBeGreaterThan(strength("fiber_core_6x19_general"));
  });
});

describe("flexibility", () => {
  it("6x37 most flexible", () => {
    expect(flexibility("iwrc_6x37_flexible")).toBeGreaterThan(flexibility("compacted_strand_swaged"));
  });
});

describe("abrasionResist", () => {
  it("compacted strand best abrasion resistance", () => {
    expect(abrasionResist("compacted_strand_swaged")).toBeGreaterThan(abrasionResist("iwrc_6x37_flexible"));
  });
});

describe("fatigue", () => {
  it("6x37 best fatigue life", () => {
    expect(fatigue("iwrc_6x37_flexible")).toBeGreaterThan(fatigue("iwrc_6x19_standard"));
  });
});

describe("wrCost", () => {
  it("compacted strand most expensive", () => {
    expect(wrCost("compacted_strand_swaged")).toBeGreaterThan(wrCost("fiber_core_6x19_general"));
  });
});

describe("rotationResist", () => {
  it("19x7 is rotation resistant", () => {
    expect(rotationResist("rotation_resistant_19x7")).toBe(true);
  });
  it("6x19 not rotation resistant", () => {
    expect(rotationResist("iwrc_6x19_standard")).toBe(false);
  });
});

describe("forCrane", () => {
  it("6x19 for crane", () => {
    expect(forCrane("iwrc_6x19_standard")).toBe(true);
  });
  it("fiber core not for crane", () => {
    expect(forCrane("fiber_core_6x19_general")).toBe(false);
  });
});

describe("construction", () => {
  it("compacted uses swaged compacted", () => {
    expect(construction("compacted_strand_swaged")).toBe("swaged_compacted_smooth_strand");
  });
});

describe("bestUse", () => {
  it("6x19 for crane hoist general", () => {
    expect(bestUse("iwrc_6x19_standard")).toBe("crane_hoist_general_lifting_drag");
  });
});

describe("wireRopeTypes", () => {
  it("returns 5 types", () => {
    expect(wireRopeTypes()).toHaveLength(5);
  });
});
