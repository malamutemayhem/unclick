import { describe, it, expect } from "vitest";
import {
  mrr, finish_, accuracy, speed,
  brCost, internal, forKeyway, motion,
  bestUse, broachTypes,
} from "../broach-type-calc.js";

describe("mrr", () => {
  it("rotary highest mrr", () => {
    expect(mrr("rotary_continuous_cut")).toBeGreaterThan(mrr("linear_push_short"));
  });
});

describe("finish_", () => {
  it("pull broach best finish", () => {
    expect(finish_("linear_pull_internal")).toBeGreaterThan(finish_("linear_push_short"));
  });
});

describe("accuracy", () => {
  it("pull broach most accurate", () => {
    expect(accuracy("linear_pull_internal")).toBeGreaterThan(accuracy("surface_slab_external"));
  });
});

describe("speed", () => {
  it("rotary fastest", () => {
    expect(speed("rotary_continuous_cut")).toBeGreaterThan(speed("surface_slab_external"));
  });
});

describe("brCost", () => {
  it("rotary most expensive", () => {
    expect(brCost("rotary_continuous_cut")).toBeGreaterThan(brCost("linear_push_short"));
  });
});

describe("internal", () => {
  it("pull broach is internal", () => {
    expect(internal("linear_pull_internal")).toBe(true);
  });
  it("surface broach not internal", () => {
    expect(internal("surface_slab_external")).toBe(false);
  });
});

describe("forKeyway", () => {
  it("pull broach for keyway", () => {
    expect(forKeyway("linear_pull_internal")).toBe(true);
  });
  it("rotary not for keyway", () => {
    expect(forKeyway("rotary_continuous_cut")).toBe(false);
  });
});

describe("motion", () => {
  it("rotary uses indexing continuous", () => {
    expect(motion("rotary_continuous_cut")).toBe("rotary_indexing_continuous");
  });
});

describe("bestUse", () => {
  it("pull broach for keyway spline", () => {
    expect(bestUse("linear_pull_internal")).toBe("keyway_spline_internal_profile");
  });
});

describe("broachTypes", () => {
  it("returns 5 types", () => {
    expect(broachTypes()).toHaveLength(5);
  });
});
