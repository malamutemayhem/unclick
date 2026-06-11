import { describe, it, expect } from "vitest";
import {
  clampVoltage, responseTime, capacitance, peakCurrent,
  esdCost, bidirectional, forHighSpeed, mechanism,
  bestUse, esdProtects,
} from "../esd-protect-calc.js";

describe("clampVoltage", () => {
  it("rail clamp ic best clamp voltage", () => {
    expect(clampVoltage("rail_clamp_ic")).toBeGreaterThan(clampVoltage("spark_gap_gas"));
  });
});

describe("responseTime", () => {
  it("tvs diode unipolar fastest response", () => {
    expect(responseTime("tvs_diode_unipolar")).toBeGreaterThan(responseTime("polymer_pptc"));
  });
});

describe("capacitance", () => {
  it("spark gap gas lowest capacitance", () => {
    expect(capacitance("spark_gap_gas")).toBeGreaterThan(capacitance("tvs_diode_unipolar"));
  });
});

describe("peakCurrent", () => {
  it("spark gap gas highest peak current", () => {
    expect(peakCurrent("spark_gap_gas")).toBeGreaterThan(peakCurrent("polymer_pptc"));
  });
});

describe("esdCost", () => {
  it("rail clamp ic most expensive", () => {
    expect(esdCost("rail_clamp_ic")).toBeGreaterThan(esdCost("polymer_pptc"));
  });
});

describe("bidirectional", () => {
  it("tvs diode bipolar is bidirectional", () => {
    expect(bidirectional("tvs_diode_bipolar")).toBe(true);
  });
  it("tvs diode unipolar not bidirectional", () => {
    expect(bidirectional("tvs_diode_unipolar")).toBe(false);
  });
});

describe("forHighSpeed", () => {
  it("rail clamp ic is for high speed", () => {
    expect(forHighSpeed("rail_clamp_ic")).toBe(true);
  });
  it("tvs diode unipolar not for high speed", () => {
    expect(forHighSpeed("tvs_diode_unipolar")).toBe(false);
  });
});

describe("mechanism", () => {
  it("spark gap gas uses gas arc discharge", () => {
    expect(mechanism("spark_gap_gas")).toBe("gas_arc_discharge");
  });
});

describe("bestUse", () => {
  it("rail clamp ic best for hdmi usb3 data line", () => {
    expect(bestUse("rail_clamp_ic")).toBe("hdmi_usb3_data_line");
  });
});

describe("esdProtects", () => {
  it("returns 5 types", () => {
    expect(esdProtects()).toHaveLength(5);
  });
});
