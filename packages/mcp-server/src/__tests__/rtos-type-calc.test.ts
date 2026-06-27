import { describe, it, expect } from "vitest";
import {
  latency, footprint, determinism, ecosystem,
  rtosCost, openSource, forSafety, scheduler,
  bestUse, rtosTypes,
} from "../rtos-type-calc.js";

describe("latency", () => {
  it("tickless deferred lowest latency", () => {
    expect(latency("tickless_deferred")).toBeGreaterThan(latency("cooperative_round"));
  });
});

describe("footprint", () => {
  it("cooperative round smallest footprint", () => {
    expect(footprint("cooperative_round")).toBeGreaterThan(footprint("safety_certified"));
  });
});

describe("determinism", () => {
  it("safety certified most deterministic", () => {
    expect(determinism("safety_certified")).toBeGreaterThan(determinism("cooperative_round"));
  });
});

describe("ecosystem", () => {
  it("preemptive priority best ecosystem", () => {
    expect(ecosystem("preemptive_priority")).toBeGreaterThan(ecosystem("cooperative_round"));
  });
});

describe("rtosCost", () => {
  it("safety certified most expensive", () => {
    expect(rtosCost("safety_certified")).toBeGreaterThan(rtosCost("cooperative_round"));
  });
});

describe("openSource", () => {
  it("preemptive priority is open source", () => {
    expect(openSource("preemptive_priority")).toBe(true);
  });
  it("safety certified not open source", () => {
    expect(openSource("safety_certified")).toBe(false);
  });
});

describe("forSafety", () => {
  it("safety certified is for safety", () => {
    expect(forSafety("safety_certified")).toBe(true);
  });
  it("preemptive priority not for safety", () => {
    expect(forSafety("preemptive_priority")).toBe(false);
  });
});

describe("scheduler", () => {
  it("microkernel ipc uses message passing isolated", () => {
    expect(scheduler("microkernel_ipc")).toBe("message_passing_isolated");
  });
});

describe("bestUse", () => {
  it("tickless deferred best for wearable ble device", () => {
    expect(bestUse("tickless_deferred")).toBe("wearable_ble_device");
  });
});

describe("rtosTypes", () => {
  it("returns 5 types", () => {
    expect(rtosTypes()).toHaveLength(5);
  });
});
