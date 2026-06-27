import { describe, it, expect } from "vitest";
import {
  seqRead, iops, latency, endurance,
  configCost, networked, forCloud, transport,
  bestUse, nvmeConfigs,
} from "../nvme-config-calc.js";

describe("seqRead", () => {
  it("nvme pcie gen5 fastest seq read", () => {
    expect(seqRead("nvme_pcie_gen5")).toBeGreaterThan(seqRead("nvme_of_tcp"));
  });
});

describe("iops", () => {
  it("nvme pcie gen5 highest iops", () => {
    expect(iops("nvme_pcie_gen5")).toBeGreaterThan(iops("nvme_of_tcp"));
  });
});

describe("latency", () => {
  it("nvme pcie gen5 lowest latency", () => {
    expect(latency("nvme_pcie_gen5")).toBeGreaterThan(latency("nvme_of_tcp"));
  });
});

describe("endurance", () => {
  it("zns zoned ns best endurance", () => {
    expect(endurance("zns_zoned_ns")).toBeGreaterThan(endurance("nvme_pcie_gen4"));
  });
});

describe("configCost", () => {
  it("nvme of rdma most expensive", () => {
    expect(configCost("nvme_of_rdma")).toBeGreaterThan(configCost("nvme_pcie_gen4"));
  });
});

describe("networked", () => {
  it("nvme of tcp is networked", () => {
    expect(networked("nvme_of_tcp")).toBe(true);
  });
  it("nvme pcie gen4 not networked", () => {
    expect(networked("nvme_pcie_gen4")).toBe(false);
  });
});

describe("forCloud", () => {
  it("nvme of tcp is for cloud", () => {
    expect(forCloud("nvme_of_tcp")).toBe(true);
  });
  it("nvme pcie gen4 not for cloud", () => {
    expect(forCloud("nvme_pcie_gen4")).toBe(false);
  });
});

describe("transport", () => {
  it("nvme of rdma uses roce v2 rdma fabric", () => {
    expect(transport("nvme_of_rdma")).toBe("roce_v2_rdma_fabric");
  });
});

describe("bestUse", () => {
  it("zns zoned ns best for lsm tree database engine", () => {
    expect(bestUse("zns_zoned_ns")).toBe("lsm_tree_database_engine");
  });
});

describe("nvmeConfigs", () => {
  it("returns 5 types", () => {
    expect(nvmeConfigs()).toHaveLength(5);
  });
});
