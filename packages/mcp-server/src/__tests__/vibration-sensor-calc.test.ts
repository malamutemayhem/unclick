import { describe, it, expect } from "vitest";
import {
  sensitivity, bandwidth, durability, installEase,
  vsCost, wireless, forRotating, output,
  bestUse, vibrationSensorTypes,
} from "../vibration-sensor-calc.js";

describe("sensitivity", () => {
  it("eddy current most sensitive", () => {
    expect(sensitivity("eddy_current_proximity")).toBeGreaterThan(sensitivity("mems_triaxial_wireless"));
  });
});

describe("bandwidth", () => {
  it("piezoelectric widest bandwidth", () => {
    expect(bandwidth("piezoelectric_accelerometer")).toBeGreaterThan(bandwidth("velocity_seismic_probe"));
  });
});

describe("durability", () => {
  it("fiber optic most durable", () => {
    expect(durability("fiber_optic_distributed")).toBeGreaterThan(durability("mems_triaxial_wireless"));
  });
});

describe("installEase", () => {
  it("mems easiest install", () => {
    expect(installEase("mems_triaxial_wireless")).toBeGreaterThan(installEase("fiber_optic_distributed"));
  });
});

describe("vsCost", () => {
  it("fiber optic most expensive", () => {
    expect(vsCost("fiber_optic_distributed")).toBeGreaterThan(vsCost("mems_triaxial_wireless"));
  });
});

describe("wireless", () => {
  it("mems is wireless", () => {
    expect(wireless("mems_triaxial_wireless")).toBe(true);
  });
  it("piezo not wireless", () => {
    expect(wireless("piezoelectric_accelerometer")).toBe(false);
  });
});

describe("forRotating", () => {
  it("eddy current for rotating", () => {
    expect(forRotating("eddy_current_proximity")).toBe(true);
  });
  it("fiber optic not rotating", () => {
    expect(forRotating("fiber_optic_distributed")).toBe(false);
  });
});

describe("output", () => {
  it("fiber uses das", () => {
    expect(output("fiber_optic_distributed")).toBe("distributed_acoustic_sensing_das");
  });
});

describe("bestUse", () => {
  it("eddy current for journal bearing", () => {
    expect(bestUse("eddy_current_proximity")).toBe("journal_bearing_shaft_orbit");
  });
});

describe("vibrationSensorTypes", () => {
  it("returns 5 types", () => {
    expect(vibrationSensorTypes()).toHaveLength(5);
  });
});
