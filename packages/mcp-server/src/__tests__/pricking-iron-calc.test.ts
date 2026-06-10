import { describe, it, expect } from "vitest";
import {
  holeCleanness, stitchAngle, durability, prongCount,
  ironCost, needsAwl, slantedHole, toothProfile,
  bestStitch, prickingIrons,
} from "../pricking-iron-calc.js";

describe("holeCleanness", () => {
  it("french style slant cleanest hole", () => {
    expect(holeCleanness("french_style_slant")).toBeGreaterThan(holeCleanness("chisel_flat_wide"));
  });
});

describe("stitchAngle", () => {
  it("french style slant best stitch angle", () => {
    expect(stitchAngle("french_style_slant")).toBeGreaterThan(stitchAngle("european_round_prong"));
  });
});

describe("durability", () => {
  it("chisel flat wide most durable", () => {
    expect(durability("chisel_flat_wide")).toBeGreaterThan(durability("japanese_diamond_point"));
  });
});

describe("prongCount", () => {
  it("spacing wheel roll highest prong count", () => {
    expect(prongCount("spacing_wheel_roll")).toBeGreaterThan(prongCount("chisel_flat_wide"));
  });
});

describe("ironCost", () => {
  it("french style slant more expensive than chisel flat", () => {
    expect(ironCost("french_style_slant")).toBeGreaterThan(ironCost("chisel_flat_wide"));
  });
});

describe("needsAwl", () => {
  it("french style slant needs awl", () => {
    expect(needsAwl("french_style_slant")).toBe(true);
  });
  it("japanese diamond point needs no awl", () => {
    expect(needsAwl("japanese_diamond_point")).toBe(false);
  });
});

describe("slantedHole", () => {
  it("french style slant makes slanted hole", () => {
    expect(slantedHole("french_style_slant")).toBe(true);
  });
  it("european round prong makes no slanted hole", () => {
    expect(slantedHole("european_round_prong")).toBe(false);
  });
});

describe("toothProfile", () => {
  it("japanese diamond point uses sharp diamond awl", () => {
    expect(toothProfile("japanese_diamond_point")).toBe("sharp_diamond_awl");
  });
});

describe("bestStitch", () => {
  it("french style slant best for saddle stitch elegant", () => {
    expect(bestStitch("french_style_slant")).toBe("saddle_stitch_elegant");
  });
});

describe("prickingIrons", () => {
  it("returns 5 types", () => {
    expect(prickingIrons()).toHaveLength(5);
  });
});
