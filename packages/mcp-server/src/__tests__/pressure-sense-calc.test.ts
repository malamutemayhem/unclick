import { describe, it, expect } from "vitest";
import {
  accuracy, range, bandwidth, tempStability,
  prCost, absolute, forProcess, element,
  bestUse, pressureSenses,
} from "../pressure-sense-calc.js";

describe("accuracy", () => {
  it("capacitive diaphragm most accurate", () => {
    expect(accuracy("capacitive_diaphragm")).toBeGreaterThan(accuracy("piezoresistive_mems"));
  });
});

describe("range", () => {
  it("piezoelectric quartz widest range", () => {
    expect(range("piezoelectric_quartz")).toBeGreaterThan(range("optical_fiber_fbg"));
  });
});

describe("bandwidth", () => {
  it("piezoelectric quartz widest bandwidth", () => {
    expect(bandwidth("piezoelectric_quartz")).toBeGreaterThan(bandwidth("capacitive_diaphragm"));
  });
});

describe("tempStability", () => {
  it("optical fiber fbg best temp stability", () => {
    expect(tempStability("optical_fiber_fbg")).toBeGreaterThan(tempStability("piezoresistive_mems"));
  });
});

describe("prCost", () => {
  it("optical fiber fbg most expensive", () => {
    expect(prCost("optical_fiber_fbg")).toBeGreaterThan(prCost("piezoresistive_mems"));
  });
});

describe("absolute", () => {
  it("capacitive diaphragm is absolute", () => {
    expect(absolute("capacitive_diaphragm")).toBe(true);
  });
  it("piezoelectric quartz not absolute", () => {
    expect(absolute("piezoelectric_quartz")).toBe(false);
  });
});

describe("forProcess", () => {
  it("piezoresistive mems for process", () => {
    expect(forProcess("piezoresistive_mems")).toBe(true);
  });
  it("piezoelectric quartz not for process", () => {
    expect(forProcess("piezoelectric_quartz")).toBe(false);
  });
});

describe("element", () => {
  it("optical fiber fbg uses bragg grating wavelength", () => {
    expect(element("optical_fiber_fbg")).toBe("bragg_grating_wavelength");
  });
});

describe("bestUse", () => {
  it("capacitive diaphragm best for vacuum gauge precision", () => {
    expect(bestUse("capacitive_diaphragm")).toBe("vacuum_gauge_precision");
  });
});

describe("pressureSenses", () => {
  it("returns 5 types", () => {
    expect(pressureSenses()).toHaveLength(5);
  });
});
