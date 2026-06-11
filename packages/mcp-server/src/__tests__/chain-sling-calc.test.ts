import { describe, it, expect } from "vitest";
import {
  capacity, reach, durability, flexibility,
  csCost, adjustable, forOverhead, grade,
  bestUse, chainSlingTypes,
} from "../chain-sling-calc.js";

describe("capacity", () => {
  it("quad leg highest capacity", () => {
    expect(capacity("quad_leg_four_point")).toBeGreaterThan(capacity("single_leg_vertical"));
  });
});

describe("reach", () => {
  it("adjustable longest reach", () => {
    expect(reach("adjustable_chain_shortener")).toBeGreaterThan(reach("quad_leg_four_point"));
  });
});

describe("durability", () => {
  it("single leg very durable", () => {
    expect(durability("single_leg_vertical")).toBeGreaterThan(durability("adjustable_chain_shortener"));
  });
});

describe("flexibility", () => {
  it("adjustable most flexible", () => {
    expect(flexibility("adjustable_chain_shortener")).toBeGreaterThan(flexibility("quad_leg_four_point"));
  });
});

describe("csCost", () => {
  it("quad leg most expensive", () => {
    expect(csCost("quad_leg_four_point")).toBeGreaterThan(csCost("single_leg_vertical"));
  });
});

describe("adjustable", () => {
  it("adjustable chain is adjustable", () => {
    expect(adjustable("adjustable_chain_shortener")).toBe(true);
  });
  it("single leg not adjustable", () => {
    expect(adjustable("single_leg_vertical")).toBe(false);
  });
});

describe("forOverhead", () => {
  it("double leg for overhead", () => {
    expect(forOverhead("double_leg_bridle")).toBe(true);
  });
});

describe("grade", () => {
  it("single leg uses grade 80", () => {
    expect(grade("single_leg_vertical")).toBe("grade_80_alloy_quench_temper");
  });
});

describe("bestUse", () => {
  it("quad leg for heavy precast", () => {
    expect(bestUse("quad_leg_four_point")).toBe("heavy_precast_machine_four_corner");
  });
});

describe("chainSlingTypes", () => {
  it("returns 5 types", () => {
    expect(chainSlingTypes()).toHaveLength(5);
  });
});
