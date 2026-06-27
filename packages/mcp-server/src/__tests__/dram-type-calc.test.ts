import { describe, it, expect } from "vitest";
import {
  capacity, reliability, bandwidth, latency,
  dramCost, persistent, forServer, form,
  bestUse, dramTypes,
} from "../dram-type-calc.js";

describe("capacity", () => {
  it("lrdimm buffered highest capacity", () => {
    expect(capacity("lrdimm_buffered")).toBeGreaterThan(capacity("hmc_hybrid_cube"));
  });
});

describe("reliability", () => {
  it("lrdimm buffered most reliable", () => {
    expect(reliability("lrdimm_buffered")).toBeGreaterThan(reliability("commodity_ddr"));
  });
});

describe("bandwidth", () => {
  it("hmc hybrid cube highest bandwidth", () => {
    expect(bandwidth("hmc_hybrid_cube")).toBeGreaterThan(bandwidth("commodity_ddr"));
  });
});

describe("latency", () => {
  it("hmc hybrid cube lowest latency", () => {
    expect(latency("hmc_hybrid_cube")).toBeGreaterThan(latency("lrdimm_buffered"));
  });
});

describe("dramCost", () => {
  it("hmc hybrid cube most expensive", () => {
    expect(dramCost("hmc_hybrid_cube")).toBeGreaterThan(dramCost("commodity_ddr"));
  });
});

describe("persistent", () => {
  it("nvdimm persistent is persistent", () => {
    expect(persistent("nvdimm_persistent")).toBe(true);
  });
  it("commodity ddr not persistent", () => {
    expect(persistent("commodity_ddr")).toBe(false);
  });
});

describe("forServer", () => {
  it("ecc registered is for server", () => {
    expect(forServer("ecc_registered")).toBe(true);
  });
  it("commodity ddr not for server", () => {
    expect(forServer("commodity_ddr")).toBe(false);
  });
});

describe("form", () => {
  it("lrdimm buffered uses lrdimm data buffer", () => {
    expect(form("lrdimm_buffered")).toBe("lrdimm_data_buffer");
  });
});

describe("bestUse", () => {
  it("hmc hybrid cube best for network packet buffer", () => {
    expect(bestUse("hmc_hybrid_cube")).toBe("network_packet_buffer");
  });
});

describe("dramTypes", () => {
  it("returns 5 types", () => {
    expect(dramTypes()).toHaveLength(5);
  });
});
