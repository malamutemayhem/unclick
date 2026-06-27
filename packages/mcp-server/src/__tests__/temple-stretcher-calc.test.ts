import { describe, it, expect } from "vitest";
import {
  gripHold, widthConsist, fabricSafe, adjustSpeed,
  templeCost, adjustable, forDelicate, gripMethod,
  bestUse, templeStretchers,
} from "../temple-stretcher-calc.js";

describe("gripHold", () => {
  it("spring temple clip strongest grip", () => {
    expect(gripHold("spring_temple_clip")).toBeGreaterThan(gripHold("pin_temple_wood"));
  });
});

describe("widthConsist", () => {
  it("adjustable slide bar most consistent width", () => {
    expect(widthConsist("adjustable_slide_bar")).toBeGreaterThan(widthConsist("pin_temple_wood"));
  });
});

describe("fabricSafe", () => {
  it("pin temple wood safest for fabric", () => {
    expect(fabricSafe("pin_temple_wood")).toBeGreaterThan(fabricSafe("hook_temple_comb"));
  });
});

describe("adjustSpeed", () => {
  it("spring temple clip fastest adjust", () => {
    expect(adjustSpeed("spring_temple_clip")).toBeGreaterThan(adjustSpeed("pin_temple_wood"));
  });
});

describe("templeCost", () => {
  it("adjustable slide bar most expensive", () => {
    expect(templeCost("adjustable_slide_bar")).toBeGreaterThan(templeCost("pin_temple_wood"));
  });
});

describe("adjustable", () => {
  it("spring temple clip is adjustable", () => {
    expect(adjustable("spring_temple_clip")).toBe(true);
  });
  it("roller temple metal not adjustable", () => {
    expect(adjustable("roller_temple_metal")).toBe(false);
  });
});

describe("forDelicate", () => {
  it("pin temple wood is for delicate", () => {
    expect(forDelicate("pin_temple_wood")).toBe(true);
  });
  it("hook temple comb not for delicate", () => {
    expect(forDelicate("hook_temple_comb")).toBe(false);
  });
});

describe("gripMethod", () => {
  it("hook temple comb uses hook comb teeth", () => {
    expect(gripMethod("hook_temple_comb")).toBe("hook_comb_teeth");
  });
});

describe("bestUse", () => {
  it("adjustable slide bar best for variable width weave", () => {
    expect(bestUse("adjustable_slide_bar")).toBe("variable_width_weave");
  });
});

describe("templeStretchers", () => {
  it("returns 5 types", () => {
    expect(templeStretchers()).toHaveLength(5);
  });
});
