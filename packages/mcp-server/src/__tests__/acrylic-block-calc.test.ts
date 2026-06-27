import { describe, it, expect } from "vitest";
import {
  seeThrough, stampGrip, pressEven, portability,
  blockCost, gridLines, hasHandle, blockShape,
  bestUse, acrylicBlocks,
} from "../acrylic-block-calc.js";

describe("seeThrough", () => {
  it("thin flex see most see through", () => {
    expect(seeThrough("thin_flex_see")).toBeGreaterThan(seeThrough("handle_grip_ergo"));
  });
});

describe("stampGrip", () => {
  it("handle grip ergo best stamp grip", () => {
    expect(stampGrip("handle_grip_ergo")).toBeGreaterThan(stampGrip("thin_flex_see"));
  });
});

describe("pressEven", () => {
  it("large rect base most even press", () => {
    expect(pressEven("large_rect_base")).toBeGreaterThan(pressEven("thin_flex_see"));
  });
});

describe("portability", () => {
  it("small square grip most portable", () => {
    expect(portability("small_square_grip")).toBeGreaterThan(portability("large_rect_base"));
  });
});

describe("blockCost", () => {
  it("large rect base most expensive", () => {
    expect(blockCost("large_rect_base")).toBeGreaterThan(blockCost("small_square_grip"));
  });
});

describe("gridLines", () => {
  it("small square grip has grid lines", () => {
    expect(gridLines("small_square_grip")).toBe(true);
  });
  it("round circle press no grid lines", () => {
    expect(gridLines("round_circle_press")).toBe(false);
  });
});

describe("hasHandle", () => {
  it("handle grip ergo has handle", () => {
    expect(hasHandle("handle_grip_ergo")).toBe(true);
  });
  it("small square grip no handle", () => {
    expect(hasHandle("small_square_grip")).toBe(false);
  });
});

describe("blockShape", () => {
  it("small square grip uses square clear etched", () => {
    expect(blockShape("small_square_grip")).toBe("square_clear_etched");
  });
});

describe("bestUse", () => {
  it("large rect base best for large background stamp", () => {
    expect(bestUse("large_rect_base")).toBe("large_background_stamp");
  });
});

describe("acrylicBlocks", () => {
  it("returns 5 types", () => {
    expect(acrylicBlocks()).toHaveLength(5);
  });
});
