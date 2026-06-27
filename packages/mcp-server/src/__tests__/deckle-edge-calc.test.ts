import { describe, it, expect } from "vitest";
import {
  tearNatural, controlEven, speedEdge, paperRange,
  edgeCost, forThick, reusable, edgeMethod,
  bestUse, deckleEdges,
} from "../deckle-edge-calc.js";

describe("tearNatural", () => {
  it("deckle bar frame most natural tear", () => {
    expect(tearNatural("deckle_bar_frame")).toBeGreaterThan(tearNatural("rotary_deckle_wheel"));
  });
});

describe("controlEven", () => {
  it("rotary deckle wheel most even control", () => {
    expect(controlEven("rotary_deckle_wheel")).toBeGreaterThan(controlEven("deckle_bar_frame"));
  });
});

describe("speedEdge", () => {
  it("rotary deckle wheel fastest edge", () => {
    expect(speedEdge("rotary_deckle_wheel")).toBeGreaterThan(speedEdge("water_brush_feather"));
  });
});

describe("paperRange", () => {
  it("tearing tool guide widest paper range", () => {
    expect(paperRange("tearing_tool_guide")).toBeGreaterThan(paperRange("deckle_bar_frame"));
  });
});

describe("edgeCost", () => {
  it("rotary deckle wheel most expensive", () => {
    expect(edgeCost("rotary_deckle_wheel")).toBeGreaterThan(edgeCost("ruler_tear_straight"));
  });
});

describe("forThick", () => {
  it("deckle bar frame is for thick", () => {
    expect(forThick("deckle_bar_frame")).toBe(true);
  });
  it("ruler tear straight not for thick", () => {
    expect(forThick("ruler_tear_straight")).toBe(false);
  });
});

describe("reusable", () => {
  it("ruler tear straight is reusable", () => {
    expect(reusable("ruler_tear_straight")).toBe(true);
  });
  it("all deckle edges are reusable", () => {
    expect(reusable("rotary_deckle_wheel")).toBe(true);
  });
});

describe("edgeMethod", () => {
  it("water brush feather uses wet line feather", () => {
    expect(edgeMethod("water_brush_feather")).toBe("wet_line_feather");
  });
});

describe("bestUse", () => {
  it("ruler tear straight best for general torn edge", () => {
    expect(bestUse("ruler_tear_straight")).toBe("general_torn_edge");
  });
});

describe("deckleEdges", () => {
  it("returns 5 types", () => {
    expect(deckleEdges()).toHaveLength(5);
  });
});
