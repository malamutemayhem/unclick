import { describe, it, expect } from "vitest";
import {
  flowSmooth, throughput, pressureRange, wearResist,
  vpCost, selfCompensate, forHydraulic, pumpConfig,
  bestUse, vanePumpTypes,
} from "../vane-pump-calc.js";

describe("flowSmooth", () => {
  it("balanced vane best flow smooth", () => {
    expect(flowSmooth("balanced_vane")).toBeGreaterThan(flowSmooth("flexible_vane"));
  });
});

describe("throughput", () => {
  it("sliding vane highest throughput", () => {
    expect(throughput("sliding_vane")).toBeGreaterThan(throughput("flexible_vane"));
  });
});

describe("pressureRange", () => {
  it("variable displace best pressure range", () => {
    expect(pressureRange("variable_displace")).toBeGreaterThan(pressureRange("flexible_vane"));
  });
});

describe("wearResist", () => {
  it("balanced vane best wear resist", () => {
    expect(wearResist("balanced_vane")).toBeGreaterThan(wearResist("flexible_vane"));
  });
});

describe("vpCost", () => {
  it("variable displace most expensive", () => {
    expect(vpCost("variable_displace")).toBeGreaterThan(vpCost("flexible_vane"));
  });
});

describe("selfCompensate", () => {
  it("sliding vane self compensates", () => {
    expect(selfCompensate("sliding_vane")).toBe(true);
  });
  it("flexible vane no self compensate", () => {
    expect(selfCompensate("flexible_vane")).toBe(false);
  });
});

describe("forHydraulic", () => {
  it("variable displace for hydraulic", () => {
    expect(forHydraulic("variable_displace")).toBe(true);
  });
  it("sliding vane not for hydraulic", () => {
    expect(forHydraulic("sliding_vane")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("balanced vane uses dual cam ring oppose force long bearing life", () => {
    expect(pumpConfig("balanced_vane")).toBe("balanced_vane_pump_dual_cam_ring_oppose_force_long_bearing_life");
  });
});

describe("bestUse", () => {
  it("flexible vane for wine transfer gentle dry run safe portable", () => {
    expect(bestUse("flexible_vane")).toBe("wine_transfer_flexible_vane_pump_gentle_dry_run_safe_portable");
  });
});

describe("vanePumpTypes", () => {
  it("returns 5 types", () => {
    expect(vanePumpTypes()).toHaveLength(5);
  });
});
