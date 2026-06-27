import { describe, it, expect } from "vitest";
import {
  reliability, coverage, latency, independence,
  wdCost, windowMode, forSafety, reset,
  bestUse, watchdogs,
} from "../watchdog-calc.js";

describe("reliability", () => {
  it("dual watchdog most reliable", () => {
    expect(reliability("dual_watchdog_safety")).toBeGreaterThan(reliability("software_task_monitor"));
  });
});

describe("coverage", () => {
  it("dual watchdog best coverage", () => {
    expect(coverage("dual_watchdog_safety")).toBeGreaterThan(coverage("internal_wdt_mcu"));
  });
});

describe("latency", () => {
  it("software task monitor lowest latency", () => {
    expect(latency("software_task_monitor")).toBeGreaterThan(latency("dual_watchdog_safety"));
  });
});

describe("independence", () => {
  it("external ic most independent", () => {
    expect(independence("external_ic_monitor")).toBeGreaterThan(independence("software_task_monitor"));
  });
});

describe("wdCost", () => {
  it("dual watchdog most expensive", () => {
    expect(wdCost("dual_watchdog_safety")).toBeGreaterThan(wdCost("internal_wdt_mcu"));
  });
});

describe("windowMode", () => {
  it("window watchdog has window mode", () => {
    expect(windowMode("window_watchdog_wwdg")).toBe(true);
  });
  it("internal wdt no window mode", () => {
    expect(windowMode("internal_wdt_mcu")).toBe(false);
  });
});

describe("forSafety", () => {
  it("dual watchdog for safety", () => {
    expect(forSafety("dual_watchdog_safety")).toBe(true);
  });
  it("software task not for safety", () => {
    expect(forSafety("software_task_monitor")).toBe(false);
  });
});

describe("reset", () => {
  it("dual watchdog uses dual timeout safe state", () => {
    expect(reset("dual_watchdog_safety")).toBe("dual_timeout_safe_state");
  });
});

describe("bestUse", () => {
  it("external ic best for independent supervisor", () => {
    expect(bestUse("external_ic_monitor")).toBe("independent_supervisor_power_seq");
  });
});

describe("watchdogs", () => {
  it("returns 5 types", () => {
    expect(watchdogs()).toHaveLength(5);
  });
});
