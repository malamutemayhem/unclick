import { describe, it, expect } from "vitest";
import {
  pareSmooth, reachDepth, controlPush, edgeRetention,
  slickCost, cranked, forMortise, bladeWidth,
  bestUse, slickChisels,
} from "../slick-chisel-calc.js";

describe("pareSmooth", () => {
  it("timber framing long smoothest pare", () => {
    expect(pareSmooth("timber_framing_long")).toBeGreaterThan(pareSmooth("corner_chisel_square"));
  });
});

describe("reachDepth", () => {
  it("timber framing long deepest reach", () => {
    expect(reachDepth("timber_framing_long")).toBeGreaterThan(reachDepth("skew_angle_dovetail"));
  });
});

describe("controlPush", () => {
  it("skew angle dovetail best control", () => {
    expect(controlPush("skew_angle_dovetail")).toBeGreaterThan(controlPush("timber_framing_long"));
  });
});

describe("edgeRetention", () => {
  it("corner chisel square best edge retention", () => {
    expect(edgeRetention("corner_chisel_square")).toBeGreaterThan(edgeRetention("standard_flat_wide"));
  });
});

describe("slickCost", () => {
  it("timber framing long most expensive", () => {
    expect(slickCost("timber_framing_long")).toBeGreaterThan(slickCost("standard_flat_wide"));
  });
});

describe("cranked", () => {
  it("cranked neck offset is cranked", () => {
    expect(cranked("cranked_neck_offset")).toBe(true);
  });
  it("standard flat wide not cranked", () => {
    expect(cranked("standard_flat_wide")).toBe(false);
  });
});

describe("forMortise", () => {
  it("corner chisel square is for mortise", () => {
    expect(forMortise("corner_chisel_square")).toBe(true);
  });
  it("standard flat wide not for mortise", () => {
    expect(forMortise("standard_flat_wide")).toBe(false);
  });
});

describe("bladeWidth", () => {
  it("timber framing long uses four inch extra", () => {
    expect(bladeWidth("timber_framing_long")).toBe("four_inch_extra");
  });
});

describe("bestUse", () => {
  it("corner chisel square best for mortise corner clean", () => {
    expect(bestUse("corner_chisel_square")).toBe("mortise_corner_clean");
  });
});

describe("slickChisels", () => {
  it("returns 5 types", () => {
    expect(slickChisels()).toHaveLength(5);
  });
});
