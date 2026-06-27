import { describe, it, expect } from "vitest";
import {
  accuracy, range, stability, response,
  csCost, selfCalibrating, forDcv, principle,
  bestUse, co2SensorTypes,
} from "../co2-sensor-calc.js";

describe("accuracy", () => {
  it("photoacoustic most accurate", () => {
    expect(accuracy("photoacoustic_multi_gas")).toBeGreaterThan(accuracy("electrochemical_portable"));
  });
});

describe("range", () => {
  it("photoacoustic widest range", () => {
    expect(range("photoacoustic_multi_gas")).toBeGreaterThan(range("electrochemical_portable"));
  });
});

describe("stability", () => {
  it("photoacoustic most stable", () => {
    expect(stability("photoacoustic_multi_gas")).toBeGreaterThan(stability("electrochemical_portable"));
  });
});

describe("response", () => {
  it("electrochemical fastest response", () => {
    expect(response("electrochemical_portable")).toBeGreaterThan(response("photoacoustic_multi_gas"));
  });
});

describe("csCost", () => {
  it("photoacoustic most expensive", () => {
    expect(csCost("photoacoustic_multi_gas")).toBeGreaterThan(csCost("electrochemical_portable"));
  });
});

describe("selfCalibrating", () => {
  it("ndir wall is self calibrating", () => {
    expect(selfCalibrating("ndir_wall_mount")).toBe(true);
  });
  it("electrochemical not self calibrating", () => {
    expect(selfCalibrating("electrochemical_portable")).toBe(false);
  });
});

describe("forDcv", () => {
  it("duct probe for dcv", () => {
    expect(forDcv("ndir_duct_probe")).toBe(true);
  });
  it("photoacoustic not dcv", () => {
    expect(forDcv("photoacoustic_multi_gas")).toBe(false);
  });
});

describe("principle", () => {
  it("wireless uses lora mesh", () => {
    expect(principle("ndir_wireless_iot")).toBe("ndir_battery_lora_mesh_cloud");
  });
});

describe("bestUse", () => {
  it("duct probe for ahu dcv", () => {
    expect(bestUse("ndir_duct_probe")).toBe("ahu_return_air_dcv_control");
  });
});

describe("co2SensorTypes", () => {
  it("returns 5 types", () => {
    expect(co2SensorTypes()).toHaveLength(5);
  });
});
