import { describe, it, expect } from "vitest";
import {
  speed, particleReduction, pressure, scalability,
  hCost, continuous, forEmulsion, mechanism,
  bestUse, homogenizerTypes,
} from "../homogenizer-calc.js";

describe("speed", () => {
  it("high pressure valve fastest", () => {
    expect(speed("high_pressure_valve")).toBeGreaterThan(speed("ultrasonic"));
  });
});

describe("particleReduction", () => {
  it("ultrasonic best particle reduction", () => {
    expect(particleReduction("ultrasonic")).toBeGreaterThan(particleReduction("colloid_mill"));
  });
});

describe("pressure", () => {
  it("high pressure valve highest pressure", () => {
    expect(pressure("high_pressure_valve")).toBeGreaterThan(pressure("rotor_stator"));
  });
});

describe("scalability", () => {
  it("high pressure valve best scalability", () => {
    expect(scalability("high_pressure_valve")).toBeGreaterThan(scalability("ultrasonic"));
  });
});

describe("hCost", () => {
  it("microfluidizer most expensive", () => {
    expect(hCost("microfluidizer")).toBeGreaterThan(hCost("colloid_mill"));
  });
});

describe("continuous", () => {
  it("high pressure valve is continuous", () => {
    expect(continuous("high_pressure_valve")).toBe(true);
  });
  it("ultrasonic not continuous", () => {
    expect(continuous("ultrasonic")).toBe(false);
  });
});

describe("forEmulsion", () => {
  it("high pressure valve for emulsion", () => {
    expect(forEmulsion("high_pressure_valve")).toBe(true);
  });
  it("colloid mill not for emulsion", () => {
    expect(forEmulsion("colloid_mill")).toBe(false);
  });
});

describe("mechanism", () => {
  it("rotor stator uses high speed rotor", () => {
    expect(mechanism("rotor_stator")).toBe("high_speed_rotor_inside_stator_ring_shear_gap_centrifugal");
  });
});

describe("bestUse", () => {
  it("microfluidizer for liposome vaccine", () => {
    expect(bestUse("microfluidizer")).toBe("liposome_vaccine_adjuvant_nano_particle_pharma_biotech");
  });
});

describe("homogenizerTypes", () => {
  it("returns 5 types", () => {
    expect(homogenizerTypes()).toHaveLength(5);
  });
});
