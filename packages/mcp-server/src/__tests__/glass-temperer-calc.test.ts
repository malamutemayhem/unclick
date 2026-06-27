import { describe, it, expect } from "vitest";
import {
  quenchSpeed, flatness, strengthGain, opticalQuality,
  gtCost, thermal, forArchitectural, temperConfig,
  bestUse, glassTemperTypes,
} from "../glass-temperer-calc.js";

describe("quenchSpeed", () => {
  it("forced convection fastest quench speed", () => {
    expect(quenchSpeed("forced_convection")).toBeGreaterThan(quenchSpeed("chemical_ion_exchange"));
  });
});

describe("flatness", () => {
  it("forced convection and chemical ion exchange best flatness", () => {
    expect(flatness("forced_convection")).toBeGreaterThan(flatness("vertical_tong"));
  });
});

describe("strengthGain", () => {
  it("chemical ion exchange best strength gain", () => {
    expect(strengthGain("chemical_ion_exchange")).toBeGreaterThan(strengthGain("differential_quench"));
  });
});

describe("opticalQuality", () => {
  it("chemical ion exchange best optical quality", () => {
    expect(opticalQuality("chemical_ion_exchange")).toBeGreaterThan(opticalQuality("vertical_tong"));
  });
});

describe("gtCost", () => {
  it("forced convection most expensive", () => {
    expect(gtCost("forced_convection")).toBeGreaterThan(gtCost("vertical_tong"));
  });
});

describe("thermal", () => {
  it("horizontal roller is thermal", () => {
    expect(thermal("horizontal_roller")).toBe(true);
  });
  it("chemical ion exchange not thermal", () => {
    expect(thermal("chemical_ion_exchange")).toBe(false);
  });
});

describe("forArchitectural", () => {
  it("forced convection for architectural", () => {
    expect(forArchitectural("forced_convection")).toBe(true);
  });
  it("chemical ion exchange not for architectural", () => {
    expect(forArchitectural("chemical_ion_exchange")).toBe(false);
  });
});

describe("temperConfig", () => {
  it("chemical ion exchange uses salt bath thin glass", () => {
    expect(temperConfig("chemical_ion_exchange")).toBe("chemical_temper_ion_exchange_salt_bath_thin_glass_phone_screen");
  });
});

describe("bestUse", () => {
  it("differential quench for automotive sidelite", () => {
    expect(bestUse("differential_quench")).toBe("automotive_sidelite_backlite_differential_quench_break_pattern");
  });
});

describe("glassTemperTypes", () => {
  it("returns 5 types", () => {
    expect(glassTemperTypes()).toHaveLength(5);
  });
});
