import { describe, it, expect } from "vitest";
import {
  lineDetail, repeatConsist, colorContrast, setupSpeed,
  inlayCost, needsCarving, forRepeat, slipMethod,
  bestUse, mishimaInlays,
} from "../mishima-inlay-calc.js";

describe("lineDetail", () => {
  it("scratch line fine most detail", () => {
    expect(lineDetail("scratch_line_fine")).toBeGreaterThan(lineDetail("stencil_mask_apply"));
  });
});

describe("repeatConsist", () => {
  it("stamp press repeat most consistent", () => {
    expect(repeatConsist("stamp_press_repeat")).toBeGreaterThan(repeatConsist("scratch_line_fine"));
  });
});

describe("colorContrast", () => {
  it("chatoyant color shift most contrast", () => {
    expect(colorContrast("chatoyant_color_shift")).toBeGreaterThan(colorContrast("scratch_line_fine"));
  });
});

describe("setupSpeed", () => {
  it("stamp press repeat fastest setup", () => {
    expect(setupSpeed("stamp_press_repeat")).toBeGreaterThan(setupSpeed("chatoyant_color_shift"));
  });
});

describe("inlayCost", () => {
  it("chatoyant color shift most expensive", () => {
    expect(inlayCost("chatoyant_color_shift")).toBeGreaterThan(inlayCost("scratch_line_fine"));
  });
});

describe("needsCarving", () => {
  it("carve fill classic needs carving", () => {
    expect(needsCarving("carve_fill_classic")).toBe(true);
  });
  it("stamp press repeat no carving needed", () => {
    expect(needsCarving("stamp_press_repeat")).toBe(false);
  });
});

describe("forRepeat", () => {
  it("stamp press repeat is for repeat", () => {
    expect(forRepeat("stamp_press_repeat")).toBe(true);
  });
  it("carve fill classic not for repeat", () => {
    expect(forRepeat("carve_fill_classic")).toBe(false);
  });
});

describe("slipMethod", () => {
  it("stencil mask apply uses paper stencil coat", () => {
    expect(slipMethod("stencil_mask_apply")).toBe("paper_stencil_coat");
  });
});

describe("bestUse", () => {
  it("chatoyant color shift best for multi color effect", () => {
    expect(bestUse("chatoyant_color_shift")).toBe("multi_color_effect");
  });
});

describe("mishimaInlays", () => {
  it("returns 5 types", () => {
    expect(mishimaInlays()).toHaveLength(5);
  });
});
