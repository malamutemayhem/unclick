import { describe, it, expect } from "vitest";
import {
  shearRate, dropletSize, throughput, versatility,
  hsCost, inline, forEmulsion, mechanism,
  bestUse, highShearMixerTypes,
} from "../high-shear-mixer-calc.js";

describe("shearRate", () => {
  it("high pressure homogenizer highest shear rate", () => {
    expect(shearRate("high_pressure_homogenizer")).toBeGreaterThan(shearRate("rotor_stator_batch"));
  });
});

describe("dropletSize", () => {
  it("high pressure homogenizer smallest droplet", () => {
    expect(dropletSize("high_pressure_homogenizer")).toBeGreaterThan(dropletSize("rotor_stator_batch"));
  });
});

describe("throughput", () => {
  it("rotor stator inline highest throughput", () => {
    expect(throughput("rotor_stator_inline")).toBeGreaterThan(throughput("ultrasonic_probe_nano"));
  });
});

describe("versatility", () => {
  it("rotor stator batch most versatile", () => {
    expect(versatility("rotor_stator_batch")).toBeGreaterThan(versatility("colloid_mill_emulsion"));
  });
});

describe("hsCost", () => {
  it("high pressure homogenizer most expensive", () => {
    expect(hsCost("high_pressure_homogenizer")).toBeGreaterThan(hsCost("rotor_stator_batch"));
  });
});

describe("inline", () => {
  it("rotor stator inline is inline", () => {
    expect(inline("rotor_stator_inline")).toBe(true);
  });
  it("rotor stator batch not inline", () => {
    expect(inline("rotor_stator_batch")).toBe(false);
  });
});

describe("forEmulsion", () => {
  it("colloid mill for emulsion", () => {
    expect(forEmulsion("colloid_mill_emulsion")).toBe(true);
  });
  it("ultrasonic probe not for emulsion", () => {
    expect(forEmulsion("ultrasonic_probe_nano")).toBe(false);
  });
});

describe("mechanism", () => {
  it("high pressure uses valve cavitation", () => {
    expect(mechanism("high_pressure_homogenizer")).toBe("high_pressure_valve_cavitation_impingement");
  });
});

describe("bestUse", () => {
  it("colloid mill for fine emulsion", () => {
    expect(bestUse("colloid_mill_emulsion")).toBe("fine_emulsion_mustard_salad_dressing_pharma");
  });
});

describe("highShearMixerTypes", () => {
  it("returns 5 types", () => {
    expect(highShearMixerTypes()).toHaveLength(5);
  });
});
