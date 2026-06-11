import { describe, it, expect } from "vitest";
import {
  rejection, flux, pressure, fouling,
  mfCost, pressureDriven, forDrinking, poreSize,
  bestUse, membraneFilterTypes,
} from "../membrane-filter-calc.js";

describe("rejection", () => {
  it("ro highest rejection", () => {
    expect(rejection("reverse_osmosis_ro_desal")).toBeGreaterThan(rejection("microfiltration_mf_porous"));
  });
});

describe("flux", () => {
  it("mf highest flux", () => {
    expect(flux("microfiltration_mf_porous")).toBeGreaterThan(flux("reverse_osmosis_ro_desal"));
  });
});

describe("pressure", () => {
  it("ro highest pressure", () => {
    expect(pressure("reverse_osmosis_ro_desal")).toBeGreaterThan(pressure("microfiltration_mf_porous"));
  });
});

describe("fouling", () => {
  it("ro most fouling prone", () => {
    expect(fouling("reverse_osmosis_ro_desal")).toBeGreaterThan(fouling("electrodialysis_ed_ion"));
  });
});

describe("mfCost", () => {
  it("ro most expensive", () => {
    expect(mfCost("reverse_osmosis_ro_desal")).toBeGreaterThan(mfCost("microfiltration_mf_porous"));
  });
});

describe("pressureDriven", () => {
  it("mf is pressure driven", () => {
    expect(pressureDriven("microfiltration_mf_porous")).toBe(true);
  });
  it("ed not pressure driven", () => {
    expect(pressureDriven("electrodialysis_ed_ion")).toBe(false);
  });
});

describe("forDrinking", () => {
  it("uf for drinking", () => {
    expect(forDrinking("ultrafiltration_uf_hollow")).toBe(true);
  });
  it("mf not for drinking", () => {
    expect(forDrinking("microfiltration_mf_porous")).toBe(false);
  });
});

describe("poreSize", () => {
  it("ro uses sub 0.001 micron", () => {
    expect(poreSize("reverse_osmosis_ro_desal")).toBe("sub_0_001_micron_monovalent_ion");
  });
});

describe("bestUse", () => {
  it("ro for desalination", () => {
    expect(bestUse("reverse_osmosis_ro_desal")).toBe("desalination_ultrapure_boiler_feed");
  });
});

describe("membraneFilterTypes", () => {
  it("returns 5 types", () => {
    expect(membraneFilterTypes()).toHaveLength(5);
  });
});
