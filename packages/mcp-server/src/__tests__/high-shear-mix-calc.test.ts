import { describe, it, expect } from "vitest";
import {
  shearRate, particleSize, throughput, scalability,
  hsCost, inline, forEmulsion, mechanism,
  bestUse, highShearMixTypes,
} from "../high-shear-mix-calc.js";

describe("shearRate", () => {
  it("ultrasonic probe highest shear rate", () => {
    expect(shearRate("ultrasonic_probe")).toBeGreaterThan(shearRate("rotor_stator_batch"));
  });
});

describe("particleSize", () => {
  it("homogenizer valve finest particle size", () => {
    expect(particleSize("homogenizer_valve")).toBeGreaterThan(particleSize("rotor_stator_batch"));
  });
});

describe("throughput", () => {
  it("rotor stator inline highest throughput", () => {
    expect(throughput("rotor_stator_inline")).toBeGreaterThan(throughput("ultrasonic_probe"));
  });
});

describe("scalability", () => {
  it("rotor stator inline most scalable", () => {
    expect(scalability("rotor_stator_inline")).toBeGreaterThan(scalability("ultrasonic_probe"));
  });
});

describe("hsCost", () => {
  it("homogenizer valve most expensive", () => {
    expect(hsCost("homogenizer_valve")).toBeGreaterThan(hsCost("rotor_stator_batch"));
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
  it("all types for emulsion", () => {
    expect(forEmulsion("rotor_stator_batch")).toBe(true);
    expect(forEmulsion("homogenizer_valve")).toBe(true);
  });
});

describe("mechanism", () => {
  it("colloid mill uses conical rotor stator gap", () => {
    expect(mechanism("colloid_mill_gap")).toBe("conical_rotor_stator_gap_shear");
  });
});

describe("bestUse", () => {
  it("ultrasonic for nano emulsion lab scale", () => {
    expect(bestUse("ultrasonic_probe")).toBe("nano_emulsion_cell_lysis_lab_scale");
  });
});

describe("highShearMixTypes", () => {
  it("returns 5 types", () => {
    expect(highShearMixTypes()).toHaveLength(5);
  });
});
