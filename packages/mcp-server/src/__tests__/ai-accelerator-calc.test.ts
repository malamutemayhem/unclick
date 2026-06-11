import { describe, it, expect } from "vitest";
import {
  topsPerWatt, memBandwidth, flexibility, latency,
  accelCost, programmable, forTraining, compute,
  bestUse, aiAccelerators,
} from "../ai-accelerator-calc.js";

describe("topsPerWatt", () => {
  it("npu dataflow best tops per watt", () => {
    expect(topsPerWatt("npu_dataflow")).toBeGreaterThan(topsPerWatt("fpga_overlay"));
  });
});

describe("memBandwidth", () => {
  it("gpu tensor core highest mem bandwidth", () => {
    expect(memBandwidth("gpu_tensor_core")).toBeGreaterThan(memBandwidth("analog_imc"));
  });
});

describe("flexibility", () => {
  it("fpga overlay most flexible", () => {
    expect(flexibility("fpga_overlay")).toBeGreaterThan(flexibility("analog_imc"));
  });
});

describe("latency", () => {
  it("analog imc lowest latency", () => {
    expect(latency("analog_imc")).toBeGreaterThan(latency("gpu_tensor_core"));
  });
});

describe("accelCost", () => {
  it("tpu systolic most expensive", () => {
    expect(accelCost("tpu_systolic")).toBeGreaterThan(accelCost("npu_dataflow"));
  });
});

describe("programmable", () => {
  it("gpu tensor core is programmable", () => {
    expect(programmable("gpu_tensor_core")).toBe(true);
  });
  it("tpu systolic not programmable", () => {
    expect(programmable("tpu_systolic")).toBe(false);
  });
});

describe("forTraining", () => {
  it("gpu tensor core is for training", () => {
    expect(forTraining("gpu_tensor_core")).toBe(true);
  });
  it("npu dataflow not for training", () => {
    expect(forTraining("npu_dataflow")).toBe(false);
  });
});

describe("compute", () => {
  it("analog imc uses rram crossbar mvm", () => {
    expect(compute("analog_imc")).toBe("rram_crossbar_mvm");
  });
});

describe("bestUse", () => {
  it("gpu tensor core best for llm training cluster", () => {
    expect(bestUse("gpu_tensor_core")).toBe("llm_training_cluster");
  });
});

describe("aiAccelerators", () => {
  it("returns 5 types", () => {
    expect(aiAccelerators()).toHaveLength(5);
  });
});
