import { describe, it, expect } from "vitest";
import {
  detailFine, repeatConsist, speedApply, patternRange,
  resistCost, reusable, forWax, applyMethod,
  bestUse, resistStamps,
} from "../resist-stamp-calc.js";

describe("detailFine", () => {
  it("tjanting wax pen finest detail", () => {
    expect(detailFine("tjanting_wax_pen")).toBeGreaterThan(detailFine("foam_roller_repeat"));
  });
});

describe("repeatConsist", () => {
  it("copper block print most consistent repeat", () => {
    expect(repeatConsist("copper_block_print")).toBeGreaterThan(repeatConsist("tjanting_wax_pen"));
  });
});

describe("speedApply", () => {
  it("foam roller repeat fastest apply", () => {
    expect(speedApply("foam_roller_repeat")).toBeGreaterThan(speedApply("tjanting_wax_pen"));
  });
});

describe("patternRange", () => {
  it("tjanting wax pen widest pattern range", () => {
    expect(patternRange("tjanting_wax_pen")).toBeGreaterThan(patternRange("foam_roller_repeat"));
  });
});

describe("resistCost", () => {
  it("copper block print most expensive", () => {
    expect(resistCost("copper_block_print")).toBeGreaterThan(resistCost("foam_roller_repeat"));
  });
});

describe("reusable", () => {
  it("copper block print is reusable", () => {
    expect(reusable("copper_block_print")).toBe(true);
  });
  it("foam roller repeat not reusable", () => {
    expect(reusable("foam_roller_repeat")).toBe(false);
  });
});

describe("forWax", () => {
  it("tjanting wax pen is for wax", () => {
    expect(forWax("tjanting_wax_pen")).toBe(true);
  });
  it("wooden block carved not for wax", () => {
    expect(forWax("wooden_block_carved")).toBe(false);
  });
});

describe("applyMethod", () => {
  it("screen mesh stencil uses screen squeegee push", () => {
    expect(applyMethod("screen_mesh_stencil")).toBe("screen_squeegee_push");
  });
});

describe("bestUse", () => {
  it("tjanting wax pen best for batik freehand wax", () => {
    expect(bestUse("tjanting_wax_pen")).toBe("batik_freehand_wax");
  });
});

describe("resistStamps", () => {
  it("returns 5 types", () => {
    expect(resistStamps()).toHaveLength(5);
  });
});
