import { describe, it, expect } from "vitest";
import {
  holdSecure, stitchCapacity, accessEase, portability,
  holderCost, reusable, forLarge, holderStyle,
  bestUse, stitchHolders,
} from "../stitch-holder-calc.js";

describe("holdSecure", () => {
  it("locking holder long most secure hold", () => {
    expect(holdSecure("locking_holder_long")).toBeGreaterThan(holdSecure("waste_yarn_hold"));
  });
});

describe("stitchCapacity", () => {
  it("circular holder flex highest stitch capacity", () => {
    expect(stitchCapacity("circular_holder_flex")).toBeGreaterThan(stitchCapacity("safety_pin_basic"));
  });
});

describe("accessEase", () => {
  it("waste yarn hold easiest access", () => {
    expect(accessEase("waste_yarn_hold")).toBeGreaterThan(accessEase("locking_holder_long"));
  });
});

describe("portability", () => {
  it("safety pin basic most portable", () => {
    expect(portability("safety_pin_basic")).toBeGreaterThan(portability("circular_holder_flex"));
  });
});

describe("holderCost", () => {
  it("circular holder flex most expensive", () => {
    expect(holderCost("circular_holder_flex")).toBeGreaterThan(holderCost("safety_pin_basic"));
  });
});

describe("reusable", () => {
  it("safety pin basic is reusable", () => {
    expect(reusable("safety_pin_basic")).toBe(true);
  });
  it("waste yarn hold not reusable", () => {
    expect(reusable("waste_yarn_hold")).toBe(false);
  });
});

describe("forLarge", () => {
  it("circular holder flex is for large", () => {
    expect(forLarge("circular_holder_flex")).toBe(true);
  });
  it("safety pin basic not for large", () => {
    expect(forLarge("safety_pin_basic")).toBe(false);
  });
});

describe("holderStyle", () => {
  it("cable holder curved uses curved metal hook", () => {
    expect(holderStyle("cable_holder_curved")).toBe("curved_metal_hook");
  });
});

describe("bestUse", () => {
  it("safety pin basic best for small stitch hold", () => {
    expect(bestUse("safety_pin_basic")).toBe("small_stitch_hold");
  });
});

describe("stitchHolders", () => {
  it("returns 5 types", () => {
    expect(stitchHolders()).toHaveLength(5);
  });
});
