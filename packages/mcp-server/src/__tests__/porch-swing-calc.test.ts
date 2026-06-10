import { describe, it, expect } from "vitest";
import {
  comfort, seatCapacity, weatherResist, installEase,
  swingCost, needsCeiling, hasCanopy, frameType,
  bestSpot, porchSwings,
} from "../porch-swing-calc.js";

describe("comfort", () => {
  it("daybed canopy cushion most comfortable", () => {
    expect(comfort("daybed_canopy_cushion")).toBeGreaterThan(comfort("wood_slat_classic"));
  });
});

describe("seatCapacity", () => {
  it("porch bed hanging largest seat capacity", () => {
    expect(seatCapacity("porch_bed_hanging")).toBeGreaterThan(seatCapacity("wood_slat_classic"));
  });
});

describe("weatherResist", () => {
  it("wicker resin curved best weather resist", () => {
    expect(weatherResist("wicker_resin_curved")).toBeGreaterThan(weatherResist("porch_bed_hanging"));
  });
});

describe("installEase", () => {
  it("metal glider frame easiest install", () => {
    expect(installEase("metal_glider_frame")).toBeGreaterThan(installEase("porch_bed_hanging"));
  });
});

describe("swingCost", () => {
  it("porch bed hanging most expensive", () => {
    expect(swingCost("porch_bed_hanging")).toBeGreaterThan(swingCost("wood_slat_classic"));
  });
});

describe("needsCeiling", () => {
  it("wood slat classic needs ceiling", () => {
    expect(needsCeiling("wood_slat_classic")).toBe(true);
  });
  it("metal glider frame does not need ceiling", () => {
    expect(needsCeiling("metal_glider_frame")).toBe(false);
  });
});

describe("hasCanopy", () => {
  it("daybed canopy cushion has canopy", () => {
    expect(hasCanopy("daybed_canopy_cushion")).toBe(true);
  });
  it("wood slat classic has no canopy", () => {
    expect(hasCanopy("wood_slat_classic")).toBe(false);
  });
});

describe("frameType", () => {
  it("metal glider frame uses steel a frame glide", () => {
    expect(frameType("metal_glider_frame")).toBe("steel_a_frame_glide");
  });
});

describe("bestSpot", () => {
  it("porch bed hanging best for deep porch sleeping", () => {
    expect(bestSpot("porch_bed_hanging")).toBe("deep_porch_sleeping");
  });
});

describe("porchSwings", () => {
  it("returns 5 types", () => {
    expect(porchSwings()).toHaveLength(5);
  });
});
