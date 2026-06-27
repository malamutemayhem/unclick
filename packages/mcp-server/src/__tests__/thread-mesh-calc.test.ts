import { describe, it, expect } from "vitest";
import {
  reliability, powerDraw, scalability, latency,
  nodeCost, sleepy, forSmartHome, role,
  bestUse, threadMeshes,
} from "../thread-mesh-calc.js";

describe("reliability", () => {
  it("thread leader most reliable", () => {
    expect(reliability("thread_leader")).toBeGreaterThan(reliability("thread_sleepy_end"));
  });
});

describe("powerDraw", () => {
  it("thread sleepy end lowest power draw", () => {
    expect(powerDraw("thread_sleepy_end")).toBeGreaterThan(powerDraw("thread_1_3_border"));
  });
});

describe("scalability", () => {
  it("thread leader best scalability", () => {
    expect(scalability("thread_leader")).toBeGreaterThan(scalability("thread_sleepy_end"));
  });
});

describe("latency", () => {
  it("thread leader lowest latency", () => {
    expect(latency("thread_leader")).toBeGreaterThan(latency("thread_sleepy_end"));
  });
});

describe("nodeCost", () => {
  it("thread 1 3 border most expensive", () => {
    expect(nodeCost("thread_1_3_border")).toBeGreaterThan(nodeCost("thread_sleepy_end"));
  });
});

describe("sleepy", () => {
  it("thread sleepy end is sleepy", () => {
    expect(sleepy("thread_sleepy_end")).toBe(true);
  });
  it("thread router not sleepy", () => {
    expect(sleepy("thread_router")).toBe(false);
  });
});

describe("forSmartHome", () => {
  it("thread router is for smart home", () => {
    expect(forSmartHome("thread_router")).toBe(true);
  });
  it("thread commissioner not for smart home", () => {
    expect(forSmartHome("thread_commissioner")).toBe(false);
  });
});

describe("role", () => {
  it("thread leader uses network data leader", () => {
    expect(role("thread_leader")).toBe("network_data_leader");
  });
});

describe("bestUse", () => {
  it("thread 1 3 border best for matter bridge hub", () => {
    expect(bestUse("thread_1_3_border")).toBe("matter_bridge_hub");
  });
});

describe("threadMeshes", () => {
  it("returns 5 types", () => {
    expect(threadMeshes()).toHaveLength(5);
  });
});
