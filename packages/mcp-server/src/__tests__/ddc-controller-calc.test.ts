import { describe, it, expect } from "vitest";
import {
  points, reliability, flexibility, integration,
  ddcCost, programmable, forCritical, protocol,
  bestUse, ddcControllerTypes,
} from "../ddc-controller-calc.js";

describe("points", () => {
  it("supervisory most points", () => {
    expect(points("network_supervisory")).toBeGreaterThan(points("vav_zone_terminal"));
  });
});

describe("reliability", () => {
  it("plant most reliable", () => {
    expect(reliability("plant_chiller_boiler")).toBeGreaterThan(reliability("vav_zone_terminal"));
  });
});

describe("flexibility", () => {
  it("general purpose most flexible", () => {
    expect(flexibility("general_purpose_io")).toBeGreaterThan(flexibility("vav_zone_terminal"));
  });
});

describe("integration", () => {
  it("supervisory best integration", () => {
    expect(integration("network_supervisory")).toBeGreaterThan(integration("unitary_rooftop_ahu"));
  });
});

describe("ddcCost", () => {
  it("supervisory most expensive", () => {
    expect(ddcCost("network_supervisory")).toBeGreaterThan(ddcCost("vav_zone_terminal"));
  });
});

describe("programmable", () => {
  it("plant is programmable", () => {
    expect(programmable("plant_chiller_boiler")).toBe(true);
  });
  it("vav not programmable", () => {
    expect(programmable("vav_zone_terminal")).toBe(false);
  });
});

describe("forCritical", () => {
  it("plant for critical", () => {
    expect(forCritical("plant_chiller_boiler")).toBe(true);
  });
  it("unitary not critical", () => {
    expect(forCritical("unitary_rooftop_ahu")).toBe(false);
  });
});

describe("protocol", () => {
  it("supervisory uses web api", () => {
    expect(protocol("network_supervisory")).toBe("bacnet_ip_web_api_rest");
  });
});

describe("bestUse", () => {
  it("vav for zone temp", () => {
    expect(bestUse("vav_zone_terminal")).toBe("vav_box_zone_temperature");
  });
});

describe("ddcControllerTypes", () => {
  it("returns 5 types", () => {
    expect(ddcControllerTypes()).toHaveLength(5);
  });
});
