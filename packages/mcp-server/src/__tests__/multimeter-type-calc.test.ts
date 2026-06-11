import { describe, it, expect } from "vitest";
import {
  resolution, accuracy, speed, inputZ,
  mmCost, trueRms, forCalLab, topology,
  bestUse, multimeterTypes,
} from "../multimeter-type-calc.js";

describe("resolution", () => {
  it("bench 8 5 digit highest resolution", () => {
    expect(resolution("bench_8_5_digit")).toBeGreaterThan(resolution("handheld_dmm"));
  });
});

describe("accuracy", () => {
  it("bench 8 5 digit most accurate", () => {
    expect(accuracy("bench_8_5_digit")).toBeGreaterThan(accuracy("bench_6_5_digit"));
  });
});

describe("speed", () => {
  it("clamp meter ac dc fastest", () => {
    expect(speed("clamp_meter_ac_dc")).toBeGreaterThan(speed("electrometer_femto"));
  });
});

describe("inputZ", () => {
  it("electrometer femto highest input impedance", () => {
    expect(inputZ("electrometer_femto")).toBeGreaterThan(inputZ("handheld_dmm"));
  });
});

describe("mmCost", () => {
  it("electrometer femto most expensive", () => {
    expect(mmCost("electrometer_femto")).toBeGreaterThan(mmCost("handheld_dmm"));
  });
});

describe("trueRms", () => {
  it("bench 6 5 digit is true rms", () => {
    expect(trueRms("bench_6_5_digit")).toBe(true);
  });
  it("electrometer femto not true rms", () => {
    expect(trueRms("electrometer_femto")).toBe(false);
  });
});

describe("forCalLab", () => {
  it("bench 8 5 digit for cal lab", () => {
    expect(forCalLab("bench_8_5_digit")).toBe(true);
  });
  it("handheld dmm not for cal lab", () => {
    expect(forCalLab("handheld_dmm")).toBe(false);
  });
});

describe("topology", () => {
  it("clamp meter ac dc uses hall effect jaw sense", () => {
    expect(topology("clamp_meter_ac_dc")).toBe("hall_effect_jaw_sense");
  });
});

describe("bestUse", () => {
  it("bench 8 5 digit best for metrology reference std", () => {
    expect(bestUse("bench_8_5_digit")).toBe("metrology_reference_std");
  });
});

describe("multimeterTypes", () => {
  it("returns 5 types", () => {
    expect(multimeterTypes()).toHaveLength(5);
  });
});
