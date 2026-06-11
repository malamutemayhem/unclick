import { describe, it, expect } from "vitest";
import {
  throughput, programmability, offloadDepth, powerDraw,
  dpuCost, hostless, forCloud, engine,
  bestUse, dpuSmartnics,
} from "../dpu-smartnic-calc.js";

describe("throughput", () => {
  it("asic inline crypto highest throughput", () => {
    expect(throughput("asic_inline_crypto")).toBeGreaterThan(throughput("nic_offload_basic"));
  });
});

describe("programmability", () => {
  it("fpga smartnic most programmable", () => {
    expect(programmability("fpga_smartnic")).toBeGreaterThan(programmability("nic_offload_basic"));
  });
});

describe("offloadDepth", () => {
  it("ipu infrastructure deepest offload", () => {
    expect(offloadDepth("ipu_infrastructure")).toBeGreaterThan(offloadDepth("nic_offload_basic"));
  });
});

describe("powerDraw", () => {
  it("nic offload basic lowest power", () => {
    expect(powerDraw("nic_offload_basic")).toBeGreaterThan(powerDraw("fpga_smartnic"));
  });
});

describe("dpuCost", () => {
  it("ipu infrastructure most expensive", () => {
    expect(dpuCost("ipu_infrastructure")).toBeGreaterThan(dpuCost("nic_offload_basic"));
  });
});

describe("hostless", () => {
  it("dpu arm cores is hostless", () => {
    expect(hostless("dpu_arm_cores")).toBe(true);
  });
  it("nic offload basic not hostless", () => {
    expect(hostless("nic_offload_basic")).toBe(false);
  });
});

describe("forCloud", () => {
  it("dpu arm cores is for cloud", () => {
    expect(forCloud("dpu_arm_cores")).toBe(true);
  });
  it("nic offload basic not for cloud", () => {
    expect(forCloud("nic_offload_basic")).toBe(false);
  });
});

describe("engine", () => {
  it("fpga smartnic uses rtl hls pipeline", () => {
    expect(engine("fpga_smartnic")).toBe("rtl_hls_pipeline");
  });
});

describe("bestUse", () => {
  it("dpu arm cores best for bare metal cloud host", () => {
    expect(bestUse("dpu_arm_cores")).toBe("bare_metal_cloud_host");
  });
});

describe("dpuSmartnics", () => {
  it("returns 5 types", () => {
    expect(dpuSmartnics()).toHaveLength(5);
  });
});
