import { describe, it, expect } from "vitest";
import {
  lineSpacing, guidanceLevel, flexibility, reusability,
  sheetCost, printable, showsAngle, gridStyle,
  bestScript, practiceSheets,
} from "../practice-sheet-calc.js";

describe("lineSpacing", () => {
  it("guideline angle slant best line spacing", () => {
    expect(lineSpacing("guideline_angle_slant")).toBeGreaterThan(lineSpacing("lightbox_trace_under"));
  });
});

describe("guidanceLevel", () => {
  it("guideline angle slant highest guidance", () => {
    expect(guidanceLevel("guideline_angle_slant")).toBeGreaterThan(guidanceLevel("dot_grid_flexible"));
  });
});

describe("flexibility", () => {
  it("dot grid flexible most flexible", () => {
    expect(flexibility("dot_grid_flexible")).toBeGreaterThan(flexibility("guideline_angle_slant"));
  });
});

describe("reusability", () => {
  it("lightbox trace under most reusable", () => {
    expect(reusability("lightbox_trace_under")).toBeGreaterThan(reusability("grid_square_basic"));
  });
});

describe("sheetCost", () => {
  it("lightbox trace under more expensive than grid square", () => {
    expect(sheetCost("lightbox_trace_under")).toBeGreaterThan(sheetCost("grid_square_basic"));
  });
});

describe("printable", () => {
  it("grid square basic is printable", () => {
    expect(printable("grid_square_basic")).toBe(true);
  });
  it("lightbox trace under is not printable", () => {
    expect(printable("lightbox_trace_under")).toBe(false);
  });
});

describe("showsAngle", () => {
  it("guideline angle slant shows angle", () => {
    expect(showsAngle("guideline_angle_slant")).toBe(true);
  });
  it("dot grid flexible does not show angle", () => {
    expect(showsAngle("dot_grid_flexible")).toBe(false);
  });
});

describe("gridStyle", () => {
  it("dot grid flexible uses evenly spaced dots", () => {
    expect(gridStyle("dot_grid_flexible")).toBe("evenly_spaced_dots");
  });
});

describe("bestScript", () => {
  it("guideline angle slant best for copperplate spencerian", () => {
    expect(bestScript("guideline_angle_slant")).toBe("copperplate_spencerian");
  });
});

describe("practiceSheets", () => {
  it("returns 5 types", () => {
    expect(practiceSheets()).toHaveLength(5);
  });
});
