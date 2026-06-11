import { describe, it, expect } from "vitest";
import {
  interop, powerDraw, throughput, latency,
  matterCost, batteryDevice, forLighting, transport,
  bestUse, matterProtocols,
} from "../matter-protocol-calc.js";

describe("interop", () => {
  it("matter bridge best interop", () => {
    expect(interop("matter_bridge")).toBeGreaterThan(interop("matter_over_thread"));
  });
});

describe("powerDraw", () => {
  it("matter over thread lowest power draw", () => {
    expect(powerDraw("matter_over_thread")).toBeGreaterThan(powerDraw("matter_controller"));
  });
});

describe("throughput", () => {
  it("matter over ethernet highest throughput", () => {
    expect(throughput("matter_over_ethernet")).toBeGreaterThan(throughput("matter_over_thread"));
  });
});

describe("latency", () => {
  it("matter over ethernet lowest latency", () => {
    expect(latency("matter_over_ethernet")).toBeGreaterThan(latency("matter_over_thread"));
  });
});

describe("matterCost", () => {
  it("matter bridge most expensive", () => {
    expect(matterCost("matter_bridge")).toBeGreaterThan(matterCost("matter_over_wifi"));
  });
});

describe("batteryDevice", () => {
  it("matter over thread is battery device", () => {
    expect(batteryDevice("matter_over_thread")).toBe(true);
  });
  it("matter over wifi not battery device", () => {
    expect(batteryDevice("matter_over_wifi")).toBe(false);
  });
});

describe("forLighting", () => {
  it("matter over wifi is for lighting", () => {
    expect(forLighting("matter_over_wifi")).toBe(true);
  });
  it("matter over ethernet not for lighting", () => {
    expect(forLighting("matter_over_ethernet")).toBe(false);
  });
});

describe("transport", () => {
  it("matter bridge uses bridge translate any", () => {
    expect(transport("matter_bridge")).toBe("bridge_translate_any");
  });
});

describe("bestUse", () => {
  it("matter over thread best for smart lock battery", () => {
    expect(bestUse("matter_over_thread")).toBe("smart_lock_battery");
  });
});

describe("matterProtocols", () => {
  it("returns 5 types", () => {
    expect(matterProtocols()).toHaveLength(5);
  });
});
