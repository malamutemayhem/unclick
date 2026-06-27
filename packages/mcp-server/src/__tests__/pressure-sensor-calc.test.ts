import { describe, it, expect } from "vitest";
import {
  accuracy, pressRange, responseTime, durability,
  sensorCost, digital, forHighPress, sensingMethod,
  bestUse, pressureSensors,
} from "../pressure-sensor-calc.js";

describe("accuracy", () => {
  it("optical fiber bragg best accuracy", () => {
    expect(accuracy("optical_fiber_bragg")).toBeGreaterThan(accuracy("piezoelectric_dynamic"));
  });
});

describe("pressRange", () => {
  it("strain gauge bridge widest press range", () => {
    expect(pressRange("strain_gauge_bridge")).toBeGreaterThan(pressRange("capacitive_diaphragm"));
  });
});

describe("responseTime", () => {
  it("piezoelectric dynamic fastest response", () => {
    expect(responseTime("piezoelectric_dynamic")).toBeGreaterThan(responseTime("strain_gauge_bridge"));
  });
});

describe("durability", () => {
  it("optical fiber bragg most durable", () => {
    expect(durability("optical_fiber_bragg")).toBeGreaterThan(durability("piezoelectric_dynamic"));
  });
});

describe("sensorCost", () => {
  it("optical fiber bragg most expensive", () => {
    expect(sensorCost("optical_fiber_bragg")).toBeGreaterThan(sensorCost("piezoresistive_mems"));
  });
});

describe("digital", () => {
  it("piezoresistive mems is digital", () => {
    expect(digital("piezoresistive_mems")).toBe(true);
  });
  it("capacitive diaphragm not digital", () => {
    expect(digital("capacitive_diaphragm")).toBe(false);
  });
});

describe("forHighPress", () => {
  it("strain gauge bridge is for high press", () => {
    expect(forHighPress("strain_gauge_bridge")).toBe(true);
  });
  it("piezoresistive mems not for high press", () => {
    expect(forHighPress("piezoresistive_mems")).toBe(false);
  });
});

describe("sensingMethod", () => {
  it("optical fiber bragg uses bragg wavelength shift", () => {
    expect(sensingMethod("optical_fiber_bragg")).toBe("bragg_wavelength_shift");
  });
});

describe("bestUse", () => {
  it("piezoresistive mems best for industrial process ctrl", () => {
    expect(bestUse("piezoresistive_mems")).toBe("industrial_process_ctrl");
  });
});

describe("pressureSensors", () => {
  it("returns 5 types", () => {
    expect(pressureSensors()).toHaveLength(5);
  });
});
