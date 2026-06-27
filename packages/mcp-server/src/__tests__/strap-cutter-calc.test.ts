import { describe, it, expect } from "vitest";
import {
  cutStraight, widthConsist, cutSpeed, thicknessRange,
  cutterCost, adjustable, forThick, bladeType,
  bestUse, strapCutters,
} from "../strap-cutter-calc.js";

describe("cutStraight", () => {
  it("adjustable fence set straightest cut", () => {
    expect(cutStraight("adjustable_fence_set")).toBeGreaterThan(cutStraight("rotary_wheel_roll"));
  });
});

describe("widthConsist", () => {
  it("adjustable fence set most consistent width", () => {
    expect(widthConsist("adjustable_fence_set")).toBeGreaterThan(widthConsist("straight_edge_knife"));
  });
});

describe("cutSpeed", () => {
  it("rotary wheel roll fastest cut", () => {
    expect(cutSpeed("rotary_wheel_roll")).toBeGreaterThan(cutSpeed("straight_edge_knife"));
  });
});

describe("thicknessRange", () => {
  it("straight edge knife widest thickness range", () => {
    expect(thicknessRange("straight_edge_knife")).toBeGreaterThan(thicknessRange("rotary_wheel_roll"));
  });
});

describe("cutterCost", () => {
  it("adjustable fence set most expensive", () => {
    expect(cutterCost("adjustable_fence_set")).toBeGreaterThan(cutterCost("straight_edge_knife"));
  });
});

describe("adjustable", () => {
  it("draw gauge pull is adjustable", () => {
    expect(adjustable("draw_gauge_pull")).toBe(true);
  });
  it("rotary wheel roll not adjustable", () => {
    expect(adjustable("rotary_wheel_roll")).toBe(false);
  });
});

describe("forThick", () => {
  it("draw gauge pull is for thick", () => {
    expect(forThick("draw_gauge_pull")).toBe(true);
  });
  it("rotary wheel roll not for thick", () => {
    expect(forThick("rotary_wheel_roll")).toBe(false);
  });
});

describe("bladeType", () => {
  it("adjustable fence set uses fence rail blade", () => {
    expect(bladeType("adjustable_fence_set")).toBe("fence_rail_blade");
  });
});

describe("bestUse", () => {
  it("adjustable fence set best for precision width repeat", () => {
    expect(bestUse("adjustable_fence_set")).toBe("precision_width_repeat");
  });
});

describe("strapCutters", () => {
  it("returns 5 types", () => {
    expect(strapCutters()).toHaveLength(5);
  });
});
