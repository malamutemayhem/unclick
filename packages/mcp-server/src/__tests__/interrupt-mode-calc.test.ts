import { describe, it, expect } from "vitest";
import {
  latency, determinism, throughput, cpuLoad,
  intCost, preemptive, forRealtime, mechanism,
  bestUse, interruptModes,
} from "../interrupt-mode-calc.js";

describe("latency", () => {
  it("vectored direct lowest latency", () => {
    expect(latency("vectored_direct")).toBeGreaterThan(latency("polled_status"));
  });
});

describe("determinism", () => {
  it("vectored direct most deterministic", () => {
    expect(determinism("vectored_direct")).toBeGreaterThan(determinism("polled_status"));
  });
});

describe("throughput", () => {
  it("dma triggered highest throughput", () => {
    expect(throughput("dma_triggered")).toBeGreaterThan(throughput("nested_nvic"));
  });
});

describe("cpuLoad", () => {
  it("dma triggered least cpu load", () => {
    expect(cpuLoad("dma_triggered")).toBeGreaterThan(cpuLoad("polled_status"));
  });
});

describe("intCost", () => {
  it("dma triggered most expensive", () => {
    expect(intCost("dma_triggered")).toBeGreaterThan(intCost("polled_status"));
  });
});

describe("preemptive", () => {
  it("nested nvic is preemptive", () => {
    expect(preemptive("nested_nvic")).toBe(true);
  });
  it("polled status not preemptive", () => {
    expect(preemptive("polled_status")).toBe(false);
  });
});

describe("forRealtime", () => {
  it("nested nvic for realtime", () => {
    expect(forRealtime("nested_nvic")).toBe(true);
  });
  it("polled status not for realtime", () => {
    expect(forRealtime("polled_status")).toBe(false);
  });
});

describe("mechanism", () => {
  it("event wakeup uses wfe sev core wake", () => {
    expect(mechanism("event_wakeup")).toBe("wfe_sev_core_wake");
  });
});

describe("bestUse", () => {
  it("dma triggered best for high speed data pipeline", () => {
    expect(bestUse("dma_triggered")).toBe("high_speed_data_pipeline");
  });
});

describe("interruptModes", () => {
  it("returns 5 types", () => {
    expect(interruptModes()).toHaveLength(5);
  });
});
