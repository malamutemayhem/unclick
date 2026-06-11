import { describe, it, expect } from "vitest";
import {
  sensitivity, resolution, speed, portability,
  rdCost, spectroscopic, forSurvey, medium,
  bestUse, radiationDetectorTypes,
} from "../radiation-detector-calc.js";

describe("sensitivity", () => {
  it("scintillation most sensitive", () => {
    expect(sensitivity("scintillation_nai_crystal")).toBeGreaterThan(sensitivity("silicon_pin_diode"));
  });
});

describe("resolution", () => {
  it("hpge best resolution", () => {
    expect(resolution("hpge_semiconductor")).toBeGreaterThan(resolution("geiger_muller_tube"));
  });
});

describe("speed", () => {
  it("silicon pin fastest", () => {
    expect(speed("silicon_pin_diode")).toBeGreaterThan(speed("hpge_semiconductor"));
  });
});

describe("portability", () => {
  it("geiger muller most portable", () => {
    expect(portability("geiger_muller_tube")).toBeGreaterThan(portability("hpge_semiconductor"));
  });
});

describe("rdCost", () => {
  it("hpge most expensive", () => {
    expect(rdCost("hpge_semiconductor")).toBeGreaterThan(rdCost("geiger_muller_tube"));
  });
});

describe("spectroscopic", () => {
  it("scintillation is spectroscopic", () => {
    expect(spectroscopic("scintillation_nai_crystal")).toBe(true);
  });
  it("geiger muller not spectroscopic", () => {
    expect(spectroscopic("geiger_muller_tube")).toBe(false);
  });
});

describe("forSurvey", () => {
  it("geiger muller for survey", () => {
    expect(forSurvey("geiger_muller_tube")).toBe(true);
  });
  it("hpge not for survey", () => {
    expect(forSurvey("hpge_semiconductor")).toBe(false);
  });
});

describe("medium", () => {
  it("proportional uses p10 gas", () => {
    expect(medium("proportional_gas_counter")).toBe("p10_gas_argon_methane");
  });
});

describe("bestUse", () => {
  it("silicon pin best for xrf handheld", () => {
    expect(bestUse("silicon_pin_diode")).toBe("xray_fluorescence_handheld_analyzer");
  });
});

describe("radiationDetectorTypes", () => {
  it("returns 5 types", () => {
    expect(radiationDetectorTypes()).toHaveLength(5);
  });
});
