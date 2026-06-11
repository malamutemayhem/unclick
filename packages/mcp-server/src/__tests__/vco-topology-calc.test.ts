import { describe, it, expect } from "vitest";
import {
  phaseNoise, tuningRange, powerDraw, frequency,
  vcoCost, integrated, forMmwave, resonator,
  bestUse, vcoTopologies,
} from "../vco-topology-calc.js";

describe("phaseNoise", () => {
  it("clapp crystal best phase noise", () => {
    expect(phaseNoise("clapp_crystal")).toBeGreaterThan(phaseNoise("ring_cmos_delay"));
  });
});

describe("tuningRange", () => {
  it("relaxation rc widest tuning range", () => {
    expect(tuningRange("relaxation_rc")).toBeGreaterThan(tuningRange("clapp_crystal"));
  });
});

describe("powerDraw", () => {
  it("colpitts bjt highest power draw", () => {
    expect(powerDraw("colpitts_bjt")).toBeGreaterThan(powerDraw("relaxation_rc"));
  });
});

describe("frequency", () => {
  it("lc tank cross highest frequency", () => {
    expect(frequency("lc_tank_cross")).toBeGreaterThan(frequency("relaxation_rc"));
  });
});

describe("vcoCost", () => {
  it("lc tank cross most expensive", () => {
    expect(vcoCost("lc_tank_cross")).toBeGreaterThan(vcoCost("relaxation_rc"));
  });
});

describe("integrated", () => {
  it("ring cmos delay is integrated", () => {
    expect(integrated("ring_cmos_delay")).toBe(true);
  });
  it("colpitts bjt not integrated", () => {
    expect(integrated("colpitts_bjt")).toBe(false);
  });
});

describe("forMmwave", () => {
  it("lc tank cross is for mmwave", () => {
    expect(forMmwave("lc_tank_cross")).toBe(true);
  });
  it("ring cmos delay not for mmwave", () => {
    expect(forMmwave("ring_cmos_delay")).toBe(false);
  });
});

describe("resonator", () => {
  it("clapp crystal uses quartz crystal series", () => {
    expect(resonator("clapp_crystal")).toBe("quartz_crystal_series");
  });
});

describe("bestUse", () => {
  it("lc tank cross best for rf transceiver lo", () => {
    expect(bestUse("lc_tank_cross")).toBe("rf_transceiver_lo");
  });
});

describe("vcoTopologies", () => {
  it("returns 5 types", () => {
    expect(vcoTopologies()).toHaveLength(5);
  });
});
