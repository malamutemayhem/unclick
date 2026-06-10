import { describe, it, expect } from "vitest";
import {
  warpSpread, easeOfUse, warpProtect, widthRange,
  raddleCost, adjustable, hasClamp, raddleMaterial,
  bestUse, raddles,
} from "../raddle-calc.js";

describe("warpSpread", () => {
  it("adjustable width slide best warp spread", () => {
    expect(warpSpread("adjustable_width_slide")).toBeGreaterThan(warpSpread("paddle_raddle_combo"));
  });
});

describe("easeOfUse", () => {
  it("paddle raddle combo easiest to use", () => {
    expect(easeOfUse("paddle_raddle_combo")).toBeGreaterThan(easeOfUse("sectional_beam_guide"));
  });
});

describe("warpProtect", () => {
  it("paddle raddle combo best warp protection", () => {
    expect(warpProtect("paddle_raddle_combo")).toBeGreaterThan(warpProtect("metal_tooth_clamp"));
  });
});

describe("widthRange", () => {
  it("adjustable width slide widest range", () => {
    expect(widthRange("adjustable_width_slide")).toBeGreaterThan(widthRange("wood_peg_basic"));
  });
});

describe("raddleCost", () => {
  it("sectional beam guide most expensive", () => {
    expect(raddleCost("sectional_beam_guide")).toBeGreaterThan(raddleCost("wood_peg_basic"));
  });
});

describe("adjustable", () => {
  it("adjustable width slide is adjustable", () => {
    expect(adjustable("adjustable_width_slide")).toBe(true);
  });
  it("wood peg basic is not adjustable", () => {
    expect(adjustable("wood_peg_basic")).toBe(false);
  });
});

describe("hasClamp", () => {
  it("metal tooth clamp has clamp", () => {
    expect(hasClamp("metal_tooth_clamp")).toBe(true);
  });
  it("wood peg basic has no clamp", () => {
    expect(hasClamp("wood_peg_basic")).toBe(false);
  });
});

describe("raddleMaterial", () => {
  it("adjustable width slide uses aluminum slide track", () => {
    expect(raddleMaterial("adjustable_width_slide")).toBe("aluminum_slide_track");
  });
});

describe("bestUse", () => {
  it("sectional beam guide best for sectional beam warp", () => {
    expect(bestUse("sectional_beam_guide")).toBe("sectional_beam_warp");
  });
});

describe("raddles", () => {
  it("returns 5 types", () => {
    expect(raddles()).toHaveLength(5);
  });
});
