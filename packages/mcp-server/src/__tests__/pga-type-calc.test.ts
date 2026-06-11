import { describe, it, expect } from "vitest";
import {
  gainRange, bandwidth, noise, settlingTime,
  pgaCost, digital, forMedical, gainMethod,
  bestUse, pgaTypes,
} from "../pga-type-calc.js";

describe("gainRange", () => {
  it("vga exponential widest gain range", () => {
    expect(gainRange("vga_exponential")).toBeGreaterThan(gainRange("resistor_mux_pga"));
  });
});

describe("bandwidth", () => {
  it("digital step atten highest bandwidth", () => {
    expect(bandwidth("digital_step_atten")).toBeGreaterThan(bandwidth("resistor_mux_pga"));
  });
});

describe("noise", () => {
  it("capacitor array pga lowest noise", () => {
    expect(noise("capacitor_array_pga")).toBeGreaterThan(noise("vga_exponential"));
  });
});

describe("settlingTime", () => {
  it("digital step atten fastest settling", () => {
    expect(settlingTime("digital_step_atten")).toBeGreaterThan(settlingTime("resistor_mux_pga"));
  });
});

describe("pgaCost", () => {
  it("digital step atten most expensive", () => {
    expect(pgaCost("digital_step_atten")).toBeGreaterThan(pgaCost("resistor_mux_pga"));
  });
});

describe("digital", () => {
  it("resistor mux pga is digital", () => {
    expect(digital("resistor_mux_pga")).toBe(true);
  });
  it("vga exponential not digital", () => {
    expect(digital("vga_exponential")).toBe(false);
  });
});

describe("forMedical", () => {
  it("resistor mux pga is for medical", () => {
    expect(forMedical("resistor_mux_pga")).toBe(true);
  });
  it("capacitor array pga not for medical", () => {
    expect(forMedical("capacitor_array_pga")).toBe(false);
  });
});

describe("gainMethod", () => {
  it("vga exponential uses exponential db linear", () => {
    expect(gainMethod("vga_exponential")).toBe("exponential_db_linear");
  });
});

describe("bestUse", () => {
  it("resistor mux pga best for ecg eeg frontend", () => {
    expect(bestUse("resistor_mux_pga")).toBe("ecg_eeg_frontend");
  });
});

describe("pgaTypes", () => {
  it("returns 5 types", () => {
    expect(pgaTypes()).toHaveLength(5);
  });
});
