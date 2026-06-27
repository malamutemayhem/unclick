import { describe, it, expect } from "vitest";
import {
  reliability, flexibility, latency, diagCoverage,
  wdtCost, windowed, forAutomotive, architecture,
  bestUse, watchdogTimers,
} from "../watchdog-timer-calc.js";

describe("reliability", () => {
  it("safety lockstep most reliable", () => {
    expect(reliability("safety_lockstep")).toBeGreaterThan(reliability("simple_rc_reset"));
  });
});

describe("flexibility", () => {
  it("multi stage cascade most flexible", () => {
    expect(flexibility("multi_stage_cascade")).toBeGreaterThan(flexibility("simple_rc_reset"));
  });
});

describe("latency", () => {
  it("simple rc reset fastest latency", () => {
    expect(latency("simple_rc_reset")).toBeGreaterThan(latency("safety_lockstep"));
  });
});

describe("diagCoverage", () => {
  it("safety lockstep best diagnostic coverage", () => {
    expect(diagCoverage("safety_lockstep")).toBeGreaterThan(diagCoverage("simple_rc_reset"));
  });
});

describe("wdtCost", () => {
  it("safety lockstep most expensive", () => {
    expect(wdtCost("safety_lockstep")).toBeGreaterThan(wdtCost("simple_rc_reset"));
  });
});

describe("windowed", () => {
  it("window watchdog is windowed", () => {
    expect(windowed("window_watchdog")).toBe(true);
  });
  it("simple rc reset not windowed", () => {
    expect(windowed("simple_rc_reset")).toBe(false);
  });
});

describe("forAutomotive", () => {
  it("safety lockstep is for automotive", () => {
    expect(forAutomotive("safety_lockstep")).toBe(true);
  });
  it("simple rc reset not for automotive", () => {
    expect(forAutomotive("simple_rc_reset")).toBe(false);
  });
});

describe("architecture", () => {
  it("safety lockstep uses dual core compare", () => {
    expect(architecture("safety_lockstep")).toBe("dual_core_compare");
  });
});

describe("bestUse", () => {
  it("multi stage cascade best for adas ecu monitor", () => {
    expect(bestUse("multi_stage_cascade")).toBe("adas_ecu_monitor");
  });
});

describe("watchdogTimers", () => {
  it("returns 5 types", () => {
    expect(watchdogTimers()).toHaveLength(5);
  });
});
