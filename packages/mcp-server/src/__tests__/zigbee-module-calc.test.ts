import { describe, it, expect } from "vitest";
import {
  meshSize, range, powerDraw, interop,
  moduleCost, batteryOpt, forSmartHome, protocol,
  bestUse, zigbeeModules,
} from "../zigbee-module-calc.js";

describe("meshSize", () => {
  it("coordinator hub largest mesh", () => {
    expect(meshSize("coordinator_hub")).toBeGreaterThan(meshSize("green_power_harvest"));
  });
});

describe("range", () => {
  it("coordinator hub longest range", () => {
    expect(range("coordinator_hub")).toBeGreaterThan(range("green_power_harvest"));
  });
});

describe("powerDraw", () => {
  it("green power harvest best power draw", () => {
    expect(powerDraw("green_power_harvest")).toBeGreaterThan(powerDraw("coordinator_hub"));
  });
});

describe("interop", () => {
  it("matter over thread best interop", () => {
    expect(interop("matter_over_thread")).toBeGreaterThan(interop("green_power_harvest"));
  });
});

describe("moduleCost", () => {
  it("coordinator hub most expensive", () => {
    expect(moduleCost("coordinator_hub")).toBeGreaterThan(moduleCost("zigbee_3_0_mesh"));
  });
});

describe("batteryOpt", () => {
  it("zigbee 3 0 mesh is battery optimized", () => {
    expect(batteryOpt("zigbee_3_0_mesh")).toBe(true);
  });
  it("thread border router not battery optimized", () => {
    expect(batteryOpt("thread_border_router")).toBe(false);
  });
});

describe("forSmartHome", () => {
  it("zigbee 3 0 mesh is for smart home", () => {
    expect(forSmartHome("zigbee_3_0_mesh")).toBe(true);
  });
});

describe("protocol", () => {
  it("zigbee 3 0 mesh uses zigbee 3 0 cluster", () => {
    expect(protocol("zigbee_3_0_mesh")).toBe("zigbee_3_0_cluster");
  });
});

describe("bestUse", () => {
  it("coordinator hub best for central smart home hub", () => {
    expect(bestUse("coordinator_hub")).toBe("central_smart_home_hub");
  });
});

describe("zigbeeModules", () => {
  it("returns 5 types", () => {
    expect(zigbeeModules()).toHaveLength(5);
  });
});
