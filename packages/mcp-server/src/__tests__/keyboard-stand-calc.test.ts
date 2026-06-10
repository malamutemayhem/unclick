import { describe, it, expect } from "vitest";
import {
  stability, heightAdjust, portability, loadCapacity,
  standCost, multiTier, foldFlat, frameMaterial,
  bestSetup, keyboardStands,
} from "../keyboard-stand-calc.js";

describe("stability", () => {
  it("a frame double tier most stable", () => {
    expect(stability("a_frame_double_tier")).toBeGreaterThan(stability("x_style_single_brace"));
  });
});

describe("heightAdjust", () => {
  it("z style heavy duty best height adjust", () => {
    expect(heightAdjust("z_style_heavy_duty")).toBeGreaterThan(heightAdjust("table_top_desktop"));
  });
});

describe("portability", () => {
  it("x style single brace most portable", () => {
    expect(portability("x_style_single_brace")).toBeGreaterThan(portability("z_style_heavy_duty"));
  });
});

describe("loadCapacity", () => {
  it("z style heavy duty highest load capacity", () => {
    expect(loadCapacity("z_style_heavy_duty")).toBeGreaterThan(loadCapacity("table_top_desktop"));
  });
});

describe("standCost", () => {
  it("column pillar sleek most expensive", () => {
    expect(standCost("column_pillar_sleek")).toBeGreaterThan(standCost("x_style_single_brace"));
  });
});

describe("multiTier", () => {
  it("a frame double tier is multi tier", () => {
    expect(multiTier("a_frame_double_tier")).toBe(true);
  });
  it("x style single brace is not", () => {
    expect(multiTier("x_style_single_brace")).toBe(false);
  });
});

describe("foldFlat", () => {
  it("x style single brace folds flat", () => {
    expect(foldFlat("x_style_single_brace")).toBe(true);
  });
  it("table top desktop does not", () => {
    expect(foldFlat("table_top_desktop")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("z style heavy duty uses welded steel heavy", () => {
    expect(frameMaterial("z_style_heavy_duty")).toBe("welded_steel_heavy");
  });
});

describe("bestSetup", () => {
  it("x style single brace best for gigging quick setup", () => {
    expect(bestSetup("x_style_single_brace")).toBe("gigging_quick_setup");
  });
});

describe("keyboardStands", () => {
  it("returns 5 types", () => {
    expect(keyboardStands()).toHaveLength(5);
  });
});
