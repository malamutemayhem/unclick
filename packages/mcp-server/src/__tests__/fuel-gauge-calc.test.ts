import { describe, it, expect } from "vitest";
import {
  socAccuracy, responseTime, computeLoad, agingCompensation,
  gaugeCost, selfCalibrate, forEv, method,
  bestUse, fuelGauges,
} from "../fuel-gauge-calc.js";

describe("socAccuracy", () => {
  it("machine learning soc best accuracy", () => {
    expect(socAccuracy("machine_learning_soc")).toBeGreaterThan(socAccuracy("voltage_lookup"));
  });
});

describe("responseTime", () => {
  it("voltage lookup fastest response", () => {
    expect(responseTime("voltage_lookup")).toBeGreaterThan(responseTime("machine_learning_soc"));
  });
});

describe("computeLoad", () => {
  it("machine learning soc highest compute load", () => {
    expect(computeLoad("machine_learning_soc")).toBeGreaterThan(computeLoad("voltage_lookup"));
  });
});

describe("agingCompensation", () => {
  it("machine learning soc best aging compensation", () => {
    expect(agingCompensation("machine_learning_soc")).toBeGreaterThan(agingCompensation("coulomb_counter"));
  });
});

describe("gaugeCost", () => {
  it("machine learning soc most expensive", () => {
    expect(gaugeCost("machine_learning_soc")).toBeGreaterThan(gaugeCost("voltage_lookup"));
  });
});

describe("selfCalibrate", () => {
  it("impedance track self calibrates", () => {
    expect(selfCalibrate("impedance_track")).toBe(true);
  });
  it("coulomb counter does not self calibrate", () => {
    expect(selfCalibrate("coulomb_counter")).toBe(false);
  });
});

describe("forEv", () => {
  it("kalman filter soc is for ev", () => {
    expect(forEv("kalman_filter_soc")).toBe(true);
  });
  it("coulomb counter not for ev", () => {
    expect(forEv("coulomb_counter")).toBe(false);
  });
});

describe("method", () => {
  it("impedance track uses eis model update", () => {
    expect(method("impedance_track")).toBe("eis_model_update");
  });
});

describe("bestUse", () => {
  it("impedance track best for smartphone battery", () => {
    expect(bestUse("impedance_track")).toBe("smartphone_battery");
  });
});

describe("fuelGauges", () => {
  it("returns 5 types", () => {
    expect(fuelGauges()).toHaveLength(5);
  });
});
