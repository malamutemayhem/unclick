import { describe, it, expect } from "vitest";
import {
  accuracy, stability, overpressure, responseTime,
  ptCost, digital, forHazardous, sensor,
  bestUse, pressureTransmitterTypes,
} from "../pressure-transmitter-calc.js";

describe("accuracy", () => {
  it("resonant silicon most accurate", () => {
    expect(accuracy("resonant_silicon_freq")).toBeGreaterThan(accuracy("strain_gauge_bonded"));
  });
});

describe("stability", () => {
  it("resonant silicon best stability", () => {
    expect(stability("resonant_silicon_freq")).toBeGreaterThan(stability("piezoresistive_silicon"));
  });
});

describe("overpressure", () => {
  it("sapphire best overpressure", () => {
    expect(overpressure("sapphire_high_overpress")).toBeGreaterThan(overpressure("piezoresistive_silicon"));
  });
});

describe("responseTime", () => {
  it("piezoresistive fastest response", () => {
    expect(responseTime("piezoresistive_silicon")).toBeGreaterThan(responseTime("resonant_silicon_freq"));
  });
});

describe("ptCost", () => {
  it("resonant silicon most expensive", () => {
    expect(ptCost("resonant_silicon_freq")).toBeGreaterThan(ptCost("strain_gauge_bonded"));
  });
});

describe("digital", () => {
  it("capacitance diaphragm is digital", () => {
    expect(digital("capacitance_diaphragm")).toBe(true);
  });
  it("strain gauge not digital", () => {
    expect(digital("strain_gauge_bonded")).toBe(false);
  });
});

describe("forHazardous", () => {
  it("capacitance for hazardous", () => {
    expect(forHazardous("capacitance_diaphragm")).toBe(true);
  });
  it("piezoresistive not for hazardous", () => {
    expect(forHazardous("piezoresistive_silicon")).toBe(false);
  });
});

describe("sensor", () => {
  it("sapphire uses sapphire diaphragm", () => {
    expect(sensor("sapphire_high_overpress")).toBe("sapphire_diaphragm_oil_filled_high_overload");
  });
});

describe("bestUse", () => {
  it("resonant silicon for custody transfer", () => {
    expect(bestUse("resonant_silicon_freq")).toBe("custody_transfer_fiscal_metering_highest_spec");
  });
});

describe("pressureTransmitterTypes", () => {
  it("returns 5 types", () => {
    expect(pressureTransmitterTypes()).toHaveLength(5);
  });
});
