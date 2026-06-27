import { describe, it, expect } from "vitest";
import {
  airChangeRate, energyCost, installationCost, filtrationCapability,
  noiseGeneration, requiresDuctwork, heatRecovery, controlMethod,
  bestApplication, ventilationTypes,
} from "../ventilation-type-calc.js";

describe("airChangeRate", () => {
  it("balanced best air change rate", () => {
    expect(airChangeRate("balanced")).toBeGreaterThan(airChangeRate("natural"));
  });
});

describe("energyCost", () => {
  it("balanced highest energy cost", () => {
    expect(energyCost("balanced")).toBeGreaterThan(energyCost("natural"));
  });
});

describe("installationCost", () => {
  it("energy recovery most expensive install", () => {
    expect(installationCost("energy_recovery")).toBeGreaterThan(installationCost("natural"));
  });
});

describe("filtrationCapability", () => {
  it("balanced best filtration", () => {
    expect(filtrationCapability("balanced")).toBeGreaterThan(filtrationCapability("natural"));
  });
});

describe("noiseGeneration", () => {
  it("mechanical exhaust noisier than natural", () => {
    expect(noiseGeneration("mechanical_exhaust")).toBeGreaterThan(noiseGeneration("natural"));
  });
});

describe("requiresDuctwork", () => {
  it("mechanical exhaust requires ductwork", () => {
    expect(requiresDuctwork("mechanical_exhaust")).toBe(true);
  });
  it("natural does not", () => {
    expect(requiresDuctwork("natural")).toBe(false);
  });
});

describe("heatRecovery", () => {
  it("energy recovery has heat recovery", () => {
    expect(heatRecovery("energy_recovery")).toBe(true);
  });
  it("balanced does not", () => {
    expect(heatRecovery("balanced")).toBe(false);
  });
});

describe("controlMethod", () => {
  it("natural uses wind stack effect", () => {
    expect(controlMethod("natural")).toBe("wind_stack_effect");
  });
});

describe("bestApplication", () => {
  it("energy recovery for cold climate tight building", () => {
    expect(bestApplication("energy_recovery")).toBe("cold_climate_tight_building");
  });
});

describe("ventilationTypes", () => {
  it("returns 5 types", () => {
    expect(ventilationTypes()).toHaveLength(5);
  });
});
