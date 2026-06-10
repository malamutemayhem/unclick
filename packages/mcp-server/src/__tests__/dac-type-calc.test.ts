import { describe, it, expect } from "vitest";
import {
  resolution, dynamicRange, analogWarmth, jitterPerformance,
  dacCost, batteryPowered, hasHeadphoneAmp, chipArchitecture,
  bestSetup, dacTypes,
} from "../dac-type-calc.js";

describe("resolution", () => {
  it("r2r ladder best resolution", () => {
    expect(resolution("r2r_ladder")).toBeGreaterThan(resolution("usb_dongle"));
  });
});

describe("dynamicRange", () => {
  it("hybrid fpga best dynamic range", () => {
    expect(dynamicRange("hybrid_fpga")).toBeGreaterThan(dynamicRange("usb_dongle"));
  });
});

describe("analogWarmth", () => {
  it("r2r ladder most analog warmth", () => {
    expect(analogWarmth("r2r_ladder")).toBeGreaterThan(analogWarmth("usb_dongle"));
  });
});

describe("jitterPerformance", () => {
  it("hybrid fpga best jitter performance", () => {
    expect(jitterPerformance("hybrid_fpga")).toBeGreaterThan(jitterPerformance("usb_dongle"));
  });
});

describe("dacCost", () => {
  it("hybrid fpga most expensive", () => {
    expect(dacCost("hybrid_fpga")).toBeGreaterThan(dacCost("usb_dongle"));
  });
});

describe("batteryPowered", () => {
  it("portable battery is battery powered", () => {
    expect(batteryPowered("portable_battery")).toBe(true);
  });
  it("delta sigma is not", () => {
    expect(batteryPowered("delta_sigma")).toBe(false);
  });
});

describe("hasHeadphoneAmp", () => {
  it("all have headphone amp", () => {
    expect(hasHeadphoneAmp("usb_dongle")).toBe(true);
    expect(hasHeadphoneAmp("r2r_ladder")).toBe(true);
  });
});

describe("chipArchitecture", () => {
  it("r2r ladder uses discrete resistor network", () => {
    expect(chipArchitecture("r2r_ladder")).toBe("discrete_resistor_network");
  });
});

describe("bestSetup", () => {
  it("usb dongle for laptop phone quick upgrade", () => {
    expect(bestSetup("usb_dongle")).toBe("laptop_phone_quick_upgrade");
  });
});

describe("dacTypes", () => {
  it("returns 5 types", () => {
    expect(dacTypes()).toHaveLength(5);
  });
});
