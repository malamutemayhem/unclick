import { describe, it, expect } from "vitest";
import {
  particleSize, throughput, shear, energy,
  hmCost, continuous, forEmulsion, mechanism,
  bestUse, homogenizerTypes,
} from "../homogenizer-type-calc.js";

describe("particleSize", () => {
  it("microfluidizer finest particle size", () => {
    expect(particleSize("microfluidizer_chamber")).toBeGreaterThan(particleSize("colloid_mill_gap"));
  });
});

describe("throughput", () => {
  it("high pressure highest throughput", () => {
    expect(throughput("high_pressure_valve")).toBeGreaterThan(throughput("ultrasonic_sonotrode"));
  });
});

describe("shear", () => {
  it("microfluidizer highest shear", () => {
    expect(shear("microfluidizer_chamber")).toBeGreaterThan(shear("colloid_mill_gap"));
  });
});

describe("energy", () => {
  it("ultrasonic most energy efficient", () => {
    expect(energy("ultrasonic_sonotrode")).toBeGreaterThan(energy("microfluidizer_chamber"));
  });
});

describe("hmCost", () => {
  it("microfluidizer most expensive", () => {
    expect(hmCost("microfluidizer_chamber")).toBeGreaterThan(hmCost("rotor_stator_inline"));
  });
});

describe("continuous", () => {
  it("high pressure is continuous", () => {
    expect(continuous("high_pressure_valve")).toBe(true);
  });
  it("ultrasonic not continuous", () => {
    expect(continuous("ultrasonic_sonotrode")).toBe(false);
  });
});

describe("forEmulsion", () => {
  it("high pressure for emulsion", () => {
    expect(forEmulsion("high_pressure_valve")).toBe(true);
  });
  it("colloid mill not for emulsion", () => {
    expect(forEmulsion("colloid_mill_gap")).toBe(false);
  });
});

describe("mechanism", () => {
  it("colloid mill uses conical rotor stator gap", () => {
    expect(mechanism("colloid_mill_gap")).toBe("conical_rotor_stator_gap");
  });
});

describe("bestUse", () => {
  it("ultrasonic best for lab nanoemulsion", () => {
    expect(bestUse("ultrasonic_sonotrode")).toBe("lab_nanoemulsion_cell_lysis");
  });
});

describe("homogenizerTypes", () => {
  it("returns 5 types", () => {
    expect(homogenizerTypes()).toHaveLength(5);
  });
});
