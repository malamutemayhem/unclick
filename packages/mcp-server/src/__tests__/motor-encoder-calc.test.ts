import { describe, it, expect } from "vitest";
import {
  resolution, accuracy, robustness, speed,
  meCost, absolute, forHarshEnv, sensing,
  bestUse, motorEncoderTypes,
} from "../motor-encoder-calc.js";

describe("resolution", () => {
  it("incremental optical highest resolution", () => {
    expect(resolution("incremental_optical")).toBeGreaterThan(resolution("magnetic_hall_effect"));
  });
});

describe("accuracy", () => {
  it("absolute single turn best accuracy", () => {
    expect(accuracy("absolute_single_turn")).toBeGreaterThan(accuracy("magnetic_hall_effect"));
  });
});

describe("robustness", () => {
  it("resolver analog most robust", () => {
    expect(robustness("resolver_analog")).toBeGreaterThan(robustness("incremental_optical"));
  });
});

describe("speed", () => {
  it("incremental optical fastest", () => {
    expect(speed("incremental_optical")).toBeGreaterThan(speed("resolver_analog"));
  });
});

describe("meCost", () => {
  it("absolute multi turn most expensive", () => {
    expect(meCost("absolute_multi_turn")).toBeGreaterThan(meCost("magnetic_hall_effect"));
  });
});

describe("absolute", () => {
  it("absolute single turn is absolute", () => {
    expect(absolute("absolute_single_turn")).toBe(true);
  });
  it("incremental optical not absolute", () => {
    expect(absolute("incremental_optical")).toBe(false);
  });
});

describe("forHarshEnv", () => {
  it("resolver analog for harsh environment", () => {
    expect(forHarshEnv("resolver_analog")).toBe(true);
  });
  it("incremental optical not for harsh environment", () => {
    expect(forHarshEnv("incremental_optical")).toBe(false);
  });
});

describe("sensing", () => {
  it("magnetic hall effect uses hall sensor array", () => {
    expect(sensing("magnetic_hall_effect")).toBe("hall_sensor_array_magnetic_ring_digital_commutation");
  });
});

describe("bestUse", () => {
  it("resolver for military aerospace", () => {
    expect(bestUse("resolver_analog")).toBe("military_aerospace_oil_gas_high_temp_vibration");
  });
});

describe("motorEncoderTypes", () => {
  it("returns 5 types", () => {
    expect(motorEncoderTypes()).toHaveLength(5);
  });
});
