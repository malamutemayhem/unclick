import { describe, it, expect } from "vitest";
import {
  stitchSpeed, versatility, handComfort, portability,
  needleCost, forCircular, sizeSwap, needleMaterial,
  bestProject, knitNeedles,
} from "../knit-needle-calc.js";

describe("stitchSpeed", () => {
  it("circular cable loop fastest stitching", () => {
    expect(stitchSpeed("circular_cable_loop")).toBeGreaterThan(stitchSpeed("square_ergonomic"));
  });
});

describe("versatility", () => {
  it("interchangeable tip most versatile", () => {
    expect(versatility("interchangeable_tip")).toBeGreaterThan(versatility("straight_single_pair"));
  });
});

describe("handComfort", () => {
  it("square ergonomic most comfortable", () => {
    expect(handComfort("square_ergonomic")).toBeGreaterThan(handComfort("double_point_set"));
  });
});

describe("portability", () => {
  it("circular cable loop most portable", () => {
    expect(portability("circular_cable_loop")).toBeGreaterThan(portability("straight_single_pair"));
  });
});

describe("needleCost", () => {
  it("interchangeable tip most expensive", () => {
    expect(needleCost("interchangeable_tip")).toBeGreaterThan(needleCost("straight_single_pair"));
  });
});

describe("forCircular", () => {
  it("circular cable loop is for circular", () => {
    expect(forCircular("circular_cable_loop")).toBe(true);
  });
  it("straight single pair is not for circular", () => {
    expect(forCircular("straight_single_pair")).toBe(false);
  });
});

describe("sizeSwap", () => {
  it("interchangeable tip allows size swap", () => {
    expect(sizeSwap("interchangeable_tip")).toBe(true);
  });
  it("circular cable loop does not allow size swap", () => {
    expect(sizeSwap("circular_cable_loop")).toBe(false);
  });
});

describe("needleMaterial", () => {
  it("double point set uses bamboo wood set", () => {
    expect(needleMaterial("double_point_set")).toBe("bamboo_wood_set");
  });
});

describe("bestProject", () => {
  it("double point set best for sock mitten small", () => {
    expect(bestProject("double_point_set")).toBe("sock_mitten_small");
  });
});

describe("knitNeedles", () => {
  it("returns 5 types", () => {
    expect(knitNeedles()).toHaveLength(5);
  });
});
