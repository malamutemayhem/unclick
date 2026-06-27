import { describe, it, expect } from "vitest";
import {
  accuracy, featureSet, portability, easeOfUse,
  testerCost, certifies, forFiber, testMethod,
  bestUse, cableTesters,
} from "../cable-tester-calc.js";

describe("accuracy", () => {
  it("certification fluke highest accuracy", () => {
    expect(accuracy("certification_fluke")).toBeGreaterThan(accuracy("basic_continuity_map"));
  });
});

describe("featureSet", () => {
  it("certification fluke most features", () => {
    expect(featureSet("certification_fluke")).toBeGreaterThan(featureSet("tone_probe_tracer"));
  });
});

describe("portability", () => {
  it("basic continuity most portable", () => {
    expect(portability("basic_continuity_map")).toBeGreaterThan(portability("certification_fluke"));
  });
});

describe("easeOfUse", () => {
  it("basic continuity easiest to use", () => {
    expect(easeOfUse("basic_continuity_map")).toBeGreaterThan(easeOfUse("fiber_otdr_tester"));
  });
});

describe("testerCost", () => {
  it("certification fluke most expensive", () => {
    expect(testerCost("certification_fluke")).toBeGreaterThan(testerCost("tone_probe_tracer"));
  });
});

describe("certifies", () => {
  it("certification fluke certifies", () => {
    expect(certifies("certification_fluke")).toBe(true);
  });
  it("basic continuity does not certify", () => {
    expect(certifies("basic_continuity_map")).toBe(false);
  });
});

describe("forFiber", () => {
  it("fiber otdr is for fiber", () => {
    expect(forFiber("fiber_otdr_tester")).toBe(true);
  });
  it("qualification tester not for fiber", () => {
    expect(forFiber("qualification_tester")).toBe(false);
  });
});

describe("testMethod", () => {
  it("tone probe uses analog tone trace", () => {
    expect(testMethod("tone_probe_tracer")).toBe("analog_tone_trace");
  });
});

describe("bestUse", () => {
  it("fiber otdr best for fiber fault location", () => {
    expect(bestUse("fiber_otdr_tester")).toBe("fiber_fault_location");
  });
});

describe("cableTesters", () => {
  it("returns 5 types", () => {
    expect(cableTesters()).toHaveLength(5);
  });
});
