import { describe, it, expect } from "vitest";
import {
  detailFine, structureStrong, speedWork, patternRange,
  laceCost, freestanding, forEdging, stitchBase,
  bestUse, needleLaces,
} from "../needle-lace-calc.js";

describe("detailFine", () => {
  it("punto in aria free finest detail", () => {
    expect(detailFine("punto_in_aria_free")).toBeGreaterThan(detailFine("buttonhole_stitch_basic"));
  });
});

describe("structureStrong", () => {
  it("corded fill dense strongest structure", () => {
    expect(structureStrong("corded_fill_dense")).toBeGreaterThan(structureStrong("woven_picot_edge"));
  });
});

describe("speedWork", () => {
  it("buttonhole stitch basic fastest work", () => {
    expect(speedWork("buttonhole_stitch_basic")).toBeGreaterThan(speedWork("punto_in_aria_free"));
  });
});

describe("patternRange", () => {
  it("punto in aria free widest pattern range", () => {
    expect(patternRange("punto_in_aria_free")).toBeGreaterThan(patternRange("corded_fill_dense"));
  });
});

describe("laceCost", () => {
  it("punto in aria free most expensive", () => {
    expect(laceCost("punto_in_aria_free")).toBeGreaterThan(laceCost("buttonhole_stitch_basic"));
  });
});

describe("freestanding", () => {
  it("detached bar bridge is freestanding", () => {
    expect(freestanding("detached_bar_bridge")).toBe(true);
  });
  it("buttonhole stitch basic not freestanding", () => {
    expect(freestanding("buttonhole_stitch_basic")).toBe(false);
  });
});

describe("forEdging", () => {
  it("woven picot edge is for edging", () => {
    expect(forEdging("woven_picot_edge")).toBe(true);
  });
  it("buttonhole stitch basic not for edging", () => {
    expect(forEdging("buttonhole_stitch_basic")).toBe(false);
  });
});

describe("stitchBase", () => {
  it("corded fill dense uses corded buttonhole fill", () => {
    expect(stitchBase("corded_fill_dense")).toBe("corded_buttonhole_fill");
  });
});

describe("bestUse", () => {
  it("buttonhole stitch basic best for general fill stitch", () => {
    expect(bestUse("buttonhole_stitch_basic")).toBe("general_fill_stitch");
  });
});

describe("needleLaces", () => {
  it("returns 5 types", () => {
    expect(needleLaces()).toHaveLength(5);
  });
});
