import { describe, it, expect } from "vitest";
import {
  cmrr, inputImpedance, noise, gainAccuracy,
  inaCost, digitalGain, forBridge, architecture,
  bestUse, instrumentationAmps,
} from "../instrumentation-amp-calc.js";

describe("cmrr", () => {
  it("auto zero chopper best cmrr", () => {
    expect(cmrr("auto_zero_chopper")).toBeGreaterThan(cmrr("two_opamp_diff"));
  });
});

describe("inputImpedance", () => {
  it("indirect current fb highest input impedance", () => {
    expect(inputImpedance("indirect_current_fb")).toBeGreaterThan(inputImpedance("two_opamp_diff"));
  });
});

describe("noise", () => {
  it("auto zero chopper lowest noise", () => {
    expect(noise("auto_zero_chopper")).toBeGreaterThan(noise("two_opamp_diff"));
  });
});

describe("gainAccuracy", () => {
  it("auto zero chopper best gain accuracy", () => {
    expect(gainAccuracy("auto_zero_chopper")).toBeGreaterThan(gainAccuracy("two_opamp_diff"));
  });
});

describe("inaCost", () => {
  it("auto zero chopper most expensive", () => {
    expect(inaCost("auto_zero_chopper")).toBeGreaterThan(inaCost("two_opamp_diff"));
  });
});

describe("digitalGain", () => {
  it("programmable gain has digital gain", () => {
    expect(digitalGain("programmable_gain")).toBe(true);
  });
  it("three opamp classic no digital gain", () => {
    expect(digitalGain("three_opamp_classic")).toBe(false);
  });
});

describe("forBridge", () => {
  it("three opamp classic is for bridge", () => {
    expect(forBridge("three_opamp_classic")).toBe(true);
  });
  it("two opamp diff not for bridge", () => {
    expect(forBridge("two_opamp_diff")).toBe(false);
  });
});

describe("architecture", () => {
  it("auto zero chopper uses chopped nested loop", () => {
    expect(architecture("auto_zero_chopper")).toBe("chopped_nested_loop");
  });
});

describe("bestUse", () => {
  it("three opamp classic best for load cell interface", () => {
    expect(bestUse("three_opamp_classic")).toBe("load_cell_interface");
  });
});

describe("instrumentationAmps", () => {
  it("returns 5 types", () => {
    expect(instrumentationAmps()).toHaveLength(5);
  });
});
