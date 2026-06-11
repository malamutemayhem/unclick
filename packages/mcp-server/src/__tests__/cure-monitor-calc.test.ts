import { describe, it, expect } from "vitest";
import {
  cureTracking, throughput, spatialResolution, realTime,
  crCost, embedded, forInProcess, monitorConfig,
  bestUse, cureMonitorTypes,
} from "../cure-monitor-calc.js";

describe("cureTracking", () => {
  it("dielectric sensor best cure tracking", () => {
    expect(cureTracking("dielectric_sensor")).toBeGreaterThan(cureTracking("thermocouple_array"));
  });
});

describe("throughput", () => {
  it("thermocouple array highest throughput", () => {
    expect(throughput("thermocouple_array")).toBeGreaterThan(throughput("dsc_offline"));
  });
});

describe("spatialResolution", () => {
  it("fiber optic bragg best spatial resolution", () => {
    expect(spatialResolution("fiber_optic_bragg")).toBeGreaterThan(spatialResolution("dsc_offline"));
  });
});

describe("realTime", () => {
  it("dielectric sensor best real time", () => {
    expect(realTime("dielectric_sensor")).toBeGreaterThan(realTime("dsc_offline"));
  });
});

describe("crCost", () => {
  it("fiber optic bragg most expensive", () => {
    expect(crCost("fiber_optic_bragg")).toBeGreaterThan(crCost("thermocouple_array"));
  });
});

describe("embedded", () => {
  it("dielectric sensor is embedded", () => {
    expect(embedded("dielectric_sensor")).toBe(true);
  });
  it("ultrasonic pulse not embedded", () => {
    expect(embedded("ultrasonic_pulse")).toBe(false);
  });
});

describe("forInProcess", () => {
  it("dielectric sensor for in process", () => {
    expect(forInProcess("dielectric_sensor")).toBe(true);
  });
  it("dsc offline not for in process", () => {
    expect(forInProcess("dsc_offline")).toBe(false);
  });
});

describe("monitorConfig", () => {
  it("fiber optic bragg uses fbg strain temp residual stress", () => {
    expect(monitorConfig("fiber_optic_bragg")).toBe("fiber_optic_bragg_cure_monitor_fbg_strain_temp_residual_stress");
  });
});

describe("bestUse", () => {
  it("dielectric sensor for rtm cure viscosity gel vitrify", () => {
    expect(bestUse("dielectric_sensor")).toBe("rtm_cure_dielectric_sensor_cure_monitor_viscosity_gel_vitrify");
  });
});

describe("cureMonitorTypes", () => {
  it("returns 5 types", () => {
    expect(cureMonitorTypes()).toHaveLength(5);
  });
});
