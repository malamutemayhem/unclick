import { describe, it, expect } from "vitest";
import {
  posAccuracy, throughput, loadCapacity, maxSpeed,
  bscCost, preloaded, forCnc, screwConfig,
  bestUse, ballScrewTypes,
} from "../ball-screw-calc.js";

describe("posAccuracy", () => {
  it("precision ground best pos accuracy", () => {
    expect(posAccuracy("precision_ground")).toBeGreaterThan(posAccuracy("rolled_ball_screw"));
  });
});

describe("throughput", () => {
  it("rolled ball screw highest throughput", () => {
    expect(throughput("rolled_ball_screw")).toBeGreaterThan(throughput("miniature_ball_screw"));
  });
});

describe("loadCapacity", () => {
  it("heavy load best load capacity", () => {
    expect(loadCapacity("heavy_load_ball")).toBeGreaterThan(loadCapacity("miniature_ball_screw"));
  });
});

describe("maxSpeed", () => {
  it("high speed best max speed", () => {
    expect(maxSpeed("high_speed_ball")).toBeGreaterThan(maxSpeed("heavy_load_ball"));
  });
});

describe("bscCost", () => {
  it("high speed most expensive", () => {
    expect(bscCost("high_speed_ball")).toBeGreaterThan(bscCost("rolled_ball_screw"));
  });
});

describe("preloaded", () => {
  it("precision ground is preloaded", () => {
    expect(preloaded("precision_ground")).toBe(true);
  });
  it("rolled ball screw not preloaded", () => {
    expect(preloaded("rolled_ball_screw")).toBe(false);
  });
});

describe("forCnc", () => {
  it("precision ground for cnc", () => {
    expect(forCnc("precision_ground")).toBe(true);
  });
  it("rolled ball screw not for cnc", () => {
    expect(forCnc("rolled_ball_screw")).toBe(false);
  });
});

describe("screwConfig", () => {
  it("miniature uses small diameter compact instrument optics", () => {
    expect(screwConfig("miniature_ball_screw")).toBe("miniature_ball_screw_small_diameter_compact_instrument_optics");
  });
});

describe("bestUse", () => {
  it("heavy load for press inject large diameter high thrust", () => {
    expect(bestUse("heavy_load_ball")).toBe("press_inject_heavy_load_ball_screw_large_diameter_high_thrust");
  });
});

describe("ballScrewTypes", () => {
  it("returns 5 types", () => {
    expect(ballScrewTypes()).toHaveLength(5);
  });
});
