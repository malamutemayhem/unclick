import { describe, it, expect } from "vitest";
import {
  effectiveness, throughput, latentRecovery, pressureDrop,
  erCost, moistureTransfer, forHumidClimate, recoveryConfig,
  bestUse, energyRecoveryTypes,
} from "../energy-recovery-calc.js";

describe("effectiveness", () => {
  it("rotary wheel best effectiveness", () => {
    expect(effectiveness("rotary_wheel_erv")).toBeGreaterThan(effectiveness("plate_erv"));
  });
});

describe("throughput", () => {
  it("rotary wheel highest throughput", () => {
    expect(throughput("rotary_wheel_erv")).toBeGreaterThan(throughput("plate_erv"));
  });
});

describe("latentRecovery", () => {
  it("rotary wheel best latent recovery", () => {
    expect(latentRecovery("rotary_wheel_erv")).toBeGreaterThan(latentRecovery("heat_pipe_erv"));
  });
});

describe("pressureDrop", () => {
  it("rotary wheel highest pressure drop", () => {
    expect(pressureDrop("rotary_wheel_erv")).toBeGreaterThan(pressureDrop("runaround_coil"));
  });
});

describe("erCost", () => {
  it("membrane most expensive", () => {
    expect(erCost("membrane_erv")).toBeGreaterThan(erCost("plate_erv"));
  });
});

describe("moistureTransfer", () => {
  it("rotary wheel has moisture transfer", () => {
    expect(moistureTransfer("rotary_wheel_erv")).toBe(true);
  });
  it("plate erv no moisture transfer", () => {
    expect(moistureTransfer("plate_erv")).toBe(false);
  });
});

describe("forHumidClimate", () => {
  it("rotary wheel for humid climate", () => {
    expect(forHumidClimate("rotary_wheel_erv")).toBe(true);
  });
  it("plate erv not for humid climate", () => {
    expect(forHumidClimate("plate_erv")).toBe(false);
  });
});

describe("recoveryConfig", () => {
  it("membrane uses polymer selective permeate vapor block contaminant", () => {
    expect(recoveryConfig("membrane_erv")).toBe("membrane_erv_polymer_selective_permeate_vapor_block_contaminant");
  });
});

describe("bestUse", () => {
  it("rotary wheel for tropical ahu total energy recovery dehumidify", () => {
    expect(bestUse("rotary_wheel_erv")).toBe("tropical_ahu_rotary_wheel_erv_total_energy_recovery_dehumidify");
  });
});

describe("energyRecoveryTypes", () => {
  it("returns 5 types", () => {
    expect(energyRecoveryTypes()).toHaveLength(5);
  });
});
