import { describe, it, expect } from "vitest";
import {
  scalability, precision, reliability, installSpeed,
  alCost, wireless, forHighRise, protocol,
  bestUse, alarmTypes,
} from "../alarm-type-calc.js";

describe("scalability", () => {
  it("networked campus most scalable", () => {
    expect(scalability("networked_campus_fiber")).toBeGreaterThan(scalability("conventional_zone_loop"));
  });
});

describe("precision", () => {
  it("analog addressable most precise", () => {
    expect(precision("analog_addressable_smart")).toBeGreaterThan(precision("conventional_zone_loop"));
  });
});

describe("reliability", () => {
  it("networked campus most reliable", () => {
    expect(reliability("networked_campus_fiber")).toBeGreaterThan(reliability("wireless_mesh_radio"));
  });
});

describe("installSpeed", () => {
  it("wireless mesh fastest install", () => {
    expect(installSpeed("wireless_mesh_radio")).toBeGreaterThan(installSpeed("networked_campus_fiber"));
  });
});

describe("alCost", () => {
  it("networked campus most expensive", () => {
    expect(alCost("networked_campus_fiber")).toBeGreaterThan(alCost("conventional_zone_loop"));
  });
});

describe("wireless", () => {
  it("wireless mesh is wireless", () => {
    expect(wireless("wireless_mesh_radio")).toBe(true);
  });
  it("conventional not wireless", () => {
    expect(wireless("conventional_zone_loop")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("addressable for high rise", () => {
    expect(forHighRise("addressable_sla_protocol")).toBe(true);
  });
  it("conventional not for high rise", () => {
    expect(forHighRise("conventional_zone_loop")).toBe(false);
  });
});

describe("protocol", () => {
  it("wireless uses mesh radio 868 915 mhz", () => {
    expect(protocol("wireless_mesh_radio")).toBe("mesh_radio_868_915_mhz");
  });
});

describe("bestUse", () => {
  it("analog addressable best for hospital campus", () => {
    expect(bestUse("analog_addressable_smart")).toBe("hospital_campus_predictive_maint");
  });
});

describe("alarmTypes", () => {
  it("returns 5 types", () => {
    expect(alarmTypes()).toHaveLength(5);
  });
});
