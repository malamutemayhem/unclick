import { describe, it, expect } from "vitest";
import {
  rangeSpan, throughput, accuracy, responseTime,
  vgCost, gasIndependent, forUhv, gaugeConfig,
  bestUse, vacuumGaugeTypes,
} from "../vacuum-gauge-calc.js";

describe("rangeSpan", () => {
  it("ionization hot best range span", () => {
    expect(rangeSpan("ionization_hot")).toBeGreaterThan(rangeSpan("spinning_rotor"));
  });
});

describe("throughput", () => {
  it("capacitance diaphragm highest throughput", () => {
    expect(throughput("capacitance_diaphragm")).toBeGreaterThan(throughput("spinning_rotor"));
  });
});

describe("accuracy", () => {
  it("capacitance diaphragm best accuracy", () => {
    expect(accuracy("capacitance_diaphragm")).toBeGreaterThan(accuracy("pirani_gauge"));
  });
});

describe("responseTime", () => {
  it("capacitance diaphragm best response time", () => {
    expect(responseTime("capacitance_diaphragm")).toBeGreaterThan(responseTime("spinning_rotor"));
  });
});

describe("vgCost", () => {
  it("spinning rotor most expensive", () => {
    expect(vgCost("spinning_rotor")).toBeGreaterThan(vgCost("pirani_gauge"));
  });
});

describe("gasIndependent", () => {
  it("capacitance diaphragm is gas independent", () => {
    expect(gasIndependent("capacitance_diaphragm")).toBe(true);
  });
  it("pirani not gas independent", () => {
    expect(gasIndependent("pirani_gauge")).toBe(false);
  });
});

describe("forUhv", () => {
  it("ionization hot for uhv", () => {
    expect(forUhv("ionization_hot")).toBe(true);
  });
  it("pirani not for uhv", () => {
    expect(forUhv("pirani_gauge")).toBe(false);
  });
});

describe("gaugeConfig", () => {
  it("spinning rotor uses viscosity molecular drag calibration", () => {
    expect(gaugeConfig("spinning_rotor")).toBe("spinning_rotor_gauge_viscosity_molecular_drag_calibration_std");
  });
});

describe("bestUse", () => {
  it("cold cathode for industrial vacuum rugged no filament", () => {
    expect(bestUse("ionization_cold")).toBe("industrial_vacuum_cold_cathode_penning_gauge_rugged_no_filament");
  });
});

describe("vacuumGaugeTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumGaugeTypes()).toHaveLength(5);
  });
});
