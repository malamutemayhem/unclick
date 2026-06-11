import { describe, it, expect } from "vitest";
import {
  bandwidth, capacity, powerEff, latency,
  memCost, onPackage, forLlm, interface_,
  bestUse, aiMemories,
} from "../ai-memory-calc.js";

describe("bandwidth", () => {
  it("hbm gpu stack highest bandwidth", () => {
    expect(bandwidth("hbm_gpu_stack")).toBeGreaterThan(bandwidth("lpddr_edge"));
  });
});

describe("capacity", () => {
  it("hbm gpu stack highest capacity", () => {
    expect(capacity("hbm_gpu_stack")).toBeGreaterThan(capacity("sram_on_chip"));
  });
});

describe("powerEff", () => {
  it("processing in mem best power efficiency", () => {
    expect(powerEff("processing_in_mem")).toBeGreaterThan(powerEff("gddr_discrete"));
  });
});

describe("latency", () => {
  it("sram on chip lowest latency", () => {
    expect(latency("sram_on_chip")).toBeGreaterThan(latency("gddr_discrete"));
  });
});

describe("memCost", () => {
  it("hbm gpu stack most expensive", () => {
    expect(memCost("hbm_gpu_stack")).toBeGreaterThan(memCost("lpddr_edge"));
  });
});

describe("onPackage", () => {
  it("sram on chip is on package", () => {
    expect(onPackage("sram_on_chip")).toBe(true);
  });
  it("gddr discrete not on package", () => {
    expect(onPackage("gddr_discrete")).toBe(false);
  });
});

describe("forLlm", () => {
  it("hbm gpu stack is for llm", () => {
    expect(forLlm("hbm_gpu_stack")).toBe(true);
  });
  it("gddr discrete not for llm", () => {
    expect(forLlm("gddr_discrete")).toBe(false);
  });
});

describe("interface_", () => {
  it("processing in mem uses compute near memory", () => {
    expect(interface_("processing_in_mem")).toBe("compute_near_memory");
  });
});

describe("bestUse", () => {
  it("sram on chip best for activation kv cache", () => {
    expect(bestUse("sram_on_chip")).toBe("activation_kv_cache");
  });
});

describe("aiMemories", () => {
  it("returns 5 types", () => {
    expect(aiMemories()).toHaveLength(5);
  });
});
