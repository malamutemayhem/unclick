import { describe, it, expect } from "vitest";
import {
  contrast, refreshRate, colorDepth, powerHold,
  epCost, bistable, forSignage, mechanism,
  bestUse, epaperTypes,
} from "../epaper-type-calc.js";

describe("contrast", () => {
  it("eink best contrast", () => {
    expect(contrast("eink_electrophoretic")).toBeGreaterThan(contrast("electrochromic_film"));
  });
});

describe("refreshRate", () => {
  it("electrowetting fastest refresh", () => {
    expect(refreshRate("electrowetting_color")).toBeGreaterThan(refreshRate("eink_electrophoretic"));
  });
});

describe("colorDepth", () => {
  it("electrowetting best color depth", () => {
    expect(colorDepth("electrowetting_color")).toBeGreaterThan(colorDepth("eink_electrophoretic"));
  });
});

describe("powerHold", () => {
  it("eink lowest hold power", () => {
    expect(powerHold("eink_electrophoretic")).toBeGreaterThan(powerHold("electrowetting_color"));
  });
});

describe("epCost", () => {
  it("interferometric most expensive", () => {
    expect(epCost("interferometric_imod")).toBeGreaterThan(epCost("electrochromic_film"));
  });
});

describe("bistable", () => {
  it("eink is bistable", () => {
    expect(bistable("eink_electrophoretic")).toBe(true);
  });
  it("electrowetting not bistable", () => {
    expect(bistable("electrowetting_color")).toBe(false);
  });
});

describe("forSignage", () => {
  it("cholesteric for signage", () => {
    expect(forSignage("cholesteric_lcd_bist")).toBe(true);
  });
  it("interferometric not for signage", () => {
    expect(forSignage("interferometric_imod")).toBe(false);
  });
});

describe("mechanism", () => {
  it("eink uses charged pigment microcapsule", () => {
    expect(mechanism("eink_electrophoretic")).toBe("charged_pigment_microcapsule");
  });
});

describe("bestUse", () => {
  it("eink best for ereader", () => {
    expect(bestUse("eink_electrophoretic")).toBe("ereader_book_long_battery");
  });
});

describe("epaperTypes", () => {
  it("returns 5 types", () => {
    expect(epaperTypes()).toHaveLength(5);
  });
});
