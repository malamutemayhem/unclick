import { describe, it, expect } from "vitest";
import {
  bandwidth, latency, pooling, coherency,
  cxlCost, hotPlug, forDisaggregated, protocol,
  bestUse, cxlTypes,
} from "../cxl-type-calc.js";

describe("bandwidth", () => {
  it("cxl 3 0 fabric highest bandwidth", () => {
    expect(bandwidth("cxl_3_0_fabric")).toBeGreaterThan(bandwidth("cxl_1_1_cache"));
  });
});

describe("latency", () => {
  it("cxl 1 1 cache lowest latency", () => {
    expect(latency("cxl_1_1_cache")).toBeGreaterThan(latency("cxl_3_0_fabric"));
  });
});

describe("pooling", () => {
  it("cxl switch pool best pooling", () => {
    expect(pooling("cxl_switch_pool")).toBeGreaterThan(pooling("cxl_1_1_cache"));
  });
});

describe("coherency", () => {
  it("cxl 2 0 memory best coherency", () => {
    expect(coherency("cxl_2_0_memory")).toBeGreaterThan(coherency("cxl_mem_expander"));
  });
});

describe("cxlCost", () => {
  it("cxl 3 0 fabric most expensive", () => {
    expect(cxlCost("cxl_3_0_fabric")).toBeGreaterThan(cxlCost("cxl_1_1_cache"));
  });
});

describe("hotPlug", () => {
  it("cxl 2 0 memory supports hot plug", () => {
    expect(hotPlug("cxl_2_0_memory")).toBe(true);
  });
  it("cxl 1 1 cache no hot plug", () => {
    expect(hotPlug("cxl_1_1_cache")).toBe(false);
  });
});

describe("forDisaggregated", () => {
  it("cxl 3 0 fabric is for disaggregated", () => {
    expect(forDisaggregated("cxl_3_0_fabric")).toBe(true);
  });
  it("cxl 1 1 cache not for disaggregated", () => {
    expect(forDisaggregated("cxl_1_1_cache")).toBe(false);
  });
});

describe("protocol", () => {
  it("cxl switch pool uses fabric manager switch", () => {
    expect(protocol("cxl_switch_pool")).toBe("fabric_manager_switch");
  });
});

describe("bestUse", () => {
  it("cxl 3 0 fabric best for composable rack fabric", () => {
    expect(bestUse("cxl_3_0_fabric")).toBe("composable_rack_fabric");
  });
});

describe("cxlTypes", () => {
  it("returns 5 types", () => {
    expect(cxlTypes()).toHaveLength(5);
  });
});
