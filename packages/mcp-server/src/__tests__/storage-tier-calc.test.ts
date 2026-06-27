import { describe, it, expect } from "vitest";
import {
  iops, throughput, latency, density,
  storCost, hotSwap, forDatabase, interface_,
  bestUse, storageTiers,
} from "../storage-tier-calc.js";

describe("iops", () => {
  it("persistent mem pmem highest iops", () => {
    expect(iops("persistent_mem_pmem")).toBeGreaterThan(iops("hdd_nearline_18tb"));
  });
});

describe("throughput", () => {
  it("nvme u2 ssd highest throughput", () => {
    expect(throughput("nvme_u2_ssd")).toBeGreaterThan(throughput("hdd_nearline_18tb"));
  });
});

describe("latency", () => {
  it("persistent mem pmem lowest latency", () => {
    expect(latency("persistent_mem_pmem")).toBeGreaterThan(latency("hdd_nearline_18tb"));
  });
});

describe("density", () => {
  it("hdd nearline 18tb highest density", () => {
    expect(density("hdd_nearline_18tb")).toBeGreaterThan(density("persistent_mem_pmem"));
  });
});

describe("storCost", () => {
  it("persistent mem pmem most expensive", () => {
    expect(storCost("persistent_mem_pmem")).toBeGreaterThan(storCost("hdd_nearline_18tb"));
  });
});

describe("hotSwap", () => {
  it("nvme u2 ssd is hot swap", () => {
    expect(hotSwap("nvme_u2_ssd")).toBe(true);
  });
  it("persistent mem pmem not hot swap", () => {
    expect(hotSwap("persistent_mem_pmem")).toBe(false);
  });
});

describe("forDatabase", () => {
  it("nvme u2 ssd is for database", () => {
    expect(forDatabase("nvme_u2_ssd")).toBe(true);
  });
  it("hdd nearline 18tb not for database", () => {
    expect(forDatabase("hdd_nearline_18tb")).toBe(false);
  });
});

describe("interface_", () => {
  it("nvme edsff e3 uses pcie5 edsff e3 s", () => {
    expect(interface_("nvme_edsff_e3")).toBe("pcie5_edsff_e3_s");
  });
});

describe("bestUse", () => {
  it("persistent mem pmem best for in memory db tier0", () => {
    expect(bestUse("persistent_mem_pmem")).toBe("in_memory_db_tier0");
  });
});

describe("storageTiers", () => {
  it("returns 5 types", () => {
    expect(storageTiers()).toHaveLength(5);
  });
});
