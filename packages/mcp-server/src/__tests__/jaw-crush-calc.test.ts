import { describe, it, expect } from "vitest";
import {
  reductionRatio, throughput, feedSize, durability,
  jcCost, mobile, forPrimary, toggle,
  bestUse, jawCrushTypes,
} from "../jaw-crush-calc.js";

describe("reductionRatio", () => {
  it("lab sample highest reduction", () => {
    expect(reductionRatio("lab_sample_prep")).toBeGreaterThan(reductionRatio("double_toggle_blake"));
  });
});

describe("throughput", () => {
  it("single toggle highest throughput", () => {
    expect(throughput("single_toggle_overhead")).toBeGreaterThan(throughput("lab_sample_prep"));
  });
});

describe("feedSize", () => {
  it("double toggle largest feed size", () => {
    expect(feedSize("double_toggle_blake")).toBeGreaterThan(feedSize("lab_sample_prep"));
  });
});

describe("durability", () => {
  it("double toggle most durable", () => {
    expect(durability("double_toggle_blake")).toBeGreaterThan(durability("lab_sample_prep"));
  });
});

describe("jcCost", () => {
  it("portable track most expensive", () => {
    expect(jcCost("portable_track_mount")).toBeGreaterThan(jcCost("lab_sample_prep"));
  });
});

describe("mobile", () => {
  it("portable track is mobile", () => {
    expect(mobile("portable_track_mount")).toBe(true);
  });
  it("single toggle not mobile", () => {
    expect(mobile("single_toggle_overhead")).toBe(false);
  });
});

describe("forPrimary", () => {
  it("single toggle for primary", () => {
    expect(forPrimary("single_toggle_overhead")).toBe(true);
  });
  it("lab sample not for primary", () => {
    expect(forPrimary("lab_sample_prep")).toBe(false);
  });
});

describe("toggle", () => {
  it("double toggle uses blake pitman arm", () => {
    expect(toggle("double_toggle_blake")).toBe("double_toggle_blake_pitman_arm");
  });
});

describe("bestUse", () => {
  it("portable track for demolition recycle", () => {
    expect(bestUse("portable_track_mount")).toBe("demolition_recycle_site_mobile");
  });
});

describe("jawCrushTypes", () => {
  it("returns 5 types", () => {
    expect(jawCrushTypes()).toHaveLength(5);
  });
});
