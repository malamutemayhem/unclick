import { describe, it, expect } from "vitest";
import {
  accuracy, response, stability, range,
  ptCost, digital, forProcess, element,
  bestUse, pressureTransTypes,
} from "../pressure-trans-calc.js";

describe("accuracy", () => {
  it("resonant silicon most accurate", () => {
    expect(accuracy("resonant_silicon_digital")).toBeGreaterThan(accuracy("piezoelectric_dynamic"));
  });
});

describe("response", () => {
  it("piezoelectric fastest response", () => {
    expect(response("piezoelectric_dynamic")).toBeGreaterThan(response("resonant_silicon_digital"));
  });
});

describe("stability", () => {
  it("capacitive ceramic most stable", () => {
    expect(stability("capacitive_ceramic_cell")).toBeGreaterThan(stability("piezoelectric_dynamic"));
  });
});

describe("range", () => {
  it("piezoelectric widest range", () => {
    expect(range("piezoelectric_dynamic")).toBeGreaterThan(range("mems_micro_machined"));
  });
});

describe("ptCost", () => {
  it("resonant silicon most expensive", () => {
    expect(ptCost("resonant_silicon_digital")).toBeGreaterThan(ptCost("mems_micro_machined"));
  });
});

describe("digital", () => {
  it("resonant silicon is digital", () => {
    expect(digital("resonant_silicon_digital")).toBe(true);
  });
  it("strain gauge not digital", () => {
    expect(digital("strain_gauge_piezoresist")).toBe(false);
  });
});

describe("forProcess", () => {
  it("capacitive ceramic for process", () => {
    expect(forProcess("capacitive_ceramic_cell")).toBe(true);
  });
  it("piezoelectric not for process", () => {
    expect(forProcess("piezoelectric_dynamic")).toBe(false);
  });
});

describe("element", () => {
  it("MEMS uses micro-machined silicon diaphragm", () => {
    expect(element("mems_micro_machined")).toBe("micro_machined_silicon_diaphragm");
  });
});

describe("bestUse", () => {
  it("resonant silicon for custody transfer", () => {
    expect(bestUse("resonant_silicon_digital")).toBe("custody_transfer_fiscal_metering");
  });
});

describe("pressureTransTypes", () => {
  it("returns 5 types", () => {
    expect(pressureTransTypes()).toHaveLength(5);
  });
});
