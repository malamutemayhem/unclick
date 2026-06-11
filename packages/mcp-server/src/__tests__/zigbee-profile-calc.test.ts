import { describe, it, expect } from "vitest";
import {
  meshSize, range, powerEff, reliability,
  zbCost, ipNative, forLighting, routing,
  bestUse, zigbeeProfiles,
} from "../zigbee-profile-calc.js";

describe("meshSize", () => {
  it("zigbee pro green largest mesh", () => {
    expect(meshSize("zigbee_pro_green")).toBeGreaterThan(meshSize("zigbee_rf4ce"));
  });
});

describe("range", () => {
  it("zigbee pro green longest range", () => {
    expect(range("zigbee_pro_green")).toBeGreaterThan(range("zigbee_rf4ce"));
  });
});

describe("powerEff", () => {
  it("zigbee pro green most power efficient", () => {
    expect(powerEff("zigbee_pro_green")).toBeGreaterThan(powerEff("zigbee_ip_thread"));
  });
});

describe("reliability", () => {
  it("zigbee pro green most reliable", () => {
    expect(reliability("zigbee_pro_green")).toBeGreaterThan(reliability("zigbee_rf4ce"));
  });
});

describe("zbCost", () => {
  it("zigbee ip thread more expensive than rf4ce", () => {
    expect(zbCost("zigbee_ip_thread")).toBeGreaterThan(zbCost("zigbee_rf4ce"));
  });
});

describe("ipNative", () => {
  it("zigbee ip thread is ip native", () => {
    expect(ipNative("zigbee_ip_thread")).toBe(true);
  });
  it("zigbee 3.0 not ip native", () => {
    expect(ipNative("zigbee_3_0")).toBe(false);
  });
});

describe("forLighting", () => {
  it("zigbee 3.0 for lighting", () => {
    expect(forLighting("zigbee_3_0")).toBe(true);
  });
  it("zigbee rf4ce not for lighting", () => {
    expect(forLighting("zigbee_rf4ce")).toBe(false);
  });
});

describe("routing", () => {
  it("zigbee ip thread uses ipv6 border router", () => {
    expect(routing("zigbee_ip_thread")).toBe("ipv6_border_router");
  });
});

describe("bestUse", () => {
  it("zigbee pro green best for building automation hvac", () => {
    expect(bestUse("zigbee_pro_green")).toBe("building_automation_hvac");
  });
});

describe("zigbeeProfiles", () => {
  it("returns 5 types", () => {
    expect(zigbeeProfiles()).toHaveLength(5);
  });
});
