import { describe, it, expect } from "vitest";
import {
  stretchEven, fabricSafe, widthRange, setupSpeed,
  tenterCost, adjustable, forDelicate, gripType,
  bestUse, tenteringHooks,
} from "../tentering-hook-calc.js";

describe("stretchEven", () => {
  it("pin stenter frame most even stretch", () => {
    expect(stretchEven("pin_stenter_frame")).toBeGreaterThan(stretchEven("portable_stretch_clamp"));
  });
});

describe("fabricSafe", () => {
  it("clip stenter grip safest for fabric", () => {
    expect(fabricSafe("clip_stenter_grip")).toBeGreaterThan(fabricSafe("hook_rail_slide"));
  });
});

describe("widthRange", () => {
  it("adjustable width bar widest range", () => {
    expect(widthRange("adjustable_width_bar")).toBeGreaterThan(widthRange("portable_stretch_clamp"));
  });
});

describe("setupSpeed", () => {
  it("portable stretch clamp fastest setup", () => {
    expect(setupSpeed("portable_stretch_clamp")).toBeGreaterThan(setupSpeed("pin_stenter_frame"));
  });
});

describe("tenterCost", () => {
  it("adjustable width bar most expensive", () => {
    expect(tenterCost("adjustable_width_bar")).toBeGreaterThan(tenterCost("portable_stretch_clamp"));
  });
});

describe("adjustable", () => {
  it("hook rail slide is adjustable", () => {
    expect(adjustable("hook_rail_slide")).toBe(true);
  });
  it("pin stenter frame not adjustable", () => {
    expect(adjustable("pin_stenter_frame")).toBe(false);
  });
});

describe("forDelicate", () => {
  it("clip stenter grip is for delicate", () => {
    expect(forDelicate("clip_stenter_grip")).toBe(true);
  });
  it("hook rail slide not for delicate", () => {
    expect(forDelicate("hook_rail_slide")).toBe(false);
  });
});

describe("gripType", () => {
  it("portable stretch clamp uses clamp edge grip", () => {
    expect(gripType("portable_stretch_clamp")).toBe("clamp_edge_grip");
  });
});

describe("bestUse", () => {
  it("adjustable width bar best for variable width dry", () => {
    expect(bestUse("adjustable_width_bar")).toBe("variable_width_dry");
  });
});

describe("tenteringHooks", () => {
  it("returns 5 types", () => {
    expect(tenteringHooks()).toHaveLength(5);
  });
});
