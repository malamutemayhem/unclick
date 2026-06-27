import { describe, it, expect } from "vitest";
import {
  warpEven, speedWind, lengthRange, spaceCompact,
  millCost, powered, wallMount, frameStyle,
  bestUse, warpingMills,
} from "../warping-mill-calc.js";

describe("warpEven", () => {
  it("paddled mill sectional most even warp", () => {
    expect(warpEven("paddled_mill_sectional")).toBeGreaterThan(warpEven("warping_board_wall"));
  });
});

describe("speedWind", () => {
  it("electric mill power fastest wind", () => {
    expect(speedWind("electric_mill_power")).toBeGreaterThan(speedWind("warping_board_wall"));
  });
});

describe("lengthRange", () => {
  it("horizontal mill floor longest range", () => {
    expect(lengthRange("horizontal_mill_floor")).toBeGreaterThan(lengthRange("warping_board_wall"));
  });
});

describe("spaceCompact", () => {
  it("warping board wall most compact", () => {
    expect(spaceCompact("warping_board_wall")).toBeGreaterThan(spaceCompact("horizontal_mill_floor"));
  });
});

describe("millCost", () => {
  it("electric mill power most expensive", () => {
    expect(millCost("electric_mill_power")).toBeGreaterThan(millCost("warping_board_wall"));
  });
});

describe("powered", () => {
  it("electric mill power is powered", () => {
    expect(powered("electric_mill_power")).toBe(true);
  });
  it("vertical mill standard not powered", () => {
    expect(powered("vertical_mill_standard")).toBe(false);
  });
});

describe("wallMount", () => {
  it("warping board wall is wall mount", () => {
    expect(wallMount("warping_board_wall")).toBe(true);
  });
  it("vertical mill standard not wall mount", () => {
    expect(wallMount("vertical_mill_standard")).toBe(false);
  });
});

describe("frameStyle", () => {
  it("paddled mill sectional uses paddle section cage", () => {
    expect(frameStyle("paddled_mill_sectional")).toBe("paddle_section_cage");
  });
});

describe("bestUse", () => {
  it("vertical mill standard best for general long warp", () => {
    expect(bestUse("vertical_mill_standard")).toBe("general_long_warp");
  });
});

describe("warpingMills", () => {
  it("returns 5 types", () => {
    expect(warpingMills()).toHaveLength(5);
  });
});
