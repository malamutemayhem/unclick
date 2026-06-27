import { describe, it, expect } from "vitest";
import {
  selectivity, flux, thermalStability, chemResist,
  pvCost, hydrophilic, forDehydration, material,
  bestUse, pervaporationMemTypes,
} from "../pervaporation-mem-calc.js";

describe("selectivity", () => {
  it("ceramic zeolite most selective", () => {
    expect(selectivity("ceramic_zeolite_naa")).toBeGreaterThan(selectivity("polymeric_hydrophobic"));
  });
});

describe("flux", () => {
  it("mixed matrix highest flux", () => {
    expect(flux("mixed_matrix_composite")).toBeGreaterThan(flux("ceramic_zeolite_naa"));
  });
});

describe("thermalStability", () => {
  it("ceramic zeolite best thermal stability", () => {
    expect(thermalStability("ceramic_zeolite_naa")).toBeGreaterThan(thermalStability("polymeric_hydrophilic"));
  });
});

describe("chemResist", () => {
  it("ceramic zeolite best chemical resistance", () => {
    expect(chemResist("ceramic_zeolite_naa")).toBeGreaterThan(chemResist("polymeric_hydrophilic"));
  });
});

describe("pvCost", () => {
  it("ceramic zeolite most expensive", () => {
    expect(pvCost("ceramic_zeolite_naa")).toBeGreaterThan(pvCost("polymeric_hydrophilic"));
  });
});

describe("hydrophilic", () => {
  it("polymeric hydrophilic is hydrophilic", () => {
    expect(hydrophilic("polymeric_hydrophilic")).toBe(true);
  });
  it("polymeric hydrophobic is not hydrophilic", () => {
    expect(hydrophilic("polymeric_hydrophobic")).toBe(false);
  });
});

describe("forDehydration", () => {
  it("ceramic zeolite for dehydration", () => {
    expect(forDehydration("ceramic_zeolite_naa")).toBe(true);
  });
  it("polymeric hydrophobic not for dehydration", () => {
    expect(forDehydration("polymeric_hydrophobic")).toBe(false);
  });
});

describe("material", () => {
  it("mixed matrix uses polymer with inorganic filler", () => {
    expect(material("mixed_matrix_composite")).toBe("polymer_matrix_with_inorganic_filler_mof");
  });
});

describe("bestUse", () => {
  it("polymeric hydrophilic for ethanol dehydration", () => {
    expect(bestUse("polymeric_hydrophilic")).toBe("ethanol_dehydration_isopropanol_drying");
  });
});

describe("pervaporationMemTypes", () => {
  it("returns 5 types", () => {
    expect(pervaporationMemTypes()).toHaveLength(5);
  });
});
