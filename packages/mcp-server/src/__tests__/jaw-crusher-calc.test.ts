import { describe, it, expect } from "vitest";
import {
  capacity, reductionRatio, feedSize, wear,
  jcCost, mobile, forHard, toggle,
  bestUse, jawCrusherTypes,
} from "../jaw-crusher-calc.js";

describe("capacity", () => {
  it("high reduction highest capacity", () => {
    expect(capacity("high_reduction_deep_chamber")).toBeGreaterThan(capacity("portable_track_mobile"));
  });
});

describe("reductionRatio", () => {
  it("high reduction best ratio", () => {
    expect(reductionRatio("high_reduction_deep_chamber")).toBeGreaterThan(reductionRatio("single_toggle_overhead"));
  });
});

describe("feedSize", () => {
  it("high reduction largest feed size", () => {
    expect(feedSize("high_reduction_deep_chamber")).toBeGreaterThan(feedSize("jaw_roll_hybrid"));
  });
});

describe("wear", () => {
  it("double toggle best wear resistance", () => {
    expect(wear("double_toggle_heavy")).toBeGreaterThan(wear("jaw_roll_hybrid"));
  });
});

describe("jcCost", () => {
  it("high reduction most expensive", () => {
    expect(jcCost("high_reduction_deep_chamber")).toBeGreaterThan(jcCost("single_toggle_overhead"));
  });
});

describe("mobile", () => {
  it("portable track is mobile", () => {
    expect(mobile("portable_track_mobile")).toBe(true);
  });
  it("single toggle not mobile", () => {
    expect(mobile("single_toggle_overhead")).toBe(false);
  });
});

describe("forHard", () => {
  it("double toggle for hard rock", () => {
    expect(forHard("double_toggle_heavy")).toBe(true);
  });
  it("jaw roll hybrid not for hard", () => {
    expect(forHard("jaw_roll_hybrid")).toBe(false);
  });
});

describe("toggle", () => {
  it("portable uses track mounted diesel", () => {
    expect(toggle("portable_track_mobile")).toBe("track_mounted_self_propelled_diesel");
  });
});

describe("bestUse", () => {
  it("double toggle for very hard rock", () => {
    expect(bestUse("double_toggle_heavy")).toBe("very_hard_abrasive_rock_granite_basalt");
  });
});

describe("jawCrusherTypes", () => {
  it("returns 5 types", () => {
    expect(jawCrusherTypes()).toHaveLength(5);
  });
});
