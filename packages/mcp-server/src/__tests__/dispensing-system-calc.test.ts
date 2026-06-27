import { describe, it, expect } from "vitest";
import {
  precision, speed, viscosityRange, repeatability,
  dsCost, contactless, forElectronics, mechanism,
  bestUse, dispensingSystemTypes,
} from "../dispensing-system-calc.js";

describe("precision", () => {
  it("jetting non contact best precision", () => {
    expect(precision("jetting_non_contact")).toBeGreaterThan(precision("time_pressure_syringe"));
  });
});

describe("speed", () => {
  it("jetting non contact fastest", () => {
    expect(speed("jetting_non_contact")).toBeGreaterThan(speed("time_pressure_syringe"));
  });
});

describe("viscosityRange", () => {
  it("auger valve screw widest viscosity range", () => {
    expect(viscosityRange("auger_valve_screw")).toBeGreaterThan(viscosityRange("spray_conformal_coat"));
  });
});

describe("repeatability", () => {
  it("positive displacement pump best repeatability", () => {
    expect(repeatability("positive_displacement_pump")).toBeGreaterThan(repeatability("time_pressure_syringe"));
  });
});

describe("dsCost", () => {
  it("jetting most expensive", () => {
    expect(dsCost("jetting_non_contact")).toBeGreaterThan(dsCost("time_pressure_syringe"));
  });
});

describe("contactless", () => {
  it("jetting is contactless", () => {
    expect(contactless("jetting_non_contact")).toBe(true);
  });
  it("auger valve not contactless", () => {
    expect(contactless("auger_valve_screw")).toBe(false);
  });
});

describe("forElectronics", () => {
  it("all dispensing systems for electronics", () => {
    expect(forElectronics("jetting_non_contact")).toBe(true);
    expect(forElectronics("time_pressure_syringe")).toBe(true);
  });
});

describe("mechanism", () => {
  it("auger valve uses rotating screw", () => {
    expect(mechanism("auger_valve_screw")).toBe("rotating_auger_screw_positive_displacement_thick");
  });
});

describe("bestUse", () => {
  it("jetting for smt solder paste", () => {
    expect(bestUse("jetting_non_contact")).toBe("smt_solder_paste_micro_dot_led_die_attach_fast");
  });
});

describe("dispensingSystemTypes", () => {
  it("returns 5 types", () => {
    expect(dispensingSystemTypes()).toHaveLength(5);
  });
});
