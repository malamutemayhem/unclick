import { describe, it, expect } from "vitest";
import {
  sensitivity, coverage, depthRange, portability,
  unCost, automated, forWeldInspection, technique,
  bestUse, ultrasonicNdtTypes,
} from "../ultrasonic-ndt-calc.js";

describe("sensitivity", () => {
  it("phased array paut highest sensitivity", () => {
    expect(sensitivity("phased_array_paut")).toBeGreaterThan(sensitivity("thickness_gauge"));
  });
});

describe("coverage", () => {
  it("guided wave pipe best coverage", () => {
    expect(coverage("guided_wave_pipe")).toBeGreaterThan(coverage("pulse_echo_flaw"));
  });
});

describe("depthRange", () => {
  it("guided wave pipe deepest range", () => {
    expect(depthRange("guided_wave_pipe")).toBeGreaterThan(depthRange("thickness_gauge"));
  });
});

describe("portability", () => {
  it("thickness gauge most portable", () => {
    expect(portability("thickness_gauge")).toBeGreaterThan(portability("guided_wave_pipe"));
  });
});

describe("unCost", () => {
  it("guided wave pipe most expensive", () => {
    expect(unCost("guided_wave_pipe")).toBeGreaterThan(unCost("thickness_gauge"));
  });
});

describe("automated", () => {
  it("phased array paut is automated", () => {
    expect(automated("phased_array_paut")).toBe(true);
  });
  it("pulse echo flaw not automated", () => {
    expect(automated("pulse_echo_flaw")).toBe(false);
  });
});

describe("forWeldInspection", () => {
  it("tofd diffraction for weld inspection", () => {
    expect(forWeldInspection("tofd_diffraction")).toBe(true);
  });
  it("thickness gauge not for weld inspection", () => {
    expect(forWeldInspection("thickness_gauge")).toBe(false);
  });
});

describe("technique", () => {
  it("thickness gauge uses dual element probe", () => {
    expect(technique("thickness_gauge")).toBe("dual_element_probe_echo_echo_through_coat_measure");
  });
});

describe("bestUse", () => {
  it("guided wave pipe for buried insulated pipe", () => {
    expect(bestUse("guided_wave_pipe")).toBe("buried_insulated_pipe_screening_long_range_survey");
  });
});

describe("ultrasonicNdtTypes", () => {
  it("returns 5 types", () => {
    expect(ultrasonicNdtTypes()).toHaveLength(5);
  });
});
