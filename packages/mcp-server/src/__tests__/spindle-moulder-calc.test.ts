import { describe, it, expect } from "vitest";
import {
  profileAccuracy, spindleSpeed, feedRate, cutterCapacity,
  smCost, tilting, forCurved, spindleConfig,
  bestUse, spindleMoulderTypes,
} from "../spindle-moulder-calc.js";

describe("profileAccuracy", () => {
  it("programmable cnc best profile accuracy", () => {
    expect(profileAccuracy("programmable_cnc")).toBeGreaterThan(profileAccuracy("fixed_spindle"));
  });
});

describe("spindleSpeed", () => {
  it("programmable cnc fastest spindle speed", () => {
    expect(spindleSpeed("programmable_cnc")).toBeGreaterThan(spindleSpeed("heavy_duty_shaper"));
  });
});

describe("feedRate", () => {
  it("programmable cnc fastest feed rate", () => {
    expect(feedRate("programmable_cnc")).toBeGreaterThan(feedRate("heavy_duty_shaper"));
  });
});

describe("cutterCapacity", () => {
  it("programmable cnc and heavy duty shaper largest cutter capacity", () => {
    expect(cutterCapacity("programmable_cnc")).toBeGreaterThan(cutterCapacity("fixed_spindle"));
    expect(cutterCapacity("heavy_duty_shaper")).toBeGreaterThan(cutterCapacity("fixed_spindle"));
  });
});

describe("smCost", () => {
  it("programmable cnc most expensive", () => {
    expect(smCost("programmable_cnc")).toBeGreaterThan(smCost("fixed_spindle"));
  });
});

describe("tilting", () => {
  it("tilting spindle tilts", () => {
    expect(tilting("tilting_spindle")).toBe(true);
  });
  it("fixed spindle does not tilt", () => {
    expect(tilting("fixed_spindle")).toBe(false);
  });
});

describe("forCurved", () => {
  it("sliding table for curved work", () => {
    expect(forCurved("sliding_table")).toBe(true);
  });
  it("fixed spindle not for curved", () => {
    expect(forCurved("fixed_spindle")).toBe(false);
  });
});

describe("spindleConfig", () => {
  it("heavy duty shaper uses large bore spindle", () => {
    expect(spindleConfig("heavy_duty_shaper")).toBe("large_bore_spindle_heavy_cutterhead_power_feeder_deep_profile");
  });
});

describe("bestUse", () => {
  it("sliding table for curved template work", () => {
    expect(bestUse("sliding_table")).toBe("curved_template_work_arched_component_sliding_table_safe_feed");
  });
});

describe("spindleMoulderTypes", () => {
  it("returns 5 types", () => {
    expect(spindleMoulderTypes()).toHaveLength(5);
  });
});
