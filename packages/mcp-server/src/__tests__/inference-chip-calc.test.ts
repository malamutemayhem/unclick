import { describe, it, expect } from "vitest";
import {
  throughput, latency, powerEff, flexibility,
  infCost, batchOptimized, forEdge, precision,
  bestUse, inferenceChips,
} from "../inference-chip-calc.js";

describe("throughput", () => {
  it("gpu inference mode highest throughput", () => {
    expect(throughput("gpu_inference_mode")).toBeGreaterThan(throughput("mcu_tinyml"));
  });
});

describe("latency", () => {
  it("analog imc lowest latency", () => {
    expect(latency("analog_imc")).toBeGreaterThan(latency("gpu_inference_mode"));
  });
});

describe("powerEff", () => {
  it("mcu tinyml best power efficiency", () => {
    expect(powerEff("mcu_tinyml")).toBeGreaterThan(powerEff("gpu_inference_mode"));
  });
});

describe("flexibility", () => {
  it("gpu inference mode most flexible", () => {
    expect(flexibility("gpu_inference_mode")).toBeGreaterThan(flexibility("asic_fixed_model"));
  });
});

describe("infCost", () => {
  it("gpu inference mode most expensive", () => {
    expect(infCost("gpu_inference_mode")).toBeGreaterThan(infCost("mcu_tinyml"));
  });
});

describe("batchOptimized", () => {
  it("gpu inference mode is batch optimized", () => {
    expect(batchOptimized("gpu_inference_mode")).toBe(true);
  });
  it("mcu tinyml not batch optimized", () => {
    expect(batchOptimized("mcu_tinyml")).toBe(false);
  });
});

describe("forEdge", () => {
  it("asic fixed model is for edge", () => {
    expect(forEdge("asic_fixed_model")).toBe(true);
  });
  it("gpu inference mode not for edge", () => {
    expect(forEdge("gpu_inference_mode")).toBe(false);
  });
});

describe("precision", () => {
  it("analog imc uses analog 1bit crossbar", () => {
    expect(precision("analog_imc")).toBe("analog_1bit_crossbar");
  });
});

describe("bestUse", () => {
  it("mcu tinyml best for keyword wake word", () => {
    expect(bestUse("mcu_tinyml")).toBe("keyword_wake_word");
  });
});

describe("inferenceChips", () => {
  it("returns 5 types", () => {
    expect(inferenceChips()).toHaveLength(5);
  });
});
