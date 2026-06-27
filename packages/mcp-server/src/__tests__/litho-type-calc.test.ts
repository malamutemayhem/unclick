import { describe, it, expect } from "vitest";
import {
  resolution, throughput, overlay, defectDensity,
  lithoCost, multiPatter, forAdvanced, wavelength,
  bestUse, lithoTypes,
} from "../litho-type-calc.js";

describe("resolution", () => {
  it("euv 13 5nm highest resolution", () => {
    expect(resolution("euv_13_5nm")).toBeGreaterThan(resolution("i_line_365nm"));
  });
});

describe("throughput", () => {
  it("i line 365nm highest throughput", () => {
    expect(throughput("i_line_365nm")).toBeGreaterThan(throughput("euv_13_5nm"));
  });
});

describe("overlay", () => {
  it("euv 13 5nm best overlay", () => {
    expect(overlay("euv_13_5nm")).toBeGreaterThan(overlay("i_line_365nm"));
  });
});

describe("defectDensity", () => {
  it("i line 365nm lowest defect density", () => {
    expect(defectDensity("i_line_365nm")).toBeGreaterThan(defectDensity("nanoimprint_nil"));
  });
});

describe("lithoCost", () => {
  it("euv 13 5nm most expensive", () => {
    expect(lithoCost("euv_13_5nm")).toBeGreaterThan(lithoCost("i_line_365nm"));
  });
});

describe("multiPatter", () => {
  it("arf immersion 193 uses multi patterning", () => {
    expect(multiPatter("arf_immersion_193")).toBe(true);
  });
  it("euv 13 5nm no multi patterning", () => {
    expect(multiPatter("euv_13_5nm")).toBe(false);
  });
});

describe("forAdvanced", () => {
  it("euv 13 5nm is for advanced", () => {
    expect(forAdvanced("euv_13_5nm")).toBe(true);
  });
  it("i line 365nm not for advanced", () => {
    expect(forAdvanced("i_line_365nm")).toBe(false);
  });
});

describe("wavelength", () => {
  it("euv 13 5nm uses sn plasma 13 5nm", () => {
    expect(wavelength("euv_13_5nm")).toBe("sn_plasma_13_5nm");
  });
});

describe("bestUse", () => {
  it("euv 13 5nm best for 3nm gaa critical layer", () => {
    expect(bestUse("euv_13_5nm")).toBe("3nm_gaa_critical_layer");
  });
});

describe("lithoTypes", () => {
  it("returns 5 types", () => {
    expect(lithoTypes()).toHaveLength(5);
  });
});
