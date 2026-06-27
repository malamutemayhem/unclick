import { describe, it, expect } from "vitest";
import {
  determinism, throughput, jitter, cpuLoad,
  psCost, preemptive, forSafety, scheduler,
  bestUse, plcScans,
} from "../plc-scan-calc.js";

describe("determinism", () => {
  it("periodic watchdog most deterministic", () => {
    expect(determinism("periodic_watchdog")).toBeGreaterThan(determinism("free_running_fastest"));
  });
});

describe("throughput", () => {
  it("free running highest throughput", () => {
    expect(throughput("free_running_fastest")).toBeGreaterThan(throughput("periodic_watchdog"));
  });
});

describe("jitter", () => {
  it("periodic watchdog lowest jitter", () => {
    expect(jitter("periodic_watchdog")).toBeGreaterThan(jitter("free_running_fastest"));
  });
});

describe("cpuLoad", () => {
  it("free running highest cpu load", () => {
    expect(cpuLoad("free_running_fastest")).toBeGreaterThan(cpuLoad("periodic_watchdog"));
  });
});

describe("psCost", () => {
  it("motion synchronized most expensive", () => {
    expect(psCost("motion_synchronized")).toBeGreaterThan(psCost("free_running_fastest"));
  });
});

describe("preemptive", () => {
  it("event driven is preemptive", () => {
    expect(preemptive("event_driven_interrupt")).toBe(true);
  });
  it("cyclic fixed not preemptive", () => {
    expect(preemptive("cyclic_fixed_period")).toBe(false);
  });
});

describe("forSafety", () => {
  it("periodic watchdog for safety", () => {
    expect(forSafety("periodic_watchdog")).toBe(true);
  });
  it("free running not for safety", () => {
    expect(forSafety("free_running_fastest")).toBe(false);
  });
});

describe("scheduler", () => {
  it("motion synchronized uses distributed clock sync", () => {
    expect(scheduler("motion_synchronized")).toBe("distributed_clock_sync");
  });
});

describe("bestUse", () => {
  it("periodic watchdog best for safety plc", () => {
    expect(bestUse("periodic_watchdog")).toBe("safety_plc_sil3_program");
  });
});

describe("plcScans", () => {
  it("returns 5 types", () => {
    expect(plcScans()).toHaveLength(5);
  });
});
