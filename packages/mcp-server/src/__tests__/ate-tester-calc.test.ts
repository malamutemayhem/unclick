import { describe, it, expect } from "vitest";
import {
  throughput, accuracy, parallelism, frequency,
  ateCost, multiSite, forProduction, architecture,
  bestUse, ateTesters,
} from "../ate-tester-calc.js";

describe("throughput", () => {
  it("memory high speed highest throughput", () => {
    expect(throughput("memory_high_speed")).toBeGreaterThan(throughput("soc_system_level"));
  });
});

describe("accuracy", () => {
  it("mixed signal ate best accuracy", () => {
    expect(accuracy("mixed_signal_ate")).toBeGreaterThan(accuracy("digital_scan_ate"));
  });
});

describe("parallelism", () => {
  it("memory high speed most parallel", () => {
    expect(parallelism("memory_high_speed")).toBeGreaterThan(parallelism("rf_mmwave_ate"));
  });
});

describe("frequency", () => {
  it("rf mmwave ate highest frequency", () => {
    expect(frequency("rf_mmwave_ate")).toBeGreaterThan(frequency("digital_scan_ate"));
  });
});

describe("ateCost", () => {
  it("rf mmwave ate most expensive", () => {
    expect(ateCost("rf_mmwave_ate")).toBeGreaterThan(ateCost("digital_scan_ate"));
  });
});

describe("multiSite", () => {
  it("digital scan ate is multi site", () => {
    expect(multiSite("digital_scan_ate")).toBe(true);
  });
  it("rf mmwave ate not multi site", () => {
    expect(multiSite("rf_mmwave_ate")).toBe(false);
  });
});

describe("forProduction", () => {
  it("digital scan ate is for production", () => {
    expect(forProduction("digital_scan_ate")).toBe(true);
  });
  it("soc system level not for production", () => {
    expect(forProduction("soc_system_level")).toBe(false);
  });
});

describe("architecture", () => {
  it("mixed signal ate uses adc dac dsp core", () => {
    expect(architecture("mixed_signal_ate")).toBe("adc_dac_dsp_core");
  });
});

describe("bestUse", () => {
  it("memory high speed best for dram nand mass test", () => {
    expect(bestUse("memory_high_speed")).toBe("dram_nand_mass_test");
  });
});

describe("ateTesters", () => {
  it("returns 5 types", () => {
    expect(ateTesters()).toHaveLength(5);
  });
});
