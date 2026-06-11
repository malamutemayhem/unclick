import { describe, it, expect } from "vitest";
import {
  frequency, severity, repeatability, setupComplexity,
  emcCost, preCompliance, forCeMark, standard,
  bestUse, emcTests,
} from "../emc-test-calc.js";

describe("frequency", () => {
  it("radiated emissions highest frequency", () => {
    expect(frequency("radiated_emissions_re")).toBeGreaterThan(frequency("surge_immunity_combo"));
  });
});

describe("severity", () => {
  it("surge immunity highest severity", () => {
    expect(severity("surge_immunity_combo")).toBeGreaterThan(severity("conducted_emissions_ce"));
  });
});

describe("repeatability", () => {
  it("conducted emissions most repeatable", () => {
    expect(repeatability("conducted_emissions_ce")).toBeGreaterThan(repeatability("radiated_immunity_ri"));
  });
});

describe("setupComplexity", () => {
  it("radiated immunity most complex setup", () => {
    expect(setupComplexity("radiated_immunity_ri")).toBeGreaterThan(setupComplexity("esd_immunity_iec"));
  });
});

describe("emcCost", () => {
  it("radiated immunity most expensive", () => {
    expect(emcCost("radiated_immunity_ri")).toBeGreaterThan(emcCost("esd_immunity_iec"));
  });
});

describe("preCompliance", () => {
  it("esd immunity is pre compliance", () => {
    expect(preCompliance("esd_immunity_iec")).toBe(true);
  });
  it("radiated immunity not pre compliance", () => {
    expect(preCompliance("radiated_immunity_ri")).toBe(false);
  });
});

describe("forCeMark", () => {
  it("radiated emissions for ce mark", () => {
    expect(forCeMark("radiated_emissions_re")).toBe(true);
  });
});

describe("standard", () => {
  it("esd immunity uses iec 61000 4 2", () => {
    expect(standard("esd_immunity_iec")).toBe("iec_61000_4_2_contact_air");
  });
});

describe("bestUse", () => {
  it("surge immunity best for ac mains lightning", () => {
    expect(bestUse("surge_immunity_combo")).toBe("ac_mains_port_lightning_surge");
  });
});

describe("emcTests", () => {
  it("returns 5 types", () => {
    expect(emcTests()).toHaveLength(5);
  });
});
