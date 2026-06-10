import { describe, it, expect } from "vitest";
import {
  ergonomicSupport, easeOfUse, newbornFit, breathability,
  carrierCost, breastfeedFriendly, hasStorage, carrierFabric,
  bestStage, babyCarriers,
} from "../baby-carrier-calc.js";

describe("ergonomicSupport", () => {
  it("frame backpack hiking best ergonomic support", () => {
    expect(ergonomicSupport("frame_backpack_hiking")).toBeGreaterThan(ergonomicSupport("ring_sling_hip"));
  });
});

describe("easeOfUse", () => {
  it("soft structured buckle easiest to use", () => {
    expect(easeOfUse("soft_structured_buckle")).toBeGreaterThan(easeOfUse("wrap_stretchy_newborn"));
  });
});

describe("newbornFit", () => {
  it("wrap stretchy newborn best newborn fit", () => {
    expect(newbornFit("wrap_stretchy_newborn")).toBeGreaterThan(newbornFit("frame_backpack_hiking"));
  });
});

describe("breathability", () => {
  it("frame backpack hiking most breathable", () => {
    expect(breathability("frame_backpack_hiking")).toBeGreaterThan(breathability("wrap_stretchy_newborn"));
  });
});

describe("carrierCost", () => {
  it("frame backpack hiking most expensive", () => {
    expect(carrierCost("frame_backpack_hiking")).toBeGreaterThan(carrierCost("wrap_stretchy_newborn"));
  });
});

describe("breastfeedFriendly", () => {
  it("ring sling hip is breastfeed friendly", () => {
    expect(breastfeedFriendly("ring_sling_hip")).toBe(true);
  });
  it("soft structured buckle is not", () => {
    expect(breastfeedFriendly("soft_structured_buckle")).toBe(false);
  });
});

describe("hasStorage", () => {
  it("frame backpack hiking has storage", () => {
    expect(hasStorage("frame_backpack_hiking")).toBe(true);
  });
  it("wrap stretchy newborn does not", () => {
    expect(hasStorage("wrap_stretchy_newborn")).toBe(false);
  });
});

describe("carrierFabric", () => {
  it("wrap stretchy newborn uses jersey cotton stretch", () => {
    expect(carrierFabric("wrap_stretchy_newborn")).toBe("jersey_cotton_stretch");
  });
});

describe("bestStage", () => {
  it("soft structured buckle best for daily all day versatile", () => {
    expect(bestStage("soft_structured_buckle")).toBe("daily_all_day_versatile");
  });
});

describe("babyCarriers", () => {
  it("returns 5 types", () => {
    expect(babyCarriers()).toHaveLength(5);
  });
});
