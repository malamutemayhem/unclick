import { describe, it, expect } from "vitest";
import {
  tensionEven, sizeRange, portability, adjustAngle,
  frameCost, tilting, scrollable, frameStyle,
  bestUse, tapestryFrames,
} from "../tapestry-frame-calc.js";

describe("tensionEven", () => {
  it("floor frame large most even tension", () => {
    expect(tensionEven("floor_frame_large")).toBeGreaterThan(tensionEven("lap_frame_portable"));
  });
});

describe("sizeRange", () => {
  it("floor frame large widest size range", () => {
    expect(sizeRange("floor_frame_large")).toBeGreaterThan(sizeRange("lap_frame_portable"));
  });
});

describe("portability", () => {
  it("lap frame portable most portable", () => {
    expect(portability("lap_frame_portable")).toBeGreaterThan(portability("floor_frame_large"));
  });
});

describe("adjustAngle", () => {
  it("adjustable frame tilt best angle adjust", () => {
    expect(adjustAngle("adjustable_frame_tilt")).toBeGreaterThan(adjustAngle("stretcher_bar_simple"));
  });
});

describe("frameCost", () => {
  it("floor frame large most expensive", () => {
    expect(frameCost("floor_frame_large")).toBeGreaterThan(frameCost("stretcher_bar_simple"));
  });
});

describe("tilting", () => {
  it("adjustable frame tilt is tilting", () => {
    expect(tilting("adjustable_frame_tilt")).toBe(true);
  });
  it("lap frame portable not tilting", () => {
    expect(tilting("lap_frame_portable")).toBe(false);
  });
});

describe("scrollable", () => {
  it("scroll frame long is scrollable", () => {
    expect(scrollable("scroll_frame_long")).toBe(true);
  });
  it("floor frame large not scrollable", () => {
    expect(scrollable("floor_frame_large")).toBe(false);
  });
});

describe("frameStyle", () => {
  it("scroll frame long uses scroll rod frame", () => {
    expect(frameStyle("scroll_frame_long")).toBe("scroll_rod_frame");
  });
});

describe("bestUse", () => {
  it("lap frame portable best for portable lap stitch", () => {
    expect(bestUse("lap_frame_portable")).toBe("portable_lap_stitch");
  });
});

describe("tapestryFrames", () => {
  it("returns 5 types", () => {
    expect(tapestryFrames()).toHaveLength(5);
  });
});
