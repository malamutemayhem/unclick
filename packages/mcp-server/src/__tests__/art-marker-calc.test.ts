import { describe, it, expect } from "vitest";
import {
  colorVibrancy, blendAbility, lineControl, surfaceRange,
  markerCost, refillable, waterproof, tipStyle,
  bestProject, artMarkers,
} from "../art-marker-calc.js";

describe("colorVibrancy", () => {
  it("alcohol dual tip most vibrant", () => {
    expect(colorVibrancy("alcohol_dual_tip")).toBeGreaterThan(colorVibrancy("chalk_liquid"));
  });
});

describe("blendAbility", () => {
  it("alcohol dual tip best blending", () => {
    expect(blendAbility("alcohol_dual_tip")).toBeGreaterThan(blendAbility("acrylic_paint_pen"));
  });
});

describe("lineControl", () => {
  it("water based brush best line control", () => {
    expect(lineControl("water_based_brush")).toBeGreaterThan(lineControl("chalk_liquid"));
  });
});

describe("surfaceRange", () => {
  it("acrylic paint pen widest surface range", () => {
    expect(surfaceRange("acrylic_paint_pen")).toBeGreaterThan(surfaceRange("water_based_brush"));
  });
});

describe("markerCost", () => {
  it("alcohol dual tip most expensive", () => {
    expect(markerCost("alcohol_dual_tip")).toBeGreaterThan(markerCost("chalk_liquid"));
  });
});

describe("refillable", () => {
  it("alcohol dual tip is refillable", () => {
    expect(refillable("alcohol_dual_tip")).toBe(true);
  });
  it("water based brush is not", () => {
    expect(refillable("water_based_brush")).toBe(false);
  });
});

describe("waterproof", () => {
  it("acrylic paint pen is waterproof", () => {
    expect(waterproof("acrylic_paint_pen")).toBe(true);
  });
  it("water based brush is not", () => {
    expect(waterproof("water_based_brush")).toBe(false);
  });
});

describe("tipStyle", () => {
  it("alcohol dual tip uses chisel brush dual end", () => {
    expect(tipStyle("alcohol_dual_tip")).toBe("chisel_brush_dual_end");
  });
});

describe("bestProject", () => {
  it("chalk liquid for chalkboard sign menu", () => {
    expect(bestProject("chalk_liquid")).toBe("chalkboard_sign_menu");
  });
});

describe("artMarkers", () => {
  it("returns 5 types", () => {
    expect(artMarkers()).toHaveLength(5);
  });
});
