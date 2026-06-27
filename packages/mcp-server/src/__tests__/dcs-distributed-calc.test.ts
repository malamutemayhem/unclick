import { describe, it, expect } from "vitest";
import {
  scalability, redundancy, operatorInterface, integration,
  dcCost, cloudEnabled, forCriticalProcess, architecture,
  bestUse, dcsDistributedTypes,
} from "../dcs-distributed-calc.js";

describe("scalability", () => {
  it("traditional dcs most scalable", () => {
    expect(scalability("traditional_dcs_large")).toBeGreaterThan(scalability("micro_dcs_skid_mount"));
  });
});

describe("redundancy", () => {
  it("traditional dcs highest redundancy", () => {
    expect(redundancy("traditional_dcs_large")).toBeGreaterThanOrEqual(redundancy("safety_integrated_dcs"));
  });
});

describe("operatorInterface", () => {
  it("cloud connected dcs best operator interface", () => {
    expect(operatorInterface("cloud_connected_dcs")).toBeGreaterThan(operatorInterface("micro_dcs_skid_mount"));
  });
});

describe("integration", () => {
  it("cloud connected dcs best integration", () => {
    expect(integration("cloud_connected_dcs")).toBeGreaterThan(integration("micro_dcs_skid_mount"));
  });
});

describe("dcCost", () => {
  it("traditional dcs most expensive", () => {
    expect(dcCost("traditional_dcs_large")).toBeGreaterThan(dcCost("micro_dcs_skid_mount"));
  });
});

describe("cloudEnabled", () => {
  it("cloud connected dcs is cloud enabled", () => {
    expect(cloudEnabled("cloud_connected_dcs")).toBe(true);
  });
  it("traditional dcs not cloud enabled", () => {
    expect(cloudEnabled("traditional_dcs_large")).toBe(false);
  });
});

describe("forCriticalProcess", () => {
  it("safety integrated dcs for critical process", () => {
    expect(forCriticalProcess("safety_integrated_dcs")).toBe(true);
  });
  it("micro dcs not for critical process", () => {
    expect(forCriticalProcess("micro_dcs_skid_mount")).toBe(false);
  });
});

describe("architecture", () => {
  it("hybrid dcs uses unified database", () => {
    expect(architecture("hybrid_dcs_plc_mix")).toBe("dcs_supervisory_plc_field_control_unified_database");
  });
});

describe("bestUse", () => {
  it("cloud connected for multi site monitoring", () => {
    expect(bestUse("cloud_connected_dcs")).toBe("multi_site_monitoring_digital_twin_predictive_ops");
  });
});

describe("dcsDistributedTypes", () => {
  it("returns 5 types", () => {
    expect(dcsDistributedTypes()).toHaveLength(5);
  });
});
