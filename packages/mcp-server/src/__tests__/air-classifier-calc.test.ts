import { describe, it, expect } from "vitest";
import {
  cutPoint, throughput, sharpness, versatility,
  acCost, fineCapable, forMineral, principle,
  bestUse, airClassifierTypes,
} from "../air-classifier-calc.js";

describe("cutPoint", () => {
  it("centrifugal turbo finest cut point", () => {
    expect(cutPoint("centrifugal_turbo_wheel")).toBeGreaterThan(cutPoint("static_cascade_louver"));
  });
});

describe("throughput", () => {
  it("elbow jet highest throughput", () => {
    expect(throughput("elbow_jet_inertial")).toBeGreaterThan(throughput("centrifugal_turbo_wheel"));
  });
});

describe("sharpness", () => {
  it("centrifugal turbo sharpest cut", () => {
    expect(sharpness("centrifugal_turbo_wheel")).toBeGreaterThan(sharpness("gravitational_zigzag"));
  });
});

describe("versatility", () => {
  it("dynamic rotor cage most versatile", () => {
    expect(versatility("dynamic_rotor_cage")).toBeGreaterThan(versatility("static_cascade_louver"));
  });
});

describe("acCost", () => {
  it("dynamic rotor cage most expensive", () => {
    expect(acCost("dynamic_rotor_cage")).toBeGreaterThan(acCost("gravitational_zigzag"));
  });
});

describe("fineCapable", () => {
  it("centrifugal turbo is fine capable", () => {
    expect(fineCapable("centrifugal_turbo_wheel")).toBe(true);
  });
  it("gravitational zigzag not fine capable", () => {
    expect(fineCapable("gravitational_zigzag")).toBe(false);
  });
});

describe("forMineral", () => {
  it("centrifugal turbo for mineral", () => {
    expect(forMineral("centrifugal_turbo_wheel")).toBe(true);
  });
  it("gravitational zigzag not for mineral", () => {
    expect(forMineral("gravitational_zigzag")).toBe(false);
  });
});

describe("principle", () => {
  it("dynamic rotor uses high speed cage", () => {
    expect(principle("dynamic_rotor_cage")).toBe("high_speed_cage_rotor_centrifugal");
  });
});

describe("bestUse", () => {
  it("static cascade for grain seed chaff", () => {
    expect(bestUse("static_cascade_louver")).toBe("grain_seed_chaff_coarse_separate");
  });
});

describe("airClassifierTypes", () => {
  it("returns 5 types", () => {
    expect(airClassifierTypes()).toHaveLength(5);
  });
});
