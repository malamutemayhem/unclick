import { describe, it, expect } from "vitest";
import {
  bandwidth, latency, cpuOffload, congestion,
  rdmaCost, lossless, forAiTraining, transport,
  bestUse, rdmaTypes,
} from "../rdma-type-calc.js";

describe("bandwidth", () => {
  it("ultra ethernet highest bandwidth", () => {
    expect(bandwidth("ultra_ethernet")).toBeGreaterThan(bandwidth("iwarp_tcp"));
  });
});

describe("latency", () => {
  it("infiniband ndr lowest latency", () => {
    expect(latency("infiniband_ndr")).toBeGreaterThan(latency("iwarp_tcp"));
  });
});

describe("cpuOffload", () => {
  it("infiniband ndr best cpu offload", () => {
    expect(cpuOffload("infiniband_ndr")).toBeGreaterThan(cpuOffload("iwarp_tcp"));
  });
});

describe("congestion", () => {
  it("infiniband ndr best congestion control", () => {
    expect(congestion("infiniband_ndr")).toBeGreaterThan(congestion("roce_v2"));
  });
});

describe("rdmaCost", () => {
  it("infiniband ndr most expensive", () => {
    expect(rdmaCost("infiniband_ndr")).toBeGreaterThan(rdmaCost("iwarp_tcp"));
  });
});

describe("lossless", () => {
  it("roce v2 is lossless", () => {
    expect(lossless("roce_v2")).toBe(true);
  });
  it("iwarp tcp not lossless", () => {
    expect(lossless("iwarp_tcp")).toBe(false);
  });
});

describe("forAiTraining", () => {
  it("infiniband ndr is for ai training", () => {
    expect(forAiTraining("infiniband_ndr")).toBe(true);
  });
  it("iwarp tcp not for ai training", () => {
    expect(forAiTraining("iwarp_tcp")).toBe(false);
  });
});

describe("transport", () => {
  it("ultra ethernet uses uec packet spraying", () => {
    expect(transport("ultra_ethernet")).toBe("uec_packet_spraying");
  });
});

describe("bestUse", () => {
  it("infiniband ndr best for large llm training", () => {
    expect(bestUse("infiniband_ndr")).toBe("large_llm_training");
  });
});

describe("rdmaTypes", () => {
  it("returns 5 types", () => {
    expect(rdmaTypes()).toHaveLength(5);
  });
});
