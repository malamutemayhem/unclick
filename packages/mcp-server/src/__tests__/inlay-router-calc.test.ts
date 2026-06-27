import { describe, it, expect } from "vitest";
import {
  channelClean, depthControl, curveFollow, speedCut,
  routerCost, powered, forFreehand, cutMethod,
  bestUse, inlayRouters,
} from "../inlay-router-calc.js";

describe("channelClean", () => {
  it("cnc carve program cleanest channel", () => {
    expect(channelClean("cnc_carve_program")).toBeGreaterThan(channelClean("dremel_rotary_small"));
  });
});

describe("depthControl", () => {
  it("plunge router depth best depth control", () => {
    expect(depthControl("plunge_router_depth")).toBeGreaterThan(depthControl("dremel_rotary_small"));
  });
});

describe("curveFollow", () => {
  it("cnc carve program best curve follow", () => {
    expect(curveFollow("cnc_carve_program")).toBeGreaterThan(curveFollow("hand_scratch_stock"));
  });
});

describe("speedCut", () => {
  it("cnc carve program fastest cut", () => {
    expect(speedCut("cnc_carve_program")).toBeGreaterThan(speedCut("hand_scratch_stock"));
  });
});

describe("routerCost", () => {
  it("cnc carve program most expensive", () => {
    expect(routerCost("cnc_carve_program")).toBeGreaterThan(routerCost("hand_scratch_stock"));
  });
});

describe("powered", () => {
  it("dremel rotary small is powered", () => {
    expect(powered("dremel_rotary_small")).toBe(true);
  });
  it("hand scratch stock not powered", () => {
    expect(powered("hand_scratch_stock")).toBe(false);
  });
});

describe("forFreehand", () => {
  it("dremel rotary small is for freehand", () => {
    expect(forFreehand("dremel_rotary_small")).toBe(true);
  });
  it("plunge router depth not for freehand", () => {
    expect(forFreehand("plunge_router_depth")).toBe(false);
  });
});

describe("cutMethod", () => {
  it("hand scratch stock uses scrape profile", () => {
    expect(cutMethod("hand_scratch_stock")).toBe("scrape_profile");
  });
});

describe("bestUse", () => {
  it("cnc carve program best for complex pattern route", () => {
    expect(bestUse("cnc_carve_program")).toBe("complex_pattern_route");
  });
});

describe("inlayRouters", () => {
  it("returns 5 types", () => {
    expect(inlayRouters()).toHaveLength(5);
  });
});
