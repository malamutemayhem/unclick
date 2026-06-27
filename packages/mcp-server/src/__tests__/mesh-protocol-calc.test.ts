import { describe, it, expect } from "vitest";
import {
  scalability, latency, powerEff, interop,
  meshCost, selfHealing, forSmartHome, transport,
  bestUse, meshProtocols,
} from "../mesh-protocol-calc.js";

describe("scalability", () => {
  it("wirepas massive most scalable", () => {
    expect(scalability("wirepas_massive")).toBeGreaterThan(scalability("wifi_mesh_easymesh"));
  });
});

describe("latency", () => {
  it("wifi mesh easymesh lowest latency", () => {
    expect(latency("wifi_mesh_easymesh")).toBeGreaterThan(latency("bluetooth_mesh_1_1"));
  });
});

describe("powerEff", () => {
  it("thread openthread most power efficient", () => {
    expect(powerEff("thread_openthread")).toBeGreaterThan(powerEff("wifi_mesh_easymesh"));
  });
});

describe("interop", () => {
  it("matter over thread best interop", () => {
    expect(interop("matter_over_thread")).toBeGreaterThan(interop("wirepas_massive"));
  });
});

describe("meshCost", () => {
  it("wifi mesh easymesh most expensive", () => {
    expect(meshCost("wifi_mesh_easymesh")).toBeGreaterThan(meshCost("bluetooth_mesh_1_1"));
  });
});

describe("selfHealing", () => {
  it("thread openthread is self healing", () => {
    expect(selfHealing("thread_openthread")).toBe(true);
  });
});

describe("forSmartHome", () => {
  it("matter over thread for smart home", () => {
    expect(forSmartHome("matter_over_thread")).toBe(true);
  });
  it("wirepas massive not for smart home", () => {
    expect(forSmartHome("wirepas_massive")).toBe(false);
  });
});

describe("transport", () => {
  it("wirepas massive uses tdma csma hybrid", () => {
    expect(transport("wirepas_massive")).toBe("tdma_csma_hybrid");
  });
});

describe("bestUse", () => {
  it("matter over thread best for multi vendor smart home", () => {
    expect(bestUse("matter_over_thread")).toBe("multi_vendor_smart_home");
  });
});

describe("meshProtocols", () => {
  it("returns 5 types", () => {
    expect(meshProtocols()).toHaveLength(5);
  });
});
