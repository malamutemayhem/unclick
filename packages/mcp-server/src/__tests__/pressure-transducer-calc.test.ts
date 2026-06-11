import { describe, it, expect } from "vitest";
import {
  accuracy, throughput, pressureRange, stability,
  ptCost, digitalProtocol, forCorrosive, transducerConfig,
  bestUse, pressureTransducerTypes,
} from "../pressure-transducer-calc.js";

describe("accuracy", () => {
  it("resonant wire best accuracy", () => {
    expect(accuracy("resonant_wire_pt")).toBeGreaterThan(accuracy("piezoresistive_pt"));
  });
});

describe("throughput", () => {
  it("piezoresistive highest throughput", () => {
    expect(throughput("piezoresistive_pt")).toBeGreaterThan(throughput("resonant_wire_pt"));
  });
});

describe("pressureRange", () => {
  it("thin film best pressure range", () => {
    expect(pressureRange("thin_film_pt")).toBeGreaterThan(pressureRange("optical_fiber_pt"));
  });
});

describe("stability", () => {
  it("resonant wire best stability", () => {
    expect(stability("resonant_wire_pt")).toBeGreaterThan(stability("piezoresistive_pt"));
  });
});

describe("ptCost", () => {
  it("optical fiber most expensive", () => {
    expect(ptCost("optical_fiber_pt")).toBeGreaterThan(ptCost("piezoresistive_pt"));
  });
});

describe("digitalProtocol", () => {
  it("capacitive has digital protocol", () => {
    expect(digitalProtocol("capacitive_pt")).toBe(true);
  });
});

describe("forCorrosive", () => {
  it("capacitive for corrosive", () => {
    expect(forCorrosive("capacitive_pt")).toBe(true);
  });
  it("piezoresistive not for corrosive", () => {
    expect(forCorrosive("piezoresistive_pt")).toBe(false);
  });
});

describe("transducerConfig", () => {
  it("optical fiber uses bragg grating wavelength shift immune emi", () => {
    expect(transducerConfig("optical_fiber_pt")).toBe("optical_fiber_transducer_bragg_grating_wavelength_shift_immune_emi");
  });
});

describe("bestUse", () => {
  it("resonant wire for custody transfer ultra stable reference", () => {
    expect(bestUse("resonant_wire_pt")).toBe("custody_transfer_resonant_wire_transducer_ultra_stable_reference");
  });
});

describe("pressureTransducerTypes", () => {
  it("returns 5 types", () => {
    expect(pressureTransducerTypes()).toHaveLength(5);
  });
});
