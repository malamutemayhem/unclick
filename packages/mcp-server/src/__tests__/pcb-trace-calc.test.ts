import { describe, it, expect } from "vitest";
import {
  currentCapacity, signalIntegrity, thermalConduct, flexibility,
  traceCost, multilayer, forHighFreq, substrateType,
  bestUse, pcbTraces,
} from "../pcb-trace-calc.js";

describe("currentCapacity", () => {
  it("heavy copper highest current capacity", () => {
    expect(currentCapacity("heavy_copper_power")).toBeGreaterThan(currentCapacity("flex_polyimide_thin"));
  });
});

describe("signalIntegrity", () => {
  it("impedance controlled best signal integrity", () => {
    expect(signalIntegrity("impedance_controlled")).toBeGreaterThan(signalIntegrity("heavy_copper_power"));
  });
});

describe("thermalConduct", () => {
  it("aluminum core best thermal conductivity", () => {
    expect(thermalConduct("aluminum_core_led")).toBeGreaterThan(thermalConduct("flex_polyimide_thin"));
  });
});

describe("flexibility", () => {
  it("flex polyimide most flexible", () => {
    expect(flexibility("flex_polyimide_thin")).toBeGreaterThan(flexibility("heavy_copper_power"));
  });
});

describe("traceCost", () => {
  it("flex polyimide most expensive", () => {
    expect(traceCost("flex_polyimide_thin")).toBeGreaterThan(traceCost("standard_fr4_copper"));
  });
});

describe("multilayer", () => {
  it("standard fr4 is multilayer", () => {
    expect(multilayer("standard_fr4_copper")).toBe(true);
  });
  it("heavy copper not multilayer", () => {
    expect(multilayer("heavy_copper_power")).toBe(false);
  });
});

describe("forHighFreq", () => {
  it("impedance controlled is for high freq", () => {
    expect(forHighFreq("impedance_controlled")).toBe(true);
  });
  it("standard fr4 not for high freq", () => {
    expect(forHighFreq("standard_fr4_copper")).toBe(false);
  });
});

describe("substrateType", () => {
  it("aluminum core uses aluminum base dielectric", () => {
    expect(substrateType("aluminum_core_led")).toBe("aluminum_base_dielectric");
  });
});

describe("bestUse", () => {
  it("impedance controlled best for high speed ddr route", () => {
    expect(bestUse("impedance_controlled")).toBe("high_speed_ddr_route");
  });
});

describe("pcbTraces", () => {
  it("returns 5 types", () => {
    expect(pcbTraces()).toHaveLength(5);
  });
});
