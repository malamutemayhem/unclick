import { describe, it, expect } from "vitest";
import {
  breakingCapacity, feedRate, productSize, powerDraw,
  fbCost, reversible, forCoal, breakerConfig,
  bestUse, feederBreakerTypes,
} from "../feeder-breaker-calc.js";

describe("breakingCapacity", () => {
  it("sizer roll highest breaking capacity", () => {
    expect(breakingCapacity("sizer_roll")).toBeGreaterThan(breakingCapacity("chain_curtain"));
  });
});

describe("feedRate", () => {
  it("apron pan highest feed rate", () => {
    expect(feedRate("apron_pan")).toBeGreaterThan(feedRate("single_roll"));
  });
});

describe("productSize", () => {
  it("sizer roll best product size control", () => {
    expect(productSize("sizer_roll")).toBeGreaterThan(productSize("chain_curtain"));
  });
});

describe("powerDraw", () => {
  it("sizer roll highest power draw", () => {
    expect(powerDraw("sizer_roll")).toBeGreaterThan(powerDraw("chain_curtain"));
  });
});

describe("fbCost", () => {
  it("sizer roll most expensive", () => {
    expect(fbCost("sizer_roll")).toBeGreaterThan(fbCost("chain_curtain"));
  });
});

describe("reversible", () => {
  it("single roll is reversible", () => {
    expect(reversible("single_roll")).toBe(true);
  });
  it("chain curtain not reversible", () => {
    expect(reversible("chain_curtain")).toBe(false);
  });
});

describe("forCoal", () => {
  it("dual roll for coal", () => {
    expect(forCoal("dual_roll")).toBe(true);
  });
  it("sizer roll not for coal", () => {
    expect(forCoal("sizer_roll")).toBe(false);
  });
});

describe("breakerConfig", () => {
  it("apron pan uses armored face conveyor", () => {
    expect(breakerConfig("apron_pan")).toBe("armored_face_conveyor_apron_pan_feeder_continuous_discharge");
  });
});

describe("bestUse", () => {
  it("chain curtain for simple oversize reduction", () => {
    expect(bestUse("chain_curtain")).toBe("simple_oversize_reduction_transfer_point_chain_impact_breaker");
  });
});

describe("feederBreakerTypes", () => {
  it("returns 5 types", () => {
    expect(feederBreakerTypes()).toHaveLength(5);
  });
});
