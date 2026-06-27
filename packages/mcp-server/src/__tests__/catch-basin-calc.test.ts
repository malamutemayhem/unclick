import { describe, it, expect } from "vitest";
import {
  capacity, durability, weight, installEase,
  cbCost, watertight, forTraffic, grate,
  bestUse, catchBasinTypes,
} from "../catch-basin-calc.js";

describe("capacity", () => {
  it("precast concrete largest", () => {
    expect(capacity("precast_concrete_box")).toBeGreaterThan(capacity("hdpe_plastic_inline"));
  });
});

describe("durability", () => {
  it("precast concrete most durable", () => {
    expect(durability("precast_concrete_box")).toBeGreaterThan(durability("hdpe_plastic_inline"));
  });
});

describe("weight", () => {
  it("hdpe lightest (highest score)", () => {
    expect(weight("hdpe_plastic_inline")).toBeGreaterThan(weight("precast_concrete_box"));
  });
});

describe("installEase", () => {
  it("hdpe easiest install", () => {
    expect(installEase("hdpe_plastic_inline")).toBeGreaterThan(installEase("brick_masonry_field"));
  });
});

describe("cbCost", () => {
  it("polymer concrete most expensive", () => {
    expect(cbCost("polymer_concrete_channel")).toBeGreaterThan(cbCost("hdpe_plastic_inline"));
  });
});

describe("watertight", () => {
  it("precast is watertight", () => {
    expect(watertight("precast_concrete_box")).toBe(true);
  });
  it("brick masonry not watertight", () => {
    expect(watertight("brick_masonry_field")).toBe(false);
  });
});

describe("forTraffic", () => {
  it("precast for traffic", () => {
    expect(forTraffic("precast_concrete_box")).toBe(true);
  });
  it("hdpe not for traffic", () => {
    expect(forTraffic("hdpe_plastic_inline")).toBe(false);
  });
});

describe("grate", () => {
  it("fiberglass uses frp molded", () => {
    expect(grate("fiberglass_frp_light")).toBe("frp_molded_corrosion_resist");
  });
});

describe("bestUse", () => {
  it("hdpe for residential yard", () => {
    expect(bestUse("hdpe_plastic_inline")).toBe("residential_yard_downspout");
  });
});

describe("catchBasinTypes", () => {
  it("returns 5 types", () => {
    expect(catchBasinTypes()).toHaveLength(5);
  });
});
