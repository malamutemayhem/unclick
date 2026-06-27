import { describe, it, expect } from "vitest";
import {
  accuracy, response, scalding, durability,
  mvCost, digital, forDomestic, control,
  bestUse, mixingValveTypes,
} from "../mixing-valve-calc.js";

describe("accuracy", () => {
  it("digital most accurate", () => {
    expect(accuracy("digital_electronic_master")).toBeGreaterThan(accuracy("pressure_balance_shower"));
  });
});

describe("response", () => {
  it("digital fastest response", () => {
    expect(response("digital_electronic_master")).toBeGreaterThan(response("tempering_valve_hw_tank"));
  });
});

describe("scalding", () => {
  it("digital best scald protection", () => {
    expect(scalding("digital_electronic_master")).toBeGreaterThan(scalding("three_way_motorized_hvac"));
  });
});

describe("durability", () => {
  it("tempering valve durable", () => {
    expect(durability("tempering_valve_hw_tank")).toBeGreaterThan(durability("digital_electronic_master"));
  });
});

describe("mvCost", () => {
  it("digital most expensive", () => {
    expect(mvCost("digital_electronic_master")).toBeGreaterThan(mvCost("pressure_balance_shower"));
  });
});

describe("digital", () => {
  it("electronic is digital", () => {
    expect(digital("digital_electronic_master")).toBe(true);
  });
  it("thermostatic not digital", () => {
    expect(digital("thermostatic_point_of_use")).toBe(false);
  });
});

describe("forDomestic", () => {
  it("shower for domestic", () => {
    expect(forDomestic("pressure_balance_shower")).toBe(true);
  });
  it("three way not domestic", () => {
    expect(forDomestic("three_way_motorized_hvac")).toBe(false);
  });
});

describe("control", () => {
  it("three way uses motorized actuator", () => {
    expect(control("three_way_motorized_hvac")).toBe("motorized_actuator_3_way_port");
  });
});

describe("bestUse", () => {
  it("digital for hospital school", () => {
    expect(bestUse("digital_electronic_master")).toBe("hospital_school_central_master");
  });
});

describe("mixingValveTypes", () => {
  it("returns 5 types", () => {
    expect(mixingValveTypes()).toHaveLength(5);
  });
});
