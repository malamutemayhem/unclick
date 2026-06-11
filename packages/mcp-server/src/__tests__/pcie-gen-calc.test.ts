import { describe, it, expect } from "vitest";
import {
  bandwidth, latency, powerEff, compatibility,
  pcieCost, pamEncoding, forAi, encoding,
  bestUse, pcieGens,
} from "../pcie-gen-calc.js";

describe("bandwidth", () => {
  it("pcie 7 0 highest bandwidth", () => {
    expect(bandwidth("pcie_7_0")).toBeGreaterThan(bandwidth("pcie_3_0"));
  });
});

describe("latency", () => {
  it("pcie 3 0 good latency", () => {
    expect(latency("pcie_3_0")).toBeGreaterThan(latency("pcie_6_0"));
  });
});

describe("powerEff", () => {
  it("pcie 3 0 best power efficiency", () => {
    expect(powerEff("pcie_3_0")).toBeGreaterThan(powerEff("pcie_6_0"));
  });
});

describe("compatibility", () => {
  it("pcie 3 0 best compatibility", () => {
    expect(compatibility("pcie_3_0")).toBeGreaterThan(compatibility("pcie_7_0"));
  });
});

describe("pcieCost", () => {
  it("pcie 7 0 most expensive", () => {
    expect(pcieCost("pcie_7_0")).toBeGreaterThan(pcieCost("pcie_3_0"));
  });
});

describe("pamEncoding", () => {
  it("pcie 6 0 uses pam encoding", () => {
    expect(pamEncoding("pcie_6_0")).toBe(true);
  });
  it("pcie 5 0 no pam encoding", () => {
    expect(pamEncoding("pcie_5_0")).toBe(false);
  });
});

describe("forAi", () => {
  it("pcie 5 0 is for ai", () => {
    expect(forAi("pcie_5_0")).toBe(true);
  });
  it("pcie 3 0 not for ai", () => {
    expect(forAi("pcie_3_0")).toBe(false);
  });
});

describe("encoding", () => {
  it("pcie 6 0 uses pam4 flit fec", () => {
    expect(encoding("pcie_6_0")).toBe("pam4_flit_fec");
  });
});

describe("bestUse", () => {
  it("pcie 7 0 best for next gen compute fabric", () => {
    expect(bestUse("pcie_7_0")).toBe("next_gen_compute_fabric");
  });
});

describe("pcieGens", () => {
  it("returns 5 types", () => {
    expect(pcieGens()).toHaveLength(5);
  });
});
