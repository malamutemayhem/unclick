import { describe, it, expect } from "vitest";
import {
  accuracy, responseSpeed, tempRange, sizeCompact,
  thermCost, ntcType, selfHeating, packageType,
  bestUse, thermistors,
} from "../thermistor-calc.js";

describe("accuracy", () => {
  it("glass bead precision most accurate", () => {
    expect(accuracy("glass_bead_precision")).toBeGreaterThan(accuracy("ptc_resettable_fuse"));
  });
});

describe("responseSpeed", () => {
  it("smd chip ntc fastest response", () => {
    expect(responseSpeed("smd_chip_ntc")).toBeGreaterThan(responseSpeed("ptc_resettable_fuse"));
  });
});

describe("tempRange", () => {
  it("ntc 100k high temp widest temp range", () => {
    expect(tempRange("ntc_100k_high_temp")).toBeGreaterThan(tempRange("ntc_10k_standard"));
  });
});

describe("sizeCompact", () => {
  it("smd chip ntc most compact", () => {
    expect(sizeCompact("smd_chip_ntc")).toBeGreaterThan(sizeCompact("glass_bead_precision"));
  });
});

describe("thermCost", () => {
  it("glass bead precision most expensive", () => {
    expect(thermCost("glass_bead_precision")).toBeGreaterThan(thermCost("ntc_10k_standard"));
  });
});

describe("ntcType", () => {
  it("ntc 10k standard is ntc type", () => {
    expect(ntcType("ntc_10k_standard")).toBe(true);
  });
  it("ptc resettable fuse not ntc type", () => {
    expect(ntcType("ptc_resettable_fuse")).toBe(false);
  });
});

describe("selfHeating", () => {
  it("ptc resettable fuse has self heating", () => {
    expect(selfHeating("ptc_resettable_fuse")).toBe(true);
  });
  it("ntc 10k standard no self heating", () => {
    expect(selfHeating("ntc_10k_standard")).toBe(false);
  });
});

describe("packageType", () => {
  it("smd chip ntc uses ceramic chip 0402", () => {
    expect(packageType("smd_chip_ntc")).toBe("ceramic_chip_0402");
  });
});

describe("bestUse", () => {
  it("ptc resettable fuse best for overcurrent protect", () => {
    expect(bestUse("ptc_resettable_fuse")).toBe("overcurrent_protect");
  });
});

describe("thermistors", () => {
  it("returns 5 types", () => {
    expect(thermistors()).toHaveLength(5);
  });
});
