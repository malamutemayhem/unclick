import { describe, it, expect } from "vitest";
import {
  tflops, powerEff, precision, programmability,
  coreCost, sparsity, forTraining, dataflow,
  bestUse, tensorCores,
} from "../tensor-core-calc.js";

describe("tflops", () => {
  it("wafer scale engine highest tflops", () => {
    expect(tflops("wafer_scale_engine")).toBeGreaterThan(tflops("npu_mac_array"));
  });
});

describe("powerEff", () => {
  it("npu mac array best power efficiency", () => {
    expect(powerEff("npu_mac_array")).toBeGreaterThan(powerEff("gpu_cuda_tensor"));
  });
});

describe("precision", () => {
  it("fpga dsp block best precision", () => {
    expect(precision("fpga_dsp_block")).toBeGreaterThan(precision("npu_mac_array"));
  });
});

describe("programmability", () => {
  it("fpga dsp block most programmable", () => {
    expect(programmability("fpga_dsp_block")).toBeGreaterThan(programmability("npu_mac_array"));
  });
});

describe("coreCost", () => {
  it("wafer scale engine most expensive", () => {
    expect(coreCost("wafer_scale_engine")).toBeGreaterThan(coreCost("npu_mac_array"));
  });
});

describe("sparsity", () => {
  it("gpu cuda tensor has sparsity", () => {
    expect(sparsity("gpu_cuda_tensor")).toBe(true);
  });
  it("tpu systolic no sparsity", () => {
    expect(sparsity("tpu_systolic")).toBe(false);
  });
});

describe("forTraining", () => {
  it("gpu cuda tensor is for training", () => {
    expect(forTraining("gpu_cuda_tensor")).toBe(true);
  });
  it("npu mac array not for training", () => {
    expect(forTraining("npu_mac_array")).toBe(false);
  });
});

describe("dataflow", () => {
  it("tpu systolic uses weight stationary 2d", () => {
    expect(dataflow("tpu_systolic")).toBe("weight_stationary_2d");
  });
});

describe("bestUse", () => {
  it("wafer scale engine best for frontier model training", () => {
    expect(bestUse("wafer_scale_engine")).toBe("frontier_model_training");
  });
});

describe("tensorCores", () => {
  it("returns 5 types", () => {
    expect(tensorCores()).toHaveLength(5);
  });
});
