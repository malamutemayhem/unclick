import { describe, it, expect } from "vitest";
import {
  dataRate, range, powerDraw, security,
  moduleCost, meshCapable, forIot, bleVersion,
  bestUse, bleModules,
} from "../ble-module-calc.js";

describe("dataRate", () => {
  it("soc integrated highest data rate", () => {
    expect(dataRate("soc_integrated")).toBeGreaterThan(dataRate("beacon_broadcast"));
  });
});

describe("range", () => {
  it("long range coded longest range", () => {
    expect(range("long_range_coded")).toBeGreaterThan(range("beacon_broadcast"));
  });
});

describe("powerDraw", () => {
  it("beacon broadcast lowest power draw", () => {
    expect(powerDraw("beacon_broadcast")).toBeGreaterThan(powerDraw("mesh_network"));
  });
});

describe("security", () => {
  it("module certified best security", () => {
    expect(security("module_certified")).toBeGreaterThan(security("beacon_broadcast"));
  });
});

describe("moduleCost", () => {
  it("module certified most expensive", () => {
    expect(moduleCost("module_certified")).toBeGreaterThan(moduleCost("beacon_broadcast"));
  });
});

describe("meshCapable", () => {
  it("mesh network is mesh capable", () => {
    expect(meshCapable("mesh_network")).toBe(true);
  });
  it("soc integrated not mesh capable", () => {
    expect(meshCapable("soc_integrated")).toBe(false);
  });
});

describe("forIot", () => {
  it("soc integrated is for iot", () => {
    expect(forIot("soc_integrated")).toBe(true);
  });
});

describe("bleVersion", () => {
  it("soc integrated uses ble 5 3 soc", () => {
    expect(bleVersion("soc_integrated")).toBe("ble_5_3_soc");
  });
});

describe("bestUse", () => {
  it("mesh network best for smart lighting building", () => {
    expect(bestUse("mesh_network")).toBe("smart_lighting_building");
  });
});

describe("bleModules", () => {
  it("returns 5 types", () => {
    expect(bleModules()).toHaveLength(5);
  });
});
