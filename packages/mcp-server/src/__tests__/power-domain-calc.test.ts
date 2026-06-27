import { describe, it, expect } from "vitest";
import {
  current, switchSpeed, isolation, voltage,
  pdCost, retentionCapable, forDeepSleep, regulation,
  bestUse, powerDomains,
} from "../power-domain-calc.js";

describe("current", () => {
  it("core logic vdd highest current", () => {
    expect(current("core_logic_vdd")).toBeGreaterThan(current("retention_vret"));
  });
});

describe("switchSpeed", () => {
  it("retention vret fastest switching", () => {
    expect(switchSpeed("retention_vret")).toBeGreaterThan(switchSpeed("always_on_aon"));
  });
});

describe("isolation", () => {
  it("analog vdda best isolation", () => {
    expect(isolation("analog_vdda")).toBeGreaterThan(isolation("always_on_aon"));
  });
});

describe("voltage", () => {
  it("io ring vddio highest voltage", () => {
    expect(voltage("io_ring_vddio")).toBeGreaterThan(voltage("retention_vret"));
  });
});

describe("pdCost", () => {
  it("retention vret most expensive", () => {
    expect(pdCost("retention_vret")).toBeGreaterThan(pdCost("always_on_aon"));
  });
});

describe("retentionCapable", () => {
  it("retention vret is retention capable", () => {
    expect(retentionCapable("retention_vret")).toBe(true);
  });
  it("core logic vdd not retention capable", () => {
    expect(retentionCapable("core_logic_vdd")).toBe(false);
  });
});

describe("forDeepSleep", () => {
  it("always on aon for deep sleep", () => {
    expect(forDeepSleep("always_on_aon")).toBe(true);
  });
  it("core logic vdd not for deep sleep", () => {
    expect(forDeepSleep("core_logic_vdd")).toBe(false);
  });
});

describe("regulation", () => {
  it("analog vdda uses low noise ldo filtered", () => {
    expect(regulation("analog_vdda")).toBe("low_noise_ldo_filtered");
  });
});

describe("bestUse", () => {
  it("retention vret best for sram state deep sleep", () => {
    expect(bestUse("retention_vret")).toBe("sram_state_deep_sleep");
  });
});

describe("powerDomains", () => {
  it("returns 5 types", () => {
    expect(powerDomains()).toHaveLength(5);
  });
});
