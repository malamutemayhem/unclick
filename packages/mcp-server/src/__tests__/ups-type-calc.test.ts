import { describe, it, expect } from "vitest";
import {
  efficiency, transferTime, powerQuality, runtime,
  upsCost, zeroTransfer, forTier4, topology,
  bestUse, upsTypes,
} from "../ups-type-calc.js";

describe("efficiency", () => {
  it("offline standby most efficient", () => {
    expect(efficiency("offline_standby")).toBeGreaterThan(efficiency("online_double_conv"));
  });
});

describe("transferTime", () => {
  it("online double conv best transfer time", () => {
    expect(transferTime("online_double_conv")).toBeGreaterThan(transferTime("offline_standby"));
  });
});

describe("powerQuality", () => {
  it("online double conv best power quality", () => {
    expect(powerQuality("online_double_conv")).toBeGreaterThan(powerQuality("offline_standby"));
  });
});

describe("runtime", () => {
  it("lithium ups longest runtime", () => {
    expect(runtime("lithium_ups")).toBeGreaterThan(runtime("rotary_flywheel"));
  });
});

describe("upsCost", () => {
  it("lithium ups most expensive", () => {
    expect(upsCost("lithium_ups")).toBeGreaterThan(upsCost("offline_standby"));
  });
});

describe("zeroTransfer", () => {
  it("online double conv has zero transfer", () => {
    expect(zeroTransfer("online_double_conv")).toBe(true);
  });
  it("offline standby no zero transfer", () => {
    expect(zeroTransfer("offline_standby")).toBe(false);
  });
});

describe("forTier4", () => {
  it("online double conv is for tier 4", () => {
    expect(forTier4("online_double_conv")).toBe(true);
  });
  it("offline standby not for tier 4", () => {
    expect(forTier4("offline_standby")).toBe(false);
  });
});

describe("topology", () => {
  it("rotary flywheel uses diesel rotary kinetic", () => {
    expect(topology("rotary_flywheel")).toBe("diesel_rotary_kinetic");
  });
});

describe("bestUse", () => {
  it("lithium ups best for high density edge dc", () => {
    expect(bestUse("lithium_ups")).toBe("high_density_edge_dc");
  });
});

describe("upsTypes", () => {
  it("returns 5 types", () => {
    expect(upsTypes()).toHaveLength(5);
  });
});
