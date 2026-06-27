import { describe, it, expect } from "vitest";
import {
  scalability, reliability, openness, latency,
  dcCost, redundant, forProcess, architecture,
  bestUse, dcsTypes,
} from "../dcs-type-calc.js";

describe("scalability", () => {
  it("cloud edge most scalable", () => {
    expect(scalability("cloud_edge_distributed")).toBeGreaterThan(scalability("safety_integrated_sis"));
  });
});

describe("reliability", () => {
  it("traditional most reliable", () => {
    expect(reliability("traditional_proprietary_dcs")).toBeGreaterThan(reliability("pc_based_open_platform"));
  });
});

describe("openness", () => {
  it("cloud edge most open", () => {
    expect(openness("cloud_edge_distributed")).toBeGreaterThan(openness("traditional_proprietary_dcs"));
  });
});

describe("latency", () => {
  it("safety sis lowest latency score highest", () => {
    expect(latency("safety_integrated_sis")).toBeGreaterThan(latency("cloud_edge_distributed"));
  });
});

describe("dcCost", () => {
  it("traditional most expensive", () => {
    expect(dcCost("traditional_proprietary_dcs")).toBeGreaterThan(dcCost("cloud_edge_distributed"));
  });
});

describe("redundant", () => {
  it("traditional is redundant", () => {
    expect(redundant("traditional_proprietary_dcs")).toBe(true);
  });
  it("pc based not redundant", () => {
    expect(redundant("pc_based_open_platform")).toBe(false);
  });
});

describe("forProcess", () => {
  it("traditional for process", () => {
    expect(forProcess("traditional_proprietary_dcs")).toBe(true);
  });
  it("cloud edge not for process", () => {
    expect(forProcess("cloud_edge_distributed")).toBe(false);
  });
});

describe("architecture", () => {
  it("safety sis uses tmr voted", () => {
    expect(architecture("safety_integrated_sis")).toBe("tmr_voted_logic_sil3_certified");
  });
});

describe("bestUse", () => {
  it("traditional for large refinery", () => {
    expect(bestUse("traditional_proprietary_dcs")).toBe("large_refinery_continuous_process");
  });
});

describe("dcsTypes", () => {
  it("returns 5 types", () => {
    expect(dcsTypes()).toHaveLength(5);
  });
});
