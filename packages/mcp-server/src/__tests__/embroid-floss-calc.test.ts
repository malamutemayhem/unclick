import { describe, it, expect } from "vitest";
import {
  colorRange, stitchCover, sheen, stitchEase,
  flossCost, divisible, washable, fiberType,
  bestStitch, embroidFlosses,
} from "../embroid-floss-calc.js";

describe("colorRange", () => {
  it("cotton stranded six widest color range", () => {
    expect(colorRange("cotton_stranded_six")).toBeGreaterThan(colorRange("metallic_thread_shine"));
  });
});

describe("stitchCover", () => {
  it("wool crewel thick best stitch coverage", () => {
    expect(stitchCover("wool_crewel_thick")).toBeGreaterThan(stitchCover("metallic_thread_shine"));
  });
});

describe("sheen", () => {
  it("metallic thread shine most sheen", () => {
    expect(sheen("metallic_thread_shine")).toBeGreaterThan(sheen("wool_crewel_thick"));
  });
});

describe("stitchEase", () => {
  it("cotton stranded six easiest to stitch", () => {
    expect(stitchEase("cotton_stranded_six")).toBeGreaterThan(stitchEase("metallic_thread_shine"));
  });
});

describe("flossCost", () => {
  it("silk filament fine most expensive", () => {
    expect(flossCost("silk_filament_fine")).toBeGreaterThan(flossCost("cotton_stranded_six"));
  });
});

describe("divisible", () => {
  it("cotton stranded six is divisible", () => {
    expect(divisible("cotton_stranded_six")).toBe(true);
  });
  it("pearl cotton twist is not divisible", () => {
    expect(divisible("pearl_cotton_twist")).toBe(false);
  });
});

describe("washable", () => {
  it("cotton stranded six is washable", () => {
    expect(washable("cotton_stranded_six")).toBe(true);
  });
  it("metallic thread shine is not washable", () => {
    expect(washable("metallic_thread_shine")).toBe(false);
  });
});

describe("fiberType", () => {
  it("pearl cotton twist is twisted cotton cord", () => {
    expect(fiberType("pearl_cotton_twist")).toBe("twisted_cotton_cord");
  });
});

describe("bestStitch", () => {
  it("metallic thread shine best for highlight accent sparkle", () => {
    expect(bestStitch("metallic_thread_shine")).toBe("highlight_accent_sparkle");
  });
});

describe("embroidFlosses", () => {
  it("returns 5 types", () => {
    expect(embroidFlosses()).toHaveLength(5);
  });
});
