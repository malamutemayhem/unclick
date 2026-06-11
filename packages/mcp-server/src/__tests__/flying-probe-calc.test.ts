import { describe, it, expect } from "vitest";
import {
  testCoverage, testSpeed, accuracy, setupTime,
  systemCost, npiReady, contactless, probeCount,
  bestUse, flyingProbes,
} from "../flying-probe-calc.js";

describe("testCoverage", () => {
  it("boundary scan combo best test coverage", () => {
    expect(testCoverage("boundary_scan_combo")).toBeGreaterThan(testCoverage("dual_probe_basic"));
  });
});

describe("testSpeed", () => {
  it("six probe premium fastest test", () => {
    expect(testSpeed("six_probe_premium")).toBeGreaterThan(testSpeed("micro_probe_fine"));
  });
});

describe("accuracy", () => {
  it("boundary scan combo best accuracy", () => {
    expect(accuracy("boundary_scan_combo")).toBeGreaterThan(accuracy("dual_probe_basic"));
  });
});

describe("setupTime", () => {
  it("dual probe basic fastest setup", () => {
    expect(setupTime("dual_probe_basic")).toBeGreaterThan(setupTime("boundary_scan_combo"));
  });
});

describe("systemCost", () => {
  it("boundary scan combo most expensive", () => {
    expect(systemCost("boundary_scan_combo")).toBeGreaterThan(systemCost("dual_probe_basic"));
  });
});

describe("npiReady", () => {
  it("dual probe basic is npi ready", () => {
    expect(npiReady("dual_probe_basic")).toBe(true);
  });
  it("boundary scan combo not npi ready", () => {
    expect(npiReady("boundary_scan_combo")).toBe(false);
  });
});

describe("contactless", () => {
  it("boundary scan combo is contactless", () => {
    expect(contactless("boundary_scan_combo")).toBe(true);
  });
  it("quad probe fast not contactless", () => {
    expect(contactless("quad_probe_fast")).toBe(false);
  });
});

describe("probeCount", () => {
  it("six probe premium uses 6 probe multi axis", () => {
    expect(probeCount("six_probe_premium")).toBe("6_probe_multi_axis");
  });
});

describe("bestUse", () => {
  it("boundary scan combo best for bga hidden net test", () => {
    expect(bestUse("boundary_scan_combo")).toBe("bga_hidden_net_test");
  });
});

describe("flyingProbes", () => {
  it("returns 5 types", () => {
    expect(flyingProbes()).toHaveLength(5);
  });
});
