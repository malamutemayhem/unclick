import { describe, it, expect } from "vitest";
import {
  poreSize, rejection, flux, energyUse,
  mfCost, pressureDriven, forDrinkingWater, membrane,
  bestUse, membraneFiltrationTypes,
} from "../membrane-filtration-calc.js";

describe("poreSize", () => {
  it("microfiltration largest pore size", () => {
    expect(poreSize("microfiltration_mf")).toBeGreaterThan(poreSize("reverse_osmosis_ro"));
  });
});

describe("rejection", () => {
  it("reverse osmosis best rejection", () => {
    expect(rejection("reverse_osmosis_ro")).toBeGreaterThan(rejection("microfiltration_mf"));
  });
});

describe("flux", () => {
  it("microfiltration highest flux", () => {
    expect(flux("microfiltration_mf")).toBeGreaterThan(flux("reverse_osmosis_ro"));
  });
});

describe("energyUse", () => {
  it("reverse osmosis highest energy use", () => {
    expect(energyUse("reverse_osmosis_ro")).toBeGreaterThan(energyUse("microfiltration_mf"));
  });
});

describe("mfCost", () => {
  it("membrane bioreactor most expensive", () => {
    expect(mfCost("membrane_bioreactor")).toBeGreaterThan(mfCost("microfiltration_mf"));
  });
});

describe("pressureDriven", () => {
  it("reverse osmosis is pressure driven", () => {
    expect(pressureDriven("reverse_osmosis_ro")).toBe(true);
  });
  it("membrane bioreactor not pressure driven", () => {
    expect(pressureDriven("membrane_bioreactor")).toBe(false);
  });
});

describe("forDrinkingWater", () => {
  it("ultrafiltration for drinking water", () => {
    expect(forDrinkingWater("ultrafiltration_uf")).toBe(true);
  });
  it("microfiltration not for drinking water", () => {
    expect(forDrinkingWater("microfiltration_mf")).toBe(false);
  });
});

describe("membrane", () => {
  it("reverse osmosis uses polyamide tfc", () => {
    expect(membrane("reverse_osmosis_ro")).toBe("polyamide_tfc_spiral_wound_sub_nm_salt_rejection");
  });
});

describe("bestUse", () => {
  it("reverse osmosis for desalination", () => {
    expect(bestUse("reverse_osmosis_ro")).toBe("desalination_ultrapure_water_boiler_feed_pharma");
  });
});

describe("membraneFiltrationTypes", () => {
  it("returns 5 types", () => {
    expect(membraneFiltrationTypes()).toHaveLength(5);
  });
});
