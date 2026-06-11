import { describe, it, expect } from "vitest";
import {
  markControl, blendSmooth, textureRange, durability,
  toolCost, heated, forCarving, tipStyle,
  bestUse, encausticTools,
} from "../encaustic-tool-calc.js";

describe("markControl", () => {
  it("stylus pen draw best mark control", () => {
    expect(markControl("stylus_pen_draw")).toBeGreaterThan(markControl("rubber_shaper_blend"));
  });
});

describe("blendSmooth", () => {
  it("rubber shaper blend smoothest blend", () => {
    expect(blendSmooth("rubber_shaper_blend")).toBeGreaterThan(blendSmooth("carving_tool_scrape"));
  });
});

describe("textureRange", () => {
  it("carving tool scrape widest texture range", () => {
    expect(textureRange("carving_tool_scrape")).toBeGreaterThan(textureRange("rubber_shaper_blend"));
  });
});

describe("durability", () => {
  it("palette knife spread most durable", () => {
    expect(durability("palette_knife_spread")).toBeGreaterThan(durability("rubber_shaper_blend"));
  });
});

describe("toolCost", () => {
  it("stylus pen draw most expensive", () => {
    expect(toolCost("stylus_pen_draw")).toBeGreaterThan(toolCost("rubber_shaper_blend"));
  });
});

describe("heated", () => {
  it("stylus pen draw is heated", () => {
    expect(heated("stylus_pen_draw")).toBe(true);
  });
  it("bristle brush stiff not heated", () => {
    expect(heated("bristle_brush_stiff")).toBe(false);
  });
});

describe("forCarving", () => {
  it("carving tool scrape is for carving", () => {
    expect(forCarving("carving_tool_scrape")).toBe(true);
  });
  it("palette knife spread not for carving", () => {
    expect(forCarving("palette_knife_spread")).toBe(false);
  });
});

describe("tipStyle", () => {
  it("rubber shaper blend uses silicone rubber tip", () => {
    expect(tipStyle("rubber_shaper_blend")).toBe("silicone_rubber_tip");
  });
});

describe("bestUse", () => {
  it("bristle brush stiff best for general wax apply", () => {
    expect(bestUse("bristle_brush_stiff")).toBe("general_wax_apply");
  });
});

describe("encausticTools", () => {
  it("returns 5 types", () => {
    expect(encausticTools()).toHaveLength(5);
  });
});
