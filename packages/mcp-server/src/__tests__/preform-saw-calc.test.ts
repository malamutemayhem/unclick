import { describe, it, expect } from "vitest";
import {
  cutSpeed, cutAccuracy, maxThickness, wasteLow,
  sawCost, contourCut, coolantFed, bladeType,
  bestUse, preformSaws,
} from "../preform-saw-calc.js";

describe("cutSpeed", () => {
  it("tile saw wet fastest cut", () => {
    expect(cutSpeed("tile_saw_wet")).toBeGreaterThan(cutSpeed("wire_saw_contour"));
  });
});

describe("cutAccuracy", () => {
  it("wire saw contour most accurate", () => {
    expect(cutAccuracy("wire_saw_contour")).toBeGreaterThan(cutAccuracy("tile_saw_wet"));
  });
});

describe("maxThickness", () => {
  it("slab saw large thickest cut", () => {
    expect(maxThickness("slab_saw_large")).toBeGreaterThan(maxThickness("trim_saw_small"));
  });
});

describe("wasteLow", () => {
  it("wire saw contour least waste", () => {
    expect(wasteLow("wire_saw_contour")).toBeGreaterThan(wasteLow("slab_saw_large"));
  });
});

describe("sawCost", () => {
  it("band saw diamond most expensive", () => {
    expect(sawCost("band_saw_diamond")).toBeGreaterThan(sawCost("tile_saw_wet"));
  });
});

describe("contourCut", () => {
  it("wire saw contour can contour cut", () => {
    expect(contourCut("wire_saw_contour")).toBe(true);
  });
  it("slab saw large cannot contour cut", () => {
    expect(contourCut("slab_saw_large")).toBe(false);
  });
});

describe("coolantFed", () => {
  it("slab saw large is coolant fed", () => {
    expect(coolantFed("slab_saw_large")).toBe(true);
  });
});

describe("bladeType", () => {
  it("wire saw contour uses diamond wire loop", () => {
    expect(bladeType("wire_saw_contour")).toBe("diamond_wire_loop");
  });
});

describe("bestUse", () => {
  it("band saw diamond best for freeform shape cut", () => {
    expect(bestUse("band_saw_diamond")).toBe("freeform_shape_cut");
  });
});

describe("preformSaws", () => {
  it("returns 5 types", () => {
    expect(preformSaws()).toHaveLength(5);
  });
});
