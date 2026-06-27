import { describe, it, expect } from "vitest";
import {
  runtime, protection, efficiency, formFactor,
  upsCost, alwaysOn, rackMount, topology,
  bestUse, upsBatteries,
} from "../ups-battery-calc.js";

describe("runtime", () => {
  it("lithium ion smart longest runtime", () => {
    expect(runtime("lithium_ion_smart")).toBeGreaterThan(runtime("standby_offline"));
  });
});

describe("protection", () => {
  it("online double conv best protection", () => {
    expect(protection("online_double_conv")).toBeGreaterThan(protection("standby_offline"));
  });
});

describe("efficiency", () => {
  it("standby offline most efficient", () => {
    expect(efficiency("standby_offline")).toBeGreaterThan(efficiency("online_double_conv"));
  });
});

describe("formFactor", () => {
  it("lithium ion smart best form factor", () => {
    expect(formFactor("lithium_ion_smart")).toBeGreaterThan(formFactor("online_double_conv"));
  });
});

describe("upsCost", () => {
  it("lithium ion smart most expensive", () => {
    expect(upsCost("lithium_ion_smart")).toBeGreaterThan(upsCost("standby_offline"));
  });
});

describe("alwaysOn", () => {
  it("online double conv is always on", () => {
    expect(alwaysOn("online_double_conv")).toBe(true);
  });
  it("standby offline not always on", () => {
    expect(alwaysOn("standby_offline")).toBe(false);
  });
});

describe("rackMount", () => {
  it("rack mount 1500va is rack mount", () => {
    expect(rackMount("rack_mount_1500va")).toBe(true);
  });
  it("standby offline not rack mount", () => {
    expect(rackMount("standby_offline")).toBe(false);
  });
});

describe("topology", () => {
  it("line interactive uses avr buck boost", () => {
    expect(topology("line_interactive")).toBe("avr_buck_boost");
  });
});

describe("bestUse", () => {
  it("online double conv best for critical server clean power", () => {
    expect(bestUse("online_double_conv")).toBe("critical_server_clean_power");
  });
});

describe("upsBatteries", () => {
  it("returns 5 types", () => {
    expect(upsBatteries()).toHaveLength(5);
  });
});
