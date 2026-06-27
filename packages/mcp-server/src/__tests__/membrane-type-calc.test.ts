import { describe, it, expect } from "vitest";
import {
  poreSize, rejection, flux, foulingResist,
  mtCost, backwashable, forDrinking, material,
  bestUse, membraneTypes,
} from "../membrane-type-calc.js";

describe("poreSize", () => {
  it("mf largest pore size", () => {
    expect(poreSize("mf_microfiltration")).toBeGreaterThan(poreSize("ro_reverse_osmosis"));
  });
});

describe("rejection", () => {
  it("ro highest rejection", () => {
    expect(rejection("ro_reverse_osmosis")).toBeGreaterThan(rejection("mf_microfiltration"));
  });
});

describe("flux", () => {
  it("mf highest flux", () => {
    expect(flux("mf_microfiltration")).toBeGreaterThan(flux("ro_reverse_osmosis"));
  });
});

describe("foulingResist", () => {
  it("ceramic best fouling resistance", () => {
    expect(foulingResist("ceramic_tubular_high_temp")).toBeGreaterThan(foulingResist("ro_reverse_osmosis"));
  });
});

describe("mtCost", () => {
  it("ceramic most expensive", () => {
    expect(mtCost("ceramic_tubular_high_temp")).toBeGreaterThan(mtCost("mf_microfiltration"));
  });
});

describe("backwashable", () => {
  it("mf is backwashable", () => {
    expect(backwashable("mf_microfiltration")).toBe(true);
  });
  it("ro not backwashable", () => {
    expect(backwashable("ro_reverse_osmosis")).toBe(false);
  });
});

describe("forDrinking", () => {
  it("uf for drinking", () => {
    expect(forDrinking("uf_ultrafiltration")).toBe(true);
  });
  it("mf not for drinking", () => {
    expect(forDrinking("mf_microfiltration")).toBe(false);
  });
});

describe("material", () => {
  it("ro uses aromatic polyamide spiral", () => {
    expect(material("ro_reverse_osmosis")).toBe("aromatic_polyamide_spiral");
  });
});

describe("bestUse", () => {
  it("ceramic best for oily wastewater", () => {
    expect(bestUse("ceramic_tubular_high_temp")).toBe("oily_wastewater_high_temp_chem");
  });
});

describe("membraneTypes", () => {
  it("returns 5 types", () => {
    expect(membraneTypes()).toHaveLength(5);
  });
});
