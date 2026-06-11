import { describe, it, expect } from "vitest";
import {
  safetyMargin, precision, simplicity, applicability,
  drCost, automatic, forHiRel, basis,
  bestUse, deratingMethods,
} from "../derating-method-calc.js";

describe("safetyMargin", () => {
  it("temperature curve highest safety margin", () => {
    expect(safetyMargin("temperature_curve")).toBeGreaterThan(safetyMargin("frequency_margin"));
  });
});

describe("precision", () => {
  it("temperature curve most precise", () => {
    expect(precision("temperature_curve")).toBeGreaterThan(precision("frequency_margin"));
  });
});

describe("simplicity", () => {
  it("voltage linear simplest", () => {
    expect(simplicity("voltage_linear")).toBeGreaterThan(simplicity("temperature_curve"));
  });
});

describe("applicability", () => {
  it("temperature curve widest applicability", () => {
    expect(applicability("temperature_curve")).toBeGreaterThan(applicability("frequency_margin"));
  });
});

describe("drCost", () => {
  it("temperature curve most expensive", () => {
    expect(drCost("temperature_curve")).toBeGreaterThan(drCost("voltage_linear"));
  });
});

describe("automatic", () => {
  it("temperature curve is automatic", () => {
    expect(automatic("temperature_curve")).toBe(true);
  });
  it("voltage linear not automatic", () => {
    expect(automatic("voltage_linear")).toBe(false);
  });
});

describe("forHiRel", () => {
  it("voltage linear for hi rel", () => {
    expect(forHiRel("voltage_linear")).toBe(true);
  });
  it("frequency margin not for hi rel", () => {
    expect(forHiRel("frequency_margin")).toBe(false);
  });
});

describe("basis", () => {
  it("temperature curve uses arrhenius activation model", () => {
    expect(basis("temperature_curve")).toBe("arrhenius_activation_model");
  });
});

describe("bestUse", () => {
  it("power thermal best for semiconductor thermal limit", () => {
    expect(bestUse("power_thermal")).toBe("semiconductor_thermal_limit");
  });
});

describe("deratingMethods", () => {
  it("returns 5 types", () => {
    expect(deratingMethods()).toHaveLength(5);
  });
});
