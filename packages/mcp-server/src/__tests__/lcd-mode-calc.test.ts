import { describe, it, expect } from "vitest";
import {
  contrast, viewAngle, responseTime, colorAccuracy,
  lcCost, wideGamut, forMonitor, alignment,
  bestUse, lcdModes,
} from "../lcd-mode-calc.js";

describe("contrast", () => {
  it("va vertical align best contrast", () => {
    expect(contrast("va_vertical_align")).toBeGreaterThan(contrast("tn_twisted_nematic"));
  });
});

describe("viewAngle", () => {
  it("ips in plane best view angle", () => {
    expect(viewAngle("ips_in_plane_switch")).toBeGreaterThan(viewAngle("tn_twisted_nematic"));
  });
});

describe("responseTime", () => {
  it("blue phase fastest response", () => {
    expect(responseTime("blue_phase_bp")).toBeGreaterThan(responseTime("va_vertical_align"));
  });
});

describe("colorAccuracy", () => {
  it("fringe field best color accuracy", () => {
    expect(colorAccuracy("fringe_field_ffs")).toBeGreaterThan(colorAccuracy("tn_twisted_nematic"));
  });
});

describe("lcCost", () => {
  it("blue phase most expensive", () => {
    expect(lcCost("blue_phase_bp")).toBeGreaterThan(lcCost("tn_twisted_nematic"));
  });
});

describe("wideGamut", () => {
  it("ips is wide gamut", () => {
    expect(wideGamut("ips_in_plane_switch")).toBe(true);
  });
  it("tn not wide gamut", () => {
    expect(wideGamut("tn_twisted_nematic")).toBe(false);
  });
});

describe("forMonitor", () => {
  it("ips for monitor", () => {
    expect(forMonitor("ips_in_plane_switch")).toBe(true);
  });
  it("tn not for monitor", () => {
    expect(forMonitor("tn_twisted_nematic")).toBe(false);
  });
});

describe("alignment", () => {
  it("va uses homeotropic negative lc", () => {
    expect(alignment("va_vertical_align")).toBe("homeotropic_negative_lc");
  });
});

describe("bestUse", () => {
  it("ips best for pro photo color critical", () => {
    expect(bestUse("ips_in_plane_switch")).toBe("pro_photo_color_critical");
  });
});

describe("lcdModes", () => {
  it("returns 5 types", () => {
    expect(lcdModes()).toHaveLength(5);
  });
});
