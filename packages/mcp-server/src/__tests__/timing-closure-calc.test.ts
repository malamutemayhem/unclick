import { describe, it, expect } from "vitest";
import {
  accuracy, runtime, coverage, automation,
  tcCost, signoff, forMultiClock, technique,
  bestUse, timingClosures,
} from "../timing-closure-calc.js";

describe("accuracy", () => {
  it("static timing sta highest accuracy", () => {
    expect(accuracy("static_timing_sta")).toBeGreaterThan(accuracy("physical_aware_eco"));
  });
});

describe("runtime", () => {
  it("physical aware eco fastest runtime", () => {
    expect(runtime("physical_aware_eco")).toBeGreaterThan(runtime("signal_integrity_si"));
  });
});

describe("coverage", () => {
  it("static timing sta best coverage", () => {
    expect(coverage("static_timing_sta")).toBeGreaterThan(coverage("physical_aware_eco"));
  });
});

describe("automation", () => {
  it("physical aware eco most automated", () => {
    expect(automation("physical_aware_eco")).toBeGreaterThan(automation("signal_integrity_si"));
  });
});

describe("tcCost", () => {
  it("signal integrity si most expensive", () => {
    expect(tcCost("signal_integrity_si")).toBeGreaterThan(tcCost("physical_aware_eco"));
  });
});

describe("signoff", () => {
  it("static timing sta is signoff", () => {
    expect(signoff("static_timing_sta")).toBe(true);
  });
  it("physical aware eco not signoff", () => {
    expect(signoff("physical_aware_eco")).toBe(false);
  });
});

describe("forMultiClock", () => {
  it("clock domain cdc for multi clock", () => {
    expect(forMultiClock("clock_domain_cdc")).toBe(true);
  });
  it("static timing sta not for multi clock", () => {
    expect(forMultiClock("static_timing_sta")).toBe(false);
  });
});

describe("technique", () => {
  it("physical aware eco uses incremental netlist patch", () => {
    expect(technique("physical_aware_eco")).toBe("incremental_netlist_patch");
  });
});

describe("bestUse", () => {
  it("clock domain cdc best for async fifo crossing verify", () => {
    expect(bestUse("clock_domain_cdc")).toBe("async_fifo_crossing_verify");
  });
});

describe("timingClosures", () => {
  it("returns 5 types", () => {
    expect(timingClosures()).toHaveLength(5);
  });
});
