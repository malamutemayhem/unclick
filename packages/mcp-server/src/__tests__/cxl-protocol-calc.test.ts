import { describe, it, expect } from "vitest";
import {
  bandwidth, latency, coherency, scalability,
  protoCost, cacheCoherent, forMemExpand, transport,
  bestUse, cxlProtocols,
} from "../cxl-protocol-calc.js";

describe("bandwidth", () => {
  it("cxl switch fabric highest bandwidth", () => {
    expect(bandwidth("cxl_switch_fabric")).toBeGreaterThan(bandwidth("cxl_type1_cache"));
  });
});

describe("latency", () => {
  it("cxl type1 cache lowest latency", () => {
    expect(latency("cxl_type1_cache")).toBeGreaterThan(latency("cxl_mem_pool"));
  });
});

describe("coherency", () => {
  it("cxl type1 cache best coherency", () => {
    expect(coherency("cxl_type1_cache")).toBeGreaterThan(coherency("cxl_mem_pool"));
  });
});

describe("scalability", () => {
  it("cxl switch fabric most scalable", () => {
    expect(scalability("cxl_switch_fabric")).toBeGreaterThan(scalability("cxl_type1_cache"));
  });
});

describe("protoCost", () => {
  it("cxl switch fabric most expensive", () => {
    expect(protoCost("cxl_switch_fabric")).toBeGreaterThan(protoCost("cxl_type3_mem"));
  });
});

describe("cacheCoherent", () => {
  it("cxl type1 cache is cache coherent", () => {
    expect(cacheCoherent("cxl_type1_cache")).toBe(true);
  });
  it("cxl type3 mem not cache coherent", () => {
    expect(cacheCoherent("cxl_type3_mem")).toBe(false);
  });
});

describe("forMemExpand", () => {
  it("cxl type3 mem is for mem expand", () => {
    expect(forMemExpand("cxl_type3_mem")).toBe(true);
  });
  it("cxl type1 cache not for mem expand", () => {
    expect(forMemExpand("cxl_type1_cache")).toBe(false);
  });
});

describe("transport", () => {
  it("cxl switch fabric uses cxl 3 0 fabric port", () => {
    expect(transport("cxl_switch_fabric")).toBe("cxl_3_0_fabric_port");
  });
});

describe("bestUse", () => {
  it("cxl type3 mem best for dram capacity expansion", () => {
    expect(bestUse("cxl_type3_mem")).toBe("dram_capacity_expansion");
  });
});

describe("cxlProtocols", () => {
  it("returns 5 types", () => {
    expect(cxlProtocols()).toHaveLength(5);
  });
});
