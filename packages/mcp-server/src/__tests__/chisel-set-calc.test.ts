import { describe, it, expect } from "vitest";
import {
  cuttingPrecision, impactStrength, versatility, edgeRetention,
  chiselCost, malletSafe, handPushOnly, steelType,
  bestJoint, chiselSets,
} from "../chisel-set-calc.js";

describe("cuttingPrecision", () => {
  it("paring long thin most precise cut", () => {
    expect(cuttingPrecision("paring_long_thin")).toBeGreaterThan(cuttingPrecision("mortise_heavy_duty"));
  });
});

describe("impactStrength", () => {
  it("mortise heavy duty strongest impact", () => {
    expect(impactStrength("mortise_heavy_duty")).toBeGreaterThan(impactStrength("paring_long_thin"));
  });
});

describe("versatility", () => {
  it("bench bevel edge most versatile", () => {
    expect(versatility("bench_bevel_edge")).toBeGreaterThan(versatility("mortise_heavy_duty"));
  });
});

describe("edgeRetention", () => {
  it("mortise heavy duty best edge retention", () => {
    expect(edgeRetention("mortise_heavy_duty")).toBeGreaterThan(edgeRetention("paring_long_thin"));
  });
});

describe("chiselCost", () => {
  it("paring long thin more expensive than bench bevel", () => {
    expect(chiselCost("paring_long_thin")).toBeGreaterThan(chiselCost("bench_bevel_edge"));
  });
});

describe("malletSafe", () => {
  it("mortise heavy duty is mallet safe", () => {
    expect(malletSafe("mortise_heavy_duty")).toBe(true);
  });
  it("paring long thin is not mallet safe", () => {
    expect(malletSafe("paring_long_thin")).toBe(false);
  });
});

describe("handPushOnly", () => {
  it("paring long thin is hand push only", () => {
    expect(handPushOnly("paring_long_thin")).toBe(true);
  });
  it("bench bevel edge is not hand push only", () => {
    expect(handPushOnly("bench_bevel_edge")).toBe(false);
  });
});

describe("steelType", () => {
  it("bench bevel edge uses high carbon cr v", () => {
    expect(steelType("bench_bevel_edge")).toBe("high_carbon_cr_v");
  });
});

describe("bestJoint", () => {
  it("mortise heavy duty best for mortise tenon deep", () => {
    expect(bestJoint("mortise_heavy_duty")).toBe("mortise_tenon_deep");
  });
});

describe("chiselSets", () => {
  it("returns 5 types", () => {
    expect(chiselSets()).toHaveLength(5);
  });
});
