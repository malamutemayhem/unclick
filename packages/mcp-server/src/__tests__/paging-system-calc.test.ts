import { describe, it, expect } from "vitest";
import {
  coverage, clarity, flexibility, reliability,
  psCost, networked, forEmergency, amplifier,
  bestUse, pagingSystemTypes,
} from "../paging-system-calc.js";

describe("coverage", () => {
  it("ip paging widest coverage", () => {
    expect(coverage("ip_network_paging")).toBeGreaterThan(coverage("single_zone_analog"));
  });
});

describe("clarity", () => {
  it("ip paging clearest", () => {
    expect(clarity("ip_network_paging")).toBeGreaterThan(clarity("single_zone_analog"));
  });
});

describe("flexibility", () => {
  it("ip paging most flexible", () => {
    expect(flexibility("ip_network_paging")).toBeGreaterThan(flexibility("single_zone_analog"));
  });
});

describe("reliability", () => {
  it("mass notification most reliable", () => {
    expect(reliability("mass_notification_combo")).toBeGreaterThan(reliability("wireless_portable_pa"));
  });
});

describe("psCost", () => {
  it("mass notification most expensive", () => {
    expect(psCost("mass_notification_combo")).toBeGreaterThan(psCost("single_zone_analog"));
  });
});

describe("networked", () => {
  it("ip paging is networked", () => {
    expect(networked("ip_network_paging")).toBe(true);
  });
  it("analog not networked", () => {
    expect(networked("single_zone_analog")).toBe(false);
  });
});

describe("forEmergency", () => {
  it("mass notification for emergency", () => {
    expect(forEmergency("mass_notification_combo")).toBe(true);
  });
  it("portable not emergency", () => {
    expect(forEmergency("wireless_portable_pa")).toBe(false);
  });
});

describe("amplifier", () => {
  it("portable uses battery uhf", () => {
    expect(amplifier("wireless_portable_pa")).toBe("battery_powered_uhf_portable");
  });
});

describe("bestUse", () => {
  it("ip paging for large campus", () => {
    expect(bestUse("ip_network_paging")).toBe("large_campus_multi_building");
  });
});

describe("pagingSystemTypes", () => {
  it("returns 5 types", () => {
    expect(pagingSystemTypes()).toHaveLength(5);
  });
});
