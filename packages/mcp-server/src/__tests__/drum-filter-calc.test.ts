import { describe, it, expect } from "vitest";
import {
  throughput, cakeDryness, washability, automation,
  drCost, continuous, forViscous, feed,
  bestUse, drumFilterTypes,
} from "../drum-filter-calc.js";

describe("throughput", () => {
  it("top feed highest throughput", () => {
    expect(throughput("top_feed_drum_belt")).toBeGreaterThan(throughput("precoat_drum_filter"));
  });
});

describe("cakeDryness", () => {
  it("rotary pressure best cake dryness", () => {
    expect(cakeDryness("rotary_pressure_drum")).toBeGreaterThan(cakeDryness("precoat_drum_filter"));
  });
});

describe("washability", () => {
  it("top feed best washability", () => {
    expect(washability("top_feed_drum_belt")).toBeGreaterThan(washability("precoat_drum_filter"));
  });
});

describe("automation", () => {
  it("rotary vacuum high automation", () => {
    expect(automation("rotary_vacuum_drum")).toBeGreaterThan(automation("precoat_drum_filter"));
  });
});

describe("drCost", () => {
  it("rotary pressure most expensive", () => {
    expect(drCost("rotary_pressure_drum")).toBeGreaterThan(drCost("internal_feed_drum"));
  });
});

describe("continuous", () => {
  it("rotary vacuum is continuous", () => {
    expect(continuous("rotary_vacuum_drum")).toBe(true);
  });
});

describe("forViscous", () => {
  it("rotary pressure for viscous", () => {
    expect(forViscous("rotary_pressure_drum")).toBe(true);
  });
  it("rotary vacuum not for viscous", () => {
    expect(forViscous("rotary_vacuum_drum")).toBe(false);
  });
});

describe("feed", () => {
  it("precoat uses diatomaceous earth", () => {
    expect(feed("precoat_drum_filter")).toBe("diatomaceous_earth_precoat_advancing_blade");
  });
});

describe("bestUse", () => {
  it("top feed for mineral ore", () => {
    expect(bestUse("top_feed_drum_belt")).toBe("mineral_ore_high_capacity_multi_stage_wash");
  });
});

describe("drumFilterTypes", () => {
  it("returns 5 types", () => {
    expect(drumFilterTypes()).toHaveLength(5);
  });
});
