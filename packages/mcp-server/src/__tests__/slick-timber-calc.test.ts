import { describe, it, expect } from "vitest";
import {
  cutSmooth, reachDepth, controlPush, bladeWidth,
  slickCost, cranked, forCorner, handleLength,
  bestUse, slickTimbers,
} from "../slick-timber-calc.js";

describe("cutSmooth", () => {
  it("paring slick thin smoothest cut", () => {
    expect(cutSmooth("paring_slick_thin")).toBeGreaterThan(cutSmooth("corner_slick_angle"));
  });
});

describe("reachDepth", () => {
  it("cranked neck offset best reach depth", () => {
    expect(reachDepth("cranked_neck_offset")).toBeGreaterThan(reachDepth("paring_slick_thin"));
  });
});

describe("controlPush", () => {
  it("paring slick thin best control push", () => {
    expect(controlPush("paring_slick_thin")).toBeGreaterThan(controlPush("cranked_neck_offset"));
  });
});

describe("bladeWidth", () => {
  it("ship slick heavy widest blade", () => {
    expect(bladeWidth("ship_slick_heavy")).toBeGreaterThan(bladeWidth("corner_slick_angle"));
  });
});

describe("slickCost", () => {
  it("ship slick heavy most expensive", () => {
    expect(slickCost("ship_slick_heavy")).toBeGreaterThan(slickCost("paring_slick_thin"));
  });
});

describe("cranked", () => {
  it("cranked neck offset is cranked", () => {
    expect(cranked("cranked_neck_offset")).toBe(true);
  });
  it("straight slick long not cranked", () => {
    expect(cranked("straight_slick_long")).toBe(false);
  });
});

describe("forCorner", () => {
  it("corner slick angle is for corner", () => {
    expect(forCorner("corner_slick_angle")).toBe(true);
  });
  it("straight slick long not for corner", () => {
    expect(forCorner("straight_slick_long")).toBe(false);
  });
});

describe("handleLength", () => {
  it("ship slick heavy uses long 30 inch", () => {
    expect(handleLength("ship_slick_heavy")).toBe("long_30_inch");
  });
});

describe("bestUse", () => {
  it("paring slick thin best for fine surface pare", () => {
    expect(bestUse("paring_slick_thin")).toBe("fine_surface_pare");
  });
});

describe("slickTimbers", () => {
  it("returns 5 types", () => {
    expect(slickTimbers()).toHaveLength(5);
  });
});
