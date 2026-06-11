import { describe, it, expect } from "vitest";
import {
  breakingForce, cycleSpeed, reachRange, mobilityRating,
  rbCost, mounted, forPrimary, breakerConfig,
  bestUse, rockBreakerTypes,
} from "../rock-breaker-calc.js";

describe("breakingForce", () => {
  it("drop ball highest breaking force", () => {
    expect(breakingForce("drop_ball")).toBeGreaterThan(breakingForce("handheld_pneumatic"));
  });
});

describe("cycleSpeed", () => {
  it("impactor mounted fastest cycle speed", () => {
    expect(cycleSpeed("impactor_mounted")).toBeGreaterThan(cycleSpeed("drop_ball"));
  });
});

describe("reachRange", () => {
  it("pedestal boom best reach range", () => {
    expect(reachRange("pedestal_boom")).toBeGreaterThan(reachRange("handheld_pneumatic"));
  });
});

describe("mobilityRating", () => {
  it("handheld pneumatic most mobile", () => {
    expect(mobilityRating("handheld_pneumatic")).toBeGreaterThan(mobilityRating("drop_ball"));
  });
});

describe("rbCost", () => {
  it("impactor mounted most expensive", () => {
    expect(rbCost("impactor_mounted")).toBeGreaterThan(rbCost("handheld_pneumatic"));
  });
});

describe("mounted", () => {
  it("hydraulic hammer is mounted", () => {
    expect(mounted("hydraulic_hammer")).toBe(true);
  });
  it("drop ball not mounted", () => {
    expect(mounted("drop_ball")).toBe(false);
  });
});

describe("forPrimary", () => {
  it("hydraulic hammer for primary breaking", () => {
    expect(forPrimary("hydraulic_hammer")).toBe(true);
  });
  it("handheld pneumatic not for primary", () => {
    expect(forPrimary("handheld_pneumatic")).toBe(false);
  });
});

describe("breakerConfig", () => {
  it("pedestal boom uses articulated boom", () => {
    expect(breakerConfig("pedestal_boom")).toBe("fixed_pedestal_articulated_boom_hydraulic_hammer_grizzly_clear");
  });
});

describe("bestUse", () => {
  it("drop ball for massive boulder breaking", () => {
    expect(bestUse("drop_ball")).toBe("massive_boulder_primary_breaking_quarry_pit_gravity_drop_ball");
  });
});

describe("rockBreakerTypes", () => {
  it("returns 5 types", () => {
    expect(rockBreakerTypes()).toHaveLength(5);
  });
});
