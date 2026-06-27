import { describe, it, expect } from "vitest";
import {
  accuracy, speed, channels, compliance,
  smuCost, pulsed, forSemiconductor, range,
  bestUse, smuInstruments,
} from "../smu-instrument-calc.js";

describe("accuracy", () => {
  it("precision dc smu best accuracy", () => {
    expect(accuracy("precision_dc_smu")).toBeGreaterThan(accuracy("fast_iv_curve"));
  });
});

describe("speed", () => {
  it("fast iv curve fastest speed", () => {
    expect(speed("fast_iv_curve")).toBeGreaterThan(speed("precision_dc_smu"));
  });
});

describe("channels", () => {
  it("multi channel smu most channels", () => {
    expect(channels("multi_channel_smu")).toBeGreaterThan(channels("precision_dc_smu"));
  });
});

describe("compliance", () => {
  it("high voltage smu highest compliance", () => {
    expect(compliance("high_voltage_smu")).toBeGreaterThan(compliance("fast_iv_curve"));
  });
});

describe("smuCost", () => {
  it("multi channel smu most expensive", () => {
    expect(smuCost("multi_channel_smu")).toBeGreaterThan(smuCost("fast_iv_curve"));
  });
});

describe("pulsed", () => {
  it("pulse iv smu is pulsed", () => {
    expect(pulsed("pulse_iv_smu")).toBe(true);
  });
  it("precision dc smu not pulsed", () => {
    expect(pulsed("precision_dc_smu")).toBe(false);
  });
});

describe("forSemiconductor", () => {
  it("precision dc smu is for semiconductor", () => {
    expect(forSemiconductor("precision_dc_smu")).toBe(true);
  });
  it("high voltage smu not for semiconductor", () => {
    expect(forSemiconductor("high_voltage_smu")).toBe(false);
  });
});

describe("range", () => {
  it("precision dc smu uses femtoamp to 1a", () => {
    expect(range("precision_dc_smu")).toBe("femtoamp_to_1a");
  });
});

describe("bestUse", () => {
  it("pulse iv smu best for gan hemt thermal trap", () => {
    expect(bestUse("pulse_iv_smu")).toBe("gan_hemt_thermal_trap");
  });
});

describe("smuInstruments", () => {
  it("returns 5 types", () => {
    expect(smuInstruments()).toHaveLength(5);
  });
});
