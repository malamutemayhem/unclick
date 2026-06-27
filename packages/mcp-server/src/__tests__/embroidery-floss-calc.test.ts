import { describe, it, expect } from "vitest";
import {
  colorRange, stitchSmooth, durability, sheen,
  flossCost, divisible, washable, fiberContent,
  bestStitch, embroideryFlosses,
} from "../embroidery-floss-calc.js";

describe("colorRange", () => {
  it("cotton stranded six widest color range", () => {
    expect(colorRange("cotton_stranded_six")).toBeGreaterThan(colorRange("metallic_thread_sparkle"));
  });
});

describe("stitchSmooth", () => {
  it("silk filament sheen smoothest stitch", () => {
    expect(stitchSmooth("silk_filament_sheen")).toBeGreaterThan(stitchSmooth("metallic_thread_sparkle"));
  });
});

describe("durability", () => {
  it("cotton stranded six most durable", () => {
    expect(durability("cotton_stranded_six")).toBeGreaterThan(durability("metallic_thread_sparkle"));
  });
});

describe("sheen", () => {
  it("metallic thread sparkle most sheen", () => {
    expect(sheen("metallic_thread_sparkle")).toBeGreaterThan(sheen("wool_crewel_matte"));
  });
});

describe("flossCost", () => {
  it("silk filament sheen more expensive than cotton", () => {
    expect(flossCost("silk_filament_sheen")).toBeGreaterThan(flossCost("cotton_stranded_six"));
  });
});

describe("divisible", () => {
  it("cotton stranded six is divisible", () => {
    expect(divisible("cotton_stranded_six")).toBe(true);
  });
  it("metallic thread sparkle is not divisible", () => {
    expect(divisible("metallic_thread_sparkle")).toBe(false);
  });
});

describe("washable", () => {
  it("cotton stranded six is washable", () => {
    expect(washable("cotton_stranded_six")).toBe(true);
  });
  it("silk filament sheen is not washable", () => {
    expect(washable("silk_filament_sheen")).toBe(false);
  });
});

describe("fiberContent", () => {
  it("wool crewel matte uses fine wool single ply", () => {
    expect(fiberContent("wool_crewel_matte")).toBe("fine_wool_single_ply");
  });
});

describe("bestStitch", () => {
  it("cotton stranded six best for cross stitch general", () => {
    expect(bestStitch("cotton_stranded_six")).toBe("cross_stitch_general");
  });
});

describe("embroideryFlosses", () => {
  it("returns 5 types", () => {
    expect(embroideryFlosses()).toHaveLength(5);
  });
});
