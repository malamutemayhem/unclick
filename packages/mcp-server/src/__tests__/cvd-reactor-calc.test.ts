import { describe, it, expect } from "vitest";
import {
  filmUniformity, throughput, stepCoverage, temperatureRange,
  cvCost, lowTemp, forHighK, reactorConfig,
  bestUse, cvdReactorTypes,
} from "../cvd-reactor-calc.js";

describe("filmUniformity", () => {
  it("mocvd reactor best film uniformity", () => {
    expect(filmUniformity("mocvd_reactor")).toBeGreaterThan(filmUniformity("apcvd_belt"));
  });
});

describe("throughput", () => {
  it("apcvd belt highest throughput", () => {
    expect(throughput("apcvd_belt")).toBeGreaterThan(throughput("ald_reactor"));
  });
});

describe("stepCoverage", () => {
  it("ald reactor best step coverage", () => {
    expect(stepCoverage("ald_reactor")).toBeGreaterThan(stepCoverage("apcvd_belt"));
  });
});

describe("temperatureRange", () => {
  it("pecvd chamber wide temperature range", () => {
    expect(temperatureRange("pecvd_chamber")).toBeGreaterThan(temperatureRange("apcvd_belt"));
  });
});

describe("cvCost", () => {
  it("mocvd reactor most expensive", () => {
    expect(cvCost("mocvd_reactor")).toBeGreaterThan(cvCost("apcvd_belt"));
  });
});

describe("lowTemp", () => {
  it("pecvd chamber is low temp", () => {
    expect(lowTemp("pecvd_chamber")).toBe(true);
  });
  it("lpcvd tube not low temp", () => {
    expect(lowTemp("lpcvd_tube")).toBe(false);
  });
});

describe("forHighK", () => {
  it("ald reactor for high k", () => {
    expect(forHighK("ald_reactor")).toBe(true);
  });
  it("lpcvd tube not for high k", () => {
    expect(forHighK("lpcvd_tube")).toBe(false);
  });
});

describe("reactorConfig", () => {
  it("ald reactor uses atomic layer deposition self limiting angstrom", () => {
    expect(reactorConfig("ald_reactor")).toBe("ald_reactor_atomic_layer_deposition_self_limiting_angstrom");
  });
});

describe("bestUse", () => {
  it("mocvd reactor for led laser epitaxial gan gaas iii v compound", () => {
    expect(bestUse("mocvd_reactor")).toBe("led_laser_mocvd_reactor_epitaxial_gan_gaas_iii_v_compound");
  });
});

describe("cvdReactorTypes", () => {
  it("returns 5 types", () => {
    expect(cvdReactorTypes()).toHaveLength(5);
  });
});
