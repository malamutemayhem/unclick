import { describe, it, expect } from "vitest";
import {
  bandwidth, gpuCount, latency, powerEff,
  nvCost, switchRequired, forTraining, topology,
  bestUse, nvlinkGens,
} from "../nvlink-gen-calc.js";

describe("bandwidth", () => {
  it("nvswitch fabric highest bandwidth", () => {
    expect(bandwidth("nvswitch_fabric")).toBeGreaterThan(bandwidth("nvlink_3_a100"));
  });
});

describe("gpuCount", () => {
  it("nvswitch fabric most gpus", () => {
    expect(gpuCount("nvswitch_fabric")).toBeGreaterThan(gpuCount("nvlink_3_a100"));
  });
});

describe("latency", () => {
  it("nvlink c2c lowest latency", () => {
    expect(latency("nvlink_c2c")).toBeGreaterThan(latency("nvlink_3_a100"));
  });
});

describe("powerEff", () => {
  it("nvlink c2c best power efficiency", () => {
    expect(powerEff("nvlink_c2c")).toBeGreaterThan(powerEff("nvswitch_fabric"));
  });
});

describe("nvCost", () => {
  it("nvlink 5 b200 most expensive", () => {
    expect(nvCost("nvlink_5_b200")).toBeGreaterThan(nvCost("nvlink_3_a100"));
  });
});

describe("switchRequired", () => {
  it("nvlink 4 h100 requires switch", () => {
    expect(switchRequired("nvlink_4_h100")).toBe(true);
  });
  it("nvlink 3 a100 no switch required", () => {
    expect(switchRequired("nvlink_3_a100")).toBe(false);
  });
});

describe("forTraining", () => {
  it("nvlink 5 b200 is for training", () => {
    expect(forTraining("nvlink_5_b200")).toBe(true);
  });
});

describe("topology", () => {
  it("nvlink c2c uses chip to chip coherent", () => {
    expect(topology("nvlink_c2c")).toBe("chip_to_chip_coherent");
  });
});

describe("bestUse", () => {
  it("nvlink 5 b200 best for 72gpu gb200 nvl72", () => {
    expect(bestUse("nvlink_5_b200")).toBe("72gpu_gb200_nvl72");
  });
});

describe("nvlinkGens", () => {
  it("returns 5 types", () => {
    expect(nvlinkGens()).toHaveLength(5);
  });
});
