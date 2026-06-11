import { describe, it, expect } from "vitest";
import {
  accuracy, startup, stability, power,
  clkCost, trimmed, forUsb, output,
  bestUse, clockSources,
} from "../clock-source-calc.js";

describe("accuracy", () => {
  it("lse 32khz crystal most accurate", () => {
    expect(accuracy("lse_32khz_crystal")).toBeGreaterThan(accuracy("rc_internal_hsi"));
  });
});

describe("startup", () => {
  it("rc internal hsi fastest startup", () => {
    expect(startup("rc_internal_hsi")).toBeGreaterThan(startup("lse_32khz_crystal"));
  });
});

describe("stability", () => {
  it("lse 32khz crystal most stable", () => {
    expect(stability("lse_32khz_crystal")).toBeGreaterThan(stability("rc_internal_hsi"));
  });
});

describe("power", () => {
  it("lse 32khz crystal lowest power", () => {
    expect(power("lse_32khz_crystal")).toBeGreaterThan(power("pll_synthesized"));
  });
});

describe("clkCost", () => {
  it("mems oscillator most expensive", () => {
    expect(clkCost("mems_oscillator")).toBeGreaterThan(clkCost("rc_internal_hsi"));
  });
});

describe("trimmed", () => {
  it("rc internal hsi is trimmed", () => {
    expect(trimmed("rc_internal_hsi")).toBe(true);
  });
  it("crystal hse not trimmed", () => {
    expect(trimmed("crystal_hse")).toBe(false);
  });
});

describe("forUsb", () => {
  it("crystal hse for usb", () => {
    expect(forUsb("crystal_hse")).toBe(true);
  });
  it("rc internal hsi not for usb", () => {
    expect(forUsb("rc_internal_hsi")).toBe(false);
  });
});

describe("output", () => {
  it("lse 32khz crystal uses tuning fork 32768hz", () => {
    expect(output("lse_32khz_crystal")).toBe("tuning_fork_32768hz");
  });
});

describe("bestUse", () => {
  it("mems oscillator best for vibration proof industrial", () => {
    expect(bestUse("mems_oscillator")).toBe("vibration_proof_industrial");
  });
});

describe("clockSources", () => {
  it("returns 5 types", () => {
    expect(clockSources()).toHaveLength(5);
  });
});
