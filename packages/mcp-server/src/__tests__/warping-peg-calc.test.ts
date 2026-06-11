import { describe, it, expect } from "vitest";
import {
  tensionConsist, lengthAccuracy, setupSpeed, warpCapacity,
  warpingCost, freestanding, forLongWarp, mountStyle,
  bestUse, warpingPegs,
} from "../warping-peg-calc.js";

describe("tensionConsist", () => {
  it("warping mill rotary most consistent tension", () => {
    expect(tensionConsist("warping_mill_rotary")).toBeGreaterThan(tensionConsist("single_clamp_peg"));
  });
});

describe("lengthAccuracy", () => {
  it("warping board frame most accurate length", () => {
    expect(lengthAccuracy("warping_board_frame")).toBeGreaterThan(lengthAccuracy("single_clamp_peg"));
  });
});

describe("setupSpeed", () => {
  it("single clamp peg fastest setup", () => {
    expect(setupSpeed("single_clamp_peg")).toBeGreaterThan(setupSpeed("warping_mill_rotary"));
  });
});

describe("warpCapacity", () => {
  it("warping mill rotary highest capacity", () => {
    expect(warpCapacity("warping_mill_rotary")).toBeGreaterThan(warpCapacity("single_clamp_peg"));
  });
});

describe("warpingCost", () => {
  it("warping mill rotary most expensive", () => {
    expect(warpingCost("warping_mill_rotary")).toBeGreaterThan(warpingCost("single_clamp_peg"));
  });
});

describe("freestanding", () => {
  it("warping mill rotary is freestanding", () => {
    expect(freestanding("warping_mill_rotary")).toBe(true);
  });
  it("single clamp peg not freestanding", () => {
    expect(freestanding("single_clamp_peg")).toBe(false);
  });
});

describe("forLongWarp", () => {
  it("warping mill rotary is for long warp", () => {
    expect(forLongWarp("warping_mill_rotary")).toBe(true);
  });
  it("warping board frame not for long warp", () => {
    expect(forLongWarp("warping_board_frame")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("paddle cross guide uses hand held paddle", () => {
    expect(mountStyle("paddle_cross_guide")).toBe("hand_held_paddle");
  });
});

describe("bestUse", () => {
  it("warping mill rotary best for long production warp", () => {
    expect(bestUse("warping_mill_rotary")).toBe("long_production_warp");
  });
});

describe("warpingPegs", () => {
  it("returns 5 types", () => {
    expect(warpingPegs()).toHaveLength(5);
  });
});
