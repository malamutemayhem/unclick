import { describe, it, expect } from "vitest";
import {
  throughput, cpuFree, flexibility, latency,
  dmaCost, autoReload, forAudio, descriptor,
  bestUse, dmaModes,
} from "../dma-mode-calc.js";

describe("throughput", () => {
  it("linked list chain highest throughput", () => {
    expect(throughput("linked_list_chain")).toBeGreaterThan(throughput("single_transfer"));
  });
});

describe("cpuFree", () => {
  it("linked list chain frees cpu most", () => {
    expect(cpuFree("linked_list_chain")).toBeGreaterThan(cpuFree("single_transfer"));
  });
});

describe("flexibility", () => {
  it("scatter gather most flexible", () => {
    expect(flexibility("scatter_gather")).toBeGreaterThan(flexibility("burst_block"));
  });
});

describe("latency", () => {
  it("single transfer lowest latency", () => {
    expect(latency("single_transfer")).toBeGreaterThan(latency("linked_list_chain"));
  });
});

describe("dmaCost", () => {
  it("scatter gather most expensive", () => {
    expect(dmaCost("scatter_gather")).toBeGreaterThan(dmaCost("single_transfer"));
  });
});

describe("autoReload", () => {
  it("circular ring has auto reload", () => {
    expect(autoReload("circular_ring")).toBe(true);
  });
  it("single transfer no auto reload", () => {
    expect(autoReload("single_transfer")).toBe(false);
  });
});

describe("forAudio", () => {
  it("linked list chain for audio", () => {
    expect(forAudio("linked_list_chain")).toBe(true);
  });
  it("burst block not for audio", () => {
    expect(forAudio("burst_block")).toBe(false);
  });
});

describe("descriptor", () => {
  it("scatter gather uses table of descriptors", () => {
    expect(descriptor("scatter_gather")).toBe("table_of_descriptors");
  });
});

describe("bestUse", () => {
  it("circular ring best for adc continuous sample", () => {
    expect(bestUse("circular_ring")).toBe("adc_continuous_sample");
  });
});

describe("dmaModes", () => {
  it("returns 5 types", () => {
    expect(dmaModes()).toHaveLength(5);
  });
});
