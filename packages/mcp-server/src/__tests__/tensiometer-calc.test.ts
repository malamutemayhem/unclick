import { describe, it, expect } from "vitest";
import {
  accuracy, throughput, dynamicRange, sampleVolume,
  tnCost, forInterfacial, forContactAngle, tensioConfig,
  bestUse, tensiometerTypes,
} from "../tensiometer-calc.js";

describe("accuracy", () => {
  it("pendant drop best accuracy", () => {
    expect(accuracy("pendant_drop")).toBeGreaterThan(accuracy("du_nouy_ring"));
  });
});

describe("throughput", () => {
  it("bubble pressure highest throughput", () => {
    expect(throughput("bubble_pressure")).toBeGreaterThan(throughput("spinning_drop"));
  });
});

describe("dynamicRange", () => {
  it("spinning drop best dynamic range", () => {
    expect(dynamicRange("spinning_drop")).toBeGreaterThan(dynamicRange("du_nouy_ring"));
  });
});

describe("sampleVolume", () => {
  it("pendant drop best sample volume efficiency", () => {
    expect(sampleVolume("pendant_drop")).toBeGreaterThan(sampleVolume("du_nouy_ring"));
  });
});

describe("tnCost", () => {
  it("spinning drop most expensive", () => {
    expect(tnCost("spinning_drop")).toBeGreaterThan(tnCost("du_nouy_ring"));
  });
});

describe("forInterfacial", () => {
  it("pendant drop for interfacial", () => {
    expect(forInterfacial("pendant_drop")).toBe(true);
  });
  it("bubble pressure not for interfacial", () => {
    expect(forInterfacial("bubble_pressure")).toBe(false);
  });
});

describe("forContactAngle", () => {
  it("wilhelmy plate for contact angle", () => {
    expect(forContactAngle("wilhelmy_plate")).toBe(true);
  });
  it("du nouy ring not for contact angle", () => {
    expect(forContactAngle("du_nouy_ring")).toBe(false);
  });
});

describe("tensioConfig", () => {
  it("spinning drop uses ultralow interfacial tension emulsion", () => {
    expect(tensioConfig("spinning_drop")).toBe("spinning_drop_tensiometer_ultralow_interfacial_tension_emulsion");
  });
});

describe("bestUse", () => {
  it("bubble pressure for dynamic surface surfactant kinetics", () => {
    expect(bestUse("bubble_pressure")).toBe("dynamic_surface_bubble_pressure_tensiometer_surfactant_kinetics");
  });
});

describe("tensiometerTypes", () => {
  it("returns 5 types", () => {
    expect(tensiometerTypes()).toHaveLength(5);
  });
});
