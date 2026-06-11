import { describe, it, expect } from "vitest";
import {
  resolution, nightVision, coverage, analytics,
  ccCost, poe, forOutdoor, sensor,
  bestUse, cctvTypes,
} from "../cctv-type-calc.js";

describe("resolution", () => {
  it("ip poe highest resolution", () => {
    expect(resolution("ip_poe_megapixel")).toBeGreaterThan(resolution("analog_coax_bnc"));
  });
});

describe("nightVision", () => {
  it("thermal ir best night vision", () => {
    expect(nightVision("thermal_ir_uncooled")).toBeGreaterThan(nightVision("analog_coax_bnc"));
  });
});

describe("coverage", () => {
  it("ptz dome best coverage", () => {
    expect(coverage("ptz_dome_motorized")).toBeGreaterThan(coverage("analog_coax_bnc"));
  });
});

describe("analytics", () => {
  it("ip poe best analytics", () => {
    expect(analytics("ip_poe_megapixel")).toBeGreaterThan(analytics("analog_coax_bnc"));
  });
});

describe("ccCost", () => {
  it("thermal ir most expensive", () => {
    expect(ccCost("thermal_ir_uncooled")).toBeGreaterThan(ccCost("analog_coax_bnc"));
  });
});

describe("poe", () => {
  it("ip poe has poe", () => {
    expect(poe("ip_poe_megapixel")).toBe(true);
  });
  it("analog not poe", () => {
    expect(poe("analog_coax_bnc")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("ptz dome for outdoor", () => {
    expect(forOutdoor("ptz_dome_motorized")).toBe(true);
  });
  it("fisheye not for outdoor", () => {
    expect(forOutdoor("fisheye_360_dewarped")).toBe(false);
  });
});

describe("sensor", () => {
  it("thermal uses vanadium oxide microbolometer", () => {
    expect(sensor("thermal_ir_uncooled")).toBe("vanadium_oxide_microbolometer");
  });
});

describe("bestUse", () => {
  it("fisheye best for retail store overhead", () => {
    expect(bestUse("fisheye_360_dewarped")).toBe("retail_store_overhead_full_view");
  });
});

describe("cctvTypes", () => {
  it("returns 5 types", () => {
    expect(cctvTypes()).toHaveLength(5);
  });
});
