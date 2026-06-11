import { describe, it, expect } from "vitest";
import {
  gainRange, bandwidth, accuracy, settling,
  pgCost, continuous, forSensor, gainControl,
  bestUse, programmableGains,
} from "../programmable-gain-calc.js";

describe("gainRange", () => {
  it("vga exponential widest gain range", () => {
    expect(gainRange("vga_exponential_db")).toBeGreaterThan(gainRange("digital_pot_wiper"));
  });
});

describe("bandwidth", () => {
  it("vga exponential highest bandwidth", () => {
    expect(bandwidth("vga_exponential_db")).toBeGreaterThan(bandwidth("capacitor_switched_pga"));
  });
});

describe("accuracy", () => {
  it("capacitor switched pga best accuracy", () => {
    expect(accuracy("capacitor_switched_pga")).toBeGreaterThan(accuracy("digital_pot_wiper"));
  });
});

describe("settling", () => {
  it("vga exponential fastest settling", () => {
    expect(settling("vga_exponential_db")).toBeGreaterThan(settling("capacitor_switched_pga"));
  });
});

describe("pgCost", () => {
  it("vga exponential most expensive", () => {
    expect(pgCost("vga_exponential_db")).toBeGreaterThan(pgCost("digital_pot_wiper"));
  });
});

describe("continuous", () => {
  it("r2r dac feedback is continuous", () => {
    expect(continuous("r2r_dac_feedback")).toBe(true);
  });
  it("resistor ladder mux not continuous", () => {
    expect(continuous("resistor_ladder_mux")).toBe(false);
  });
});

describe("forSensor", () => {
  it("resistor ladder for sensor", () => {
    expect(forSensor("resistor_ladder_mux")).toBe(true);
  });
  it("vga exponential not for sensor", () => {
    expect(forSensor("vga_exponential_db")).toBe(false);
  });
});

describe("gainControl", () => {
  it("vga uses translinear exponential cell", () => {
    expect(gainControl("vga_exponential_db")).toBe("translinear_exponential_cell");
  });
});

describe("bestUse", () => {
  it("capacitor switched pga best for delta sigma frontend", () => {
    expect(bestUse("capacitor_switched_pga")).toBe("delta_sigma_adc_frontend");
  });
});

describe("programmableGains", () => {
  it("returns 5 types", () => {
    expect(programmableGains()).toHaveLength(5);
  });
});
