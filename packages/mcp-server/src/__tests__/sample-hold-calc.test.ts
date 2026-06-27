import { describe, it, expect } from "vitest";
import {
  acqTime, droop, aperture, feedthrough,
  shCost, differential, forHighSpeed, architecture,
  bestUse, sampleHolds,
} from "../sample-hold-calc.js";

describe("acqTime", () => {
  it("bootstrapped nmos fastest acquisition", () => {
    expect(acqTime("bootstrapped_nmos")).toBeGreaterThan(acqTime("cmos_switch_cap"));
  });
});

describe("droop", () => {
  it("closed loop opamp lowest droop", () => {
    expect(droop("closed_loop_opamp")).toBeGreaterThan(droop("open_loop_diode"));
  });
});

describe("aperture", () => {
  it("bootstrapped nmos best aperture", () => {
    expect(aperture("bootstrapped_nmos")).toBeGreaterThan(aperture("closed_loop_opamp"));
  });
});

describe("feedthrough", () => {
  it("bootstrapped nmos best feedthrough", () => {
    expect(feedthrough("bootstrapped_nmos")).toBeGreaterThan(feedthrough("open_loop_diode"));
  });
});

describe("shCost", () => {
  it("flip around sha most expensive", () => {
    expect(shCost("flip_around_sha")).toBeGreaterThan(shCost("cmos_switch_cap"));
  });
});

describe("differential", () => {
  it("flip around sha is differential", () => {
    expect(differential("flip_around_sha")).toBe(true);
  });
  it("cmos switch cap not differential", () => {
    expect(differential("cmos_switch_cap")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("bootstrapped nmos is for high speed", () => {
    expect(forHighSpeed("bootstrapped_nmos")).toBe(true);
  });
  it("cmos switch cap not for high speed", () => {
    expect(forHighSpeed("cmos_switch_cap")).toBe(false);
  });
});

describe("architecture", () => {
  it("bootstrapped nmos uses boot clock switch", () => {
    expect(architecture("bootstrapped_nmos")).toBe("boot_clock_switch");
  });
});

describe("bestUse", () => {
  it("flip around sha best for pipeline adc stage", () => {
    expect(bestUse("flip_around_sha")).toBe("pipeline_adc_stage");
  });
});

describe("sampleHolds", () => {
  it("returns 5 types", () => {
    expect(sampleHolds()).toHaveLength(5);
  });
});
