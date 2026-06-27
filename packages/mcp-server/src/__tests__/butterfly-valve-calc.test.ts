import { describe, it, expect } from "vitest";
import {
  flow, shutoff, durability, torque,
  bvCost, zeroLeakage, forThrottle, disc,
  bestUse, butterflyValveTypes,
} from "../butterfly-valve-calc.js";

describe("flow", () => {
  it("wafer good flow", () => {
    expect(flow("resilient_seat_wafer")).toBeGreaterThan(flow("rubber_lined_corrosive"));
  });
});

describe("shutoff", () => {
  it("triple offset best shutoff", () => {
    expect(shutoff("triple_offset_metal_seat")).toBeGreaterThan(shutoff("resilient_seat_wafer"));
  });
});

describe("durability", () => {
  it("triple offset most durable", () => {
    expect(durability("triple_offset_metal_seat")).toBeGreaterThan(durability("resilient_seat_wafer"));
  });
});

describe("torque", () => {
  it("wafer lowest torque needed", () => {
    expect(torque("resilient_seat_wafer")).toBeGreaterThan(torque("triple_offset_metal_seat"));
  });
});

describe("bvCost", () => {
  it("triple offset most expensive", () => {
    expect(bvCost("triple_offset_metal_seat")).toBeGreaterThan(bvCost("resilient_seat_wafer"));
  });
});

describe("zeroLeakage", () => {
  it("triple offset zero leakage", () => {
    expect(zeroLeakage("triple_offset_metal_seat")).toBe(true);
  });
  it("wafer not zero leakage", () => {
    expect(zeroLeakage("resilient_seat_wafer")).toBe(false);
  });
});

describe("forThrottle", () => {
  it("high performance for throttle", () => {
    expect(forThrottle("high_performance_double")).toBe(true);
  });
  it("wafer not throttle", () => {
    expect(forThrottle("resilient_seat_wafer")).toBe(false);
  });
});

describe("disc", () => {
  it("triple offset uses stellite", () => {
    expect(disc("triple_offset_metal_seat")).toBe("stellite_triple_offset_metal");
  });
});

describe("bestUse", () => {
  it("rubber lined for corrosive", () => {
    expect(bestUse("rubber_lined_corrosive")).toBe("chemical_seawater_corrosive");
  });
});

describe("butterflyValveTypes", () => {
  it("returns 5 types", () => {
    expect(butterflyValveTypes()).toHaveLength(5);
  });
});
