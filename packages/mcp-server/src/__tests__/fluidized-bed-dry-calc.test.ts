import { describe, it, expect } from "vitest";
import {
  heatTransfer, uniformity, gentleness, throughput,
  fbCost, continuous, forFine, method,
  bestUse, fluidizedBedDryTypes,
} from "../fluidized-bed-dry-calc.js";

describe("heatTransfer", () => {
  it("inert bed best heat transfer", () => {
    expect(heatTransfer("inert_bed_paste")).toBeGreaterThan(heatTransfer("pulsed_flow_sticky"));
  });
});

describe("uniformity", () => {
  it("vibrating gentle most uniform", () => {
    expect(uniformity("vibrating_gentle")).toBeGreaterThan(uniformity("inert_bed_paste"));
  });
});

describe("gentleness", () => {
  it("vibrating gentle most gentle", () => {
    expect(gentleness("vibrating_gentle")).toBeGreaterThan(gentleness("inert_bed_paste"));
  });
});

describe("throughput", () => {
  it("static continuous highest throughput", () => {
    expect(throughput("static_continuous")).toBeGreaterThan(throughput("inert_bed_paste"));
  });
});

describe("fbCost", () => {
  it("pulsed flow most expensive", () => {
    expect(fbCost("pulsed_flow_sticky")).toBeGreaterThan(fbCost("spouted_bed_coarse"));
  });
});

describe("continuous", () => {
  it("static continuous is continuous", () => {
    expect(continuous("static_continuous")).toBe(true);
  });
  it("inert bed not continuous", () => {
    expect(continuous("inert_bed_paste")).toBe(false);
  });
});

describe("forFine", () => {
  it("vibrating gentle for fine particles", () => {
    expect(forFine("vibrating_gentle")).toBe(true);
  });
  it("spouted bed not for fine", () => {
    expect(forFine("spouted_bed_coarse")).toBe(false);
  });
});

describe("method", () => {
  it("spouted bed uses central spout fountain", () => {
    expect(method("spouted_bed_coarse")).toBe("central_spout_fountain_coarse_particle");
  });
});

describe("bestUse", () => {
  it("vibrating gentle for pharma granule", () => {
    expect(bestUse("vibrating_gentle")).toBe("pharma_granule_tea_leaf_fragile_product");
  });
});

describe("fluidizedBedDryTypes", () => {
  it("returns 5 types", () => {
    expect(fluidizedBedDryTypes()).toHaveLength(5);
  });
});
