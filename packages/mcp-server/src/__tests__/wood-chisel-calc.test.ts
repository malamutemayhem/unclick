import { describe, it, expect } from "vitest";
import {
  edgeRetention, impactResist, controlFinesse, versatility,
  chiselCost, malletSafe, handPushOnly, steelType,
  bestJoint, woodChisels,
} from "../wood-chisel-calc.js";

describe("edgeRetention", () => {
  it("paring long best edge retention", () => {
    expect(edgeRetention("paring_long")).toBeGreaterThan(edgeRetention("corner_skew"));
  });
});

describe("impactResist", () => {
  it("mortise heavy best impact resistance", () => {
    expect(impactResist("mortise_heavy")).toBeGreaterThan(impactResist("paring_long"));
  });
});

describe("controlFinesse", () => {
  it("paring long most finesse", () => {
    expect(controlFinesse("paring_long")).toBeGreaterThan(controlFinesse("mortise_heavy"));
  });
});

describe("versatility", () => {
  it("bench bevel edge most versatile", () => {
    expect(versatility("bench_bevel_edge")).toBeGreaterThan(versatility("corner_skew"));
  });
});

describe("chiselCost", () => {
  it("paring long most expensive", () => {
    expect(chiselCost("paring_long")).toBeGreaterThan(chiselCost("bench_bevel_edge"));
  });
});

describe("malletSafe", () => {
  it("mortise heavy is mallet safe", () => {
    expect(malletSafe("mortise_heavy")).toBe(true);
  });
  it("paring long is not", () => {
    expect(malletSafe("paring_long")).toBe(false);
  });
});

describe("handPushOnly", () => {
  it("paring long is hand push only", () => {
    expect(handPushOnly("paring_long")).toBe(true);
  });
  it("bench bevel edge is not", () => {
    expect(handPushOnly("bench_bevel_edge")).toBe(false);
  });
});

describe("steelType", () => {
  it("mortise heavy uses high carbon thick blade", () => {
    expect(steelType("mortise_heavy")).toBe("high_carbon_thick_blade");
  });
});

describe("bestJoint", () => {
  it("bench bevel edge for dovetail general joinery", () => {
    expect(bestJoint("bench_bevel_edge")).toBe("dovetail_general_joinery");
  });
});

describe("woodChisels", () => {
  it("returns 5 types", () => {
    expect(woodChisels()).toHaveLength(5);
  });
});
