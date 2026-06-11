import { describe, it, expect } from "vitest";
import {
  efficiency, moistureRecovery, pressureDrop, crossContamination,
  hrvCost, latentRecovery, forHumidClimate, exchanger,
  bestUse, heatRecoveryVentilatorTypes,
} from "../heat-recovery-ventilator-calc.js";

describe("efficiency", () => {
  it("rotary wheel most efficient", () => {
    expect(efficiency("rotary_wheel")).toBeGreaterThan(efficiency("run_around_coil"));
  });
});

describe("moistureRecovery", () => {
  it("rotary wheel best moisture recovery", () => {
    expect(moistureRecovery("rotary_wheel")).toBeGreaterThan(moistureRecovery("heat_pipe"));
  });
});

describe("pressureDrop", () => {
  it("rotary wheel best pressure drop rating", () => {
    expect(pressureDrop("rotary_wheel")).toBeGreaterThan(pressureDrop("plate_heat_exchanger"));
  });
});

describe("crossContamination", () => {
  it("heat pipe best cross contamination prevention", () => {
    expect(crossContamination("heat_pipe")).toBeGreaterThan(crossContamination("rotary_wheel"));
  });
});

describe("hrvCost", () => {
  it("run around coil most expensive", () => {
    expect(hrvCost("run_around_coil")).toBeGreaterThan(hrvCost("plate_heat_exchanger"));
  });
});

describe("latentRecovery", () => {
  it("rotary wheel has latent recovery", () => {
    expect(latentRecovery("rotary_wheel")).toBe(true);
  });
  it("plate heat exchanger no latent recovery", () => {
    expect(latentRecovery("plate_heat_exchanger")).toBe(false);
  });
});

describe("forHumidClimate", () => {
  it("membrane erv for humid climate", () => {
    expect(forHumidClimate("membrane_erv")).toBe(true);
  });
  it("heat pipe not for humid climate", () => {
    expect(forHumidClimate("heat_pipe")).toBe(false);
  });
});

describe("exchanger", () => {
  it("membrane erv uses polymer membrane core", () => {
    expect(exchanger("membrane_erv")).toBe("polymer_membrane_core_selective_moisture_transfer_no_moving");
  });
});

describe("bestUse", () => {
  it("heat pipe for laboratory fume hood", () => {
    expect(bestUse("heat_pipe")).toBe("laboratory_fume_hood_exhaust_zero_cross_contamination");
  });
});

describe("heatRecoveryVentilatorTypes", () => {
  it("returns 5 types", () => {
    expect(heatRecoveryVentilatorTypes()).toHaveLength(5);
  });
});
