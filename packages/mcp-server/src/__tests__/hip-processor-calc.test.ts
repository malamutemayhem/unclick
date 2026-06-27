import { describe, it, expect } from "vitest";
import {
  densification, throughput, tempRange, pressureRange,
  hpCost, rapidCool, forAmPart, processorConfig,
  bestUse, hipProcessorTypes,
} from "../hip-processor-calc.js";

describe("densification", () => {
  it("standard hip best densification", () => {
    expect(densification("standard_hip")).toBeGreaterThan(densification("mini_hip"));
  });
});

describe("throughput", () => {
  it("sinter hip highest throughput", () => {
    expect(throughput("sinter_hip")).toBeGreaterThan(throughput("capsule_hip"));
  });
});

describe("tempRange", () => {
  it("standard hip best temp range", () => {
    expect(tempRange("standard_hip")).toBeGreaterThan(tempRange("mini_hip"));
  });
});

describe("pressureRange", () => {
  it("rapid cool hip best pressure range", () => {
    expect(pressureRange("rapid_cool_hip")).toBeGreaterThan(pressureRange("mini_hip"));
  });
});

describe("hpCost", () => {
  it("rapid cool hip most expensive", () => {
    expect(hpCost("rapid_cool_hip")).toBeGreaterThan(hpCost("mini_hip"));
  });
});

describe("rapidCool", () => {
  it("rapid cool hip has rapid cool", () => {
    expect(rapidCool("rapid_cool_hip")).toBe(true);
  });
  it("standard hip no rapid cool", () => {
    expect(rapidCool("standard_hip")).toBe(false);
  });
});

describe("forAmPart", () => {
  it("standard hip for am part", () => {
    expect(forAmPart("standard_hip")).toBe(true);
  });
  it("capsule hip not for am part", () => {
    expect(forAmPart("capsule_hip")).toBe(false);
  });
});

describe("processorConfig", () => {
  it("rapid cool hip uses quench in vessel combine ht hip one step", () => {
    expect(processorConfig("rapid_cool_hip")).toBe("rapid_cool_hip_processor_quench_in_vessel_combine_ht_hip_one_step");
  });
});

describe("bestUse", () => {
  it("standard hip for am casting close porosity full density", () => {
    expect(bestUse("standard_hip")).toBe("am_casting_standard_hip_processor_close_porosity_full_density");
  });
});

describe("hipProcessorTypes", () => {
  it("returns 5 types", () => {
    expect(hipProcessorTypes()).toHaveLength(5);
  });
});
