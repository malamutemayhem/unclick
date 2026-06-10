import { describe, it, expect } from "vitest";
import {
  stitchCapacity, versatility, handComfort, portability,
  hookCost, doubleEnded, sizeSwap, hookMaterial,
  bestProject, tunisianHooks,
} from "../tunisian-hook-calc.js";

describe("stitchCapacity", () => {
  it("cable flexible long most stitch capacity", () => {
    expect(stitchCapacity("cable_flexible_long")).toBeGreaterThan(stitchCapacity("double_end_cro"));
  });
});

describe("versatility", () => {
  it("interchangeable set most versatile", () => {
    expect(versatility("interchangeable_set")).toBeGreaterThan(versatility("single_end_standard"));
  });
});

describe("handComfort", () => {
  it("ergonomic cushion grip most comfortable", () => {
    expect(handComfort("ergonomic_cushion_grip")).toBeGreaterThan(handComfort("double_end_cro"));
  });
});

describe("portability", () => {
  it("single end standard most portable", () => {
    expect(portability("single_end_standard")).toBeGreaterThan(portability("cable_flexible_long"));
  });
});

describe("hookCost", () => {
  it("interchangeable set most expensive", () => {
    expect(hookCost("interchangeable_set")).toBeGreaterThan(hookCost("single_end_standard"));
  });
});

describe("doubleEnded", () => {
  it("double end cro is double ended", () => {
    expect(doubleEnded("double_end_cro")).toBe(true);
  });
  it("single end standard is not double ended", () => {
    expect(doubleEnded("single_end_standard")).toBe(false);
  });
});

describe("sizeSwap", () => {
  it("interchangeable set allows size swap", () => {
    expect(sizeSwap("interchangeable_set")).toBe(true);
  });
  it("cable flexible long does not allow size swap", () => {
    expect(sizeSwap("cable_flexible_long")).toBe(false);
  });
});

describe("hookMaterial", () => {
  it("double end cro uses bamboo smooth double", () => {
    expect(hookMaterial("double_end_cro")).toBe("bamboo_smooth_double");
  });
});

describe("bestProject", () => {
  it("cable flexible long best for wide blanket afghan", () => {
    expect(bestProject("cable_flexible_long")).toBe("wide_blanket_afghan");
  });
});

describe("tunisianHooks", () => {
  it("returns 5 types", () => {
    expect(tunisianHooks()).toHaveLength(5);
  });
});
